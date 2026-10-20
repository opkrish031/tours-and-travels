// Fare rules live here (never in components). TRD 5.1.

export type TripType = "one-way" | "round-trip";

export type FareInput = {
  distanceKm: number;
  perKm: number;
  tripType: TripType;
  /** Round trips only — how many days the car is booked. */
  days?: number;
  /** Minimum billed km per day for round trips; defaults to DEFAULT_MIN_KM_PER_DAY. */
  minKmPerDay?: number;
};

export type FareResult = {
  total: number;
  billedKm: number;
  breakdown: string;
};

/** Default outstation billing floor, km per day. */
export const DEFAULT_MIN_KM_PER_DAY = 250;

/** Round to the nearest ₹10 for display. */
export function roundToTen(amount: number): number {
  return Math.round(amount / 10) * 10;
}

/** Indian digit grouping: 123456 → "1,23,456". */
function groupIndian(amount: number): string {
  const digits = String(Math.abs(Math.trunc(amount)));
  if (digits.length <= 3) return digits;
  const last3 = digits.slice(-3);
  const rest = digits.slice(0, -3);
  return `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${last3}`;
}

export function formatRupees(amount: number): string {
  return `₹${groupIndian(amount)}`;
}

export function formatVehicleOption(vehicle: {
  name: string;
  seats: string;
  perKm: number;
  slug: string;
}): string {
  let capacity = "";
  if (vehicle.slug === "sedan-taxi-jodhpur") capacity = "4 Seats";
  else if (vehicle.slug === "suv-taxi-jodhpur") capacity = "5–6 Seats";
  else if (vehicle.slug === "toyota-innova-jodhpur") capacity = "6–7 Seats";
  else if (vehicle.slug === "innova-crysta-jodhpur") capacity = "6–7 Seats";
  else if (vehicle.slug === "tempo-traveller-jodhpur") capacity = "12–26 Seats";
  else if (vehicle.slug === "force-urbania-jodhpur") capacity = "10–17 Seats";
  else if (vehicle.slug === "luxury-cab-jodhpur") capacity = "6–7 Seats";
  else {
    const match = vehicle.seats.match(/(\d+[\s–-]*\d*|\d+)/);
    capacity = match ? `${match[1]} Seats` : "AC";
  }

  return `${vehicle.name} (${capacity}) · ₹${vehicle.perKm}/km`;
}

export function estimateFare(input: FareInput): FareResult {
  const { distanceKm, perKm, tripType } = input;

  if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
    throw new RangeError(`distanceKm must be positive (got ${distanceKm})`);
  }
  if (!Number.isFinite(perKm) || perKm <= 0) {
    throw new RangeError(`perKm must be positive (got ${perKm})`);
  }

  let billedKm: number;
  let breakdown: string;

  if (tripType === "one-way") {
    billedKm = distanceKm;
    const raw = billedKm * perKm;
    const total = roundToTen(raw);
    breakdown = `${billedKm} km × ${formatRupees(perKm)}/km = ${formatRupees(Math.round(raw))}, rounded ${formatRupees(total)}`;
    return { total, billedKm, breakdown };
  }

  const days = input.days;
  if (!Number.isFinite(days as number) || (days as number) < 1) {
    throw new RangeError(`days must be at least 1 for a round trip (got ${days})`);
  }
  const minKmPerDay = input.minKmPerDay ?? DEFAULT_MIN_KM_PER_DAY;
  if (!Number.isFinite(minKmPerDay) || minKmPerDay <= 0) {
    throw new RangeError(`minKmPerDay must be positive (got ${minKmPerDay})`);
  }

  const returnKm = distanceKm * 2;
  const dayFloorKm = minKmPerDay * (days as number);
  billedKm = Math.max(returnKm, dayFloorKm);
  const raw = billedKm * perKm;
  const total = roundToTen(raw);

  const drivers: string[] = [];
  if (billedKm === returnKm) drivers.push(`return distance ${returnKm} km`);
  if (billedKm === dayFloorKm)
    drivers.push(`${minKmPerDay} km/day × ${days} day${(days as number) > 1 ? "s" : ""} = ${dayFloorKm} km`);
  breakdown = `Round trip billed ${billedKm} km (${drivers.join(" is the minimum, ")}) × ${formatRupees(perKm)}/km = ${formatRupees(Math.round(raw))}, rounded ${formatRupees(total)}`;

  return { total, billedKm, breakdown };
}
