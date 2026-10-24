import type { Attraction } from "@/data/attractions";
import type { Faq } from "@/data/faqs";
import type { Route } from "@/data/routes";
import type { Service } from "@/data/services";
import type { Testimonial } from "@/data/testimonials";
import type { Vehicle } from "@/data/vehicles";

/** Writable structural form of data/site.ts (which is `as const`). */
export type SiteData = {
  brandName: string;
  legalName: string;
  domain: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo: { lat: number; lng: number };
  hours: string;
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    googleBusiness: string;
  };
  cancellationWindowHours: number;
};

export type PoliciesData = {
  readonly fareIncludes: readonly string[];
  readonly fareExcludes: readonly string[];
  readonly cancellationPolicy: string;
};

export type DataBundle = {
  site: SiteData;
  vehicles: Vehicle[];
  routes: Route[];
  services: Service[];
  homeFaqs: Faq[];
  attractions: Attraction[];
  testimonials: Testimonial[];
  policies: PoliciesData;
};

export type Issue = { level: "error" | "warning"; message: string };

export type ValidateOptions = {
  /** Production gate: DUMMY / [PLACEHOLDER] strings become errors. */
  strict?: boolean;
};

/** Slugs owned by static routes under app/ — content slugs must not shadow them. */
const STATIC_SLUGS = [
  "about",
  "contact",
  "taxi-fare",
  "privacy-policy",
  "terms",
  "refund-policy",
  "api",
] as const;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160;
const PHONE_RE = /^\+[1-9]\d{10,14}$/;
const WHATSAPP_RE = /^\d{12,15}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DUMMY_RE = /\bDUMMY\b/i;
const BRACKET_PLACEHOLDER_RE = /\[[A-Z][A-Z0-9_ ]*\]/;
const IMAGE_RE = /^\/images\/[a-z0-9/-]+\.(?:jpg|jpeg|png|webp|avif)$/;

type PageSeo = { title: string; description: string };

