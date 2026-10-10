import { describe, expect, it } from "vitest";
import {
  buildBookingSchema,
  fieldErrors,
} from "@/lib/validation";

const NOW = () => new Date("2026-06-01T10:00:00Z");
const FUTURE = "2026-07-01T10:00";
const PAST = "2026-05-01T10:00";

function validPayload() {
  return {
    pickup: "Jodhpur Airport (JDH)",
    drop: "Sardar Market",
    datetime: FUTURE,
    vehicle: "sedan-taxi-jodhpur",
    name: "",
    phone: "",
  };
}

describe("buildBookingSchema — hero defaults", () => {
  const schema = buildBookingSchema({ now: NOW });

  it("accepts a valid payload with blank name and phone", () => {
    const result = schema.safeParse(validPayload());
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("");
      expect(result.data.phone).toBe("");
      expect(result.data.website).toBe("");
    }
  });

  it("applies the empty honeypot default when the field is missing", () => {
    const result = schema.safeParse(validPayload());
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.website).toBe("");
  });

  it("rejects short pickup and drop locations", () => {
    const result = schema.safeParse({ ...validPayload(), pickup: "AB" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(fieldErrors(result.error).pickup).toBe("Enter the pickup location");
    }
  });

  it("rejects an empty datetime and a malformed one", () => {
    const empty = schema.safeParse({ ...validPayload(), datetime: "" });
    expect(empty.success).toBe(false);
    if (!empty.success) {
      expect(fieldErrors(empty.error).datetime).toBe("Choose a pickup date and time");
    }

    const junk = schema.safeParse({ ...validPayload(), datetime: "next tuesday" });
    expect(junk.success).toBe(false);
    if (!junk.success) {
      expect(fieldErrors(junk.error).datetime).toBe("Invalid date and time");
    }
  });

  it("rejects a pickup time in the past", () => {
    const result = schema.safeParse({ ...validPayload(), datetime: PAST });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(fieldErrors(result.error).datetime).toBe("Pickup time cannot be in the past");
    }
  });

  it("tolerates a datetime up to one minute behind the clock", () => {
    const result = schema.safeParse({
      ...validPayload(),
      datetime: "2026-06-01T09:59:30.000Z",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid vehicle slug", () => {
    const result = schema.safeParse({ ...validPayload(), vehicle: "Sedan Taxi" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(fieldErrors(result.error).vehicle).toBe("Choose a vehicle");
    }

    const missing = schema.safeParse({ ...validPayload(), vehicle: "" });
    expect(missing.success).toBe(false);
  });

  it("rejects a malformed phone even when optional", () => {
    const result = schema.safeParse({ ...validPayload(), phone: "call me maybe" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(fieldErrors(result.error).phone).toBe("Enter a valid phone number");
    }
  });

  it("accepts a well-formed phone when provided", () => {
    const result = schema.safeParse({ ...validPayload(), phone: "+911234567890" });
    expect(result.success).toBe(true);
  });

  it("rejects a one-letter name when the name field is filled", () => {
    const result = schema.safeParse({ ...validPayload(), name: "A" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(fieldErrors(result.error).name).toBe("Name is too short");
    }
  });
});

describe("buildBookingSchema — contact form options", () => {
  it("requires name and phone when configured", () => {
    const schema = buildBookingSchema({ requireName: true, requirePhone: true, now: NOW });

    const missing = schema.safeParse(validPayload());
    expect(missing.success).toBe(false);
    if (!missing.success) {
      const errors = fieldErrors(missing.error);
      expect(errors.name).toBe("Enter your name");
      expect(errors.phone).toBe("Enter a valid phone number");
    }

    const complete = schema.safeParse({
      ...validPayload(),
      name: "Asha Kumar",
      phone: "+91 98765 43210",
    });
    expect(complete.success).toBe(true);
  });
});

describe("fieldErrors", () => {
  it("keeps only the first message per field", () => {
    const schema = buildBookingSchema({ now: NOW });
    const result = schema.safeParse({ ...validPayload(), pickup: "", drop: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = fieldErrors(result.error);
      expect(Object.keys(errors).sort()).toEqual(["drop", "pickup"]);
    }
  });
});
