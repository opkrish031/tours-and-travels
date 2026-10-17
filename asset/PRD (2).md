# PRD: Marwad Cabs — Tour and Travels Website

**Document type:** Product Requirements Document
**Brand:** Marwad Cabs (Legal: Marwad Cabs — Tour and Travels)
**Domain:** https://marwadcabs.com
**Version:** 1.0
**Status:** Implemented
**Companion doc:** `TRD (2).md` (technical implementation)

> Placeholders in `[SQUARE_BRACKETS]` are values the client must supply before launch. Do not invent them. Sample numbers in this document (rates, distances) are illustrative and come from competitor reference sites; replace with the client's real data.

---

## 1. Overview

### 1.1 Product summary
A fast, mobile-first, SEO-driven website for a taxi / cab hire business based in Jodhpur, Rajasthan. The site presents the client's services, fleet, routes and rates, and converts visitors into booking enquiries through **WhatsApp and phone call**. It is a lead-generation site, not an online booking or payment platform.

### 1.2 Reference sites
- `jodhpurtaxiservices.com`: simple one-page template with booking form, fleet cards, packages.
- `jodhpurcabhire.in`: stronger reference. WordPress/Elementor site with a WhatsApp-redirect booking form, instant fare calculator, dedicated service pages, dedicated route pages, fleet comparison table, FAQ, testimonials and a "why us vs other taxis" comparison.

The target is to match the **structure and SEO depth** of the second reference, with better performance, cleaner design and stronger on-page SEO.

### 1.3 Business context
- Traffic comes mainly from Google searches such as "taxi in Jodhpur", "Jodhpur to Jaipur taxi", "Jodhpur airport taxi", "Innova Crysta on rent Jodhpur".
- Conversion happens on call or WhatsApp, usually from a mobile phone.
- Competitors are template or WordPress sites. A fast, well-structured site with strong local SEO is the competitive edge.

### 1.4 Goals
1. Rank locally for service and route keywords through a dedicated landing page for each.
2. Make it possible to start a booking (WhatsApp or call) in one tap from anywhere on the site.
3. Build trust through real fleet photos, transparent pricing, clear policies and real reviews.
4. Let the client add or change routes and rates with minimal developer effort.
5. Score 90+ on Lighthouse mobile (Performance, SEO, Accessibility, Best Practices).

### 1.5 Non-goals (explicitly out of scope)
- Online payments or payment gateway
- User accounts, login, booking history
- Driver app, dispatch system, live cab tracking
- Admin panel or CMS
- Blog
- Hindi or other language versions
- Add-on features of any kind beyond this document

---

## 2. Target Users

| Persona | Description | Main need |
|---|---|---|
| **Tourist (domestic)** | Family or couple visiting Rajasthan, often arriving by train or flight | Trusted driver, clear per-km pricing, multi-day tour cabs |
| **Tourist (international)** | Visitor planning Jodhpur, Jaisalmer, Udaipur circuit | English content, trust signals, easy WhatsApp contact |
| **Outstation traveller** | Needs one-way or round trip to Jaipur, Udaipur, Ajmer and so on | Quick fare estimate, one-way pricing |
| **Airport / station transfer** | Arriving at Jodhpur Airport or Railway Station | Punctual pickup, fixed rate |
| **Corporate / event** | Businesses, weddings, groups | GST invoice, premium vehicles, Tempo Traveller |

Primary device: **mobile (about 80% or more expected)**. Primary action: **WhatsApp or call**.

---

## 3. Success Metrics

| Metric | Target |
|---|---|
| Lighthouse mobile (all four categories) | 90+ |
| LCP (mobile, 4G) | under 2.5 s |
| CLS | under 0.1 |
| INP | under 200 ms |
| Enquiry conversion (WhatsApp, call or form submit per session) | track from launch; baseline then improve |
| Indexed pages | 100% of sitemap URLs indexed within 4 weeks |
| Local keyword ranking | tracked post-launch (SEO is a separate ongoing service) |

---

## 4. Scope: Pages and Information Architecture

### 4.1 Page inventory

**Core**
- `/` Home
- `/about`
- `/contact`
- `/taxi-fare` Fare chart / rate page (includes calculator and rate table)

**Service pages (5)**
- `/local-taxi-jodhpur` Local sightseeing (8 hr / 80 km and 12 hr / 120 km packages)
- `/airport-taxi-jodhpur`
- `/one-way-taxi-jodhpur`
- `/round-trip-taxi-jodhpur`
- `/outstation-taxi-jodhpur`

