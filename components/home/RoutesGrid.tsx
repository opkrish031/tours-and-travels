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
      <div className="group/list divide-y divide-line rounded-3xl border border-line bg-white/70 backdrop-blur-md shadow-xs overflow-hidden">
        {visibleRoutes.map((route) => (
          <Link
            key={route.slug}
            href={`/${route.slug}`}
            className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:px-8 sm:py-6 transition-all duration-200 hover:bg-white group-hover/list:opacity-45 hover:!opacity-100"
          >
            {/* Route title & tagline */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-text group-hover:text-black">
                  {route.from} <span className="text-gold-deep mx-1">→</span> {route.to}
                </h3>
              </div>
              <p className="mt-1 text-xs md:text-sm text-text-muted">
                {route.tagline}
              </p>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-6 md:gap-10 text-xs sm:text-sm text-text-muted">
              <div>
                <span className="block text-[0.6875rem] uppercase text-text-muted/70">
                  Distance
                </span>
                <span className="tabular font-medium text-text">
                  {route.distanceKm} km
                </span>
              </div>

              <div>
                <span className="block text-[0.6875rem] uppercase text-text-muted/70">
                  Est. Time
                </span>
                <span className="tabular font-medium text-text">
                  {durationLabel(route.durationHours)}
                </span>
              </div>

              <div>
                <span className="block text-[0.6875rem] uppercase text-text-muted/70">
                  From
                </span>
                <span className="tabular text-base font-semibold text-gold-deep">
                  {formatRupees(route.startingFare)}
                </span>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-mist text-text transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-black group-hover:text-white">
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
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-xs font-semibold text-text shadow-xs hover:border-gold hover:text-gold-deep transition-all active:scale-95 cursor-pointer"
          >
            <span>{showAll ? "Show Fewer Routes" : `View All ${routes.length} Intercity Routes`}</span>
            {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      )}
    </Section>
  );
}
