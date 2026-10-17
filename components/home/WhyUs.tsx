import Link from "next/link";
import { BadgeCheck, CalendarClock, IndianRupee, Route, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Tile";
import { Chip } from "@/components/ui/Chip";

export function WhyUs() {
  return (
    <Section tone="snow" size="md">
      <SectionHeader
        eyebrow="The BuildBlock Standard"
        title="Reliability in Every Kilometre"
        description="We eliminate travel uncertainty with fixed rates, vetted drivers, and transparent communication from pickup to destination."
      />

      {/* Bento Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Large Tile (spans 2 columns on lg) */}
        <Tile
          icon={<IndianRupee className="h-5 w-5" />}
          badge="Guaranteed Transparency"
          title="Fares Published and Verified Upfront"
          subtitle="Every route and vehicle has an exact per-kilometre rate. The calculation shows distance, vehicle tier, and total before you confirm anything."
          highlight
          className="lg:col-span-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Chip variant="gold">Zero Online Advance</Chip>
              <Chip variant="default">Tolls at Exact Cost</Chip>
              <Chip variant="default">No Hidden Driver Fees</Chip>
            </div>
            <Link
              href="/taxi-fare"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-deep hover:text-black transition-colors"
            >
              See Fare Calculator <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Tile>

        {/* Tile 2 */}
        <Tile
          icon={<CalendarClock className="h-5 w-5" />}
          badge="Flight Sync"
          title="Punctual Airport Dispatches"
          subtitle="Early morning flights or midnight arrivals — driver arrives 15 minutes before landing with nameplate greeting."
        >
          <Link
            href="/airport-taxi-jodhpur"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-text transition-colors"
          >
            Airport Transfers <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Tile>

        {/* Tile 3 */}
        <Tile
          icon={<BadgeCheck className="h-5 w-5" />}
          badge="Commercial License"
          title="Verified Highway Chauffeurs"
          subtitle="Every driver holds a commercial licence with 5+ years of highway experience across Rajasthan roads."
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-text transition-colors"
          >
            How We Operate <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Tile>

        {/* Large Tile (spans 2 columns on lg) */}
        <Tile
          icon={<Route className="h-5 w-5" />}
          dark
          highlight
          badge="Round Trips"
          title="One Dedicated Vehicle Across Your Entire Tour"
          subtitle="Keep the exact same car and driver across multi-day circuits. Sightseeing detours at Ranakpur or Kumbhalgarh are seamlessly accommodated."
          className="lg:col-span-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Chip variant="dark">Custom Detours</Chip>
              <Chip variant="gold">Fixed Daily Minimums</Chip>
            </div>
            <Link
              href="/round-trip-taxi-jodhpur"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold hover:text-white transition-colors"
            >
              Explore Round Trips <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Tile>
      </div>
    </Section>
  );
}