**Route pages (8 to 10, final list from client)**
- `/jodhpur-to-jaipur-taxi`
- `/jodhpur-to-jaisalmer-taxi`
- `/jodhpur-to-udaipur-taxi`
- `/jodhpur-to-mount-abu-taxi`
- `/jodhpur-to-pushkar-taxi`
- `/jodhpur-to-ajmer-taxi`
- `/jodhpur-to-bikaner-taxi`
- `/jodhpur-to-ranakpur-taxi`
- `/jodhpur-to-osian-taxi`
- (optional, client decides) Pali, Jalore, Barmer

**Fleet pages**
- `/sedan-taxi-jodhpur`
- `/suv-taxi-jodhpur`
- `/innova-crysta-jodhpur`
- `/tempo-traveller-jodhpur`
- Only if the client offers them: `/toyota-hycross-jodhpur`, `/urbaniya-tempo-jodhpur`

**Legal**
- `/privacy-policy`, `/terms-and-conditions`, `/refund-policy`

**System**
- `/sitemap.xml`, `/robots.txt`, custom 404 page

### 4.2 Navigation
- **Header:** Logo, Home, Services (dropdown), Fleet (dropdown), Routes (dropdown), About, Contact; persistent "Call" and "WhatsApp" buttons.
- **Mobile header:** Logo plus hamburger; call and WhatsApp remain visible.
- **Sticky mobile action bar (bottom):** Call | WhatsApp | Book. Always visible on mobile.
- **Footer:** Company links, services, popular routes, fleet, contact info, address, legal links, short SEO text block.
- **Breadcrumbs** on all inner pages.

---

## 5. Functional Requirements

Priority key: **P0** = must ship, **P1** = should ship, **P2** = nice to have.

### 5.1 Booking enquiry form (P0)
**Location:** Home hero, service pages, route pages, fleet pages, contact page.
**Fields:**
- Pickup location (text, required)
- Drop location (text, required)
- Pickup date and time (required, cannot be in the past)
- Vehicle (select, from fleet list, required)
- Name (optional on hero form, required on contact form)
- Phone (required if the contact-page form is used)

**Behaviour:**
1. Client-side validation with clear inline errors.
2. On submit, build a prefilled WhatsApp message containing all fields and open `https://wa.me/[WHATSAPP_NUMBER]?text=...` (new tab on desktop, same tab on mobile).
3. In parallel, send the enquiry to the backend lead endpoint (see TRD) so every enquiry is saved even if the user never sends the WhatsApp message. The WhatsApp redirect must never be blocked by a backend failure.
4. Show a short confirmation state after submit.

**WhatsApp message format (example):**
```
Hi [BRAND], I want to book a taxi.
Pickup: <pickup>
Drop: <drop>
Date & Time: <datetime>
Vehicle: <vehicle>
Name: <name>
```

### 5.2 Fare calculator (P0)
**Location:** Home page section and `/taxi-fare`.
**Inputs:** Pickup point (preset list), destination (preset list of routes and local packages), vehicle (preset list), trip type (one-way or round trip).
**Output:** Estimated total fare, distance used, per-km rate, vehicle selected, plus a note on what is and is not included.
**Rules:**
- Fare = distance × per-km rate for the selected vehicle, using distance and rate from the central data file.
- Round trip logic (minimum km per day, return distance) is configured in data; the formula is a client decision (see Open Questions).
- Show a clear disclaimer: tolls, state entry tax and parking are extra, charged as per actual receipts. Final fare confirmed on WhatsApp or call.
- Button: "Book this fare on WhatsApp" which sends a prefilled message including the computed estimate.

### 5.3 Click-to-call and WhatsApp (P0)
- Every page has a visible call button and WhatsApp button (header on desktop, sticky bar on mobile).
- All `tel:` and `wa.me` links come from one config value, not hardcoded in components.
- Each service, route and vehicle page's WhatsApp button has a context-specific prefilled message (for example "I want to book a taxi from Jodhpur to Jaipur").

### 5.4 Home page (P0)
Sections in order:
1. Top bar: phone, email, "24x7 available"
2. Hero: H1 with primary keyword, sub-copy, two CTAs (Book Now, WhatsApp), booking form card
3. Trust strip: 24/7, clean cabs, best fare, verified drivers (only true claims)
4. Why choose us (4 cards)
5. Services grid (5 services, each linking to its page)
6. Fleet cards with per-km rates and "Book" CTA
7. Popular routes grid with distance, time, starting fare
8. Fare calculator
9. Tours / Rajasthan destinations (links to route pages)
10. Fleet comparison table
11. How booking works (4 steps)
12. Testimonials (real only) and stats (real only)
13. Local sightseeing spots in Jodhpur
14. Us vs other taxis comparison table (use only claims the client can honour)
15. FAQ (accordion, with FAQPage schema)
16. Service coverage / map section
17. Final CTA band
18. Footer

