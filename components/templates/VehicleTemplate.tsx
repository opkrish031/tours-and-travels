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

      {/* Apple Hardware Studio Showcase Hero (Dark Studio Presentation) */}
      <section className="relative overflow-hidden bg-black text-text-dark border-b border-line-dark pt-12 pb-20 md:pt-16 md:pb-28">
        <Container className="relative z-10 max-w-5xl mx-auto text-center">
          <Breadcrumbs items={[{ label: vehicle.name }]} />

          <div className="mt-6 max-w-3xl mx-auto">
            <span className="eyebrow text-gold font-semibold uppercase tracking-wider block mb-3">
              Fleet Architecture · Category {vehicle.category.toUpperCase()}
            </span>

            <h1 className="text-[clamp(2.8rem,6.5vw,4.8rem)] font-semibold tracking-[-0.035em] leading-[1.04] text-white">
              {vehicle.name}
            </h1>

            <p className="mt-5 text-base md:text-xl text-text-dark-muted max-w-[50ch] mx-auto leading-relaxed">
              {vehicle.comfort}
            </p>
          </div>

          {/* Centerstage Hardware Vehicle Showcase */}
          <div className="mt-10 max-w-3xl mx-auto relative">
            <div className="rounded-3xl border border-white/10 bg-graphite p-4 sm:p-6 shadow-2xl relative overflow-hidden">
              <MediaFrame
                label={`${vehicle.name} Studio View`}
                alt={vehicle.imageAlt}
                aspect="16 / 9"
                icon="car"
                category={vehicle.popular ? "Flagship Choice" : "Chauffeur Spec"}
              />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-text-dark-muted pt-3 border-t border-white/10">
                <span>Models in Fleet: {vehicle.models.join(" · ")}</span>
                <span className="text-gold font-medium">Marwad Cabs Inspected</span>
              </div>
            </div>
          </div>

          {/* Hardware Specs Pill Ticker (Apple Hardware Spec Grid) */}
          <div className="mt-10 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
              <span className="block text-[0.6875rem] uppercase text-text-dark-muted font-medium">
                Passenger Seating
              </span>
              <span className="tabular mt-1 block text-lg font-bold text-white">
                {vehicle.seats} Executive Seats
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
              <span className="block text-[0.6875rem] uppercase text-text-dark-muted font-medium">
                Luggage Stowed
              </span>
              <span className="mt-1 block text-base font-bold text-white truncate">
                {vehicle.luggage}
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
              <span className="block text-[0.6875rem] uppercase text-text-dark-muted font-medium">
                Outstation Base
              </span>
              <span className="tabular mt-1 block text-lg font-bold text-gold">
                <AnimatedNumber value={vehicle.perKm} prefix="₹" suffix="/km" />
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
              <span className="block text-[0.6875rem] uppercase text-text-dark-muted font-medium">
                Daily Minimum
              </span>
              <span className="tabular mt-1 block text-lg font-bold text-white">
                {vehicle.dailyKmLimit} km / Day
              </span>
            </div>
          </div>

          {/* Quick Action Dock */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={buildWhatsAppUrl(contextMessage(`I want to book ${vehicle.name} in Jodhpur`))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-black shadow-sm hover:bg-gold-bright transition-colors"
            >
              Reserve {vehicle.name} on WhatsApp →
            </a>
            <a
              href="#booking-tray"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/15 transition-colors"
            >
              Submit Travel Details ↓
            </a>
          </div>
        </Container>
      </section>

      {/* Cabin Architecture & Engineering (Apple Bento Grid) */}
      <Section tone="snow" size="md">
        <SectionHeader
          eyebrow="Inside The Vehicle"
          title={`${vehicle.name} Anatomy &amp; Engineering`}
          description={`Every ${vehicle.name} is mechanically audited, deep-sanitized between tours, and equipped with functioning multi-vent air conditioning.`}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {/* Card 1: Seating & Ergonomics */}
          <div className="rounded-3xl border border-line bg-mist/60 p-8 flex flex-col justify-between">
            <div>
              <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-gold-deep block mb-2">
                01 · Ergonomics
              </span>
              <h3 className="text-xl font-semibold text-text mb-3">
                Cabin Layout &amp; Reclining Space
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Generous legroom configured for long desert highway stretches. Seats feature
                ergonomic lumbar support and individual headrests for effortless long-distance travel.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 text-xs font-semibold text-text">
              {vehicle.seats} Dedicated Passenger Capacity
            </div>
          </div>

          {/* Card 2: Climate Protection */}
          <div className="rounded-3xl border border-line bg-mist/60 p-8 flex flex-col justify-between">
            <div>
              <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-gold-deep block mb-2">
                02 · Climate Control
              </span>
              <h3 className="text-xl font-semibold text-text mb-3">
                High-Ambient Cooling System
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Tested against western Rajasthan desert heat up to 48°C. Dedicated rear vents
                ensure rapid cabin chilling to 22°C within minutes of boarding.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 text-xs font-semibold text-text">
              Pre-Cooled Before Pickup
            </div>
          </div>

          {/* Card 3: Luggage Stowing */}
          <div className="rounded-3xl border border-line bg-mist/60 p-8 flex flex-col justify-between">
            <div>
              <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-gold-deep block mb-2">
                03 · Cargo Volume
              </span>
              <h3 className="text-xl font-semibold text-text mb-3">
                Secure Boot &amp; Luggage Space
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Stowage designed for airport trolley cases and duffels. Clean, covered boot
                keeps your luggage dust-free across desert highways.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 text-xs font-semibold text-text">
              Capacity: {vehicle.luggage}
            </div>
          </div>
        </div>

        {/* Ideal Trip Profiles Pill Strip */}
        <div className="mt-8 rounded-3xl border border-line bg-white p-6 md:p-8 shadow-xs">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
            Optimal Use Cases for {vehicle.name}:
          </h4>
          <div className="flex flex-wrap gap-3">
            {vehicle.idealFor.map((use) => (
              <span
                key={use}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-snow px-4 py-2 text-xs font-medium text-text"
              >
                <Check className="h-3.5 w-3.5 text-gold-deep shrink-0" />
                <span>{use}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Outstation Rates for This Vehicle (Spec Sheet) */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="Route Spec Sheet"
          title={`Intercity Fares with ${vehicle.name}`}
          description={`Starting fixed rates for major highway departures from Jodhpur in a ${vehicle.name}.`}
        />

        <div className="mt-8">
          <Table caption={`Intercity fares for ${vehicle.name} by route`}>
            <thead>
              <tr>
                <th scope="col" className={thClass}>Destination</th>
                <th scope="col" className={thClass}>Highway Distance</th>
                <th scope="col" className={thClass}>Drive Time</th>
                <th scope="col" className={thClass}>One-Way Fare</th>
              </tr>
            </thead>
            <tbody>
              {routeCards.map(({ route, estimate }) => (
                <tr key={route.slug}>
                  <td className={tdClass}>
                    <Link
                      href={`/${route.slug}`}
                      className="font-medium text-text hover:text-gold-deep transition-colors"
                    >
                      {route.from} to {route.to}
                    </Link>
                  </td>
                  <td className={tdClass}>{route.distanceKm} km</td>
                  <td className={tdClass}>{route.durationHours} hrs</td>
                  <td className={tdClass}>
                    <span className="tabular font-semibold text-gold-deep">
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
          <div className="rounded-3xl border border-line bg-white p-6 shadow-xs">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-3">
              Standard Fare Inclusions
            </span>
            <ul className="space-y-2 text-xs text-text-muted">
              {fareIncludes.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-xs">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-3">
              Billed at Government Actuals
            </span>
            <ul className="space-y-2 text-xs text-text-muted">
              {fareExcludes.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-text-muted font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Dedicated Reservation Tray */}
      <section id="booking-tray" className="scroll-mt-24 bg-snow border-y border-line py-16 md:py-24">
        <Container className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="eyebrow text-gold-deep font-semibold uppercase tracking-wider block mb-2">
              Direct Reservation
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-text">
              Reserve Your {vehicle.name}
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Select dates and route to generate your formatted written reservation.
            </p>
          </div>

          <div className="max-w-xl mx-auto rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm">
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
        <SectionHeader
          eyebrow="Questions"
          title={`${vehicle.name} FAQs`}
        />
        <div className="mt-8 max-w-4xl mx-auto">
          <Accordion items={vehicle.faqs} defaultOpen={0} />
        </div>
      </Section>

      {/* Compare Other Fleet Classes */}
      <Section tone="snow" size="md">
        <SectionHeader
          eyebrow="Compare Fleet"
          title="Alternative Vehicle Categories"
        />
        <div className="grid gap-6 sm:grid-cols-3 mt-8">
          {otherVehicles.map((other) => (
            <Link
              key={other.slug}
              href={`/${other.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
            >
              <div>
                <MediaFrame
                  label={other.name}
                  alt={other.imageAlt}
                  aspect="16 / 9"
                  icon="car"
                />
                <h3 className="mt-4 text-base font-semibold text-text group-hover:text-gold-deep transition-colors">
                  {other.name}
                </h3>
                <p className="mt-1 text-xs text-text-muted">
                  {other.seats} seats · {formatRupees(other.perKm)}/km
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-line/70 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted group-hover:text-black">
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
