import { describe, expect, it } from "vitest";
import { routes } from "@/data/routes";
import { vehicles } from "@/data/vehicles";
import {
  DEFAULT_MIN_KM_PER_DAY,
  estimateFare,
  formatRupees,
  roundToTen,
} from "@/lib/fare";

describe("roundToTen", () => {
  it("rounds to the nearest 10", () => {
    expect(roundToTen(3734)).toBe(3730);
    expect(roundToTen(3735)).toBe(3740);
    expect(roundToTen(3740)).toBe(3740);
    expect(roundToTen(715)).toBe(720);
  });
});

describe("formatRupees", () => {
  it("uses Indian digit grouping", () => {
    expect(formatRupees(999)).toBe("₹999");
    expect(formatRupees(3160)).toBe("₹3,160");
    expect(formatRupees(123456)).toBe("₹1,23,456");
    expect(formatRupees(1000000)).toBe("₹10,00,000");
  });
});

describe("estimateFare — one-way", () => {
  it("bills the exact distance and rounds the total", () => {
    const result = estimateFare({ distanceKm: 340, perKm: 11, tripType: "one-way" });
    expect(result.billedKm).toBe(340);
    expect(result.total).toBe(3740);
    expect(result.breakdown).toContain("340 km");
    expect(result.breakdown).toContain("₹3,740");
  });

  it("rounds fractional kilometre products to the nearest ₹10", () => {
    const result = estimateFare({ distanceKm: 65, perKm: 11, tripType: "one-way" });
    expect(result.billedKm).toBe(65);
    expect(result.total).toBe(720);
  });
});

describe("estimateFare — round trip", () => {
  it("uses the return distance when it exceeds the day floor", () => {
    const result = estimateFare({
      distanceKm: 340,
      perKm: 11,
      tripType: "round-trip",
      days: 1,
      minKmPerDay: 300,
    });
    expect(result.billedKm).toBe(680);
    expect(result.total).toBe(7480);
    expect(result.breakdown).toContain("680 km");
    expect(result.breakdown).toContain("Round trip");
  });

  it("uses the day floor when it exceeds the return distance", () => {
    const result = estimateFare({
      distanceKm: 100,
      perKm: 11,
      tripType: "round-trip",
      days: 3,
      minKmPerDay: 300,
    });
    expect(result.billedKm).toBe(900);
    expect(result.total).toBe(9900);
    expect(result.breakdown).toContain("300 km/day × 3 days = 900 km");
  });

  it("defaults minKmPerDay to DEFAULT_MIN_KM_PER_DAY", () => {
    expect(DEFAULT_MIN_KM_PER_DAY).toBe(300);
    const result = estimateFare({
      distanceKm: 100,
      perKm: 11,
      tripType: "round-trip",
      days: 3,
    });
    expect(result.billedKm).toBe(900);
  });

  it("handles singular day wording", () => {
    const result = estimateFare({
      distanceKm: 100,
      perKm: 11,
      tripType: "round-trip",
      days: 1,
      minKmPerDay: 400,
    });
    expect(result.breakdown).toContain("400 km/day × 1 day = 400 km");
  });
});

describe("estimateFare — rejects invalid inputs", () => {
  it("rejects zero and negative distance", () => {
    expect(() =>
      estimateFare({ distanceKm: 0, perKm: 11, tripType: "one-way" }),
    ).toThrow(RangeError);
    expect(() =>
      estimateFare({ distanceKm: -5, perKm: 11, tripType: "one-way" }),
    ).toThrow(RangeError);
  });

  it("rejects zero and negative perKm", () => {
    expect(() =>
      estimateFare({ distanceKm: 100, perKm: 0, tripType: "one-way" }),
    ).toThrow(RangeError);
    expect(() =>
      estimateFare({ distanceKm: 100, perKm: -1, tripType: "one-way" }),
    ).toThrow(RangeError);
  });

  it("rejects round trips without valid days", () => {
    expect(() =>
      estimateFare({ distanceKm: 100, perKm: 11, tripType: "round-trip" }),
    ).toThrow(RangeError);
    expect(() =>
      estimateFare({ distanceKm: 100, perKm: 11, tripType: "round-trip", days: 0 }),
    ).toThrow(RangeError);
    expect(() =>
      estimateFare({ distanceKm: 100, perKm: 11, tripType: "round-trip", days: 0.5 }),
    ).toThrow(RangeError);
  });

  it("rejects a non-positive day floor", () => {
    expect(() =>
      estimateFare({
        distanceKm: 100,
        perKm: 11,
        tripType: "round-trip",
        days: 2,
        minKmPerDay: 0,
      }),
    ).toThrow(RangeError);
  });
});

describe("estimateFare — every route × vehicle from data", () => {
  it("produces a positive fare, positive billed km and a breakdown for all combinations", () => {
    expect(routes.length).toBeGreaterThanOrEqual(8);
    expect(vehicles.length).toBeGreaterThanOrEqual(4);

    for (const route of routes) {
      for (const vehicle of vehicles) {
        const oneWay = estimateFare({
          distanceKm: route.distanceKm,
          perKm: vehicle.perKm,
          tripType: "one-way",
        });
        expect(oneWay.total).toBeGreaterThan(0);
        expect(oneWay.billedKm).toBe(route.distanceKm);
        expect(oneWay.total).toBe(roundToTen(route.distanceKm * vehicle.perKm));
        expect(oneWay.breakdown.length).toBeGreaterThan(0);

        const roundTrip = estimateFare({
          distanceKm: route.distanceKm,
          perKm: vehicle.perKm,
          tripType: "round-trip",
          days: 3,
          minKmPerDay: vehicle.dailyKmLimit,
        });
        expect(roundTrip.total).toBeGreaterThan(oneWay.total);
        expect(roundTrip.billedKm).toBe(
          Math.max(route.distanceKm * 2, vehicle.dailyKmLimit * 3),
        );
        expect(roundTrip.breakdown.length).toBeGreaterThan(0);
      }
    }
  });
});
