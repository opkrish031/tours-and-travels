import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { rateLimit } from "@/lib/rateLimit";
import { buildBookingSchema, fieldErrors } from "@/lib/validation";

const MAX_BODY_BYTES = 5_000;
/** Minimum time between form render and submit — filters dumb bots (TRD 9). */
const MIN_SUBMIT_MS = 3_000;

const allowedOrigins = new Set<string>();
function originAllowed(origin: string | null, referer: string | null): boolean {
  allowedOrigins.clear();
  allowedOrigins.add(new URL(site.domain).origin);
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) {
    try {
      allowedOrigins.add(new URL(envUrl).origin);
    } catch {
      // ignore malformed NEXT_PUBLIC_SITE_URL
    }
  }
  if (allowedOrigins.has(origin ?? "")) return true;
  if (origin === null && referer) {
    try {
      if (allowedOrigins.has(new URL(referer).origin)) return true;
    } catch {
      // ignore malformed referer
    }
  }
  if (process.env.NODE_ENV !== "production" && origin) {
    return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  }
  return false;
}

function errorResponse(status: number, error: string, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: false, error, ...extra }, { status });
}

export async function POST(request: Request): Promise<NextResponse> {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (!originAllowed(origin, referer)) {
    console.warn("[lead] rejected: origin not allowed");
    return errorResponse(403, "Invalid submission");
  }

  // Prefer platform-provided headers (x-real-ip from Vercel/nginx) over the
  // easily-spoofable x-forwarded-for chain.
  const ip =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const limit = rateLimit(`lead:${ip}`);
  if (!limit.ok) {
    return new NextResponse(
      JSON.stringify({ ok: false, error: "Too many requests, try again shortly" }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(limit.retryAfterSeconds),
        },
      },
    );
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return errorResponse(400, "Invalid submission");
  }
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return errorResponse(413, "Invalid submission");
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return errorResponse(400, "Invalid submission");
  }
  if (typeof body !== "object" || body === null) {
    return errorResponse(400, "Invalid submission");
  }

  const parsed = buildBookingSchema().safeParse(body);
  if (!parsed.success) {
    return errorResponse(400, "Invalid submission", { fields: fieldErrors(parsed.error) });
  }
  const data = parsed.data;

  if (data.website) {
    console.warn("[lead] rejected: honeypot filled");
    return errorResponse(400, "Invalid submission");
  }
  if (typeof data.startedAt !== "number" || Date.now() - data.startedAt < MIN_SUBMIT_MS) {
    console.warn("[lead] rejected: submitted too quickly");
    return errorResponse(400, "Invalid submission");
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    const level = process.env.NODE_ENV === "production" ? "error" : "warn";
    console[level]("[lead] LEAD_WEBHOOK_URL not set — returning ok without forwarding");
    return NextResponse.json({ ok: true });
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const row = {
    timestamp: new Date().toISOString(),
    name: data.name,
    phone: data.phone,
    pickup: data.pickup,
    drop: data.drop,
    datetime: data.datetime,
    vehicle: data.vehicle,
    tripType: data.tripType ?? "",
    sourcePage: data.sourcePage ?? "",
    userAgentShort: userAgent.slice(0, 120),
  };

  try {
    const secret = process.env.LEAD_WEBHOOK_SECRET ?? "";
    const payload = { ...row, secret };
    const bodyStr = JSON.stringify(payload);
    const signature = secret
      ? createHmac("sha256", secret).update(bodyStr).digest("hex")
      : "";
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(signature ? { "X-Webhook-Signature": `sha256=${signature}` } : {}),
      },
      body: bodyStr,
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) {
      console.error(`[lead] webhook failed with status ${response.status}`);
      return errorResponse(502, "Could not save your enquiry, please call or WhatsApp us");
    }
  } catch {
    console.error("[lead] webhook unreachable");
    return errorResponse(502, "Could not save your enquiry, please call or WhatsApp us");
  }

  return NextResponse.json({ ok: true });
}
