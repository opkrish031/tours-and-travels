"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { routes } from "@/data/routes";
import { formatRupees } from "@/lib/fare";
import { trackEvent } from "@/lib/analytics";

const POPULAR_SLUGS = [
  "jodhpur-to-jaisalmer-taxi",
  "jodhpur-to-udaipur-taxi",
  "jodhpur-to-osian-taxi",
  "jodhpur-to-jaipur-taxi",
] as const;

const popularRoutes = POPULAR_SLUGS.map((slug) =>
  routes.find((route) => route.slug === slug),
).filter((route): route is (typeof routes)[number] => Boolean(route));

function prefillBookingForm(route: { from: string; to: string }) {
  trackEvent("popular_route_click", { route: `${route.from}-${route.to}` });
  window.dispatchEvent(
    new CustomEvent("marwad:prefill", {
      detail: { pickup: route.from, drop: route.to },
    }),
  );
  document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Starting-fare strip directly under the hero so visitors see real route
 * prices without scrolling. Clicking a fare prefills the booking form.
 */
export function PopularRoutes() {
  return (
    <section
      aria-label="Popular routes with starting fares"
      className="bg-snow border-line border-b py-8 md:py-10"
    >
      <Container>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <p className="eyebrow text-gold-deep font-semibold">
            Popular routes, starting fares
          </p>
          <p className="text-text-muted text-xs">
            One-way sedan drops · tolls billed at actuals
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popularRoutes.map((route) => (
            <li key={route.slug}>
              <button
                type="button"
                onClick={() => prefillBookingForm(route)}
                className="group border-line hover:border-gold/50 flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3.5 text-left shadow-xs transition-all hover:shadow-sm"
              >
                <span className="min-w-0">
                  <span className="text-text block truncate text-sm font-semibold tracking-tight">
                    {route.from} → {route.to}
                  </span>
                  <span className="tabular text-text-muted mt-0.5 block text-xs">
                    From {formatRupees(route.startingFare)} · {route.distanceKm} km
                  </span>
                </span>
                <span className="border-line bg-mist text-text flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    strokeWidth={2}
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="text-text-muted mt-4 text-xs">
          <Link
            href="/taxi-fare"
            className="text-gold-deep font-medium underline-offset-2 hover:underline"
          >
            See the full rate card
          </Link>{" "}
          · sedan from ₹11/km with a 300 km/day minimum on round trips.
        </p>
      </Container>
    </section>
  );
}
