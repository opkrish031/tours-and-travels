import { z } from "zod";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PHONE_RE = /^\+?[0-9][0-9\s-]{8,15}$/;

export type BookingSchemaOptions = {
  requireName?: boolean;
  requirePhone?: boolean;
  /** Injected clock for tests; defaults to real time. */
  now?: () => Date;
};

/**
 * Shared booking schema — used by the client form (RHF resolver) and by
 * POST /api/lead (same server validation). TRD 5.4 / 5.5.
 */
export function buildBookingSchema(options: BookingSchemaOptions = {}) {
  const { requireName = false, requirePhone = false, now } = options;

  const pickup = z
    .string()
    .trim()
    .min(3, "Enter the pickup location")
    .max(120, "Pickup is too long");

  const drop = z
    .string()
    .trim()
    .min(3, "Enter the drop location")
    .max(120, "Drop is too long");

  const datetime = z
    .string()
    .trim()
    .min(1, "Choose a pickup date and time")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Invalid date and time")
    .refine(
      (value) => {
        const clock = now?.() ?? new Date();
        return new Date(value).getTime() >= clock.getTime() - 60_000;
      },
      "Pickup time cannot be in the past",
    );

  const vehicle = z
    .string()
    .trim()
    .regex(SLUG_RE, "Choose a vehicle")
    .min(1, "Choose a vehicle");

  const name = requireName
    ? z.string().trim().min(2, "Enter your name").max(80, "Name is too long")
    : z
        .string()
        .max(80, "Name is too long")
        .refine((value) => value.trim() === "" || value.trim().length >= 2, "Name is too short");

  const phone = requirePhone
    ? z
        .string()
        .trim()
        .regex(PHONE_RE, "Enter a valid phone number")
    : z
        .string()
        .trim()
        .refine(
          (value) => value === "" || PHONE_RE.test(value),
          "Enter a valid phone number",
        );

  return z.strictObject({
    pickup,
    drop,
    datetime,
    vehicle,
    name,
    phone,
    /** Honeypot — must stay empty; checked separately by /api/lead. */
    website: z.string().optional().default(""),
    /** Client-side render timestamp — /api/lead enforces the minimum time-to-submit. */
    startedAt: z.number().int().min(0).optional(),
    /** Page path for the sheet's sourcePage column / analytics. */
    sourcePage: z.string().max(200).optional(),
    tripType: z.enum(["one-way", "round-trip"]).optional(),
  });
}

export type BookingPayload = z.infer<ReturnType<typeof buildBookingSchema>>;

/** Extract the first inline error message per field from a ZodError. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