### 5.5 Service pages (P0)
Template with these blocks: hero with H1 and form, service description, inclusions list, package options, applicable vehicles and rates, route links, "how it works", FAQ (page-specific), related services, CTA.

Page-specific requirements:
- **Local:** 8 hr / 80 km and 12 hr / 120 km packages, list of Jodhpur attractions (Mehrangarh Fort, Umaid Bhawan Palace, Jaswant Thada, Mandore Gardens, and so on).
- **Airport:** Jodhpur Airport (JDH) and Railway Station pickup, flight tracking claim only if the client really does it.
- **One-way:** Explain the one-way benefit; list popular one-way routes.
- **Round trip:** Multi-day itinerary info, per-day km rules.
- **Outstation:** Tourist permit and toll/tax guidance (only accurate statements).

### 5.6 Route pages (P0)
Template with: H1 ("Jodhpur to X Taxi"), hero with form, route facts (distance, travel time, starting fare), price table by vehicle (one-way and round trip), sights and stops along the way, about the destination (unique copy), FAQ (route-specific), related routes, CTA.
**Each route page needs unique copy.** No duplicate text across routes (SEO requirement).

### 5.7 Fleet pages (P0)
Template with: vehicle hero image, capacity, luggage, comfort level, ideal for, per-km rate, daily km limit, what is included and excluded, FAQ, related routes, CTA.

### 5.8 About and Contact (P0)
- **About:** Story, experience (only real numbers), driver verification process, safety practices, fleet standards.
- **Contact:** Phone, WhatsApp, email, address, embedded map, contact form (writes to the lead endpoint), business hours.

### 5.9 Trust and content blocks (P0)
- Testimonials: real customer reviews only, with names and trip type. If none exist at launch, hide the section.
- Stats ("trips completed", "years", "rating"): show only if the client provides verifiable figures.
- Comparison table: only claims the client can honour.

### 5.10 SEO features (P0)
Detailed technical spec is in `TRD.md`. Product-level requirements:
- Unique title (50 to 60 chars) and meta description (140 to 160 chars) for every page.
- One H1 per page, keyword-led, logical H2/H3 hierarchy.
- Structured data on relevant pages (LocalBusiness / TaxiService, FAQPage, BreadcrumbList, Service where suitable).
- XML sitemap, robots.txt, canonical URLs, Open Graph and Twitter cards.
- Descriptive internal linking: every service links to its routes, every route links to vehicles and related routes.
- All images with meaningful alt text.

### 5.11 Legal and policy (P1)
Privacy Policy, Terms and Conditions, Refund / Cancellation Policy (for example free cancellation window, to be confirmed by client). Cookie notice only if analytics requires it.

### 5.12 Analytics (P1)
- Google Analytics 4 and Google Search Console set up.
- Track events: call click, WhatsApp click, form submit, calculator use, fare-to-WhatsApp click.
- Microsoft Clarity optional.

### 5.13 Error and edge states (P0)
- Custom 404 page with links to home, services and routes.
- Form validation errors, network failure fallback (WhatsApp redirect still works).
- Calculator shows a friendly message if a combination has no data.

---

## 6. Content Requirements

### 6.1 Content the client must provide
| Item | Notes |
|---|---|
| Business name, logo, brand colors (if any) | |
| Phone, WhatsApp number, email, address | One source of truth |
| Vehicle list with per-km rates, daily km limit, capacity, luggage | |
| Route list with distances, travel times, starting fares | |
| Local package details (hours/km, price) | |
| Real photos: fleet, drivers, office | Stock photos reduce trust |
| Real reviews and verifiable stats | Do not fabricate |
| Cancellation, refund, toll and tax policy | |
| Google Business Profile link | |
| Social media links | |

### 6.2 Content Marwad Cabs produces
- Page copy for all service, route, fleet, about pages (unique per page)
- FAQs per page
- Meta titles and descriptions
- Alt text
- Policy page drafts (client reviews before publishing)

### 6.3 Tone
Simple, clear, reassuring English. Short paragraphs. Focus on punctuality, cleanliness, transparent pricing and safety. No exaggerated or unverifiable claims.

---

## 7. Design Requirements

### 7.1 Principles
1. **Mobile first.** Design the 375 px layout first.
2. **Speed over spectacle.** Motion must never hurt LCP, INP or readability.
3. **Trust and clarity.** Rates, CTAs and contact details are never hidden.
4. **Distinct from competitors.** Cleaner, more premium and more consistent than the template-style reference sites, with a Rajasthan-inspired feel (warm tones, subtle heritage motifs) used with restraint.

