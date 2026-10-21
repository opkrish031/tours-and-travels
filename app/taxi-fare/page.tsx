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
      <section className="bg-snow border-line relative overflow-hidden border-b pt-12 pb-20 md:pt-16 md:pb-24">
        <Container className="relative z-10 mx-auto max-w-5xl">
          <Breadcrumbs items={[{ label: "Pricing Studio" }]} />

          <div className="mx-auto mt-6 mb-10 max-w-3xl text-center">
            <span className="eyebrow text-gold-deep mb-2 block font-semibold">
              Published Rates · Zero Hidden Surcharges
            </span>
            <h1 className="text-text text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
              Jodhpur Taxi Rates &amp; Fare Studio
            </h1>
            <p className="text-text-muted mt-4 text-base leading-relaxed md:text-lg">
              Every route and vehicle category with its exact distance, per-kilometre
              rate, and a clear estimate. Extras like tolls are itemised in your written
              quote.
            </p>

            {/* Quick Micro-Telemetry Ticker */}
            <div className="text-text-muted mt-6 flex flex-wrap items-center justify-center gap-6 text-xs">
              <span className="text-text inline-flex items-center gap-1.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ₹0 Advance to
                Book
              </span>
              <span className="opacity-40">·</span>
              <span className="text-text inline-flex items-center gap-1.5 font-medium">
                <span className="bg-gold h-1.5 w-1.5 rounded-full" /> Electronic FASTag
                Tolls at Actuals
              </span>
              <span className="opacity-40">·</span>
              <span className="text-text inline-flex items-center gap-1.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> AC Checked
                Before Departure
              </span>
            </div>
          </div>

          {/* Interactive Calculator Workbench in Studio Card */}
          <div className="mx-auto max-w-4xl">
            <FareCalculator />
          </div>
        </Container>
      </section>

      {/* Vehicle Rate Compare Studio (Apple Compare Cards) */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="Fleet"
          title="Vehicle categories and per-km rates"
          description="Published per-km rates across our vehicle classes. Clean AC cars with commercial transport permits."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.slug}
              className="border-line flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs"
            >
              <div>
                <span className="text-gold-deep mb-1 block text-[0.6875rem] font-semibold">
                  {vehicle.category} Class
                </span>
                <h3 className="text-text text-xl font-semibold">{vehicle.name}</h3>
                <div className="text-text-muted mt-0.5 text-xs">
                  {vehicle.models.join(", ")}
                </div>

                <div className="border-line/60 mt-6 border-t pt-4">
                  <span className="text-text-muted block text-[0.6875rem]">
                    Outstation Rate
                  </span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="tabular text-text text-2xl font-bold">
                      {formatRupees(vehicle.perKm)}
                    </span>
                    <span className="text-text-muted text-xs font-medium">/ km</span>
                  </div>
                </div>

                <div className="text-text-muted border-line/40 mt-4 space-y-2 border-t pt-3 text-xs">
                  <div className="flex justify-between">
                    <span>Passenger Seating:</span>
                    <span className="text-text font-semibold">{vehicle.seats} Seats</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Luggage Capacity:</span>
                    <span className="text-text max-w-[12ch] truncate font-semibold">
                      {vehicle.luggage}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Minimum:</span>
                    <span className="text-text font-semibold">
                      {vehicle.dailyKmLimit} km / Day
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-line/60 mt-6 border-t pt-4">
                <Link
                  href={`/${vehicle.slug}`}
                  className="border-line bg-snow text-text hover:bg-mist inline-flex w-full items-center justify-center gap-1 rounded-full border px-3 py-2 text-xs font-semibold transition-colors"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Outstation Routes Table */}
      <Section tone="snow" size="md">
        <SectionHeader
          eyebrow="Outstation"
          title="Route distances and one-way starting fares"
          description="Starting rates represent sedan one-way departures from Jodhpur. Round trips price on total distance and duration."
        />

        <div className="mt-8">
          <Table
            caption="Distance, travel time and starting fare for each route"
            minWidth="40rem"
          >
            <thead>
              <tr>
                <th scope="col" className={thClass}>
                  Route Destination
                </th>
                <th scope="col" className={thClass}>
                  Distance
                </th>
                <th scope="col" className={thClass}>
                  Travel Time
                </th>
                <th scope="col" className={thClass}>
                  One-Way Starting Fare
                </th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.slug}>
                  <td className={tdClass}>
                    <Link
                      href={`/${route.slug}`}
                      className="text-text hover:text-gold-deep font-medium transition-colors"
                    >
                      Jodhpur to {route.to} Taxi
                    </Link>
                  </td>
                  <td className={tdClass}>{route.distanceKm} km</td>
                  <td className={tdClass}>{durationLabel(route.durationHours)}</td>
                  <td className={tdClass}>
                    <span className="tabular text-gold-deep font-semibold">
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
        <Section tone="mist" size="md">
          <SectionHeader
            eyebrow="Inside Jodhpur"
            title="Local sightseeing packages"
            description="Hourly packages with car and chauffeur waiting at each landmark."
          />
          <div className="mt-8">
            <Table caption="Local sightseeing packages with hours, kilometres and from-price">
              <thead>
                <tr>
                  <th scope="col" className={thClass}>
                    Package Name
                  </th>
                  <th scope="col" className={thClass}>
                    Hours
                  </th>
                  <th scope="col" className={thClass}>
                    Included Distance
                  </th>
                  <th scope="col" className={thClass}>
                    Starting Rate (Sedan)
                  </th>
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
                        <span className="text-text font-semibold">{pkg.label}</span>
                      </td>
                      <td className={tdClass}>{pkg.hours ?? "—"} Hours</td>
                      <td className={tdClass}>{pkg.km ?? "—"} km</td>
                      <td className={tdClass}>
                        <span className="tabular text-gold-deep font-semibold">
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
          eyebrow="What’s included"
          title="What your quoted fare covers"
          description="Clear division of inclusions and expenses. No surprise surcharges at the end of the trip."
          dark
        />

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-gold mb-4 text-sm font-semibold">
              Included in Quoted Fare
            </h3>
            <ul className="text-text-dark-muted space-y-3 text-sm">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-gold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <h3 className="text-text-dark-muted mb-4 text-sm font-semibold">
              Charged as per Physical Receipt
            </h3>
            <ul className="text-text-dark-muted space-y-3 text-sm">
              {excluded.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 opacity-40">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQs */}
      <Section tone="snow" size="md">
        <SectionHeader eyebrow="Questions" title="Fare policies answered" />
        <div className="mx-auto mt-8 max-w-4xl">
          <Accordion items={fareFaqs} defaultOpen={0} />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
