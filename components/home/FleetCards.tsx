"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Briefcase, MessageSquare, ArrowRight, ShieldCheck, Fuel } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Button } from "@/components/ui/Button";
import { vehicles } from "@/data/vehicles";
import { formatRupees } from "@/lib/fare";
import { Chip } from "@/components/ui/Chip";
import { buildWhatsAppUrl, contextMessage } from "@/lib/whatsapp";

type FleetFilter = "all" | "sedan" | "suv" | "tempo";

export function FleetCards() {
  const [filter, setFilter] = useState<FleetFilter>("all");

  const filteredVehicles = vehicles.filter((v) => {
    if (filter === "all") return true;
    if (filter === "sedan") return v.category === "sedan";
    if (filter === "suv") return v.category === "suv" || v.category === "mpv";
    if (filter === "tempo") return v.category === "tempo";
    return true;
  });

  return (
    <Section tone="snow" size="md">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="eyebrow text-gold font-bold uppercase tracking-wider block mb-1">
            Marwad Cabs Fleet
          </span>
          <h2 className="text-[clamp(2rem,3.8vw,3.25rem)] font-bold font-serif tracking-tight leading-[1.08] text-text">
            Chauffeured AC Cabs & Fixed Rates
          </h2>
          <p className="mt-2 text-text-muted max-w-[54ch] text-sm md:text-base leading-relaxed">
            Direct taxi operator fleet with clean air-conditioned vehicles, roof luggage carriers, and verified local Marwari drivers. No hidden fees or night surcharges.
          </p>
        </div>

        <div>
          <SegmentedControl<FleetFilter>
            options={[
              { value: "all", label: "All Vehicles" },
              { value: "sedan", label: "Sedans" },
              { value: "suv", label: "SUVs & MPVs" },
              { value: "tempo", label: "Tempo Travellers" },
            ]}
            value={filter}
            onChange={setFilter}
            size="sm"
          />
        </div>
      </div>

      {/* Responsive Grid of Cards */}
      <div className="-mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
        <ul className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none lg:grid lg:grid-cols-3 lg:overflow-visible">
          {filteredVehicles.map((vehicle) => {
            const waBookingUrl = buildWhatsAppUrl(
              contextMessage(`Hi Marwad Cabs, I want to book the ${vehicle.name} for my trip.`),
            );

            return (
              <li
                key={vehicle.slug}
                className="flex w-[85vw] sm:w-[340px] lg:w-auto shrink-0 snap-start flex-col rounded-3xl border border-line bg-white p-5 shadow-xs transition-all duration-300 hover:border-gold/50 hover:shadow-md"
              >
                {/* Vehicle MediaFrame */}
                <div className="relative">
                  <MediaFrame
                    label={`${vehicle.name}`}
                    alt={vehicle.imageAlt}
                    aspect="4 / 3"
                    icon="car"
                    category={vehicle.popular ? "Most Popular" : undefined}
                  />
                </div>

                {/* Specs and Details */}
                <div className="mt-5 flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold font-serif tracking-tight text-text">
                        {vehicle.name}
                      </h3>
                      {vehicle.popular ? (
                        <Chip variant="gold" size="sm">
                          Top Choice
                        </Chip>
                      ) : null}
                    </div>

                    <p className="text-xs text-text-muted mt-1 font-medium">
                      {vehicle.models.join(" · ")}
                    </p>

                    {/* Capacity Specs */}
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1 font-medium">
                        <Users className="h-3.5 w-3.5 text-gold" />
                        {vehicle.seats}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium">
                        <Briefcase className="h-3.5 w-3.5 text-gold" />
                        {vehicle.luggage}
                      </span>
                    </div>

                    {/* Genuine Note */}
                    <p className="mt-3 text-xs text-text-muted/90 line-clamp-2 leading-relaxed italic bg-mist/40 p-2.5 rounded-xl border border-line/50">
                      &ldquo;{vehicle.comfort}&rdquo;
                    </p>
                  </div>

                  {/* Rate card & CTAs */}
                  <div className="mt-5 pt-4 border-t border-line/70">
                    <div className="flex items-baseline justify-between mb-2">
                      <div>
                        <span className="tabular text-2xl font-bold tracking-tight text-text">
                          {formatRupees(vehicle.perKm)}
                        </span>
                        <span className="text-xs font-semibold text-text-muted"> / km</span>
                      </div>
                      <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {vehicle.localPackages?.eightHours ?? "₹1,800 Local"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[0.6875rem] text-text-muted mb-4 font-medium">
                      <span>Min. {vehicle.dailyKmLimit} km/day</span>
                      <span>Driver Bhatta: {vehicle.driverBhatta ?? "₹300/day"}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={waBookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 px-3 text-xs font-bold text-white transition-colors shadow-xs"
                      >
                        <MessageSquare className="h-3.5 w-3.5 fill-current" />
                        <span>Book on WA</span>
                      </a>

                      <Link
                        href={`/${vehicle.slug}`}
                        className="inline-flex items-center justify-center gap-1 rounded-xl border border-line bg-mist/60 hover:bg-mist py-2.5 px-3 text-xs font-semibold text-text transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="h-3 w-3 text-gold" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
