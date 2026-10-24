import type { Metadata } from "next";
import { site } from "@/data/site";

export type SeoInput = {
  title: string;
  description: string;
  /** Concise description for Open Graph & Twitter (recommended <= 125 chars to avoid mobile truncation). */
  ogDescription?: string;
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

/** Home meta description (within PRD's 140–160 chars for search engine results). */
export const HOME_DESCRIPTION =
  "Book a Jodhpur taxi for airport transfers, local sightseeing and outstation trips across Rajasthan. Check per-km rates, then confirm your fare on WhatsApp.";

/** Home social preview description (<= 125 chars to prevent mobile preview truncation). */
export const HOME_OG_DESCRIPTION =
  "Book a Jodhpur taxi for airport transfers, sightseeing & Rajasthan outstation trips. Per-km rates, instant WhatsApp quote.";

/**
 * Resolves the primary base URL for metadata, Open Graph, Twitter, and canonicals.
 * Priorities:
 * 1. NEXT_PUBLIC_SITE_URL (explicit manual config in .env or hosting settings)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (Vercel production domain, e.g. marwad-cabs.vercel.app or assigned custom domain)
 * 3. VERCEL_URL (Vercel deployment URL)
 * 4. site.domain (default registered brand domain: https://marwadcabs.com)
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const raw = process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/+$/, "");
    return raw.startsWith("http") ? raw : `https://${raw}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.trim().replace(/\/+$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.trim().replace(/\/+$/, "")}`;
  }
  return site.domain;
}

/** Absolute canonical URL with no trailing slash (root excepted). */
export function canonicalUrl(path = "/"): string {
  const url = new URL(path, getSiteUrl());
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }
  return url.href;
}

/** Clean social description truncated cleanly under 125 chars to prevent mobile truncation. */
export function cleanSocialDescription(
  description: string,
  ogDescription?: string,
): string {
  if (ogDescription) return ogDescription;
  if (description.length <= 125) return description;
  const firstSentence = description.split(/\.\s+/)[0];
  if (firstSentence && firstSentence.length >= 60 && firstSentence.length <= 124) {
    return firstSentence.endsWith(".") ? firstSentence : `${firstSentence}.`;
  }
  const sliced = description.slice(0, 122);
  const lastSpace = sliced.lastIndexOf(" ");
  const trimmed = lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced;
  return `${trimmed.replace(/[,;:\s]+$/, "")}...`;
}

export function buildMetadata({
  title,
  description,
  ogDescription,
  path = "/",
  image,
  noindex = false,
}: SeoInput): Metadata {
  const canonical = canonicalUrl(path);
  const socialDescription = cleanSocialDescription(description, ogDescription);
  const ogImageUrl = image
    ? new URL(image, getSiteUrl()).href
    : canonicalUrl("/opengraph-image.png");

  return {
    // absolute: callers pass the full title (titleFor already appends the
    // brand) — otherwise layout title.template would append it a second time.
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description: socialDescription,
      url: canonical,
      siteName: site.brandName,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - ${site.brandName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
      images: [ogImageUrl],
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
    priceRange: "₹11 - ₹22 per km",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Net Banking, Credit Card",
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
    areaServed: [
      "Jodhpur",
      "Jaisalmer",
      "Udaipur",
      "Jaipur",
      "Mount Abu",
      "Bikaner",
      "Osian",
      "Ranakpur",
      "Rajasthan",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "185",
      bestRating: "5",
      worstRating: "1",
    },
    ...(socials.googleBusiness ? { hasMap: socials.googleBusiness } : {}),
    ...(hours ? {} : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.domain}/#website`,
    url: site.domain,
    name: site.brandName,
    description: site.description,
    publisher: { "@id": `${site.domain}/#business` },
    inLanguage: "en-IN",
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
