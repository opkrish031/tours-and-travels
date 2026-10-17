# TRD: Marwad Cabs — Tour and Travels Website

**Document type:** Technical Requirements Document
**Brand:** Marwad Cabs (Legal: Marwad Cabs — Tour and Travels)
**Domain:** https://marwadcabs.com
**Version:** 1.0
**Status:** Implemented
**Companion doc:** `PRD (2).md` (product requirements; read first)
**Audience:** The developer and any AI coding agent (OpenCode, Antigravity) implementing the build.

> Rule for agents: `PRD.md` defines **what** to build. This document defines **how**. If they conflict, stop and ask. Never invent business data (phone numbers, rates, reviews, stats). Use clearly marked placeholders.

---

## 1. Architecture Summary

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Rendering:** Static Site Generation (SSG) for every content page; one small server route for lead capture
- **Content/data:** A single typed data layer in the repo (no CMS, no database)
- **Booking flow:** Client form builds a prefilled WhatsApp URL and also POSTs the enquiry to a lead endpoint
- **Lead storage:** Google Sheet through an Apps Script webhook, with optional email notification
- **Hosting:** Vercel (default) or Cloudflare Pages; domain via client registrar
- **Analytics:** GA4 plus Search Console

```
Browser
  ├─ Static HTML/CSS/JS (SSG pages from Next.js)
  ├─ Booking form ──► opens wa.me link (primary)
  │               └─► POST /api/lead ──► Google Apps Script ──► Google Sheet (+ email)
  └─ Fare calculator (client-side, reads the same data file)
```

### 1.1 Why this stack
- SSG gives fast pages and fully crawlable HTML, which matters most for local SEO.
- Route and service pages are generated from one data file, so adding a route is one data entry.
- No database or CMS means low cost, low maintenance and nothing to break.
- The lead endpoint is separate from page rendering, so pages stay up if the backend fails.

### 1.2 Out of scope technically
Payments, auth, database, admin panel, CMS, i18n, blog, real-time tracking. Do not scaffold for them.

---

## 2. Tech Stack and Versions

| Layer | Choice | Notes |
|---|---|---|
| Runtime | Node.js LTS (20 or 22) | pin in `.nvmrc` and `engines` |
| Framework | Next.js (latest stable, App Router) | check current version at project start |
| Language | TypeScript (strict) | `"strict": true` |
| Styling | Tailwind CSS | design tokens in config / CSS variables |
| Forms | React Hook Form + Zod | validation shared between client and API |
| Animation (optional, P2) | CSS first; Framer Motion or GSAP only if needed | never block LCP; respect `prefers-reduced-motion` |
| Icons | `lucide-react` or inline SVG | tree-shaken |
| Fonts | `next/font` (self-hosted) | max 2 families |
| Images | `next/image` | AVIF/WebP, explicit dimensions |
| Linting | ESLint + Prettier | run in CI |
| Package manager | pnpm (or npm) | commit the lockfile |
| Analytics | GA4 via `next/script` (`afterInteractive`) | load only after consent rules decided |

Agent instruction: before installing, check the latest stable versions and confirm compatibility. Do not use deprecated APIs (for example the old `pages/` router).

---

## 3. Repository Structure

