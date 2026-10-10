import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { routes } from "@/data/routes";
import { formatRupees } from "@/lib/fare";
import { durationLabel } from "@/lib/format";

export function RoutesGrid() {
  return (
    <Section tone="sand" size="md">
      <SectionHeader
        number="04"
        eyebrow="Popular routes"
        title="Jodhpur to Rajasthan, distance by distance"
        description="Starting fares are for a sedan, one way, from Jodhpur. Open a route for the full price table, sights along the way, and the FAQ."
      />
      <ul className="bg-line mt-10 grid gap-px sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {routes.map((route) => (
          <li key={route.slug} className="bg-sand">
            <Link
              href={`/${route.slug}`}
              className="group hover:bg-paper flex h-full flex-col p-6 transition-colors duration-200 lg:p-7"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[1.0625rem] leading-snug font-medium">
                  {route.from} to {route.to}
                </h3>
                <span
                  aria-hidden="true"
                  className="text-stone-light group-hover:text-brass-deep transition-colors"
                >
                  →
                </span>
              </div>
              <p className="text-stone mt-1 text-sm font-medium italic">
                {route.tagline}
              </p>
              <dl className="text-stone mt-5 flex flex-wrap gap-x-6 gap-y-1.5 text-sm">
                <div className="flex gap-1.5">
                  <dt className="text-stone-light">Distance</dt>
                  <dd className="tabular text-ink">{route.distanceKm} km</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-stone-light">Time</dt>
                  <dd className="tabular text-ink">
                    {durationLabel(route.durationHours)}
                  </dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-stone-light">From</dt>
                  <dd className="tabular text-ink">{formatRupees(route.startingFare)}</dd>
                </div>
              </dl>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
