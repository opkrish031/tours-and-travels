"use client";

import { useMemo, useState } from "react";
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

const inputClass =
  "w-full rounded-sm border border-ink/25 bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/40";
const labelClass =
  "mb-1.5 block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-stone";

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
  const [vehicleSlug, setVehicleSlug] = useState(defaultVehicleFor(routes[0]?.slug ?? ""));
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [days, setDays] = useState(1);

  const isPackage = dest.startsWith("package:");
  const packageIndex = isPackage ? Number(dest.slice("package:".length)) : -1;
  const vehicle = vehicles.find((item) => item.slug === vehicleSlug) ?? vehicles[0];
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
    trackEvent("calculator_use", { route: routeLabel(value), vehicle: vehicleSlug });
  };

  const handleVehicleChange = (value: string) => {
    setVehicleSlug(value);
    trackEvent("calculator_use", { route: routeLabel(dest), vehicle: value });
  };

  const handleBook = () => {
    if (!estimate || !vehicle) return;
    trackEvent("calculator_book_click", { route: routeLabel(dest), vehicle: vehicle.slug });
    const url = buildWhatsAppUrl(
      fareMessage({
        route: routeLabel(dest),
        tripType: isPackage ? "Local package" : tripType === "one-way" ? "One-way" : "Round trip",
        vehicle: vehicle.name,
        total: estimate.total,
        billedKm: estimate.billedKm,
      }),
    );
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener");
    }
  };

  return (
    <div className={`rounded-md border border-ink/20 bg-paper p-5 md:p-6 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <span className={labelClass} id="calc-trip-type-label">
            Trip type
          </span>
          <div
            role="radiogroup"
            aria-labelledby="calc-trip-type-label"
            className="flex gap-2"
          >
            {(
              [
                { value: "one-way", label: "One-way" },
                { value: "round-trip", label: "Round trip" },
              ] as const
            ).map((option) => {
              const active = tripType === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex-1 cursor-pointer rounded-sm border px-4 py-2.5 text-center text-sm font-medium transition-colors focus-within:ring-1 focus-within:ring-ink/40 ${
                    active
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/25 text-ink hover:border-ink"
                  } ${isPackage ? "opacity-50" : ""}`}
                >
                  <input
                    type="radio"
                    name="calc-trip-type"
                    value={option.value}
                    checked={tripType === option.value}
                    disabled={isPackage}
                    onChange={() => setTripType(option.value)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="calc-pickup">
            Pickup point
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

        <div>
          <label className={labelClass} htmlFor="calc-dest">
            Destination
          </label>
          <select
            id="calc-dest"
            className={inputClass}
            value={dest}
            onChange={(event) => handleDestChange(event.target.value)}
          >
            <optgroup label="Outstation routes">
              {routes.map((route) => (
                <option key={route.slug} value={route.slug}>
                  {route.to} ({route.distanceKm} km)
                </option>
              ))}
            </optgroup>
            {packages.length ? (
              <optgroup label="Local packages (Jodhpur)">
                {packages.map((pkg, index) => (
                  <option key={pkg.label} value={`package:${index}`}>
                    {pkg.label}
                  </option>
                ))}
              </optgroup>
            ) : null}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="calc-vehicle">
            Vehicle
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

        {!isPackage && tripType === "round-trip" ? (
          <div>
            <label className={labelClass} htmlFor="calc-days">
              Number of days
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
                setDays(Number.isFinite(next) ? Math.min(30, Math.max(1, next)) : 1);
              }}
            />
          </div>
        ) : null}
      </div>

      <div
        aria-live="polite"
        className="mt-6 border-line-strong border-t pt-6"
      >
        {estimate && vehicle ? (
          <>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className={labelClass}>Estimated total fare</span>
                <p className="display text-[clamp(2.1rem,5vw,3rem)] tabular">
                  {formatRupees(estimate.total)}
                </p>
              </div>
              <dl className="text-stone grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-stone-light text-xs uppercase">Distance billed</dt>
                  <dd className="tabular text-ink">{estimate.billedKm} km</dd>
                </div>
                <div>
                  <dt className="text-stone-light text-xs uppercase">Per km</dt>
                  <dd className="tabular text-ink">{formatRupees(vehicle.perKm)}</dd>
                </div>
                <div>
                  <dt className="text-stone-light text-xs uppercase">Vehicle</dt>
                  <dd className="text-ink">{vehicle.name}</dd>
                </div>
              </dl>
            </div>
            <p className="text-stone mt-4 max-w-[70ch] text-sm leading-relaxed">
              {estimate.breakdown}.
              {isPackage
                ? ` The package covers ${packages[packageIndex]?.hours ?? ""} hours and ${packages[packageIndex]?.km ?? ""} km with the driver waiting at each stop.`
                : ""}
            </p>
            <p className="text-stone-light mt-2 max-w-[70ch] text-xs leading-relaxed">
              Includes car, driver and fuel for the planned kilometres. Tolls, state entry tax
              and parking are extra, charged as per actual receipts. Final fare confirmed on
              WhatsApp or call.
            </p>
            <Button variant="brass" className="mt-5" onClick={handleBook}>
              Book this fare on WhatsApp
            </Button>
          </>
        ) : (
          <p className="text-stone text-sm">
            Choose a destination and vehicle to see your estimate.
          </p>
        )}
      </div>
    </div>
  );
}