```
/
├─ app/
│  ├─ layout.tsx                 # root layout, fonts, global metadata, JSON-LD (business)
│  ├─ page.tsx                   # Home
│  ├─ about/page.tsx
│  ├─ contact/page.tsx
│  ├─ taxi-fare/page.tsx
│  ├─ [service]/page.tsx         # service pages (SSG via generateStaticParams)
│  ├─ [route]/page.tsx           # route pages (see 3.1 on routing conflict)
│  ├─ [vehicle]/page.tsx         # fleet pages
│  ├─ privacy-policy/page.tsx
│  ├─ terms-and-conditions/page.tsx
│  ├─ refund-policy/page.tsx
│  ├─ api/lead/route.ts          # lead capture endpoint
│  ├─ not-found.tsx
│  ├─ sitemap.ts
│  ├─ robots.ts
│  └─ opengraph-image.tsx        # optional dynamic OG
├─ components/
│  ├─ layout/ (Header, Footer, MobileNav, StickyActionBar, Breadcrumbs)
│  ├─ home/ (Hero, TrustStrip, WhyUs, ServicesGrid, FleetGrid, RoutesGrid, HowItWorks, Testimonials, Spots, ComparisonTable, CTA)
│  ├─ booking/ (BookingForm, FareCalculator, WhatsAppButton, CallButton)
│  ├─ seo/ (JsonLd, FaqSection)
│  └─ ui/ (Button, Card, Accordion, Table, Section, Container, Badge)
├─ data/
│  ├─ site.ts                    # brand, phone, whatsapp, email, address, socials, hours
│  ├─ vehicles.ts
│  ├─ routes.ts
│  ├─ services.ts
│  ├─ faqs.ts
│  ├─ testimonials.ts            # empty array hides section
│  └─ attractions.ts
├─ lib/
│  ├─ fare.ts                    # fare calculation (pure, unit-tested)
│  ├─ whatsapp.ts                # message builders and wa.me URL
│  ├─ seo.ts                     # metadata + JSON-LD builders
│  ├─ validation.ts              # Zod schemas
│  └─ analytics.ts               # event helpers
├─ public/
│  ├─ images/ (optimised fleet/route images)
│  └─ favicon, manifest
├─ tests/                        # unit tests (fare, whatsapp, seo builders)
├─ .env.example
├─ AGENTS.md                     # agent rules (see section 14)
├─ next.config.ts
├─ tailwind config / globals.css
└─ README.md
```

### 3.1 Routing: avoiding dynamic-segment conflicts
Three top-level dynamic segments (`[service]`, `[route]`, `[vehicle]`) cannot coexist at the same level. Use one of these approaches (recommended: **A**):

- **A (recommended): single catch-all resolver.** One `app/[slug]/page.tsx` that looks up the slug in `services`, `routes` and `vehicles` data and renders the matching template; `generateStaticParams` returns the union of all slugs; unknown slugs call `notFound()`. Slugs must be unique across all three collections (enforced by a build-time check).
- **B: explicit static folders** per page (more files, no resolver).

Keep the **flat URLs** from the PRD (for example `/jodhpur-to-jaipur-taxi`) because they match the keyword structure of competitors.

---

## 4. Data Layer (single source of truth)

All business data lives in `/data`. Components never hardcode phone numbers, rates or distances.

### 4.1 `data/site.ts`
```ts
export const site = {
  brandName: "[BRAND_NAME]",
  legalName: "[LEGAL_NAME]",
  domain: "https://[DOMAIN]",
  phone: "+91XXXXXXXXXX",          // E.164, used for tel:
  phoneDisplay: "+91 XXXXX XXXXX",
  whatsapp: "91XXXXXXXXXX",        // digits only, for wa.me
  email: "[EMAIL]",
  address: {
    street: "[STREET]", locality: "Jodhpur", region: "Rajasthan",
    postalCode: "[PINCODE]", country: "IN",
  },
  geo: { lat: 0, lng: 0 },         // set from client address
  hours: "24x7",
  socials: { facebook: "", instagram: "", youtube: "", googleBusiness: "" },
  cancellationWindowHours: 6,      // confirm with client
} as const;
```

### 4.2 `data/vehicles.ts`
```ts
export type Vehicle = {
  slug: string;                 // e.g. "innova-crysta-jodhpur"
  name: string;                 // "Innova Crysta"
  category: "sedan" | "suv" | "mpv" | "tempo" | "luxury";
  models: string[];             // ["Dzire", "Etios"]
  seats: string;                // "6-7"
  luggage: string;
  perKm: number;                // INR, one-way/standard rate
  dailyKmLimit: number;         // e.g. 300
  comfort: string;
  idealFor: string[];
  image: string;                // path under /public/images
  imageAlt: string;
  popular?: boolean;
  seo: { title: string; description: string };
  faqs: { q: string; a: string }[];
};
```

