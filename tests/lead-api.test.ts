import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/lead/route";
import { resetRateLimits } from "@/lib/rateLimit";

const ORIGIN = "https://marwadcabs.com";
const WEBHOOK = "https://webhook.test/lead";

function validBody(extra: Record<string, unknown> = {}) {
  return {
    pickup: "Jodhpur Airport (JDH)",
    drop: "Sardar Market",
    datetime: "2030-10-12T09:30",
    vehicle: "sedan-taxi-jodhpur",
    name: "Asha",
    phone: "+911234567890",
    website: "",
    sourcePage: "/",
    startedAt: Date.now() - 10_000,
    ...extra,
  };
}

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: ORIGIN,
      "User-Agent": "vitest-agent/1.0",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/lead", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    resetRateLimits();
    fetchMock.mockReset().mockResolvedValue(new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    process.env.LEAD_WEBHOOK_URL = WEBHOOK;
    process.env.LEAD_WEBHOOK_SECRET = "test-secret";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.LEAD_WEBHOOK_URL;
    delete process.env.LEAD_WEBHOOK_SECRET;
  });

  it("accepts a valid enquiry and forwards a sheet row to the webhook", async () => {
    const response = await POST(makeRequest(validBody()));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(WEBHOOK);
    const sent = JSON.parse(init.body);
    expect(sent).toMatchObject({
      name: "Asha",
      phone: "+911234567890",
      pickup: "Jodhpur Airport (JDH)",
      drop: "Sardar Market",
      datetime: "2030-10-12T09:30",
      vehicle: "sedan-taxi-jodhpur",
      tripType: "",
      sourcePage: "/",
      userAgentShort: "vitest-agent/1.0",
      secret: "test-secret",
    });
    expect(sent.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("rejects a foreign origin", async () => {
    const response = await POST(makeRequest(validBody(), { Origin: "https://evil.test" }));
    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a request with no origin or referer", async () => {
    const response = await POST(makeRequest(validBody(), { Origin: "" }));
    expect(response.status).toBe(403);
  });

  it("allows localhost origins outside production", async () => {
    const response = await POST(
      makeRequest(validBody(), { Origin: "http://localhost:3100" }),
    );
    expect(response.status).toBe(200);
  });

  it("rejects a filled honeypot", async () => {
    const response = await POST(makeRequest(validBody({ website: "https://spam.test" })));
    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a submission faster than the minimum time-to-submit", async () => {
    const tooFast = await POST(makeRequest(validBody({ startedAt: Date.now() - 500 })));
    expect(tooFast.status).toBe(400);

    const missing = await POST(makeRequest({ ...validBody(), startedAt: undefined }));
    expect(missing.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects invalid fields with a 400", async () => {
    const response = await POST(makeRequest(validBody({ phone: "not-a-number" })));
    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.ok).toBe(false);
    expect(payload.fields.phone).toBe("Enter a valid phone number");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects unknown fields (strict schema)", async () => {
    const response = await POST(makeRequest(validBody({ isAdmin: true })));
    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON and oversized bodies", async () => {
    const malformed = await POST(makeRequest("{not json"));
    expect(malformed.status).toBe(400);

    const huge = await POST(makeRequest(validBody({ pickup: "x".repeat(6_000) })));
    expect(huge.status).toBe(413);
  });

  it("rate limits per IP after five requests", async () => {
    const headers = { "X-Forwarded-For": "203.0.113.7" };
    for (let i = 0; i < 5; i += 1) {
      const ok = await POST(makeRequest(validBody(), headers));
      expect(ok.status).toBe(200);
    }
    const blocked = await POST(makeRequest(validBody(), headers));
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBeTruthy();

    const otherIp = await POST(makeRequest(validBody(), { "X-Forwarded-For": "203.0.113.8" }));
    expect(otherIp.status).toBe(200);
  });

  it("returns ok with a warning when the webhook URL is not configured", async () => {
    delete process.env.LEAD_WEBHOOK_URL;
    const response = await POST(makeRequest(validBody()));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns a generic 502 when the webhook fails", async () => {
    fetchMock.mockResolvedValue(new Response("boom", { status: 500 }));
    const failed = await POST(makeRequest(validBody()));
    expect(failed.status).toBe(502);
    const failedPayload = await failed.json();
    expect(failedPayload.ok).toBe(false);
    expect(failedPayload.error).toBe(
      "Could not save your enquiry, please call or WhatsApp us",
    );

    fetchMock.mockRejectedValue(new Error("network down"));
    const unreachable = await POST(makeRequest(validBody({ pickup: "Another Place" })));
    expect(unreachable.status).toBe(502);
  });
});
