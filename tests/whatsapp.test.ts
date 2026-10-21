import { describe, expect, it } from "vitest";
import { site } from "@/data/site";
import {
  bookingMessage,
  buildWhatsAppUrl,
  contextMessage,
  fareMessage,
  sanitizeField,
  telHref,
} from "@/lib/whatsapp";

describe("sanitizeField", () => {
  it("strips control characters and collapses whitespace", () => {
    const raw = `Line${String.fromCharCode(9)}one${String.fromCharCode(10)}two${String.fromCharCode(7)} end`;
    expect(sanitizeField(raw)).toBe("Line one two end");
  });

  it("caps the length at 120 characters", () => {
    expect(sanitizeField("x".repeat(500))).toHaveLength(120);
  });

  it("trims the result", () => {
    expect(sanitizeField("  padded  ")).toBe("padded");
  });
});

describe("buildWhatsAppUrl", () => {
  it("targets the configured wa.me number", () => {
    const url = buildWhatsAppUrl("hello");
    expect(url.startsWith(`https://wa.me/${site.whatsapp}?text=`)).toBe(true);
  });

  it("percent-encodes the message", () => {
    const url = buildWhatsAppUrl("Jodhpur to Jaipur: ₹3,740 & more");
    const text = decodeURIComponent(url.split("text=")[1]);
    expect(text).toBe("Jodhpur to Jaipur: ₹3,740 & more");
    expect(url).toContain("%20");
    expect(url).toContain("%26");
  });

  it("keeps multi-line templates multi-line", () => {
    const message = ["Line one", "Line two", "Line three"].join("\n");
    const url = buildWhatsAppUrl(message);
    const text = decodeURIComponent(url.split("text=")[1]);
    expect(text.split("\n")).toEqual(["Line one", "Line two", "Line three"]);
  });

  it("removes non-newline control characters and trailing spaces", () => {
    const bell = String.fromCharCode(7);
    const text = decodeURIComponent(
      buildWhatsAppUrl(`kept${bell} newline\ntrailing   `).split("text=")[1],
    );
    expect(text).toBe("kept newline\ntrailing");
  });
});

describe("contextMessage", () => {
  it("greets with the brand and includes the context", () => {
    const message = contextMessage("I want to book a taxi from Jodhpur to Jaipur");
    expect(message.startsWith(`Hi ${site.brandName}`)).toBe(true);
    expect(message).toContain("Jodhpur to Jaipur");
  });

  it("avoids stutter when context already starts with Hi or Hello", () => {
    const message = contextMessage("Hi Marwad Cabs, I would like to book the Innova.");
    expect(message).toBe(`Hi ${site.brandName}, I would like to book the Innova.`);
    expect(message).not.toContain(`Hi ${site.brandName}, Hi`);
  });
});

describe("WhatsApp URL integrity across site", () => {
  it("configures site.whatsapp as a valid international number", () => {
    expect(site.whatsapp).toMatch(/^91\d{10}$/);
  });

  it("generates valid wa.me URLs for all context messages", () => {
    const testCases = [
      "Airport pickup enquiry for Jodhpur",
      "Quote for Jodhpur to Jaisalmer cab",
      "Local full day sightseeing enquiry in Jodhpur",
      "I found your website and would like a quote.",
    ];
    for (const text of testCases) {
      const url = buildWhatsAppUrl(contextMessage(text));
      expect(url.startsWith(`https://wa.me/918955033005?text=`)).toBe(true);
      const decoded = decodeURIComponent(url.split("text=")[1]);
      expect(decoded.startsWith(`Hi ${site.brandName}`)).toBe(true);
    }
  });
});

describe("bookingMessage", () => {
  const data = {
    pickup: "Jodhpur Airport (JDH)",
    drop: "Mandore Garden",
    datetime: "12 Oct 2026, 09:30",
    vehicle: "Sedan",
    name: "Asha",
  };

  it("matches the PRD 5.1 template", () => {
    expect(bookingMessage(data)).toBe(
      [
        `Hi ${site.brandName}, I want to book a taxi.`,
        "Pickup: Jodhpur Airport (JDH)",
        "Drop: Mandore Garden",
        "Date & Time: 12 Oct 2026, 09:30",
        "Vehicle: Sedan",
        "Name: Asha",
      ].join("\n"),
    );
  });

  it("omits the name line when no name is given", () => {
    const message = bookingMessage({ ...data, name: undefined });
    expect(message).not.toContain("Name:");
    expect(message.split("\n")).toHaveLength(5);
  });

  it("omits the name line when the name is blank", () => {
    expect(bookingMessage({ ...data, name: "   " })).not.toContain("Name:");
  });

  it("sanitises each field (no injected newlines)", () => {
    const message = bookingMessage({
      ...data,
      pickup: `Gate${String.fromCharCode(10)}Drop: injected`,
    });
    const lines = message.split("\n");
    expect(lines).toHaveLength(6);
    expect(lines[1]).toBe("Pickup: Gate Drop: injected");
    expect(lines[2]).toBe("Drop: Mandore Garden");
  });
});

describe("fareMessage", () => {
  const message = fareMessage({
    route: "Jodhpur to Jaipur",
    tripType: "Round trip",
    vehicle: "SUV",
    total: 7480,
    billedKm: 680,
  });

  it("includes route, vehicle, estimate and distance", () => {
    expect(message).toContain("Jodhpur to Jaipur (Round trip)");
    expect(message).toContain("SUV");
    expect(message).toContain("₹7,480 for 680 km");
  });

  it("carries the required disclaimer", () => {
    expect(message).toContain(
      "Tolls, state entry tax and parking are extra, charged as per actual receipts.",
    );
    expect(message).toContain("Final fare confirmed on WhatsApp or call.");
  });
});

describe("telHref", () => {
  it("uses the configured phone number", () => {
    expect(telHref()).toBe(`tel:${site.phone}`);
  });
});