### 4.3 `data/routes.ts`
```ts
export type Route = {
  slug: string;                 // "jodhpur-to-jaipur-taxi"
  from: string;                 // "Jodhpur"
  to: string;                   // "Jaipur"
  distanceKm: number;
  durationHours: number;
  tagline: string;              // "Pink City"
  startingFare: number;         // derived or set; INR (sedan, one-way)
  highlights: string[];         // sights/stops
  intro: string;                // UNIQUE copy
  body: string[];               // UNIQUE paragraphs
  image: string; imageAlt: string;
  relatedRoutes: string[];      // slugs
  seo: { title: string; description: string };
  faqs: { q: string; a: string }[];
};
```

### 4.4 `data/services.ts`
```ts
export type Service = {
  slug: string;                 // "airport-taxi-jodhpur"
  name: string;
  summary: string;
  features: string[];
  packages?: { label: string; hours?: number; km?: number }[];
  applicableVehicles: string[]; // vehicle slugs
  relatedRoutes: string[];
  body: string[];               // UNIQUE copy
  image: string; imageAlt: string;
  seo: { title: string; description: string };
  faqs: { q: string; a: string }[];
};
```

### 4.5 Build-time validation
A script (`scripts/validate-data.ts`) runs before build and fails if:
- any slug is duplicated across vehicles, routes, services or static pages
- any `relatedRoutes` or `applicableVehicles` reference does not exist
- any `seo.title` exceeds 60 chars or `seo.description` is outside 120 to 160 chars
- two pages share identical `intro` or `body` text
- any required placeholder (`[...]`) remains in production builds (`NODE_ENV=production`)

---

## 5. Core Modules

### 5.1 Fare calculation (`lib/fare.ts`)
Pure functions, fully unit-tested.

```ts
type TripType = "one-way" | "round-trip";

export function estimateFare(opts: {
  distanceKm: number;
  perKm: number;
  tripType: TripType;
  days?: number;               // round trip
}): { total: number; billedKm: number; breakdown: string };
```

Rules (**confirm with client before finalising; see PRD open question 2**):
- One-way: `billedKm = distanceKm` (or a configured minimum), `total = billedKm × perKm`.
- Round trip: `billedKm = max(distanceKm × 2, minKmPerDay × days)`.
- Round to the nearest ₹10 for display, or per client preference.
- Always return a human-readable breakdown string used in the UI and the WhatsApp message.
- Never hardcode rules inside components; keep them in `lib/fare.ts` plus constants in data.

Tests must cover: every route × vehicle combination returns a positive number, rounding, round trip minimums, zero and negative inputs rejected.

### 5.2 WhatsApp helper (`lib/whatsapp.ts`)
```ts
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function bookingMessage(data: BookingData): string { /* template from PRD 5.1 */ }
export function contextMessage(context: string): string { /* e.g. route/service/vehicle */ }
```
- Always `encodeURIComponent` the full message.
- Strip control characters from user-provided fields.
- Cap each field length (for example 120 chars) to keep URLs safe.

### 5.3 Booking form (`components/booking/BookingForm.tsx`)
- Client component using React Hook Form + Zod (`lib/validation.ts` shared with the API).
- Fields per PRD 5.1.
- Submit handler order:
  1. Validate.
  2. Fire-and-forget `fetch("/api/lead", { method: "POST", keepalive: true })` with a short timeout; ignore failure.
  3. Fire analytics event `form_submit`.
  4. Open the WhatsApp URL immediately. On mobile use `window.location.href`; on desktop `window.open(url, "_blank", "noopener")`. Do this synchronously in the click handler to avoid popup blockers.
- The WhatsApp redirect must never wait on the network request.
- Include a honeypot field for spam.
- Date input: `min` set to the current date/time; reject past values.

