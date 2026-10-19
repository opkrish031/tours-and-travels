import Link from "next/link";
import { BadgeCheck, CalendarClock, IndianRupee, Route, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Tile";
import { Chip } from "@/components/ui/Chip";

export function WhyUs() {
  return (
    <Section tone="snow" size="md">
      <SectionHeader
        eyebrow="How we work"
        title="Straightforward, start to finish"
        description="Published per-km rates, drivers with commercial permits, and the full fare in writing before pickup. No commission on trips, no detours you didn’t ask for."
      />

      {/* Bento Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Large Tile (spans 2 columns on lg) */}
        <Tile
          icon={<IndianRupee className="h-5 w-5" />}
          badge="Published Rates"
          title="The rate you see is the rate you pay"
          subtitle="Every route and vehicle has a per-km rate. The calculator shows distance, vehicle tier, and the estimate before you confirm anything."
          highlight
          className="lg:col-span-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Chip variant="gold">Zero Online Advance</Chip>
              <Chip variant="default">Tolls at Actuals</Chip>
              <Chip variant="default">Allowance Stated Upfront</Chip>
            </div>
            <Link
              href="/taxi-fare"
              className="text-gold-deep inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-black"
            >
              See Fare Calculator <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Tile>

        {/* Tile 2 */}
        <Tile
          icon={<CalendarClock className="h-5 w-5" />}
          badge="Airport"
          title="Airport and station pickups"
          subtitle="We track your flight or train. The driver plans to reach the terminal or platform before you do, whatever the hour."
        >
          <Link
            href="/airport-taxi-jodhpur"
            className="text-text-muted hover:text-text inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
          >
            Airport Transfers <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Tile>

        {/* Tile 3 */}
        <Tile
          icon={<BadgeCheck className="h-5 w-5" />}
          badge="Commercial Permit"
          title="Licensed local drivers"
          subtitle="Every driver carries a commercial tourist-vehicle permit and drives the Rajasthan highways we quote on regularly."
        >
          <Link
            href="/about"
            className="text-text-muted hover:text-text inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
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
          title="The same car and driver for your whole trip"
          subtitle="One vehicle stays with you across multi-day circuits. Extra stops like Ranakpur or Kumbhalgarh are agreed in the quote — no surprise fees at the end."
          className="lg:col-span-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Chip variant="dark">Stops Agreed Upfront</Chip>
              <Chip variant="gold">250 km/Day Minimum</Chip>
            </div>
            <Link
              href="/round-trip-taxi-jodhpur"
              className="text-gold inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-white"
            >
              Explore Round Trips <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Tile>
      </div>
    </Section>
  );
}
