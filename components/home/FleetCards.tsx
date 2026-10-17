"use client";

import { useState } from "react";
import { Users, Briefcase } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Button } from "@/components/ui/Button";
import { vehicles } from "@/data/vehicles";
import { formatRupees } from "@/lib/fare";
import { Chip } from "@/components/ui/Chip";

type FleetFilter = "all" | "sedan" | "suv" | "tempo";

export function FleetCards() {
  const [filter, setFilter] = useState<FleetFilter>("all");

  const filteredVehicles = vehicles.filter((v) => {
    if (filter === "all") return true;
    if (filter === "sedan") return v.slug.includes("sedan");
    if (filter === "suv") return v.slug.includes("suv") || v.slug.includes("innova");
    if (filter === "tempo") return v.slug.includes("tempo");
    return true;
  });

  return (
    <Section tone="snow" size="md">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="eyebrow text-gold-deep font-semibold uppercase tracking-wider block mb-1">
            Our Fleet
          </span>
          <h2 className="text-[clamp(2rem,3.8vw,3.25rem)] font-semibold tracking-[-0.035em] leading-[1.08] text-text">
            Chauffeured Vehicles For Every Group
          </h2>
          <p className="mt-2 text-text-muted max-w-[50ch] text-sm md:text-base leading-relaxed">
            Spotless interiors, verified drivers, and transparent per-kilometre pricing with daily limits disclosed upfront.
          </p>
        </div>

        <div>
          <SegmentedControl<FleetFilter>
            options={[
              { value: "all", label: "All Vehicles" },
              { value: "sedan", label: "Sedans" },
              { value: "suv", label: "SUVs" },
              { value: "tempo", label: "Group Coaches" },
            ]}
            value={filter}
            onChange={setFilter}
            size="sm"
          />
        </div>
      </div>

      {/* Snap Carousel Container */}
      <div className="-mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
        <ul className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none lg:grid lg:grid-cols-4 lg:overflow-visible">
          {filteredVehicles.map((vehicle) => (
            <li
              key={vehicle.slug}
              className="flex w-[82vw] sm:w-[320px] lg:w-auto shrink-0 snap-start flex-col rounded-3xl border border-line bg-white p-5 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
            >
              {/* Vehicle MediaFrame */}
              <div className="relative">
                <MediaFrame
                  label={`${vehicle.name}`}
                  alt={vehicle.imageAlt}
                  aspect="4 / 3"
                  icon="car"
                  category={vehicle.popular ? "Most Booked" : undefined}
                />
              </div>

              {/* Specs and Details */}
              <div className="mt-5 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-text">
                      {vehicle.name}
                    </h3>
                    {vehicle.popular ? (
                      <Chip variant="gold" size="sm">
                        Popular
                      </Chip>
                    ) : null}
                  </div>

                  <p className="text-xs text-text-muted mt-1">
                    {vehicle.models.join(" · ")}
                  </p>

                  <div className="mt-3 flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-gold-deep" />
                      {vehicle.seats} seats
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-gold-deep" />
                      {vehicle.luggage}
                    </span>
                  </div>
                </div>

                {/* Rate card & CTA */}
                <div className="mt-6 pt-4 border-t border-line/70">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="tabular text-2xl font-bold tracking-tight text-text">
                        {formatRupees(vehicle.perKm)}
                      </span>
                      <span className="text-xs text-text-muted"> / km</span>
                    </div>
                    <span className="text-xs text-text-muted tabular">
                      Min. {vehicle.dailyKmLimit} km/day
                    </span>
                  </div>

                  <Button
                    href={`/${vehicle.slug}`}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    arrow
                  >
                    View Vehicle
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