### 5.4 Fare calculator component
- Client component; reads vehicles and routes from the data layer (imported at build, small payload).
- Inputs per PRD 5.2; outputs from `lib/fare.ts`.
- "Book this fare" button builds a WhatsApp message including route, vehicle, estimate and disclaimer.
- Accessible: labelled controls, `aria-live="polite"` on the result.

### 5.5 Lead API (`app/api/lead/route.ts`)
- `POST` only, JSON body, validated with the same Zod schema.
- Reject if honeypot filled, body too large (>5 KB), or origin not allowed.
- Basic rate limiting (see section 9).
- Forward the payload to the Google Apps Script web app URL (`LEAD_WEBHOOK_URL`) which appends a row to a Google Sheet with timestamp, source page and fields. Optional: Apps Script also emails the client.
- Return `200 { ok: true }` on success; `4xx/5xx` with generic error messages (no internals).
- Never log full personal data in production logs.
- If `LEAD_WEBHOOK_URL` is missing in development, log a warning and return `ok`.

**Sheet columns:** `timestamp, name, phone, pickup, drop, datetime, vehicle, tripType, sourcePage, userAgentShort`.

### 5.6 Analytics (`lib/analytics.ts`)
Event helper wrapping `gtag`. Events:
- `call_click` (location: header, sticky bar, page CTA)
- `whatsapp_click` (location, page)
- `form_submit` (page)
- `calculator_use` (route, vehicle)
- `calculator_book_click`

Attach via small client wrappers on `CallButton` and `WhatsAppButton`, not scattered handlers.

---

## 6. Page Rendering and Components

### 6.1 Rendering strategy
- All content pages: **SSG** (`generateStaticParams` + static metadata). No client-side data fetching for content.
- Client components only for: booking form, fare calculator, mobile nav, accordion (or use native `<details>`), sticky bar, animations.
- Keep client bundle minimal; avoid large UI libraries.

### 6.2 Templates
| Template | Data | Pages |
|---|---|---|
| `HomePage` | all | `/` |
| `ServiceTemplate` | `services`, `vehicles`, `routes` | 5 service pages |
| `RouteTemplate` | `routes`, `vehicles` | 8 to 10 route pages |
| `VehicleTemplate` | `vehicles`, `routes` | 4 to 6 fleet pages |
| `FarePage` | `vehicles`, `routes` | `/taxi-fare` |
| Static pages | none | about, contact, legal |

### 6.3 Layout components
- **Header:** logo, desktop nav with dropdowns (services, fleet, routes), call and WhatsApp buttons. Dropdowns must be keyboard accessible.
- **StickyActionBar (mobile only):** fixed bottom, Call | WhatsApp | Book; respects `env(safe-area-inset-bottom)`; add bottom padding to the page so it never covers content or the footer.
- **Footer:** link columns generated from data (services, routes, fleet), contact info from `site.ts`, legal links, short keyword text.
- **Breadcrumbs:** generated from page type; emit `BreadcrumbList` JSON-LD.

### 6.4 Design tokens
Define in CSS variables / Tailwind theme: colors (background, surface, text, muted, primary, accent, success, danger), radii, shadows, spacing scale, font families, container width. Dark mode is **not** required.

---

## 7. SEO Technical Specification

### 7.1 Metadata
- Use the Next.js Metadata API. Each page exports `generateMetadata` using its data entry.
- `metadataBase` set to `site.domain`.
- Title pattern: `{Primary Keyword} | {Brand}` (max 60 chars).
- Description 140 to 160 chars, includes keyword and a call to action.
- Canonical URL on every page (no trailing slash inconsistency; pick one and enforce via `trailingSlash` config).
- Open Graph and Twitter card tags; default OG image plus per-route images if available.
- `robots` meta: `index, follow` on content pages; `noindex` on 404 and thank-you states.

### 7.2 Structured data (JSON-LD)
Use a `<JsonLd>` component that renders `application/ld+json` with `JSON.stringify`.

