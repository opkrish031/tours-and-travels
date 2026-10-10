import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type TestWindow = {
  gtag?: (...args: unknown[]) => void;
};

const testWindow = globalThis as unknown as { window?: TestWindow };

describe("trackEvent", () => {
  const calls: unknown[][] = [];

  beforeEach(() => {
    calls.length = 0;
    testWindow.window = {
      gtag: (...args: unknown[]) => {
        calls.push(args);
      },
    };
  });

  afterEach(() => {
    delete testWindow.window;
  });

  it("forwards every documented event to gtag", () => {
    const events: AnalyticsEvent[] = [
      "call_click",
      "whatsapp_click",
      "form_submit",
      "calculator_use",
      "calculator_book_click",
    ];
    for (const name of events) {
      trackEvent(name, { location: "header", page: "/" });
    }
    expect(calls).toHaveLength(events.length);
    calls.forEach((call, index) => {
      expect(call[0]).toBe("event");
      expect(call[1]).toBe(events[index]);
      expect(call[2]).toEqual({ location: "header", page: "/" });
    });
  });

  it("passes empty params when none are provided", () => {
    trackEvent("calculator_book_click");
    expect(calls[0]).toEqual(["event", "calculator_book_click", {}]);
  });

  it("silently no-ops when gtag is missing", () => {
    delete testWindow.window!.gtag;
    expect(() => trackEvent("call_click")).not.toThrow();
    expect(calls).toHaveLength(0);
  });

  it("silently no-ops without a window (server)", () => {
    delete testWindow.window;
    expect(() => trackEvent("whatsapp_click")).not.toThrow();
    expect(calls).toHaveLength(0);
  });
});
