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
    description: `${site.brandName} operates premium chauffeur-driven cabs from Jodhpur: licensed drivers, published per-km rates, and written fare estimates before every booking.`,
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
              Values &amp; Chauffeur Philosophy · Jodhpur, Marwar
            </span>
            <h1 className="text-[clamp(2.6rem,6vw,4.6rem)] font-semibold tracking-[-0.035em] leading-[1.04] text-white">
              Built for Marwar Roads. Driven by Restraint.
            </h1>
            <p className="mt-6 text-base md:text-xl text-text-dark-muted max-w-[54ch] mx-auto leading-relaxed">
              We believe road travel across Rajasthan should be as serene as the destination.
              No haggling at airport gates, no uninspected vehicles, no surprise toll surcharges.
              Just quiet professionalism, published per-kilometre rates, and verified local chauffeurs.
            </p>

            {/* Micro-Spec Ticker */}
            <div className="mt-12 pt-8 border-t border-line-dark/70 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs text-text-dark-muted">
              <div>
                <span className="tabular block text-lg md:text-xl font-bold text-white mb-0.5">
                  100%
                </span>
                <span>Commercial Yellow-Plate</span>
              </div>
              <div>
                <span className="tabular block text-lg md:text-xl font-bold text-white mb-0.5">
                  ₹0
                </span>
                <span>Surge Pricing Ever</span>
              </div>
              <div>
                <span className="tabular block text-lg md:text-xl font-bold text-white mb-0.5">
                  22°C
                </span>
                <span>Pre-Cooled Dual AC</span>
              </div>
              <div>
                <span className="tabular block text-lg md:text-xl font-bold text-white mb-0.5">
                  15 Min
                </span>
                <span>Early Arrival Buffer</span>
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
              &ldquo;When you arrive in Jodhpur — whether for dawn light at Mehrangarh Fort
              or a 300-kilometre run across the Thar to Jaisalmer — the last thing you
              should negotiate is your safety or your driver&rsquo;s integrity.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="font-semibold text-text text-sm">{site.brandName} Operations Desk</span>
              <span className="text-line text-xs">/</span>
              <span className="text-text-muted text-xs">Paota Base, Jodhpur</span>
            </div>
          </div>
        </Container>
      </section>

      {/* The Two Travel Paradigms (Apple Side-by-Side Comparison) */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="The Distinction"
          title="Why We Reject the Aggregator Model"
          description="Most booking platforms trade driver vetting and vehicle consistency for algorithmic scale. We run a dedicated, permanent fleet."
        />

        <div className="grid gap-6 md:grid-cols-2 mt-10">
          {/* Column A: Aggregator Reality */}
          <div className="rounded-3xl border border-line bg-white/70 p-8 shadow-xs">
            <div className="inline-block text-[0.6875rem] font-semibold uppercase tracking-wider text-text-muted mb-2">
              The Common Compromise
            </div>
            <h3 className="text-xl font-semibold text-text mb-4">
              Generic App &amp; Broker Networks
            </h3>
            <ul className="space-y-3.5 text-sm text-text-muted">
              <li className="flex items-start gap-3">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>Unvetted drivers subcontracted across unregulated messaging groups.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>Arbitrary toll and state tax markups demanded in cash at trip end.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>Air-conditioning turned off or underperforming in 45°C Rajasthan summer.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>Last-minute booking cancellations when festival demand spikes.</span>
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
              The Marwad Cabs Standard
            </div>
            <h3 className="text-xl font-semibold text-text mb-4">
              Disciplined Fleet Discipline
            </h3>
            <ul className="space-y-3.5 text-sm text-text leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Permanent, verified highway chauffeurs with commercial permits.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Electronic FASTag tolls billed strictly at physical barrier receipt value.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Dual-chiller climate systems verified prior to each outstation departure.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>Written reservation contract and driver allocation sent in advance.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* The Four Tenets of Chauffeur Craft (Apple Asymmetric Grid) */}
      <Section tone="snow" size="md">
        <SectionHeader
          eyebrow="Operating Tenets"
          title="Four Principles We Never Compromise On"
          description="Every booking, from a quick dawn railway transfer to a fortnight Rajasthan circuit, adheres to these baseline standards."
        />

        <div className="grid gap-6 md:grid-cols-2 mt-10">
          {/* Tenet 01 */}
          <div className="rounded-3xl border border-line bg-mist/60 p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Tenet 01
              </span>
              <h3 className="text-xl font-semibold text-text mb-3">
                Licensed Commercial Chauffeurs Only
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Every driver holds a valid commercial tourist vehicle badge, verified identity
                records, and defensive driving experience on Rajasthan national highways.
                Cabins are strictly non-smoking, clean, and maintained with quiet respect.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 text-xs font-semibold uppercase tracking-wider text-text">
              Zero Unlicensed Subcontracting
            </div>
          </div>

          {/* Tenet 02 */}
          <div className="rounded-3xl border border-line bg-mist/60 p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Tenet 02
              </span>
              <h3 className="text-xl font-semibold text-text mb-3">
                The 45°C Dual-Climate Guarantee
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Rajasthan summers are unforgiving. Every vehicle in our fleet is mechanically
                audited for AC compressor performance, refrigerant pressures, and cabin filters.
                Vehicles are pre-chilled to 22°C before airport and railway pickups.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 text-xs font-semibold uppercase tracking-wider text-text">
              Full Highway Cabin Chilling
            </div>
          </div>

          {/* Tenet 03 */}
          <div className="rounded-3xl border border-line bg-mist/60 p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Tenet 03
              </span>
              <h3 className="text-xl font-semibold text-text mb-3">
                Itemized Written Pricing First
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Nothing is locked without your explicit approval. Per-kilometre rates, daily
                minimums, night allowances, and toll calculation policies are documented in
                writing beforehand. You never negotiate on the highway.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 text-xs font-semibold uppercase tracking-wider text-text">
              Published Fixed Rates
            </div>
          </div>

          {/* Tenet 04 */}
          <div className="rounded-3xl border border-line bg-mist/60 p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Tenet 04
              </span>
              <h3 className="text-xl font-semibold text-text mb-3">
                Dedicated 24/7 Human Dispatch
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Our base in Paota, Jodhpur monitors highway travel conditions, airport flight
                arrival delays, and en-route timing. When you message, you connect with an
                experienced dispatcher who knows the roads, not a scripted bot.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 text-xs font-semibold uppercase tracking-wider text-text">
              Direct Local Accountability
            </div>
          </div>
        </div>
      </Section>

      {/* Fleet Standards Showcase */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="The Fleet Standard"
          title="Four Disciplined Vehicle Categories"
          description="We maintain our fleet exclusively across four verified classes, with a strict vehicle age ceiling under 3.5 years."
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