export function validateData(data: DataBundle, options: ValidateOptions = {}): Issue[] {
  const { strict = false } = options;
  const issues: Issue[] = [];
  const error = (message: string) => issues.push({ level: "error", message });
  const warn = (message: string) => issues.push({ level: "warning", message });

  // --- registry: slug uniqueness across pages and static routes -------------
  const registry = new Map<string, string>();
  const registerSlug = (slug: string, source: string) => {
    if (!SLUG_RE.test(slug)) {
      error(`${source}: slug "${slug}" must be lowercase kebab-case`);
      return;
    }
    const existing = registry.get(slug);
    if (existing) {
      error(`${source}: slug "${slug}" duplicates ${existing}`);
      return;
    }
    if ((STATIC_SLUGS as readonly string[]).includes(slug)) {
      error(`${source}: slug "${slug}" shadows a static page`);
      return;
    }
    registry.set(slug, source);
  };

  for (const v of data.vehicles) registerSlug(v.slug, `vehicle "${v.name}"`);
  for (const r of data.routes) registerSlug(r.slug, `route "${r.from} to ${r.to}"`);
  for (const s of data.services) registerSlug(s.slug, `service "${s.name}"`);

  // --- site -----------------------------------------------------------------
  const s = data.site;
  if (!PHONE_RE.test(s.phone)) error(`site.phone: "${s.phone}" is not an E.164 number`);
  if (!WHATSAPP_RE.test(s.whatsapp))
    error(`site.whatsapp: "${s.whatsapp}" must be digits only (91XXXXXXXXXX)`);
  if (!EMAIL_RE.test(s.email)) error(`site.email: "${s.email}" is not a valid email`);
  if (!s.domain.startsWith("https://"))
    error(`site.domain: "${s.domain}" must start with https://`);
  if (!s.brandName.trim()) error("site.brandName is empty");
  if (!s.legalName.trim()) error("site.legalName is empty");
  for (const [key, value] of Object.entries(s.address)) {
    if (!String(value).trim()) error(`site.address.${key} is empty`);
  }
  if (s.geo.lat < -90 || s.geo.lat > 90) error("site.geo.lat out of range");
  if (s.geo.lng < -180 || s.geo.lng > 180) error("site.geo.lng out of range");
  if (s.cancellationWindowHours <= 0)
    error("site.cancellationWindowHours must be positive");

  // --- shared page checks ---------------------------------------------------
  const checkFaq = (faq: Faq, path: string) => {
    if (!faq.q.trim()) error(`${path}: FAQ question is empty`);
    if (!faq.a.trim()) error(`${path}: FAQ answer is empty`);
  };

  const checkImage = (image: string, imageAlt: string, path: string) => {
    if (!IMAGE_RE.test(image))
      error(`${path}: image "${image}" must be /images/*.{jpg,png,webp,avif}`);
    if (!imageAlt.trim()) error(`${path}: imageAlt is empty`);
  };

  const seenSeoTitles = new Map<string, string>();
  const checkSeo = (seo: PageSeo, path: string) => {
    if (!seo.title.trim() || seo.title.length > TITLE_MAX) {
      error(`${path}: seo.title must be 1–${TITLE_MAX} chars (got ${seo.title.length})`);
    }
    if (seo.description.length < DESC_MIN || seo.description.length > DESC_MAX) {
      error(
        `${path}: seo.description must be ${DESC_MIN}–${DESC_MAX} chars (got ${seo.description.length})`,
      );
    }
    const prior = seenSeoTitles.get(seo.title);
    if (prior) error(`${path}: seo.title identical to ${prior}`);
    else seenSeoTitles.set(seo.title, path);
  };

  const checkFaqs = (faqs: Faq[], path: string, min: number) => {
    if (faqs.length < min)
      error(`${path}: needs at least ${min} FAQ(s) (got ${faqs.length})`);
    const seen = new Set<string>();
    faqs.forEach((faq, i) => {
      checkFaq(faq, `${path}.faqs[${i}]`);
      if (seen.has(faq.q)) error(`${path}: duplicate FAQ question "${faq.q}"`);
      seen.add(faq.q);
    });
  };

  // --- vehicles -------------------------------------------------------------
  data.vehicles.forEach((v, i) => {
    const path = `vehicles[${i}] (${v.slug})`;
    if (!v.name.trim()) error(`${path}: name is empty`);
    if (!v.models.length) error(`${path}: models is empty`);
    if (!v.seats.trim()) error(`${path}: seats is empty`);
    if (!v.luggage.trim()) error(`${path}: luggage is empty`);
    if (v.perKm <= 0) error(`${path}: perKm must be positive`);
    if (v.dailyKmLimit <= 0) error(`${path}: dailyKmLimit must be positive`);
    if (!v.idealFor.length) error(`${path}: idealFor is empty`);
    checkImage(v.image, v.imageAlt, path);
    checkSeo(v.seo, path);
    checkFaqs(v.faqs, path, 1);
  });

  // --- routes ---------------------------------------------------------------
  data.routes.forEach((r, i) => {
    const path = `routes[${i}] (${r.slug})`;
    if (!r.from.trim() || !r.to.trim()) error(`${path}: from/to is empty`);
    if (r.distanceKm <= 0) error(`${path}: distanceKm must be positive`);
    if (r.durationHours <= 0) error(`${path}: durationHours must be positive`);
    if (r.startingFare <= 0) error(`${path}: startingFare must be positive`);
    if (!r.tagline.trim()) error(`${path}: tagline is empty`);
    if (!r.highlights.length) error(`${path}: highlights is empty`);
    if (!r.intro.trim()) error(`${path}: intro is empty`);
    if (!r.body.length || r.body.some((p) => !p.trim()))
      error(`${path}: body must have at least one non-empty paragraph`);
    r.relatedRoutes.forEach((ref) => {
      if (ref === r.slug) error(`${path}: relatedRoutes contains itself`);
      if (!data.routes.some((x) => x.slug === ref))
        error(`${path}: relatedRoutes references unknown route "${ref}"`);
    });
    if (!r.relatedRoutes.length) error(`${path}: relatedRoutes is empty`);
    checkImage(r.image, r.imageAlt, path);
    checkSeo(r.seo, path);
    checkFaqs(r.faqs, path, 1);
  });

  // duplicate copy across route pages
  const introOwners = new Map<string, string>();
  const bodyOwners = new Map<string, string>();
  for (const r of data.routes) {
    const introKey = r.intro.trim().replace(/\s+/g, " ");
    const introPrior = introOwners.get(introKey);
    if (introPrior) error(`route "${r.slug}": intro identical to ${introPrior}`);
    else introOwners.set(introKey, `route "${r.slug}"`);

    const bodyKey = r.body.join("\n").trim().replace(/\s+/g, " ");
    const bodyPrior = bodyOwners.get(bodyKey);
    if (bodyPrior) error(`route "${r.slug}": body identical to ${bodyPrior}`);
    else bodyOwners.set(bodyKey, `route "${r.slug}"`);
  }

  // --- services -------------------------------------------------------------
  data.services.forEach((sv, i) => {
    const path = `services[${i}] (${sv.slug})`;
    if (!sv.name.trim()) error(`${path}: name is empty`);
    if (!sv.summary.trim()) error(`${path}: summary is empty`);
    if (!sv.features.length) error(`${path}: features is empty`);
    if (!sv.body.length || sv.body.some((p) => !p.trim()))
      error(`${path}: body must have at least one non-empty paragraph`);
    if (!sv.applicableVehicles.length) error(`${path}: applicableVehicles is empty`);
    sv.applicableVehicles.forEach((ref) => {
      if (!data.vehicles.some((x) => x.slug === ref))
        error(`${path}: applicableVehicles references unknown vehicle "${ref}"`);
    });
    if (!sv.relatedRoutes.length) error(`${path}: relatedRoutes is empty`);
    sv.relatedRoutes.forEach((ref) => {
      if (!data.routes.some((x) => x.slug === ref))
        error(`${path}: relatedRoutes references unknown route "${ref}"`);
    });
    sv.packages?.forEach((pkg, j) => {
      if (!pkg.label.trim()) error(`${path}.packages[${j}]: label is empty`);
      if (pkg.hours !== undefined && pkg.hours <= 0)
        error(`${path}.packages[${j}]: hours must be positive`);
      if (pkg.km !== undefined && pkg.km <= 0)
        error(`${path}.packages[${j}]: km must be positive`);
    });
    checkImage(sv.image, sv.imageAlt, path);
    checkSeo(sv.seo, path);
    checkFaqs(sv.faqs, path, 1);
  });

  const serviceBodyOwners = new Map<string, string>();
  for (const sv of data.services) {
    const bodyKey = sv.body.join("\n").trim().replace(/\s+/g, " ");
    const prior = serviceBodyOwners.get(bodyKey);
    if (prior) error(`service "${sv.slug}": body identical to ${prior}`);
    else serviceBodyOwners.set(bodyKey, `service "${sv.slug}"`);
  }
  for (const [key, owner] of bodyOwners) {
    if (serviceBodyOwners.has(key)) {
      error(`${owner}: body identical to ${serviceBodyOwners.get(key)}`);
    }
  }

  // --- home FAQs / attractions / testimonials -------------------------------
  checkFaqs(data.homeFaqs, "homeFaqs", 3);
  const attractionSlugs = new Set<string>();
  data.attractions.forEach((a, i) => {
    const path = `attractions[${i}] (${a.slug})`;
    if (attractionSlugs.has(a.slug)) error(`${path}: duplicate slug`);
    attractionSlugs.add(a.slug);
    if (!a.name.trim()) error(`${path}: name is empty`);
    if (!a.blurb.trim()) error(`${path}: blurb is empty`);
    if (!a.imageAlt.trim()) error(`${path}: imageAlt is empty`);
  });
  data.testimonials.forEach((t, i) => {
    const path = `testimonials[${i}]`;
    if (!t.quote.trim()) error(`${path}: quote is empty`);
    if (!t.name.trim()) error(`${path}: name is empty`);
    if (!t.trip.trim()) error(`${path}: trip is empty`);
  });
  if (data.testimonials.length === 0)
    warn("testimonials: empty — add real client quotes before launch (PRD 6.3)");

  // --- placeholder / DUMMY scan ---------------------------------------------
  const scanPlaceholders = (value: unknown, path: string) => {
    if (typeof value === "string") {
      const match = value.match(DUMMY_RE) ?? value.match(BRACKET_PLACEHOLDER_RE);
      if (match) {
        issues.push({
          level: strict ? "error" : "warning",
          message: `${path}: placeholder "${match[0]}" must be replaced before launch`,
        });
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, i) => scanPlaceholders(item, `${path}[${i}]`));
      return;
    }
    if (value && typeof value === "object") {
      for (const [key, item] of Object.entries(value)) {
        scanPlaceholders(item, `${path}.${key}`);
      }
    }
  };

  scanPlaceholders(data.site, "site");
  scanPlaceholders(data.vehicles, "vehicles");
  scanPlaceholders(data.routes, "routes");
  scanPlaceholders(data.services, "services");
  scanPlaceholders(data.homeFaqs, "homeFaqs");
  scanPlaceholders(data.testimonials, "testimonials");
  scanPlaceholders(data.policies, "policies");

  return issues;
}
