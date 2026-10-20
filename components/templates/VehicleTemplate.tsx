import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/booking/BookingForm";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Table, tdClass, thClass } from "@/components/ui/Table";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { routes } from "@/data/routes";
import type { Vehicle } from "@/data/vehicles";
import { vehicles } from "@/data/vehicles";
import { fareExcludes, fareIncludes } from "@/data/policies";
import { estimateFare, formatRupees } from "@/lib/fare";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

import { buildWhatsAppUrl, contextMessage } from "@/lib/whatsapp";

export function VehicleTemplate({ vehicle }: { vehicle: Vehicle }) {
  const routeCards = routes.map((route) => ({
    route,
    estimate: estimateFare({
      distanceKm: route.distanceKm,
      perKm: vehicle.perKm,
      tripType: "one-way",
    }),
  }));

  const otherVehicles = vehicles.filter((v) => v.slug !== vehicle.slug);

  return (
    <>
      <JsonLd data={faqJsonLd(vehicle.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: vehicle.name, path: `/${vehicle.slug}` },
        ])}
      />

      {/* Luminous Sandstone Showcase Hero */}
      <section className="bg-snow border-line relative overflow-hidden border-b pt-12 pb-20 md:pt-16 md:pb-24">
        <Container className="relative z-10 mx-auto max-w-5xl text-center">
          <Breadcrumbs items={[{ label: vehicle.name }]} />

          <div className="mx-auto mt-6 max-w-3xl">
            <div className="border-gold/40 bg-gold/10 text-gold-deep mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold">
              <span>Vehicle Class · {vehicle.category.toUpperCase()}</span>
            </div>

            <h1 className="text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-text">
              {vehicle.name}
            </h1>

            <p className="text-text-muted mx-auto mt-5 max-w-[50ch] text-base leading-relaxed md:text-xl">
              {vehicle.comfort}
            </p>
          </div>

          {/* Centerstage Hardware Vehicle Showcase */}
          <div className="relative mx-auto mt-10 max-w-3xl">
            <div className="border-line relative overflow-hidden rounded-3xl border bg-white p-4 shadow-md sm:p-6">
              <MediaFrame
                src={vehicle.image}
                label={`${vehicle.name} Photo`}
                alt={vehicle.imageAlt}
                aspect="16 / 9"
                icon="car"
                category={vehicle.popular ? "Most Booked" : "Standard Fleet"}
                priority
              />

              <div className="border-line/60 text-text-muted mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-xs">
                <span>Models in Fleet: {vehicle.models.join(" · ")}</span>
                <span className="text-gold-deep font-semibold">Serviced and checked</span>
              </div>
            </div>
          </div>

          {/* Hardware Specs Pill Ticker */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 text-center sm:grid-cols-4">
            <div className="border-line rounded-2xl border bg-white p-4 shadow-xs">
              <span className="text-text-muted block text-[0.6875rem] font-medium">
                Seats
              </span>
              <span className="tabular text-text mt-1 block text-lg font-bold">
                {vehicle.seats}
              </span>
            </div>

            <div className="border-line rounded-2xl border bg-white p-4 shadow-xs">
              <span className="text-text-muted block text-[0.6875rem] font-medium">
                Luggage
              </span>
              <span className="text-text mt-1 block truncate text-base font-bold">
                {vehicle.luggage}
              </span>
            </div>

            <div className="border-line rounded-2xl border bg-white p-4 shadow-xs">
              <span className="text-text-muted block text-[0.6875rem] font-medium">
                Outstation Rate
              </span>
              <span className="tabular text-gold-deep mt-1 block text-lg font-bold">
                <AnimatedNumber value={vehicle.perKm} prefix="₹" suffix="/km" />
              </span>
            </div>

            <div className="border-line rounded-2xl border bg-white p-4 shadow-xs">
              <span className="text-text-muted block text-[0.6875rem] font-medium">
                Daily Minimum
              </span>
              <span className="tabular text-text mt-1 block text-lg font-bold">
                {vehicle.dailyKmLimit} km / Day
              </span>
            </div>
          </div>

          {/* Quick Action Dock */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={buildWhatsAppUrl(
                contextMessage(`I want to book ${vehicle.name} in Jodhpur`),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-bright inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black shadow-sm transition-colors"
            >
              Reserve {vehicle.name} on WhatsApp →
            </a>
            <a
              href="#booking-tray"
              className="border-line bg-white text-text hover:bg-mist inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold shadow-xs transition-colors"
            >
              Send Booking Details ↓
            </a>
          </div>
        </Container>
      </section>

      {/* Cabin Architecture & Engineering (Apple Bento Grid) */}
      <Section tone="snow" size="md">
        <SectionHeader
          eyebrow="Cabin"
          title={`${vehicle.name} cabin, seats and AC`}
          description={`Every ${vehicle.name} is serviced between tours, cleaned before each trip, and its AC is checked before long drives.`}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Seating & Ergonomics */}
          <div className="border-line bg-mist/60 flex flex-col justify-between rounded-3xl border p-8">
            <div>
              <span className="text-gold-deep mb-2 block text-[0.6875rem] font-semibold">
                01 · Ergonomics
              </span>
              <h3 className="text-text mb-3 text-xl font-semibold">
                Cabin Layout &amp; Reclining Space
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Legroom that holds up on long highway stretches, with reclining seats and
                headrests for the back row.
              </p>
            </div>
            <div className="border-line/60 text-text mt-6 border-t pt-4 text-xs font-semibold">
              {vehicle.seats} seats
            </div>
          </div>

          {/* Card 2: Climate Protection */}
          <div className="border-line bg-mist/60 flex flex-col justify-between rounded-3xl border p-8">
            <div>
              <span className="text-gold-deep mb-2 block text-[0.6875rem] font-semibold">
                02 · Climate Control
              </span>
              <h3 className="text-text mb-3 text-xl font-semibold">
                Cooling for Rajasthan Heat
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Rear vents keep the cabin down through Rajasthan summers. We check the AC
                before every long trip so it is blowing cold when you get in.
              </p>
            </div>
            <div className="border-line/60 text-text mt-6 border-t pt-4 text-xs font-semibold">
              AC checked before departure
            </div>
          </div>

          {/* Card 3: Luggage Stowing */}
          <div className="border-line bg-mist/60 flex flex-col justify-between rounded-3xl border p-8">
            <div>
              <span className="text-gold-deep mb-2 block text-[0.6875rem] font-semibold">
                03 · Cargo Volume
              </span>
              <h3 className="text-text mb-3 text-xl font-semibold">
                Secure Boot &amp; Luggage Space
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Room for airport trolley cases and duffel bags. The boot is covered, so
                bags stay off the desert dust.
              </p>
            </div>
            <div className="border-line/60 text-text mt-6 border-t pt-4 text-xs font-semibold">
              Capacity: {vehicle.luggage}
            </div>
          </div>
        </div>

        {/* Ideal Trip Profiles Pill Strip */}
        <div className="border-line mt-8 rounded-3xl border bg-white p-6 shadow-xs md:p-8">
          <h4 className="text-text-muted mb-4 text-xs font-semibold">
            Best uses for {vehicle.name}:
          </h4>
          <div className="flex flex-wrap gap-3">
            {vehicle.idealFor.map((use) => (
              <span
                key={use}
                className="border-line bg-snow text-text inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium"
              >
                <Check className="text-gold-deep h-3.5 w-3.5 shrink-0" />
                <span>{use}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Outstation Rates for This Vehicle (Spec Sheet) */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="Fares"
          title={`Intercity fares with ${vehicle.name}`}
          description={`One-way starting fares from Jodhpur on this route in a ${vehicle.name}.`}
        />

        <div className="mt-8">
          <Table caption={`Intercity fares for ${vehicle.name} by route`}>
            <thead>
              <tr>
                <th scope="col" className={thClass}>
                  Destination
                </th>
                <th scope="col" className={thClass}>
                  Highway Distance
                </th>
                <th scope="col" className={thClass}>
                  Drive Time
                </th>
                <th scope="col" className={thClass}>
                  One-Way Fare
                </th>
              </tr>
            </thead>
            <tbody>
              {routeCards.map(({ route, estimate }) => (
                <tr key={route.slug}>
                  <td className={tdClass}>
                    <Link
                      href={`/${route.slug}`}
                      className="text-text hover:text-gold-deep font-medium transition-colors"
                    >
                      {route.from} to {route.to}
                    </Link>
                  </td>
                  <td className={tdClass}>{route.distanceKm} km</td>
                  <td className={tdClass}>{route.durationHours} hrs</td>
                  <td className={tdClass}>
                    <span className="tabular text-gold-deep font-semibold">
                      {formatRupees(estimate.total)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Inclusions / Exclusions Charter */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="border-line rounded-3xl border bg-white p-6 shadow-xs">
            <span className="mb-3 block text-xs font-semibold text-emerald-800">
              Standard Fare Inclusions
            </span>
            <ul className="text-text-muted space-y-2 text-xs">
              {fareIncludes.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-line rounded-3xl border bg-white p-6 shadow-xs">
            <span className="text-text-muted mb-3 block text-xs font-semibold">
              Billed at Actual Cost
            </span>
            <ul className="text-text-muted space-y-2 text-xs">
              {fareExcludes.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-text-muted shrink-0 font-bold">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Dedicated Reservation Tray */}
      <section
        id="booking-tray"
        className="bg-snow border-line scroll-mt-24 border-y py-16 md:py-24"
      >
        <Container className="mx-auto max-w-4xl">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <span className="eyebrow text-gold-deep mb-2 block font-semibold">
              Book It
            </span>
            <h2 className="text-text text-3xl font-semibold tracking-tight">
              Reserve Your {vehicle.name}
            </h2>
            <p className="text-text-muted mt-2 text-sm">
              Pick your dates and route and we will send a written quote.
            </p>
          </div>

          <div className="border-line mx-auto max-w-xl rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
            <BookingForm
              sourcePage={`/${vehicle.slug}`}
              defaultPickup="Jodhpur"
              defaultVehicle={vehicle.slug}
            />
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <Section tone="mist" size="md">
        <SectionHeader eyebrow="Questions" title={`${vehicle.name} FAQs`} />
        <div className="mx-auto mt-8 max-w-4xl">
          <Accordion items={vehicle.faqs} defaultOpen={0} />
        </div>
      </Section>

      {/* Compare Other Fleet Classes */}
      <Section tone="snow" size="md">
        <SectionHeader eyebrow="Compare" title="Other vehicle types" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {otherVehicles.map((other) => (
            <Link
              key={other.slug}
              href={`/${other.slug}`}
              className="group border-line flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
            >
              <div>
                <MediaFrame
                  src={other.image}
                  label={other.name}
                  alt={other.imageAlt}
                  aspect="16 / 9"
                  icon="car"
                />
                <h3 className="text-text group-hover:text-gold-deep mt-4 text-base font-semibold transition-colors">
                  {other.name}
                </h3>
                <p className="text-text-muted mt-1 text-xs">
                  {other.seats} seats · {formatRupees(other.perKm)}/km
                </p>
              </div>
              <div className="border-line/70 text-text-muted mt-5 flex items-center justify-between border-t pt-3 text-xs font-semibold group-hover:text-black">
                <span>View Details</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
