import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/booking/BookingForm";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { type Route, routes } from "@/data/routes";
import { vehicles } from "@/data/vehicles";
import { estimateFare, formatRupees } from "@/lib/fare";
import { durationLabel } from "@/lib/format";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { buildWhatsAppUrl, contextMessage } from "@/lib/whatsapp";
import { Navigation } from "lucide-react";

export function RouteTemplate({ route }: { route: Route }) {
  const relatedRouteCards = route.relatedRoutes
    .map((slug) => routes.find((item) => item.slug === slug))
    .filter((item): item is Route => Boolean(item));

  const priceRows = vehicles.map((vehicle) => {
    const oneWay = estimateFare({
      distanceKm: route.distanceKm,
      perKm: vehicle.perKm,
      tripType: "one-way",
    });
    const round = estimateFare({
      distanceKm: route.distanceKm,
      perKm: vehicle.perKm,
      tripType: "round-trip",
      days: 1,
      minKmPerDay: vehicle.dailyKmLimit,
    });
    return { vehicle, oneWay, round };
  });

  return (
    <>
      <JsonLd data={faqJsonLd(route.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: `${route.from} to ${route.to} taxi`, path: `/${route.slug}` },
        ])}
      />

      {/* Apple-Style Highway Expedition Hero (Luminous Light Canvas) */}
      <section className="relative overflow-hidden bg-snow border-b border-line pt-12 pb-20 md:pt-16 md:pb-24">
        <Container className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: `${route.from} to ${route.to}` }]} />

          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-deep mb-3">
              <Navigation className="h-3.5 w-3.5" />
              <span>Rajasthan Highway Corridor · {route.distanceKm} KM</span>
            </div>

            <h1 className="text-[clamp(2rem,4.5vw,3.4rem)] font-semibold tracking-[-0.02em] leading-[1.15] text-text">
              {route.from} to {route.to} Private Taxi
            </h1>

            <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed max-w-[56ch]">
              {route.intro}
            </p>
          </div>

          {/* Waypoint Journey Progression Path (Apple Maps Style) */}
          <div className="mt-10 rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-xs">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-text-muted block mb-4">
              The Route
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Point 1: Origin */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-black text-white font-mono text-xs font-bold shadow-xs">
                  01
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-text-muted">Origin</div>
                  <div className="text-base font-semibold text-text">{route.from}</div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Pickup from your hotel, home, or the airport terminal.
                  </p>
                </div>
              </div>

              {/* Point 2: Scenic Waypoint */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold text-black font-mono text-xs font-bold shadow-xs">
                  02
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-gold-deep">En-Route Waypoint</div>
                  <div className="text-base font-semibold text-text truncate">
                    {route.highlights[0] || "Scenic Highway Halt"}
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Stop when you like for sightseeing, tea, or photos.
                  </p>
                </div>
              </div>

              {/* Point 3: Destination */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-black text-white font-mono text-xs font-bold shadow-xs">
                  03
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-text-muted">Destination</div>
                  <div className="text-base font-semibold text-text">{route.to}</div>
                  <p className="text-xs text-text-muted mt-0.5">
                    Direct drop at your destination — no changing cars.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Highway Telemetry Strip (4 Horizontal Metrics) */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="rounded-2xl border border-line bg-mist/60 p-4">
              <span className="block text-[0.6875rem] uppercase text-text-muted font-medium">
                Total Distance
              </span>
              <span className="tabular mt-1 block text-lg font-bold text-text">
                {route.distanceKm} km
              </span>
            </div>

            <div className="rounded-2xl border border-line bg-mist/60 p-4">
              <span className="block text-[0.6875rem] uppercase text-text-muted font-medium">
                Drive Time
              </span>
              <span className="tabular mt-1 block text-lg font-bold text-text">
                {durationLabel(route.durationHours)}
              </span>
            </div>

            <div className="rounded-2xl border border-line bg-mist/60 p-4">
              <span className="block text-[0.6875rem] uppercase text-text-muted font-medium">
                One-Way From
              </span>
              <span className="tabular mt-1 block text-lg font-bold text-gold-deep">
                <AnimatedNumber value={route.startingFare} prefix="₹" />
              </span>
            </div>

            <div className="rounded-2xl border border-line bg-mist/60 p-4">
              <span className="block text-[0.6875rem] uppercase text-text-muted font-medium">
                Toll Barriers
              </span>
              <span className="tabular mt-1 block text-lg font-bold text-text">
                Billed at FASTag
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={buildWhatsAppUrl(contextMessage(`I would like to book a taxi from ${route.from} to ${route.to}`))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-black shadow-xs hover:bg-gold-bright transition-colors"
            >
              Book {route.from} → {route.to} on WhatsApp
            </a>
            <a
              href="#pricing-grid"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-text hover:bg-mist transition-colors"
            >
              Compare Vehicle Rates ↓
            </a>
          </div>
        </Container>
      </section>

      {/* Vehicle Class Price Comparison Studio */}
      <section id="pricing-grid" className="scroll-mt-24">
        <Section tone="mist" size="md">
          <SectionHeader
            eyebrow="Rates"
            title={`Fixed fares for ${route.from} to ${route.to}`}
            description="Published per-kilometre rates. Tolls and state taxes are billed at actual FASTag receipts."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
            {priceRows.map(({ vehicle, oneWay, round }) => (
              <div
                key={vehicle.slug}
                className="rounded-3xl border border-line bg-white p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-[0.6875rem] font-semibold uppercase tracking-wider text-gold-deep mb-1">
                    {vehicle.category} Class
                  </div>
                  <h3 className="text-xl font-semibold text-text">
                    {vehicle.name}
                  </h3>
                  <div className="text-xs text-text-muted mt-0.5">
                    {vehicle.seats} seats · {vehicle.models[0]}
                  </div>

                  <div className="mt-6 pt-4 border-t border-line/60 space-y-3">
                    <div>
                      <span className="text-[0.6875rem] uppercase text-text-muted block">
                        One-Way Drop
                      </span>
                      <span className="tabular text-xl font-bold text-text">
                        {formatRupees(oneWay.total)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[0.6875rem] uppercase text-text-muted block">
                        Same-Day Round Trip
                      </span>
                      <span className="tabular text-lg font-semibold text-text">
                        {formatRupees(round.total)}
                      </span>
                    </div>

                    <div className="text-xs text-text-muted pt-2 border-t border-line/40">
                      Rate base: ₹{vehicle.perKm}/km · Daily {vehicle.dailyKmLimit} km
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-line/60">
                  <Link
                    href={`/${vehicle.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold-deep hover:text-black transition-colors"
                  >
                    View Vehicle Specs <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* Sights and Route Details */}
      <Section tone="snow" size="md">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Highway"
              title={`Driving the highway to ${route.to}`}
            />
            <div className="space-y-4 text-[0.9375rem] md:text-base text-text-muted leading-relaxed">
              {route.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <MediaFrame
              label={`${route.to} Scenic Road`}
              alt={route.imageAlt}
              aspect="4 / 3"
              icon="route"
              category="Highway Landscape"
            />

            <div className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-xs">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-deep mb-4">
                Suggested Halts
              </h3>
              <ol className="space-y-3">
                {route.highlights.map((highlight, index) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-text leading-relaxed"
                  >
                    <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/10 px-2 py-0.5 rounded-full shrink-0">
                      0{index + 1}
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>

      {/* Dedicated Route Reservation Section */}
      <section className="bg-mist border-y border-line py-16 md:py-24">
        <Container className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="eyebrow text-gold-deep font-semibold uppercase tracking-wider block mb-2">
              Book Route
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-text">
              Reserve Your {route.from} to {route.to} Cab
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              We confirm your driver and car before you travel.
            </p>
          </div>

          <div className="max-w-xl mx-auto rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm">
            <BookingForm
              sourcePage={`/${route.slug}`}
              defaultPickup={route.from}
              defaultDrop={route.to}
            />
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <Section tone="snow" size="md">
        <SectionHeader
          eyebrow="FAQ"
          title={`${route.from} to ${route.to} travel specifics`}
          description="Drive times, which car suits the road, luggage, and halts along the way."
        />
        <div className="mt-8 max-w-4xl mx-auto">
          <Accordion items={route.faqs} defaultOpen={0} />
        </div>
      </Section>

      {/* Related Routes */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="Other routes"
          title="Alternative travel routes from Jodhpur"
          description="Other routes we run regularly out of Jodhpur."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {relatedRouteCards.map((related) => (
            <Link
              key={related.slug}
              href={`/${related.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
            >
              <div>
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="text-lg font-semibold tracking-tight text-text group-hover:text-gold-deep transition-colors">
                    {related.from} → {related.to}
                  </h3>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mist text-text group-hover:bg-black group-hover:text-white transition-all">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-text-muted">{related.tagline}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/70 flex items-center justify-between text-xs text-text-muted">
                <span>{related.distanceKm} km</span>
                <span className="tabular font-semibold text-gold-deep text-sm">
                  From {formatRupees(related.startingFare)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