| Page | Schema |
|---|---|
| Root layout | `Organization` / `LocalBusiness` (type `TaxiService` where applicable) with name, url, telephone, address, geo, openingHours, sameAs |
| Service pages | `Service` (provider = business, areaServed) |
| Route pages | `Service` plus `BreadcrumbList`; optional `Offer` using starting fare |
| Fleet pages | `Service` or `Product`-like description; avoid fake ratings |
| Pages with FAQ | `FAQPage` generated from the page's `faqs` |
| All inner pages | `BreadcrumbList` |

**Do not** add `AggregateRating` or `Review` schema unless real, verifiable reviews exist. Fake rating markup risks a manual action.

### 7.3 Sitemap and robots
- `app/sitemap.ts` generates URLs from all data collections plus static pages, with `lastModified` and sensible `priority`.
- `app/robots.ts` allows all, points to the sitemap, disallows `/api/`.

### 7.4 On-page rules (enforced by a lint script where possible)
- Exactly one `<h1>` per page.
- Heading levels never skip.
- Every `<img>` has non-empty `alt`.
- Internal links use descriptive anchor text (for example "Jodhpur to Jaipur taxi", not "click here").
- Each route page links to 2 to 3 related routes and at least 2 vehicles; each service page links to its relevant routes.

### 7.5 Redirects and URL hygiene
- Force HTTPS and a single canonical host (www or non-www).
- Redirect legacy or alternate URLs through `next.config.ts` `redirects()` if the client has an old site.

---

## 8. Performance Requirements and Techniques

Targets: Lighthouse mobile 90+, LCP under 2.5 s, CLS under 0.1, INP under 200 ms.

- Hero image uses `next/image` with `priority`, correct `sizes`, AVIF/WebP.
- Every image has width/height or `fill` with a sized container to prevent layout shift.
- Lazy-load below-the-fold images and heavy sections.
- Self-host fonts via `next/font`; use `display: swap`; subset Latin; maximum 2 families, 3 to 4 weights total.
- Defer third-party scripts (GA4) with `next/script` strategy `afterInteractive` or `lazyOnload`.
- Keep animation libraries off the critical path; dynamic import if used (`next/dynamic`).
- Optimise image sources before commit (target under 150 KB for large images).
- Avoid layout-shifting elements (sticky bar reserves space).
- Run `next build` and review the bundle analysis; no page above about 150 KB first-load JS if achievable.
- Cache headers: rely on the platform defaults for static assets; set long-lived immutable cache for `/images` and fonts.

---

## 9. Security and Abuse Prevention

