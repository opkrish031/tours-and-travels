"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { routes } from "@/data/routes";
import { formatRupees } from "@/lib/fare";
import { durationLabel } from "@/lib/format";

export function RoutesGrid() {
  const [showAll, setShowAll] = useState(false);
  const visibleRoutes = showAll ? routes : routes.slice(0, 6);

  return (
    <Section tone="mist" size="md">
      <SectionHeader
        eyebrow="Outstation"
        title="Routes we run from Jodhpur"
        description="Private chauffeur service from Jodhpur to major cities, heritage towns, and desert destinations with fixed starting fares."
      />

      {/* Typographic Index with Hover Dim */}
      <div className="group/list divide-line border-line divide-y overflow-hidden rounded-3xl border bg-white/70 shadow-xs backdrop-blur-md">
        {visibleRoutes.map((route) => (
          <Link
            key={route.slug}
            href={`/${route.slug}`}
            className="group flex flex-col justify-between gap-4 p-6 transition-all duration-200 group-hover/list:opacity-45 hover:bg-white hover:!opacity-100 sm:px-8 sm:py-6 md:flex-row md:items-center"
          >
            {/* Route title & tagline */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-text text-lg font-semibold tracking-tight group-hover:text-black md:text-xl">
                  {route.from} <span className="text-gold-deep mx-1">→</span> {route.to}
                </h3>
              </div>
              <p className="text-text-muted mt-1 text-xs md:text-sm">{route.tagline}</p>
            </div>

            {/* Metrics */}
            <div className="text-text-muted flex items-center gap-6 text-xs sm:text-sm md:gap-10">
              <div>
                <span className="text-text-muted/70 block text-[0.6875rem]">
                  Distance
                </span>
                <span className="tabular text-text font-medium">
                  {route.distanceKm} km
                </span>
              </div>

              <div>
                <span className="text-text-muted/70 block text-[0.6875rem]">
                  Est. Time
                </span>
                <span className="tabular text-text font-medium">
                  {durationLabel(route.durationHours)}
                </span>
              </div>

              <div>
                <span className="text-text-muted/70 block text-[0.6875rem]">From</span>
                <span className="tabular text-gold-deep text-base font-semibold">
                  {formatRupees(route.startingFare)}
                </span>
              </div>

              <div className="border-line bg-mist text-text flex h-9 w-9 items-center justify-center rounded-full border transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-black group-hover:text-white">
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {routes.length > 6 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="border-line text-text hover:border-gold hover:text-gold-deep inline-flex cursor-pointer items-center gap-2 rounded-full border bg-white px-5 py-2.5 text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <span>
              {showAll
                ? "Show Fewer Routes"
                : `View All ${routes.length} Intercity Routes`}
            </span>
            {showAll ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    </Section>
  );
}