### 7.2 Visual direction
- Palette: warm and premium (for example deep neutral base plus a saffron/amber accent). Final palette set during design; must pass WCAG AA contrast.
- Typography: one display typeface plus one clean body typeface; self-hosted; limited weights.
- Imagery: real fleet photos; Jodhpur and Rajasthan landmark imagery for routes (licensed or client-owned).
- Components: cards, tables, accordions, sticky bar, form card, price chips.

### 7.3 Motion (optional polish, P2)
Light, tasteful animation only: fade/slide-in on scroll, hover states, accordion transitions. Must respect `prefers-reduced-motion`. No heavy scroll-jacking or large animation libraries on the critical path.

### 7.4 Accessibility
- WCAG 2.1 AA target.
- Keyboard-navigable menus, accordions and forms.
- Visible focus states, proper labels, `aria` attributes where needed.
- Tap targets at least 44×44 px.

### 7.5 Responsive breakpoints
Mobile (360 to 639 px), tablet (640 to 1023 px), desktop (1024 px and above). Tables scroll horizontally inside their own container on small screens.

---

## 8. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | Lighthouse mobile 90+; LCP under 2.5 s; CLS under 0.1; INP under 200 ms |
| SEO | Server-rendered / statically generated HTML for all content pages |
| Accessibility | WCAG 2.1 AA |
| Browser support | Last 2 versions of Chrome, Safari, Firefox, Edge; Android Chrome and iOS Safari |
| Security | HTTPS, security headers, input validation, spam protection on forms |
| Reliability | Static pages continue to work even if the lead backend is down |
| Privacy | Collect only the data needed for enquiries; privacy policy published |
| Maintainability | Routes, vehicles and rates editable in one data file |

---

## 9. Assumptions and Dependencies
- Client provides all content and assets listed in 6.1 before the content phase begins.
- Client owns or will purchase the domain and has access to DNS.
- Booking is handled manually by the client via call or WhatsApp.
- Business WhatsApp number is active and monitored.
- Hosting on a platform with free or low-cost tier suitable for a static/SSG site (see TRD).

## 10. Risks
| Risk | Impact | Mitigation |
|---|---|---|
| Client content arrives late | Schedule slips | Collect content in week 1; build with placeholders in the meantime |
| Duplicate or thin copy on route pages | Poor SEO | Unique copy per page; review before launch |
| Fabricated stats or reviews copied from competitors | Trust and legal risk | Show only real data; hide empty sections |
| Fare calculator misleads users | Disputes | Clear "estimate" labelling and disclaimers; confirm on WhatsApp |
| Stock imagery looks generic | Lower trust | Request real fleet photos |
| Client asks for online booking mid-project | Scope creep | Out of scope; quote separately |

## 11. Open Questions (client decisions)
1. Final route list and distances.
2. Round trip fare rule: minimum km per day (for example 250 km), return distance counted or not, driver night charge, waiting charges.
3. Are toll and state tax ever included, or always extra?
4. Cancellation window and refund policy.
5. Which vehicles are really in the fleet (Hycross, Urbaniya, Tempo Traveller seating)?
6. Does the client have a Google Business Profile and verified reviews to feature?
7. Does the client want a contact-form email notification in addition to the saved lead?
8. Preferred brand colors, or free design direction?

## 12. Release Plan

| Phase | Deliverable | Est. time |
|---|---|---|
| 1. Setup and design | Project, design system, home layout | 2 to 3 days |
| 2. Home page | All home sections, form, calculator | 3 to 4 days |
| 3. Templates | Service, route, fleet page templates and data file | 3 to 4 days |
| 4. Content and pages | All pages populated with final copy | 2 to 3 days |
| 5. SEO | Metadata, schema, sitemap, internal links | 1 to 2 days |
| 6. QA and launch | Testing, performance, deploy, DNS | 1 to 2 days |

**Total:** about 2 to 2.5 weeks solo, assuming timely client content.

## 13. Acceptance Criteria (Definition of Done)
- [ ] All pages in section 4.1 exist, render and are linked correctly.
- [ ] Booking form opens WhatsApp with a correct prefilled message and saves a lead.
- [ ] Fare calculator returns correct estimates for every route × vehicle combination in the data file.
- [ ] Call and WhatsApp buttons work on every page; sticky bar works on mobile.
- [ ] Every page has unique title, meta description, one H1, canonical and OG tags.
- [ ] Structured data validates in Google's Rich Results Test.
- [ ] Sitemap and robots.txt are live and submitted in Search Console.
- [ ] Lighthouse mobile 90+ on Home, one service page, one route page and one fleet page.
- [ ] No fabricated reviews, stats or claims anywhere.
- [ ] Responsive and tested on at least one Android and one iOS device.
- [ ] Legal pages published; 404 page works.
- [ ] Analytics events fire correctly.