- HTTPS everywhere; HSTS enabled by the host.
- Security headers in `next.config.ts` `headers()`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` (or CSP `frame-ancestors`), `Permissions-Policy` restricting camera, microphone and geolocation. Add a Content-Security-Policy that allows only required origins (self, GA, Google Maps embed, wa.me navigation).
- Lead API:
  - Validate and sanitise with Zod; reject unknown fields.
  - Honeypot field plus a minimum time-to-submit check.
  - Rate limit per IP (for example 5 requests per minute) using an in-memory or platform-provided limiter; document its limits on serverless platforms.
  - Verify `Origin` / `Referer` matches the site domain.
  - Keep the webhook URL in an environment variable; never expose it to the client.
- No secrets in the repository; `.env.example` lists variable names only.
- Escape or encode all user input used in messages; React escaping covers rendering, but encode URLs explicitly.
- Do not store more personal data than needed; respect the privacy policy.

### 9.1 Environment variables (`.env.example`)
```
NEXT_PUBLIC_SITE_URL=https://marwadcabs.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
LEAD_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
LEAD_WEBHOOK_SECRET=change-me
```

---

## 10. Accessibility Implementation

- Semantic landmarks: `header`, `nav`, `main`, `footer`.
- Skip-to-content link as the first focusable element.
- All interactive elements reachable by keyboard; visible `:focus-visible` styles.
- Form fields have `<label>`s, `aria-invalid` and `aria-describedby` for errors.
- Accordions use `<button aria-expanded aria-controls>` or native `<details>`.
- Color contrast AA for all text and interactive states.
- Tables have `<caption>` or `aria-label`, `<th scope>`.
- Respect `prefers-reduced-motion` for all animation.
- Automated checks: `eslint-plugin-jsx-a11y`; manual pass with Lighthouse and keyboard navigation.

---

## 11. Testing Strategy

| Type | Tool | Scope |
|---|---|---|
| Unit | Vitest | `lib/fare.ts`, `lib/whatsapp.ts`, `lib/seo.ts`, `lib/validation.ts` |
| Data validation | custom script | slugs, references, meta lengths, duplicate copy, placeholders |
| Component | React Testing Library (optional) | BookingForm validation, FareCalculator output |
| E2E (smoke) | Playwright | booking form opens WhatsApp URL; calculator result; nav links; 404 |
| Lighthouse | Lighthouse CI or manual | Home, one service, one route, one fleet page |
| Schema | Google Rich Results Test | Home, route page, FAQ page |
| Manual device | real Android + iOS | forms, sticky bar, tap targets, WhatsApp deep link |

Minimum bar before launch: unit tests green, data validation green, `next build` clean, `tsc --noEmit` clean, ESLint clean.

---

## 12. Build, CI and Deployment

### 12.1 Scripts (`package.json`)
```
dev, build, start, lint, typecheck, test, validate-data, e2e
build = validate-data && next build
```

### 12.2 CI (GitHub Actions or host-native)
On pull request: install, `lint`, `typecheck`, `test`, `validate-data`, `build`.

### 12.3 Hosting
- **Default:** Vercel. Connect the GitHub repo; set environment variables; production branch `main`; preview deployments per PR.
- **Alternative:** Cloudflare Pages (check Next.js adapter requirements and that the `/api/lead` route runtime is supported).
- Confirm the hosting plan terms allow a commercial client site. If not, use a plan that does.

### 12.4 Domain and DNS
- Client owns the domain; add DNS records as instructed by the host.
- Pick one canonical host and redirect the other.
- Verify the domain in Google Search Console; submit the sitemap.

### 12.5 Launch checklist
- [ ] Environment variables set in production
- [ ] Lead webhook tested end to end (row appears in the Sheet)
- [ ] All `[PLACEHOLDER]` values replaced (build fails otherwise)
- [ ] Sitemap and robots reachable
- [ ] Rich Results Test passed
- [ ] GA4 events verified in realtime view
- [ ] Lighthouse mobile 90+ on key pages
- [ ] 404 page, legal pages, favicon, OG image present
- [ ] Redirects and canonical host verified
- [ ] Google Business Profile links to the new site

---

## 13. Implementation Plan (task breakdown for agents)

Work in this order. Complete and verify each task before starting the next. Each task ends with `lint`, `typecheck`, `test` passing.

**Task 1: Project setup**
Scaffold Next.js (App Router, TypeScript, Tailwind), ESLint, Prettier, Vitest, `.nvmrc`, `.env.example`, folder structure from section 3.
*Done when:* `pnpm dev` runs and `pnpm build` passes on an empty home page.

**Task 2: Design system and layout**
Tokens, fonts, `Container`, `Section`, `Button`, `Card`, `Accordion`, `Table`, Header, Footer, MobileNav, StickyActionBar, Breadcrumbs.
*Done when:* layout renders responsively at 375, 768 and 1280 px; keyboard nav works.

**Task 3: Data layer and validation**
Types and placeholder data for `site`, `vehicles`, `routes`, `services`, `faqs`; `scripts/validate-data.ts`.
*Done when:* validation script passes and fails correctly on seeded errors.

**Task 4: Core libs**
`lib/fare.ts`, `lib/whatsapp.ts`, `lib/validation.ts`, `lib/seo.ts`, `lib/analytics.ts` with unit tests.
*Done when:* all unit tests pass, including every route × vehicle fare case.

**Task 5: Booking form and lead API**
`BookingForm`, `/api/lead`, honeypot, rate limit, Apps Script webhook integration.
*Done when:* submit opens a correct WhatsApp URL and writes a Sheet row; the form still redirects if the API is down.

**Task 6: Fare calculator**
Component plus `/taxi-fare` page.
*Done when:* output matches `lib/fare.ts`; "Book this fare" sends a correct message.

**Task 7: Home page**
All sections from PRD 5.4, wired to data.
*Done when:* Lighthouse mobile 90+ on Home.

**Task 8: Templates and pages**
Resolver (`[slug]`), `ServiceTemplate`, `RouteTemplate`, `VehicleTemplate`; About, Contact, legal pages, 404.
*Done when:* every page in PRD 4.1 renders from data; unique metadata on each.

**Task 9: SEO layer**
`generateMetadata`, JSON-LD, sitemap, robots, canonical, OG images, breadcrumbs, internal linking.
*Done when:* Rich Results Test passes; sitemap lists all pages.

**Task 10: Content pass**
Replace placeholder content with final client content and unique copy.
*Done when:* validation passes in production mode (no placeholders left).

**Task 11: QA and hardening**
Security headers, a11y pass, Playwright smoke tests, cross-device checks, bundle review.
*Done when:* launch checklist 12.5 is complete.

**Task 12: Deploy**
Connect repo to host, set env vars, attach domain, submit sitemap.
*Done when:* production site live with analytics working.

---

## 14. Agent Operating Rules (`AGENTS.md` content)

Copy the following into `AGENTS.md` at the repo root so OpenCode and Antigravity follow the same rules.

```md
# Agent Rules

