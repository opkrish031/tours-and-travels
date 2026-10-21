import { site } from "@/data/site";
import { formatRupees } from "@/lib/fare";

const MAX_FIELD = 120;
const CODE_TAB = 9;
const CODE_LF = 10;
const CODE_DEL = 127;

/**
 * Remove control characters. When keepLineBreaks is true, tabs and newlines
 * survive so multi-line templates stay multi-line.
 */
function stripControlChars(value: string, keepLineBreaks: boolean): string {
  let out = "";
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    const isControl = code < 32 || code === CODE_DEL;
    if (!isControl) {
      out += ch;
    } else if (keepLineBreaks && (code === CODE_TAB || code === CODE_LF)) {
      out += ch;
    } else {
      out += " ";
    }
  }
  return out;
}

/** Strip control characters and cap length so wa.me URLs stay safe. */
export function sanitizeField(value: string): string {
  return stripControlChars(value, false)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_FIELD);
}

/**
 * Encode a message for wa.me. Keeps newlines so multi-line templates survive;
 * other control characters are removed and trailing spaces are trimmed.
 */
export function buildWhatsAppUrl(message: string): string {
  const clean = stripControlChars(message, true)
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").replace(/\s+$/, ""))
    .join("\n")
    .trim();
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(clean)}`;
}

/** Prefilled message for context CTAs (route / service / vehicle pages). */
export function contextMessage(context: string): string {
  const clean = sanitizeField(context);
  if (/^(hi|hello)\b/i.test(clean)) {
    return clean;
  }
  return `Hi ${site.brandName}, I want to book a taxi. ${clean}`;
}

export function telHref(): string {
  return `tel:${site.phone}`;
}

export type BookingData = {
  pickup: string;
  drop: string;
  datetime: string;
  vehicle: string;
  name?: string;
};

/** WhatsApp template from PRD 5.1. */
export function bookingMessage(data: BookingData): string {
  const lines = [
    `Hi ${site.brandName}, I want to book a taxi.`,
    `Pickup: ${sanitizeField(data.pickup)}`,
    `Drop: ${sanitizeField(data.drop)}`,
    `Date & Time: ${sanitizeField(data.datetime)}`,
    `Vehicle: ${sanitizeField(data.vehicle)}`,
  ];
  const name = data.name ? sanitizeField(data.name) : "";
  if (name) lines.push(`Name: ${name}`);
  return lines.join("\n");
}

export type FareMessageData = {
  route: string;
  tripType: string;
  vehicle: string;
  total: number;
  billedKm: number;
};

/** Prefilled message from the calculator's "Book this fare" button (PRD 5.2). */
export function fareMessage(data: FareMessageData): string {
  return [
    `Hi ${site.brandName}, fare estimate from your calculator.`,
    `Route: ${sanitizeField(data.route)} (${sanitizeField(data.tripType)})`,
    `Vehicle: ${sanitizeField(data.vehicle)}`,
    `Estimated fare: ${formatRupees(data.total)} for ${data.billedKm} km`,
    "Tolls, state entry tax and parking are extra, charged as per actual receipts. Final fare confirmed on WhatsApp or call.",
  ].join("\n");
}
