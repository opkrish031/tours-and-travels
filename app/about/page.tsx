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
      <section className="text-text-dark border-line-dark relative overflow-hidden border-b bg-black pt-12 pb-20 md:pt-20 md:pb-28">
        <Container className="relative z-10 mx-auto max-w-4xl text-center">
          <Breadcrumbs items={[{ label: "Our Ethos" }]} />

          <div className="mt-6">
            <span className="eyebrow text-gold mb-3 block font-semibold">
              How We Run · Jodhpur, Marwar
            </span>
            <h1 className="text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-white">
              A Jodhpur fleet, run properly.
            </h1>
            <p className="text-text-dark-muted mx-auto mt-6 max-w-[54ch] text-base leading-relaxed md:text-xl">
              Taxi travel in Rajasthan shouldn’t involve haggling at the airport gate or
              wondering what the bill will say. We publish our per-km rates, use only
              commercially licensed vehicles, and put the full fare in writing before you
              travel.
            </p>

            {/* Micro-Spec Ticker */}
            <div className="border-line-dark/70 text-text-dark-muted mt-12 grid grid-cols-2 gap-6 border-t pt-8 text-center text-xs md:grid-cols-4">
              <div>
                <span className="tabular mb-0.5 block text-lg font-bold text-white md:text-xl">
                  Yellow-plate
                </span>
                <span>Commercial vehicles only</span>
              </div>
              <div>
                <span className="tabular mb-0.5 block text-lg font-bold text-white md:text-xl">
                  ₹0
                </span>
                <span>Advance to book</span>
              </div>
              <div>
                <span className="tabular mb-0.5 block text-lg font-bold text-white md:text-xl">
                  Written
                </span>
                <span>Quote before pickup</span>
              </div>
              <div>
                <span className="tabular mb-0.5 block text-lg font-bold text-white md:text-xl">
                  Ratanada
                </span>
                <span>Base near JDH &amp; Junction</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial Pull-Quote Statement */}
      <section className="bg-snow border-line border-b py-20 md:py-28">
        <Container className="mx-auto max-w-4xl">
          <div className="border-gold relative border-l-2 pl-8 md:pl-12">
            <p className="text-text text-xl leading-relaxed font-normal tracking-tight sm:text-2xl md:text-3xl">
              &ldquo;Whether it’s dawn at Mehrangarh or a long run across the Thar to
              Jaisalmer, the last thing you should have to negotiate is the fare or who’s
              driving.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-text text-sm font-semibold">
                {site.brandName} Operations Desk
              </span>
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

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Column A: Aggregator Reality */}
          <div className="border-line rounded-3xl border bg-white/70 p-8 shadow-xs">
            <div className="text-text-muted mb-2 inline-block text-[0.6875rem] font-semibold">
              The Usual Arrangement
            </div>
            <h3 className="text-text mb-4 text-xl font-semibold">
              App &amp; Broker Networks
            </h3>
            <ul className="text-text-muted space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-bold text-rose-600">✕</span>
                <span>A different driver each trip, sourced through local brokers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-bold text-rose-600">✕</span>
                <span>
                  Tolls and state taxes settled in cash at trip end, often at marked-up
                  rates.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-bold text-rose-600">✕</span>
                <span>AC switched off on ghat stretches to save fuel.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-bold text-rose-600">✕</span>
                <span>Cancellations when festival demand pushes the surge.</span>
              </li>
            </ul>
          </div>

          {/* Column B: Marwad Cabs Standard */}
          <div className="border-gold/40 relative overflow-hidden rounded-3xl border bg-white p-8 shadow-xs">
            <div
              aria-hidden="true"
              className="bg-gold/10 pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full blur-2xl"
            />
            <div className="text-gold-deep mb-2 inline-block text-[0.6875rem] font-semibold">
              How We Work
            </div>
            <h3 className="text-text mb-4 text-xl font-semibold">One fleet, one quote</h3>
            <ul className="text-text space-y-3.5 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-bold text-emerald-600">✓</span>
                <span>
                  The same pool of drivers, trip after trip — all commercially permitted.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-bold text-emerald-600">✓</span>
                <span>Tolls billed on FASTag at the actual receipt amount.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-bold text-emerald-600">✓</span>
                <span>
                  AC checked before long trips — it is Rajasthan, this isn’t optional.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 font-bold text-emerald-600">✓</span>
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

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Tenet 01 */}
          <div className="border-line bg-mist/60 flex flex-col justify-between rounded-3xl border p-8">
            <div>
              <span className="text-gold-deep tabular bg-gold/15 mb-4 inline-block rounded-full px-2.5 py-1 font-mono text-xs font-semibold">
                Tenet 01
              </span>
              <h3 className="text-text mb-3 text-xl font-semibold">
                Commercially licensed drivers only
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Every driver carries a valid commercial tourist-vehicle permit and ID on
                file with us. No unlicensed subcontracting — if we can’t cover a trip with
                our own drivers, we tell you before you book, not after.
              </p>
            </div>
            <div className="border-line/60 text-text mt-6 border-t pt-4 text-xs font-semibold">
              No random third-party drivers
            </div>
          </div>

          {/* Tenet 02 */}
          <div className="border-line bg-mist/60 flex flex-col justify-between rounded-3xl border p-8">
            <div>
              <span className="text-gold-deep tabular bg-gold/15 mb-4 inline-block rounded-full px-2.5 py-1 font-mono text-xs font-semibold">
                Tenet 02
              </span>
              <h3 className="text-text mb-3 text-xl font-semibold">
                AC that works, checked before departure
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Rajasthan summers are unforgiving, so AC gets checked before outstation
                departures — gas, cooling, the lot. If a car’s AC isn’t right, that car
                doesn’t go; we send another one.
              </p>
            </div>
            <div className="border-line/60 text-text mt-6 border-t pt-4 text-xs font-semibold">
              Working AC on every trip
            </div>
          </div>

          {/* Tenet 03 */}
          <div className="border-line bg-mist/60 flex flex-col justify-between rounded-3xl border p-8">
            <div>
              <span className="text-gold-deep tabular bg-gold/15 mb-4 inline-block rounded-full px-2.5 py-1 font-mono text-xs font-semibold">
                Tenet 03
              </span>
              <h3 className="text-text mb-3 text-xl font-semibold">
                The fare, written down before you travel
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Per-km rate, daily minimum, driver allowance, tolls — all of it, in the
                quote, before you confirm. Nothing gets renegotiated on the highway or at
                the end of the trip.
              </p>
            </div>
            <div className="border-line/60 text-text mt-6 border-t pt-4 text-xs font-semibold">
              Published rates, itemised quotes
            </div>
          </div>

          {/* Tenet 04 */}
          <div className="border-line bg-mist/60 flex flex-col justify-between rounded-3xl border p-8">
            <div>
              <span className="text-gold-deep tabular bg-gold/15 mb-4 inline-block rounded-full px-2.5 py-1 font-mono text-xs font-semibold">
                Tenet 04
              </span>
              <h3 className="text-text mb-3 text-xl font-semibold">
                A real person on the phone
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Our desk in Ratanada handles the booking and tracks your flight or train.
                When you call, you get someone who knows the routes and the drivers — not
                a call centre reading a script.
              </p>
            </div>
            <div className="border-line/60 text-text mt-6 border-t pt-4 text-xs font-semibold">
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

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.slug}
              className="border-line flex flex-col justify-between rounded-3xl border bg-white p-5 shadow-xs"
            >
              <div>
                <MediaFrame
                  src={vehicle.image}
                  label={vehicle.name}
                  alt={vehicle.imageAlt}
                  aspect="4 / 3"
                  icon="car"
                />
                <h3 className="text-text mt-4 text-base font-semibold">{vehicle.name}</h3>
                <p className="text-text-muted mt-1 text-xs">
                  {vehicle.seats} · {vehicle.luggage}
                </p>
              </div>

              <div className="border-line/60 mt-5 border-t pt-3">
                <Link
                  href={`/${vehicle.slug}`}
                  className="text-gold-deep inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:text-black"
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
