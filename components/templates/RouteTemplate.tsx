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
      <section className="bg-snow border-line relative overflow-hidden border-b pt-12 pb-20 md:pt-16 md:pb-24">
        <Container className="relative z-10 mx-auto max-w-5xl">
          <Breadcrumbs items={[{ label: `${route.from} to ${route.to}` }]} />

          <div className="mt-6 max-w-3xl">
            <div className="border-gold/40 bg-gold/10 text-gold-deep mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold">
              <Navigation className="h-3.5 w-3.5" />
              <span>Rajasthan Highway Corridor · {route.distanceKm} KM</span>
            </div>

            <h1 className="text-text text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
              {route.from} to {route.to} Private Taxi
            </h1>

            <p className="text-text-muted mt-4 max-w-[56ch] text-base leading-relaxed md:text-lg">
              {route.intro}
            </p>
          </div>

          {/* Waypoint Journey Progression Path (Apple Maps Style) */}
          <div className="border-line mt-10 rounded-3xl border bg-white p-6 shadow-xs sm:p-8">
            <span className="text-text-muted mb-4 block text-[0.6875rem] font-semibold">
              The Route
            </span>

            <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 [&>*]:min-w-0">
              {/* Point 1: Origin */}
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-black font-mono text-xs font-bold text-white shadow-xs">
                  01
                </div>
                <div className="min-w-0">
                  <div className="text-text-muted text-xs font-semibold">Origin</div>
                  <div className="text-text truncate text-base font-semibold">{route.from}</div>
                  <p className="text-text-muted mt-0.5 text-xs">
                    Pickup from your hotel, home, or the airport terminal.
                  </p>
                </div>
              </div>

              {/* Point 2: Scenic Waypoint */}
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="bg-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-mono text-xs font-bold text-black shadow-xs">
                  02
                </div>
                <div className="min-w-0">
                  <div className="text-gold-deep text-xs font-semibold">
                    En-Route Waypoint
                  </div>
                  <div className="text-text truncate text-base font-semibold" title={route.highlights[0] || "Scenic Highway Halt"}>
                    {route.highlights[0] || "Scenic Highway Halt"}
                  </div>
                  <p className="text-text-muted mt-0.5 text-xs">
                    Stop when you like for sightseeing, tea, or photos.
                  </p>
                </div>
              </div>

              {/* Point 3: Destination */}
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-black font-mono text-xs font-bold text-white shadow-xs">
                  03
                </div>
                <div className="min-w-0">
                  <div className="text-text-muted text-xs font-semibold">Destination</div>
                  <div className="text-text truncate text-base font-semibold">{route.to}</div>
                  <p className="text-text-muted mt-0.5 text-xs">
                    Direct drop at your destination — no changing cars.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Highway Telemetry Strip (4 Horizontal Metrics) */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-center md:grid-cols-4">
            <div className="border-line bg-mist/60 rounded-2xl border p-4">
              <span className="text-text-muted block text-[0.6875rem] font-medium">
                Total Distance
              </span>
              <span className="tabular text-text mt-1 block text-lg font-bold">
                {route.distanceKm} km
              </span>
            </div>

            <div className="border-line bg-mist/60 rounded-2xl border p-4">
              <span className="text-text-muted block text-[0.6875rem] font-medium">
                Drive Time
              </span>
              <span className="tabular text-text mt-1 block text-lg font-bold">
                {durationLabel(route.durationHours)}
              </span>
            </div>

            <div className="border-line bg-mist/60 rounded-2xl border p-4">
              <span className="text-text-muted block text-[0.6875rem] font-medium">
                One-Way From
              </span>
              <span className="tabular text-gold-deep mt-1 block text-lg font-bold">
                <AnimatedNumber value={route.startingFare} prefix="₹" />
              </span>
            </div>

            <div className="border-line bg-mist/60 rounded-2xl border p-4">
              <span className="text-text-muted block text-[0.6875rem] font-medium">
                Toll Barriers
              </span>
              <span className="tabular text-text mt-1 block text-lg font-bold">
                Billed at FASTag
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={buildWhatsAppUrl(
                contextMessage(
                  `I would like to book a taxi from ${route.from} to ${route.to}`,
                ),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-bright inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black shadow-xs transition-colors"
            >
              Book {route.from} → {route.to} on WhatsApp
            </a>
            <a
              href="#pricing-grid"
              className="border-line text-text hover:bg-mist inline-flex items-center gap-2 rounded-full border bg-white px-6 py-3 text-sm font-semibold transition-colors"
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

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {priceRows.map(({ vehicle, oneWay, round }) => (
              <div
                key={vehicle.slug}
                className="border-line flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs"
              >
                <div>
                  <div className="text-gold-deep mb-1 text-xs font-semibold">
                    {vehicle.category} Class
                  </div>
                  <h3 className="text-text text-xl font-semibold">{vehicle.name}</h3>
                  <div className="text-text-muted mt-0.5 text-xs">
                    {vehicle.seats} seats · {vehicle.models[0]}
                  </div>

                  <div className="border-line/60 mt-6 space-y-3 border-t pt-4">
                    <div>
                      <span className="text-text-muted block text-[0.6875rem]">
                        One-Way Drop
                      </span>
                      <span className="tabular text-text text-xl font-bold">
                        {formatRupees(oneWay.total)}
                      </span>
                    </div>

                    <div>
                      <span className="text-text-muted block text-[0.6875rem]">
                        Same-Day Round Trip
                      </span>
                      <span className="tabular text-text text-lg font-semibold">
                        {formatRupees(round.total)}
                      </span>
                    </div>

                    <div className="text-text-muted border-line/40 border-t pt-2 text-xs">
                      Rate base: ₹{vehicle.perKm}/km · Daily {vehicle.dailyKmLimit} km
                    </div>
                  </div>
                </div>

                <div className="border-line/60 mt-6 border-t pt-4">
                  <Link
                    href={`/${vehicle.slug}`}
                    className="text-gold-deep inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:text-black"
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
            <div className="text-text-muted space-y-4 text-[0.9375rem] leading-relaxed md:text-base">
              {route.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <MediaFrame
              src={route.image}
              label={`${route.to} Scenic Road`}
              alt={route.imageAlt}
              aspect="4 / 3"
              icon="route"
              category="Highway Landscape"
            />

            <div className="border-line mt-8 rounded-3xl border bg-white p-6 shadow-xs">
              <h3 className="text-gold-deep mb-4 text-xs font-semibold">
                Suggested Halts
              </h3>
              <ol className="space-y-3">
                {route.highlights.map((highlight, index) => (
                  <li
                    key={highlight}
                    className="text-text flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <span className="text-gold-deep tabular bg-gold/10 shrink-0 rounded-full px-2 py-0.5 font-mono text-xs font-semibold">
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
      <section className="bg-mist border-line border-y py-16 md:py-24">
        <Container className="mx-auto max-w-4xl">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <span className="eyebrow text-gold-deep mb-2 block font-semibold">
              Book Route
            </span>
            <h2 className="text-text text-3xl font-semibold tracking-tight">
              Reserve Your {route.from} to {route.to} Cab
            </h2>
            <p className="text-text-muted mt-2 text-sm">
              We confirm your driver and car before you travel.
            </p>
          </div>

          <div className="border-line mx-auto max-w-xl rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
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
        <div className="mx-auto mt-8 max-w-4xl">
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
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedRouteCards.map((related) => (
            <Link
              key={related.slug}
              href={`/${related.slug}`}
              className="group border-line flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
            >
              <div>
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <h3 className="text-text group-hover:text-gold-deep text-lg font-semibold tracking-tight transition-colors">
                    {related.from} → {related.to}
                  </h3>
                  <div className="bg-mist text-text flex h-8 w-8 items-center justify-center rounded-full transition-all group-hover:bg-black group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-text-muted text-xs">{related.tagline}</p>
              </div>

              <div className="border-line/70 text-text-muted mt-6 flex items-center justify-between border-t pt-4 text-xs">
                <span>{related.distanceKm} km</span>
                <span className="tabular text-gold-deep text-sm font-semibold">
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
