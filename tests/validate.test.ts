import { describe, expect, it } from "vitest";
import { attractions } from "@/data/attractions";
import { homeFaqs } from "@/data/faqs";
import { policies } from "@/data/policies";
import { routes } from "@/data/routes";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { vehicles } from "@/data/vehicles";
import { validateData, type DataBundle } from "@/lib/validate";

const real: DataBundle = {
  site,
  vehicles,
  routes,
  services,
  homeFaqs,
  attractions,
  testimonials,
  policies,
};

function seeded(): DataBundle {
  return structuredClone(real);
}

function messages(bundle: DataBundle, strict = false): string[] {
  return validateData(bundle, { strict })
    .filter((issue) => issue.level === "error")
    .map((issue) => issue.message);
}

const DESC = "x".repeat(130);
const TITLE = "Unique page title here";

function cleanBundle(): DataBundle {
  return {
    site: {
      ...site,
      legalName: "Clean Cabs Pvt Ltd",
      address: { ...site.address, street: "1 Rose Road", postalCode: "342001" },
    },
    vehicles: [
      {
        slug: "clean-sedan",
        name: "Clean Sedan",
        category: "sedan",
        models: ["Dzire"],
        seats: "4",
        luggage: "2 bags",
        perKm: 10,
        dailyKmLimit: 250,
        comfort: "Comfortable sedan.",
        idealFor: ["City trips"],
        image: "/images/vehicles/clean-sedan.jpg",
        imageAlt: "A sedan",
        seo: { title: `${TITLE} sedan`, description: DESC },
        faqs: [{ q: "Q1?", a: "A1." }],
      },
    ],
    routes: [
      {
        slug: "clean-route-one",
        from: "A",
        to: "B",
        distanceKm: 100,
        durationHours: 2,
        tagline: "Town",
        startingFare: 1200,
        highlights: ["Spot"],
        intro: "Intro for clean route one.",
        body: ["Body one for clean route one.", "Body two for clean route one."],
        image: "/images/routes/clean-route-one.jpg",
        imageAlt: "Road",
        relatedRoutes: ["clean-route-two"],
        seo: { title: `${TITLE} route one`, description: DESC },
        faqs: [{ q: "Q2?", a: "A2." }],
      },
      {
        slug: "clean-route-two",
        from: "B",
        to: "C",
        distanceKm: 150,
        durationHours: 3,
        tagline: "Hills",
        startingFare: 1800,
        highlights: ["Hill"],
        intro: "Intro for clean route two.",
        body: ["Body one for clean route two.", "Body two for clean route two."],
        image: "/images/routes/clean-route-two.jpg",
        imageAlt: "Hill road",
        relatedRoutes: ["clean-route-one"],
        seo: { title: `${TITLE} route two`, description: DESC },
        faqs: [{ q: "Q4?", a: "A4." }],
      },
    ],
    services: [
      {
        slug: "clean-service",
        name: "Clean Service",
        summary: "A service.",
        features: ["Feature"],
        applicableVehicles: ["clean-sedan"],
        relatedRoutes: ["clean-route-one"],
        body: ["Service body one.", "Service body two."],
        image: "/images/services/clean-service.jpg",
        imageAlt: "Service",
        seo: { title: `${TITLE} service`, description: DESC },
        faqs: [{ q: "Q3?", a: "A3." }],
      },
    ],
    homeFaqs: [
      { q: "Home Q1?", a: "Home A1." },
      { q: "Home Q2?", a: "Home A2." },
      { q: "Home Q3?", a: "Home A3." },
    ],
    attractions: [],
    testimonials: [
      { quote: "Great ride.", name: "A. Kumar", trip: "Jodhpur to Jaipur" },
    ],
    policies: {
      fareIncludes: ["Car, driver, and fuel for the planned kilometres"],
      fareExcludes: ["Tolls and state entry tax, as per actual receipts"],
      cancellationPolicy: "Free cancellation up to 6 hours before the pickup time.",
    },
  };
}

describe("validateData", () => {
  it("passes on the real dataset in dev mode", () => {
    expect(messages(real)).toEqual([]);
  });

  it("passes on the real dataset in strict mode with production client data", () => {
    const strictErrors = messages(real, true);
    expect(strictErrors).toEqual([]);
  });

  it("accepts a fully clean dataset in strict mode", () => {
    expect(messages(cleanBundle(), true)).toEqual([]);
  });

  it("flags duplicate slugs across collections", () => {
    const bundle = seeded();
    bundle.routes[1].slug = bundle.routes[0].slug;
    expect(messages(bundle).join("\n")).toMatch(/duplicates/);
  });

  it("flags slugs that shadow static pages", () => {
    const bundle = seeded();
    bundle.vehicles[0].slug = "about";
    expect(messages(bundle).join("\n")).toMatch(/shadows a static page/);
  });

  it("flags unknown relatedRoutes and applicableVehicles references", () => {
    const bundle = seeded();
    bundle.routes[0].relatedRoutes = ["no-such-route"];
    bundle.services[0].applicableVehicles = ["no-such-vehicle"];
    const out = messages(bundle).join("\n");
    expect(out).toMatch(/unknown route "no-such-route"/);
    expect(out).toMatch(/unknown vehicle "no-such-vehicle"/);
  });

  it("flags out-of-range seo titles and descriptions", () => {
    const bundle = seeded();
    bundle.routes[0].seo.title = `${bundle.routes[0].seo.title} extra padding to exceed sixty`;
    bundle.services[0].seo.description = "too short";
    const out = messages(bundle).join("\n");
    expect(out).toMatch(/seo\.title must be 1–60/);
    expect(out).toMatch(/seo\.description must be 120–160/);
  });

  it("flags identical intro or body text shared by two pages", () => {
    const bundle = seeded();
    bundle.routes[1].intro = bundle.routes[0].intro;
    bundle.services[1].body = [...bundle.services[0].body];
    const out = messages(bundle).join("\n");
    expect(out).toMatch(/intro identical/);
    expect(out).toMatch(/body identical/);
  });

  it("flags malformed contact details", () => {
    const bundle = seeded();
    bundle.site = { ...bundle.site, phone: "00000", whatsapp: "abc" };
    const out = messages(bundle).join("\n");
    expect(out).toMatch(/site\.phone/);
    expect(out).toMatch(/site\.whatsapp/);
  });

  it("reports DUMMY markers as warnings in dev and errors in strict", () => {
    const dummyBundle = {
      ...seeded(),
      site: { ...site, address: { ...site.address, street: "Dummy Street" } },
    };
    const dev = validateData(dummyBundle);
    const strict = validateData(dummyBundle, { strict: true });
    expect(dev.some((i) => i.level === "warning" && /DUMMY/i.test(i.message))).toBe(true);
    expect(strict.some((i) => i.level === "error" && /DUMMY/i.test(i.message))).toBe(true);
  });
});