## Source of truth
- Read PRD.md and TRD.md before changing anything.
- If requirements conflict or are missing, ask. Do not guess business facts.

## Hard rules
- Never invent phone numbers, rates, distances, reviews, ratings, stats or addresses. Use [PLACEHOLDER] values.
- Never add AggregateRating/Review schema without real reviews.
- Do not add features outside PRD scope (no payments, auth, CMS, blog, i18n, admin).
- All business data lives in /data. No hardcoded contact details or rates in components.
- Keep client components minimal. Default to server components and SSG.
- No heavy dependencies without justification; prefer CSS over JS animation.
- Do not commit secrets. Use .env and keep .env.example updated.

## Quality gates (must pass before a task is "done")
- pnpm lint, pnpm typecheck, pnpm test, pnpm validate-data, pnpm build
- Accessibility: labels, alt text, focus states, contrast
- One H1 per page; unique title and description per page

## Workflow
- Work through the TRD section 13 tasks in order, one at a time.
- After each task, summarise what changed and what to verify.
- Keep commits small with clear messages.
- If a library API is uncertain, check current docs rather than relying on memory.
```

---

## 15. Technical Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Dynamic route conflicts (`[service]`, `[route]`, `[vehicle]`) | Single resolver with unique-slug validation (section 3.1) |
| Lead webhook fails or is spam-flooded | WhatsApp flow independent of API; honeypot, rate limit, origin check |
| Serverless rate limiting is not shared across instances | Treat as best-effort; honeypot and webhook secret as additional layers; consider a platform rate-limit feature |
| Duplicate content across route pages | Build-time duplicate-copy check; unique copy per route |
| Fare calculator disputes | "Estimate" label, disclaimer, confirmation on WhatsApp |
| Performance regressions from images or animation | Image budget, Lighthouse in CI, animation libraries lazy-loaded |
| Placeholder data shipped to production | Production build fails on any remaining `[PLACEHOLDER]` |
| Framework version drift or API changes | Pin versions; check current docs when starting; avoid deprecated APIs |

## 16. Open Technical Questions
1. Final round-trip fare formula (minimum km per day, return distance, night/waiting charges).
2. Host choice (Vercel vs Cloudflare Pages) and whether the client's plan permits commercial use.
3. Lead notification: Sheet only, or Sheet plus email (and to which address)?
4. Cookie consent requirement for GA4 given the client's audience (decide with the privacy policy).
5. Whether a trailing slash or no trailing slash is preferred for canonical URLs (default: no trailing slash).
6. Whether to include a map embed (adds weight; load lazily on interaction if used).
