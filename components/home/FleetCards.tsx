"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Briefcase, MessageSquare, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
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
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="eyebrow text-gold mb-2 block font-semibold">Our fleet</span>
          <h2 className="text-text text-[clamp(2rem,3.8vw,3rem)] leading-[1.12] font-semibold tracking-[-0.02em]">
            Chauffeured AC cabs
          </h2>
          <p className="text-text-muted mt-2 max-w-[54ch] text-sm leading-relaxed md:text-base">
            Our own yellow-plate fleet: clean air-conditioned vehicles, roof luggage
            carriers, and local Marwari drivers holding commercial permits.
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
        <ul
          className={`flex snap-x snap-mandatory scrollbar-none gap-6 overflow-x-auto pb-4 md:overflow-visible ${
            filteredVehicles.length === 1
              ? "md:flex md:justify-center"
              : filteredVehicles.length === 2
                ? "md:grid md:grid-cols-2 md:max-w-3xl md:mx-auto"
                : "md:grid md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredVehicles.map((vehicle, idx) => {
            const waBookingUrl = buildWhatsAppUrl(
              contextMessage(
                `Hi Marwad Cabs, I want to book the ${vehicle.name} for my trip.`,
              ),
            );

            const isLastOfSeven = filteredVehicles.length === 7 && idx === 6;

            return (
              <li
                key={vehicle.slug}
                className={`border-line hover:border-gold/50 flex shrink-0 snap-start flex-col rounded-3xl border bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-md ${
                  filteredVehicles.length === 1
                    ? "w-[85vw] sm:w-[380px] md:w-[400px]"
                    : isLastOfSeven
                      ? "w-[85vw] sm:w-[340px] md:w-auto md:col-span-2 md:max-w-md md:mx-auto lg:col-span-1 lg:col-start-2 lg:max-w-none lg:w-full"
                      : "w-[85vw] sm:w-[340px] md:w-auto"
                }`}
              >
                {/* Vehicle MediaFrame */}
                <div className="relative">
                  <MediaFrame
                    src={vehicle.image}
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
                    <div className="flex items-center justify-between gap-2 min-h-[1.75rem]">
                      <h3 className="text-text text-lg font-semibold tracking-[-0.01em]">
                        {vehicle.name}
                      </h3>
                      {vehicle.popular ? (
                        <Chip variant="gold" size="sm">
                          Top Choice
                        </Chip>
                      ) : null}
                    </div>

                    <p className="text-text-muted mt-1 text-xs font-medium">
                      {vehicle.models.join(" · ")}
                    </p>

                    {/* Capacity Specs (Structured rows to eliminate wrapping distortion) */}
                    <div className="text-text-muted mt-3 space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 font-medium">
                        <Users className="text-gold h-3.5 w-3.5 shrink-0" />
                        <span>{vehicle.seats}</span>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <Briefcase className="text-gold h-3.5 w-3.5 shrink-0" />
                        <span className="line-clamp-1">{vehicle.luggage}</span>
                      </div>
                    </div>

                    {/* Ideal For Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5 min-h-[1.75rem]">
                      {vehicle.idealFor.slice(0, 2).map((item) => (
                        <span
                          key={item}
                          className="border-line/70 bg-mist/60 text-text-muted inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[0.6875rem] font-medium"
                        >
                          <span className="bg-gold h-1 w-1 rounded-full" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rate card & CTAs */}
                  <div className="border-line/70 mt-5 border-t pt-4">
                    <div className="mb-2 flex items-baseline justify-between">
                      <div>
                        <span className="tabular text-text text-2xl font-bold tracking-tight">
                          {formatRupees(vehicle.perKm)}
                        </span>
                        <span className="text-text-muted text-xs font-semibold">
                          {" "}
                          / km
                        </span>
                      </div>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        {vehicle.localPackages?.eightHours ?? "₹1,800 Local"}
                      </span>
                    </div>

                    <div className="text-text-muted mb-4 flex items-center justify-between text-[0.6875rem] font-medium">
                      <span>Min. {vehicle.dailyKmLimit} km/day</span>
                      <span>Driver Bhatta: {vehicle.driverBhatta ?? "₹300/day"}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={waBookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-emerald-500"
                      >
                        <MessageSquare className="h-3.5 w-3.5 fill-current" />
                        <span>Book on WA</span>
                      </a>

                      <Link
                        href={`/${vehicle.slug}`}
                        className="border-line bg-mist/60 hover:bg-mist text-text inline-flex items-center justify-center gap-1 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="text-gold h-3 w-3" />
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
