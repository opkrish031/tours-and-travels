import { beforeEach, describe, expect, it } from "vitest";
import { rateLimit, resetRateLimits } from "@/lib/rateLimit";

describe("rateLimit", () => {
  beforeEach(() => {
    resetRateLimits();
  });

  it("allows up to the limit within the window", () => {
    const now = 1_000_000;
    for (let i = 0; i < 5; i += 1) {
      expect(rateLimit("a", { now: now + i }).ok).toBe(true);
    }
  });

  it("rejects the request over the limit with a retry hint", () => {
    const now = 1_000_000;
    for (let i = 0; i < 5; i += 1) rateLimit("b", { now });
    const over = rateLimit("b", { now: now + 10_000 });
    expect(over.ok).toBe(false);
    expect(over.retryAfterSeconds).toBeGreaterThanOrEqual(1);
    expect(over.retryAfterSeconds).toBeLessThanOrEqual(60);
  });

  it("resets after the window expires", () => {
    const now = 1_000_000;
    for (let i = 0; i < 5; i += 1) rateLimit("c", { now });
    expect(rateLimit("c", { now: now + 60_000 }).ok).toBe(true);
  });

  it("tracks keys independently", () => {
    const now = 1_000_000;
    for (let i = 0; i < 5; i += 1) rateLimit("d1", { now });
    expect(rateLimit("d1", { now }).ok).toBe(false);
    expect(rateLimit("d2", { now }).ok).toBe(true);
  });

  it("returns a full-window retry hint on a fresh key", () => {
    const result = rateLimit("e", { now: 1_000_000, windowMs: 30_000 });
    expect(result.ok).toBe(true);
    expect(result.retryAfterSeconds).toBe(30);
  });

  it("resetRateLimits clears all buckets", () => {
    const now = 1_000_000;
    for (let i = 0; i < 5; i += 1) rateLimit("f", { now });
    expect(rateLimit("f", { now }).ok).toBe(false);
    resetRateLimits();
    expect(rateLimit("f", { now }).ok).toBe(true);
  });
});
