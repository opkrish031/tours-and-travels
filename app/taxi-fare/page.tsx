import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FareCalculator } from "@/components/booking/FareCalculator";
import { FinalCta } from "@/components/home/FinalCta";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Table, tdClass, thClass } from "@/components/ui/Table";
import { homeFaqs } from "@/data/faqs";
import { routes } from "@/data/routes";
import { services } from "@/data/services";
import { vehicles } from "@/data/vehicles";
import { estimateFare, formatRupees } from "@/lib/fare";
import { durationLabel } from "@/lib/format";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, titleFor } from "@/lib/seo";

const fareFaqs = [homeFaqs[1], homeFaqs[2], homeFaqs[7]];
const localService = services.find((service) => (service.packages?.length ?? 0) > 0);
const sedan = vehicles.find((vehicle) => vehicle.category === "sedan") ?? vehicles[0];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: titleFor("Jodhpur Taxi Fares & Rates"),
    description:
      "Check Jodhpur taxi fares for every route and car class: per-km rates, distances, starting prices and local packages. Estimate your trip and confirm on WhatsApp.",
    path: "/taxi-fare",
  });
}

const included = [
  "Dedicated vehicle and driver for booked hours or kilometres",
  "Fuel for the planned trip distance",
  "Driver allowance included inside the quote",
  "Waiting at each sightseeing stop within package hours",
];

const excluded = [
  "Highway tolls, charged as per physical toll barrier receipts",
  "Interstate entry tax, charged as per actual receipts",
  "Airport or monument parking charges",
  "Monument entry tickets and personal expenses",
];

