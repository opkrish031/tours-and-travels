import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/data/site";
import { vehicles } from "@/data/vehicles";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `About ${site.brandName} — Jodhpur Chauffeur Service`,
    description: `${site.brandName} runs chauffeur-driven cabs from Jodhpur: licensed drivers, published per-km rates, and written fare estimates before every booking.`,
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Apple Editorial Hero: Confident, Typographic, Restrained */}
      <section className="relative overflow-hidden bg-black text-text-dark border-b border-line-dark pt-12 pb-20 md:pt-20 md:pb-28">
        <Container className="relative z-10 max-w-4xl mx-auto text-center">
          <Breadcrumbs items={[{ label: "Our Ethos" }]} />

          <div className="mt-6">
            <span className="eyebrow text-gold font-semibold uppercase tracking-wider block mb-3">
              How We Run · Jodhpur, Marwar
            </span>
            <h1 className="text-[clamp(2.1rem,5vw,3.6rem)] font-semibold tracking-[-0.02em] leading-[1.12] text-white">
              A Jodhpur fleet, run properly.
            </h1>
            <p className="mt-6 text-base md:text-xl text-text-dark-muted max-w-[54ch] mx-auto leading-relaxed">
              Taxi travel in Rajasthan shouldn’t involve haggling at the airport gate or
              wondering what the bill will say. We publish our per-km rates, use only
              commercially licensed vehicles, and put the full fare in writing before you travel.
            </p>

            {/* Micro-Spec Ticker */}
            <div className="mt-12 pt-8 border-t border-line-dark/70 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs text-text-dark-muted">
              <div>
                <span className="tabular block text-lg md:text-xl font-bold text-white mb-0.5">
                  Yellow-plate
                </span>
                <span>Commercial vehicles only</span>
              </div>
              <div>
                <span className="tabular block text-lg md:text-xl font-bold text-white mb-0.5">
                  ₹0
                </span>
                <span>Advance to book</span>
              </div>
              <div>
                <span className="tabular block text-lg md:text-xl font-bold text-white mb-0.5">
                  Written
                </span>
                <span>Quote before pickup</span>
              </div>
              <div>
                <span className="tabular block text-lg md:text-xl font-bold text-white mb-0.5">
                  Ratanada
                </span>
                <span>Base near JDH &amp; Junction</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial Pull-Quote Statement */}
      <section className="bg-snow border-b border-line py-20 md:py-28">
        <Container className="max-w-4xl mx-auto">
          <div className="relative pl-8 md:pl-12 border-l-2 border-gold">
            <p className="text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-text leading-relaxed">
              &ldquo;Whether it’s dawn at Mehrangarh or a long run across the Thar to
              Jaisalmer, the last thing you should have to negotiate is the fare or who’s
              driving.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="font-semibold text-text text-sm">{site.brandName} Operations Desk</span>
              <span className="text-line text-xs">/</span>
              <span className="text-text-muted text-xs">Ratanada Base, Jodhpur</span>
            </div>
          </div>
        </Container>
      </section>

      {/* The Two Travel Paradigms (Apple Side-by-Side Comparison) */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="Why book direct"
          title="Booking direct, without the middlemen"
          description="On an app, the driver is whoever was free that day and the bill often changes at the end. We run a small permanent fleet and quote the whole trip upfront."
        />

        <div className="grid gap-6 md:grid-cols-2 mt-10">
          {/* Column A: Aggregator Reality */}
          <div className="rounded-3xl border border-line bg-white/70 p-8 shadow-xs">
            <div className="inline-block text-[0.6875rem] font-semibold uppercase tracking-wider text-text-muted mb-2">
              The Usual Arrangement
            </div>
            <h3 className="text-xl font-semibold text-text mb-4">
              App &amp; Broker Networks
            </h3>
            <ul className="space-y-3.5 text-sm text-text-muted">
              <li className="flex items-start gap-3">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>A different driver each trip, sourced through local brokers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>Tolls and state taxes settled in cash at trip end, often at marked-up rates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>AC switched off on ghat stretches to save fuel.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>Cancellations when festival demand pushes the surge.</span>
              </li>
            </ul>
          </div>

          {/* Column B: Marwad Cabs Standard */}
          <div className="rounded-3xl border border-gold/40 bg-white p-8 shadow-xs relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-gold/10 blur-2xl"
            />
            <div className="inline-block text-[0.6875rem] font-semibold uppercase tracking-wider text-gold-deep mb-2">
              How We Work
            </div>
            <h3 className="text-xl font-semibold text-text mb-4">
              One fleet, one quote
            </h3>
            <ul className="space-y-3.5 text-sm text-text leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>The same pool of drivers, trip after trip — all commercially permitted.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Tolls billed on FASTag at the actual receipt amount.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>AC checked before long trips — it is Rajasthan, this isn’t optional.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Trip details and your driver’s number sent before pickup.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* The Four Tenets of Chauffeur Craft (Apple Asymmetric Grid) */}
      <Section tone="snow" size="md">
        <SectionHeader
          eyebrow="Principles"
          title="Four things we don’t cut corners on"
          description="Whether it’s a 5 am railway pickup or a fortnight Rajasthan circuit, these are the same either way."
        />

        <div className="grid gap-6 md:grid-cols-2 mt-10">
          {/* Tenet 01 */}
          <div className="rounded-3xl border border-line bg-mist/60 p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Tenet 01
              </span>
              <h3 className="text-xl font-semibold text-text mb-3">
                Commercially licensed drivers only
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Every driver carries a valid commercial tourist-vehicle permit and ID on file
                with us. No unlicensed subcontracting — if we can’t cover a trip with our own
                drivers, we tell you before you book, not after.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 text-xs font-semibold uppercase tracking-wider text-text">
              No random third-party drivers
            </div>
          </div>

          {/* Tenet 02 */}
          <div className="rounded-3xl border border-line bg-mist/60 p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Tenet 02
              </span>
              <h3 className="text-xl font-semibold text-text mb-3">
                AC that works, checked before departure
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Rajasthan summers are unforgiving, so AC gets checked before outstation
                departures — gas, cooling, the lot. If a car’s AC isn’t right, that car doesn’t
                go; we send another one.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 text-xs font-semibold uppercase tracking-wider text-text">
              Working AC on every trip
            </div>
          </div>

          {/* Tenet 03 */}
          <div className="rounded-3xl border border-line bg-mist/60 p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Tenet 03
              </span>
              <h3 className="text-xl font-semibold text-text mb-3">
                The fare, written down before you travel
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Per-km rate, daily minimum, driver allowance, tolls — all of it, in the quote,
                before you confirm. Nothing gets renegotiated on the highway or at the end of
                the trip.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 text-xs font-semibold uppercase tracking-wider text-text">
              Published rates, itemised quotes
            </div>
          </div>

          {/* Tenet 04 */}
          <div className="rounded-3xl border border-line bg-mist/60 p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Tenet 04
              </span>
              <h3 className="text-xl font-semibold text-text mb-3">
                A real person on the phone
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Our desk in Ratanada handles the booking and tracks your flight or train. When
                you call, you get someone who knows the routes and the drivers — not a call
                centre reading a script.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 text-xs font-semibold uppercase tracking-wider text-text">
              Local desk, direct answers
            </div>
          </div>
        </div>
      </Section>

      {/* Fleet Standards Showcase */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="The fleet"
          title="What we run"
          description="Sedans, SUVs and Tempo Travellers — all commercial yellow-plate vehicles, kept clean and in working order."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.slug}
              className="flex flex-col justify-between rounded-3xl border border-line bg-white p-5 shadow-xs"
            >
              <div>
                <MediaFrame
                  label={vehicle.name}
                  alt={vehicle.imageAlt}
                  aspect="4 / 3"
                  icon="car"
                />
                <h3 className="mt-4 text-base font-semibold text-text">
                  {vehicle.name}
                </h3>
                <p className="mt-1 text-xs text-text-muted">
                  {vehicle.seats} seats · {vehicle.luggage}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-line/60">
                <Link
                  href={`/${vehicle.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold-deep hover:text-black transition-colors"
                >
                  Explore {vehicle.name} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
