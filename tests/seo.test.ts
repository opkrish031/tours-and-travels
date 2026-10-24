import { describe, expect, it } from "vitest";
import { homeFaqs } from "@/data/faqs";
import { site } from "@/data/site";
import {
  breadcrumbJsonLd,
  buildMetadata,
  canonicalUrl,
  faqJsonLd,
  localBusinessJsonLd,
  serviceJsonLd,
  titleFor,
  websiteJsonLd,
} from "@/lib/seo";

describe("titleFor", () => {
  it("appends the brand name", () => {
    expect(titleFor("Jodhpur to Jaipur Taxi")).toBe(
      "Jodhpur to Jaipur Taxi | Marwad Cabs",
    );
  });
});

describe("canonicalUrl", () => {
  it("builds absolute URLs without trailing slashes", () => {
    expect(canonicalUrl("/taxi-fare")).toBe("https://marwadcabs.com/taxi-fare");
    expect(canonicalUrl("/about/")).toBe("https://marwadcabs.com/about");
    expect(canonicalUrl("/jodhpur-to-jaipur-taxi")).toBe(
      "https://marwadcabs.com/jodhpur-to-jaipur-taxi",
    );
  });

  it("keeps the root path", () => {
    expect(canonicalUrl()).toBe("https://marwadcabs.com/");
    expect(canonicalUrl("/")).toBe("https://marwadcabs.com/");
  });
});

describe("buildMetadata", () => {
  const base = {
    title: titleFor("One Way Taxi in Jodhpur"),
    description:
      "Book a one way taxi in Jodhpur to any Rajasthan city. Fixed per-km rates, clean cars, trained drivers. Get your fare on WhatsApp now.",
    path: "/jodhpur-one-way-taxi",
  };

  it("emits title, description, canonical and indexable robots", () => {
    const metadata = buildMetadata(base);
    expect(metadata.title).toEqual({ absolute: base.title });
    expect(metadata.description).toBe(base.description);
    expect(metadata.alternates?.canonical).toBe(
      "https://marwadcabs.com/jodhpur-one-way-taxi",
    );
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });

  it("switches to noindex when requested", () => {
    const metadata = buildMetadata({ ...base, noindex: true });
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("populates Open Graph and Twitter fields", () => {
    const metadata = buildMetadata({ ...base, image: "/images/og/home.jpg" });
    expect(metadata.openGraph?.url).toBe("https://marwadcabs.com/jodhpur-one-way-taxi");
    expect(metadata.openGraph?.siteName).toBe(site.brandName);
    expect(metadata.openGraph?.locale).toBe("en_IN");
    expect(metadata.openGraph?.images).toEqual([
      { url: "https://marwadcabs.com/images/og/home.jpg" },
    ]);
    const twitter = metadata.twitter;
    expect(twitter && "card" in twitter ? twitter.card : undefined).toBe(
      "summary_large_image",
    );
    expect(twitter?.title).toBe(base.title);
  });

  it("defaults to a summary card without an image", () => {
    const twitter = buildMetadata(base).twitter;
    expect(twitter && "card" in twitter ? twitter.card : undefined).toBe("summary");
  });
});

describe("localBusinessJsonLd", () => {
  const json = localBusinessJsonLd();

  it("describes the taxi business", () => {
    expect(json["@type"]).toBe("TaxiService");
    expect(json.name).toBe(site.brandName);
    expect(json.telephone).toBe(site.phone);
    expect(json.email).toBe(site.email);
    expect(json.geo.latitude).toBe(site.geo.lat);
    expect(json.geo.longitude).toBe(site.geo.lng);
  });

  it("includes the full postal address", () => {
    expect(json.address.streetAddress).toBe(site.address.street);
    expect(json.address.addressLocality).toBe("Jodhpur");
    expect(json.address.addressRegion).toBe("Rajasthan");
    expect(json.address.postalCode).toBe("342001");
  });

  it("emits sameAs only for populated socials", () => {
    const expected = Object.values(site.socials).filter(Boolean);
    expect(json.sameAs).toEqual(expected.length > 0 ? expected : undefined);
  });
});

describe("faqJsonLd", () => {
  it("mirrors the FAQ list as questions", () => {
    const json = faqJsonLd(homeFaqs);
    expect(json.mainEntity).toHaveLength(homeFaqs.length);
    expect(json.mainEntity[0]["@type"]).toBe("Question");
    expect(json.mainEntity[0].name).toBe(homeFaqs[0].q);
    expect(json.mainEntity[0].acceptedAnswer.text).toBe(homeFaqs[0].a);
  });
});

describe("breadcrumbJsonLd", () => {
  it("numbers items from 1 with absolute canonical URLs", () => {
    const json = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Routes", path: "/routes/" },
      { name: "Jodhpur to Jaipur Taxi", path: "/jodhpur-to-jaipur-taxi" },
    ]);
    expect(json.itemListElement).toHaveLength(3);
    expect(json.itemListElement[0]).toMatchObject({
      position: 1,
      name: "Home",
      item: "https://marwadcabs.com/",
    });
    expect(json.itemListElement[1].item).toBe("https://marwadcabs.com/routes");
    expect(json.itemListElement[2].position).toBe(3);
  });
});

describe("serviceJsonLd", () => {
  it("links the provider and omits offers without a price", () => {
    const json = serviceJsonLd({
      name: "Jodhpur to Jaipur Taxi",
      description: "One way and round trip taxi between Jodhpur and Jaipur.",
      path: "/jodhpur-to-jaipur-taxi",
    });
    expect(json["@type"]).toBe("Service");
    expect(json.provider["@id"]).toBe("https://marwadcabs.com/#business");
    expect(json.offers).toBeUndefined();
    expect(json.url).toBe("https://marwadcabs.com/jodhpur-to-jaipur-taxi");
  });

  it("adds an INR offer when a price is given", () => {
    const json = serviceJsonLd({
      name: "Jodhpur to Jaipur Taxi",
      description: "One way and round trip taxi between Jodhpur and Jaipur.",
      path: "/jodhpur-to-jaipur-taxi",
      price: 3740,
    });
    expect(json.offers?.price).toBe(3740);
    expect(json.offers?.priceCurrency).toBe("INR");
  });
});

describe("websiteJsonLd", () => {
  it("describes the website with schema.org WebSite structure", () => {
    const json = websiteJsonLd();
    expect(json["@type"]).toBe("WebSite");
    expect(json["@id"]).toBe("https://marwadcabs.com/#website");
    expect(json.name).toBe(site.brandName);
    expect(json.inLanguage).toBe("en-IN");
  });
});