export default function TaxiFarePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Fares", path: "/taxi-fare" },
        ])}
      />
      <JsonLd data={faqJsonLd(fareFaqs)} />

      {/* Apple-Style Pricing Studio Hero */}
      <section className="relative overflow-hidden bg-snow border-b border-line pt-12 pb-20 md:pt-16 md:pb-24">
        <Container className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Pricing Studio" }]} />

          <div className="mt-6 text-center max-w-3xl mx-auto mb-10">
            <span className="eyebrow text-gold-deep font-semibold uppercase tracking-wider block mb-2">
              Published Rates · Zero Hidden Surcharges
            </span>
            <h1 className="text-[clamp(2.5rem,6vw,4.4rem)] font-semibold tracking-[-0.035em] leading-[1.06] text-text">
              Jodhpur Taxi Rates &amp; Fare Studio
            </h1>
            <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed">
              Every route and vehicle category with its exact distance, per-kilometre rate,
              and all-inclusive estimate. What you estimate is what you pay.
            </p>

            {/* Quick Micro-Telemetry Ticker */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
              <span className="inline-flex items-center gap-1.5 font-medium text-text">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ₹0 Advance to Book
              </span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-text">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Electronic FASTag Tolls at Actuals
              </span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-text">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Guaranteed Dual-Zone AC
              </span>
            </div>
          </div>

          {/* Interactive Calculator Workbench in Studio Card */}
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm max-w-4xl mx-auto">
            <FareCalculator />
          </div>
        </Container>
      </section>

      {/* Vehicle Rate Compare Studio (Apple Compare Cards) */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="Fleet Spec Sheet"
          title="Vehicle Categories &amp; Per-Kilometre Rates"
          description="Fixed pricing across four verified vehicle classes. Clean air-conditioned cars with commercial transport permits."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.slug}
              className="rounded-3xl border border-line bg-white p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-gold-deep block mb-1">
                  {vehicle.category} Class
                </span>
                <h3 className="text-xl font-semibold text-text">
                  {vehicle.name}
                </h3>
                <div className="text-xs text-text-muted mt-0.5">
                  {vehicle.models.join(", ")}
                </div>

                <div className="mt-6 pt-4 border-t border-line/60">
                  <span className="text-[0.6875rem] uppercase text-text-muted block">
                    Outstation Rate
                  </span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="tabular text-2xl font-bold text-text">
                      {formatRupees(vehicle.perKm)}
                    </span>
                    <span className="text-xs text-text-muted font-medium">/ km</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs text-text-muted pt-3 border-t border-line/40">
                  <div className="flex justify-between">
                    <span>Passenger Seating:</span>
                    <span className="font-semibold text-text">{vehicle.seats} Seats</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Luggage Capacity:</span>
                    <span className="font-semibold text-text truncate max-w-[12ch]">{vehicle.luggage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Minimum:</span>
                    <span className="font-semibold text-text">{vehicle.dailyKmLimit} km / Day</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60">
                <Link
                  href={`/${vehicle.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1 rounded-full border border-line bg-snow py-2 px-3 text-xs font-semibold uppercase tracking-wider text-text hover:bg-mist transition-colors"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Outstation Routes Table */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="Outstation Catalog"
          title="Route Distances &amp; One-Way Starting Fares"
          description="Starting rates represent sedan one-way departures from Jodhpur. Round trips price on total distance and duration."
        />

        <div className="mt-8">
          <Table
            caption="Distance, travel time and starting fare for each route"
            minWidth="40rem"
          >
            <thead>
              <tr>
                <th scope="col" className={thClass}>Route Destination</th>
                <th scope="col" className={thClass}>Distance</th>
                <th scope="col" className={thClass}>Travel Time</th>
                <th scope="col" className={thClass}>One-Way Starting Fare</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.slug}>
                  <td className={tdClass}>
                    <Link
                      href={`/${route.slug}`}
                      className="font-medium text-text hover:text-gold-deep transition-colors"
                    >
                      Jodhpur to {route.to} Taxi
                    </Link>
                  </td>
                  <td className={tdClass}>{route.distanceKm} km</td>
                  <td className={tdClass}>{durationLabel(route.durationHours)}</td>
                  <td className={tdClass}>
                    <span className="tabular font-semibold text-gold-deep">
                      {formatRupees(route.startingFare)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Section>

      {/* Local Sightseeing Packages */}
      {localService?.packages?.length ? (
        <Section tone="snow" size="md">
          <SectionHeader
            eyebrow="Inside Jodhpur"
            title="Local Sightseeing Packages"
            description="Hourly packages with car and chauffeur waiting at each landmark."
          />
          <div className="mt-8">
            <Table caption="Local sightseeing packages with hours, kilometres and from-price">
              <thead>
                <tr>
                  <th scope="col" className={thClass}>Package Name</th>
                  <th scope="col" className={thClass}>Hours</th>
                  <th scope="col" className={thClass}>Included Distance</th>
                  <th scope="col" className={thClass}>Starting Rate (Sedan)</th>
                </tr>
              </thead>
              <tbody>
                {localService.packages.map((pkg) => {
                  const from =
                    pkg.km && pkg.km > 0
                      ? estimateFare({
                          distanceKm: pkg.km,
                          perKm: sedan.perKm,
                          tripType: "one-way",
                        }).total
                      : null;
                  return (
                    <tr key={pkg.label}>
                      <td className={tdClass}>
                        <span className="font-semibold text-text">{pkg.label}</span>
                      </td>
                      <td className={tdClass}>{pkg.hours ?? "—"} Hours</td>
                      <td className={tdClass}>{pkg.km ?? "—"} km</td>
                      <td className={tdClass}>
                        <span className="tabular font-semibold text-gold-deep">
                          {from ? formatRupees(from) : "On request"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Section>
      ) : null}

      {/* Inclusions & Exclusions */}
      <Section tone="graphite" size="md">
        <SectionHeader
          eyebrow="Fair Terms"
          title="What Your Quoted Fare Covers"
          description="Clear division of inclusions and expenses. No surprise surcharges at the end of the trip."
          dark
        />

        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">
              Included in Quoted Fare
            </h3>
            <ul className="space-y-3 text-sm text-text-dark-muted">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-gold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-dark-muted mb-4">
              Charged as per Physical Receipt
            </h3>
            <ul className="space-y-3 text-sm text-text-dark-muted">
              {excluded.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="opacity-40 mt-0.5">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Section tone="snow" size="md">
        <SectionHeader eyebrow="Questions" title="Fare Policies Answered" />
        <div className="mt-8 max-w-4xl mx-auto">
          <Accordion items={fareFaqs} defaultOpen={0} />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
