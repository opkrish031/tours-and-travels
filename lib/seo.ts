import type { Metadata } from "next";
import { site } from "@/data/site";

export type SeoInput = {
  title: string;
  description: string;
  /** Path like "/taxi-fare" (leading slash required). */
  path?: string;
  image?: string;
  noindex?: boolean;
};

/** `{Primary Keyword} | {Brand}` — must stay within 60 chars (enforced by validate-data). */
export function titleFor(primary: string): string {
  return `${primary} | ${site.brandName}`;
}

/** Home title (57 chars) — shared by layout default and the home page. */
export const HOME_TITLE = `${site.brandName} — Jodhpur Taxi Service, Outstation Cab Booking`;

/** Home meta description (within PRD's 140–160 chars). */
export const HOME_DESCRIPTION =
  "Book a Jodhpur taxi for airport transfers, local sightseeing and outstation trips across Rajasthan. Check per-km rates, then confirm your fare on WhatsApp.";

/** Absolute canonical URL with no trailing slash (root excepted). */
export function canonicalUrl(path = "/"): string {
  const url = new URL(path, site.domain);
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }
  return url.href;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noindex = false,
}: SeoInput): Metadata {
  const canonical = canonicalUrl(path);
  const ogImage = image ? new URL(image, site.domain).href : undefined;

  return {
    // absolute: callers pass the full title (titleFor already appends the
    // brand) — otherwise layout title.template would append it a second time.
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.brandName,
      locale: "en_IN",
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export type FaqItem = { q: string; a: string };
export type Crumb = { name: string; path: string };

export function localBusinessJsonLd() {
  const { brandName, domain, legalName, phone, address, geo, hours, socials } = site;
  const sameAs = Object.values(socials).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `${domain}/#business`,
    name: brandName,
    legalName,
    url: domain,
    telephone: phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    ...(hours ? {} : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function faqJsonLd(faqs: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: readonly Crumb[]) {
  const items = crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: canonicalUrl(crumb.path),
  }));
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export type ServiceJsonLd = {
  "@context": string;
  "@type": "Service";
  name: string;
  description: string;
  url: string;
  provider: { "@id": string };
  areaServed: string;
  offers?: {
    "@type": "Offer";
    price: number;
    priceCurrency: string;
    availability: string;
  };
};

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
  price?: number;
}): ServiceJsonLd {
  const base: Omit<ServiceJsonLd, "offers"> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: canonicalUrl(opts.path),
    provider: { "@id": `${site.domain}/#business` },
    areaServed: opts.areaServed ?? "Jodhpur, Rajasthan, India",
  };
  if (opts.price === undefined) return base;
  return {
    ...base,
    offers: {
      "@type": "Offer",
      price: opts.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };
}
