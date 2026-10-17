"use client";

import { useMemo, useState } from "react";
import { MapPin, Navigation, Car } from "lucide-react";
import { routes } from "@/data/routes";
import { services } from "@/data/services";
import { vehicles } from "@/data/vehicles";
import { trackEvent } from "@/lib/analytics";
import {
  DEFAULT_MIN_KM_PER_DAY,
  estimateFare,
  formatRupees,
  type FareResult,
  type TripType,
} from "@/lib/fare";
import { buildWhatsAppUrl, fareMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-graphite-2 px-4 py-3 text-sm text-text-dark transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";
const labelClass =
  "mb-2 block text-xs font-semibold tracking-tight text-text-dark-muted";

const localService = services.find((service) => (service.packages?.length ?? 0) > 0);
const packages = localService?.packages ?? [];
const pickupPoints = [...new Set(routes.map((route) => route.from))];

function allowedVehicleSlugs(dest: string): string[] {
  if (dest.startsWith("package:") && localService) {
    return localService.applicableVehicles;
  }
  return vehicles.map((vehicle) => vehicle.slug);
}

function defaultVehicleFor(dest: string): string {
  const allowed = allowedVehicleSlugs(dest);
  return allowed[0] ?? vehicles[0].slug;
}

function routeLabel(dest: string): string {
  if (dest.startsWith("package:")) {
    const index = Number(dest.slice("package:".length));
    return `Local sightseeing (${packages[index]?.label ?? ""})`;
  }
  const route = routes.find((item) => item.slug === dest);
  return route ? `${route.from} to ${route.to}` : dest;
}

export function FareCalculator({ className = "" }: { className?: string }) {
  const [pickup, setPickup] = useState(pickupPoints[0] ?? "Jodhpur");
  const [dest, setDest] = useState(routes[0]?.slug ?? "");
  const [vehicleSlug, setVehicleSlug] = useState(
    defaultVehicleFor(routes[0]?.slug ?? ""),
  );
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [days, setDays] = useState(1);

  const isPackage = dest.startsWith("package:");
  const packageIndex = isPackage ? Number(dest.slice("package:".length)) : -1;
  const vehicle =
    vehicles.find((item) => item.slug === vehicleSlug) ?? vehicles[0];
  const allowedSlugs = useMemo(() => allowedVehicleSlugs(dest), [dest]);

  const estimate = useMemo((): FareResult | null => {
    if (!vehicle) return null;
    if (isPackage) {
      const km = packages[packageIndex]?.km;
      if (!km || km <= 0) return null;
      return estimateFare({
        distanceKm: km,
        perKm: vehicle.perKm,
        tripType: "one-way",
      });
    }
    const route = routes.find((item) => item.slug === dest);
    if (!route) return null;
    return estimateFare({
      distanceKm: route.distanceKm,
      perKm: vehicle.perKm,
      tripType,
      days,
      minKmPerDay: vehicle.dailyKmLimit ?? DEFAULT_MIN_KM_PER_DAY,
    });
  }, [dest, isPackage, packageIndex, tripType, days, vehicle]);

  const handleDestChange = (value: string) => {
    setDest(value);
    const allowed = allowedVehicleSlugs(value);
    if (!allowed.includes(vehicleSlug)) {
      setVehicleSlug(defaultVehicleFor(value));
    }
    trackEvent("calculator_use", {
      route: routeLabel(value),
      vehicle: vehicleSlug,
    });
  };

  const handleVehicleChange = (value: string) => {
    setVehicleSlug(value);
    trackEvent("calculator_use", { route: routeLabel(dest), vehicle: value });
  };

  const handleBook = () => {
    if (!estimate || !vehicle) return;
    trackEvent("calculator_book_click", {
      route: routeLabel(dest),
      vehicle: vehicle.slug,
    });
    const url = buildWhatsAppUrl(
      fareMessage({
        route: routeLabel(dest),
        tripType: isPackage
          ? "Local package"
          : tripType === "one-way"
          ? "One-way"
          : "Round trip",
        vehicle: vehicle.name,
        total: estimate.total,
        billedKm: estimate.billedKm,
      }),
    );
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(
      navigator.userAgent,
    );
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener");
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-line-dark bg-graphite/95 p-6 sm:p-10 text-text-dark shadow-2xl backdrop-blur-2xl ${className}`}
    >
      {/* Background ambient gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="eyebrow text-gold font-semibold uppercase tracking-wider block mb-1">
            Fare Calculator
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Estimate Your Travel Cost
          </h3>
        </div>

        <div>
          <SegmentedControl<TripType>
            options={[
              { value: "one-way", label: "One-Way" },
              { value: "round-trip", label: "Round Trip" },
            ]}
            value={tripType}
            onChange={(val) => !isPackage && setTripType(val)}
            dark
            size="sm"
          />
        </div>
      </div>

      {/* Selection Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Pickup */}
        <div>
          <label className={labelClass} htmlFor="calc-pickup">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gold" /> Pickup Point
            </span>
          </label>
          <select
            id="calc-pickup"
            className={inputClass}
            value={pickup}
            onChange={(event) => setPickup(event.target.value)}
          >
            {pickupPoints.map((point) => (
              <option key={point} value={point}>
                {point}
              </option>
            ))}
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className={labelClass} htmlFor="calc-dest">
            <span className="flex items-center gap-1.5">
              <Navigation className="h-3.5 w-3.5 text-gold" /> Destination
            </span>
          </label>
          <select
            id="calc-dest"
            className={inputClass}
            value={dest}
            onChange={(event) => handleDestChange(event.target.value)}
          >
            <optgroup label="Outstation Intercity Routes">
              {routes.map((route) => (
                <option key={route.slug} value={route.slug}>
                  {route.to} ({route.distanceKm} km)
                </option>
              ))}
            </optgroup>
            {packages.length ? (
              <optgroup label="Local Sightseeing Packages">
                {packages.map((pkg, index) => (
                  <option key={pkg.label} value={`package:${index}`}>
                    {pkg.label}
                  </option>
                ))}
              </optgroup>
            ) : null}
          </select>
        </div>

        {/* Vehicle */}
        <div>
          <label className={labelClass} htmlFor="calc-vehicle">
            <span className="flex items-center gap-1.5">
              <Car className="h-3.5 w-3.5 text-gold" /> Vehicle Category
            </span>
          </label>
          <select
            id="calc-vehicle"
            className={inputClass}
            value={vehicleSlug}
            onChange={(event) => handleVehicleChange(event.target.value)}
          >
            {vehicles
              .filter((item) => allowedSlugs.includes(item.slug))
              .map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name} · {item.seats} seats · ₹{item.perKm}/km
                </option>
              ))}
          </select>
        </div>

        {/* Days count if round trip */}
        {!isPackage && tripType === "round-trip" ? (
          <div>
            <label className={labelClass} htmlFor="calc-days">
              Trip Duration (Days)
            </label>
            <input
              id="calc-days"
              type="number"
              min={1}
              max={30}
              inputMode="numeric"
              className={inputClass}
              value={String(days)}
              onChange={(event) => {
                const next = Number.parseInt(event.target.value, 10);
                setDays(
                  Number.isFinite(next) ? Math.min(30, Math.max(1, next)) : 1,
                );
              }}
            />
          </div>
        ) : null}
      </div>

      {/* Result Section */}
      <div
        aria-live="polite"
        className="mt-8 border-t border-line-dark pt-8"
      >
        {estimate && vehicle ? (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-text-dark-muted font-medium">
                Estimated Total Fare
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-[clamp(2.5rem,5.5vw,3.75rem)] font-bold tracking-tight text-white leading-none">
                  <AnimatedNumber value={estimate.total} prefix="₹" />
                </span>
                <span className="text-xs text-gold font-medium bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">
                  Fixed Estimate
                </span>
              </div>
              <p className="mt-3 text-xs md:text-sm text-text-dark-muted max-w-[50ch] leading-relaxed">
                {estimate.breakdown}. Includes sanitized vehicle, verified chauffeur, and fuel.
              </p>
            </div>

            {/* Stat tiles */}
            <div className="grid grid-cols-3 gap-3 self-stretch lg:self-auto">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                <span className="block text-[0.6875rem] uppercase text-text-dark-muted">
                  Billed Distance
                </span>
                <span className="tabular mt-1 block text-base font-semibold text-white">
                  {estimate.billedKm} km
                </span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                <span className="block text-[0.6875rem] uppercase text-text-dark-muted">
                  Per Km Rate
                </span>
                <span className="tabular mt-1 block text-base font-semibold text-white">
                  {formatRupees(vehicle.perKm)}
                </span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                <span className="block text-[0.6875rem] uppercase text-text-dark-muted">
                  Vehicle
                </span>
                <span className="mt-1 block text-sm font-semibold text-gold truncate">
                  {vehicle.name}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="shrink-0">
              <Button
                variant="primary"
                size="lg"
                onClick={handleBook}
                arrow
                className="w-full sm:w-auto"
              >
                Book This Fare on WhatsApp
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-dark-muted">
            Select a destination and vehicle to view instant fare calculation.
          </p>
        )}
      </div>
    </div>
  );
}
