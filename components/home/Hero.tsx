"use client";

import { useState } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { HeroRouteBackdrop, type RouteKey } from "@/components/home/HeroRouteBackdrop";
import { Container } from "@/components/ui/Container";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { contextMessage, telHref } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { MapPin, CheckCircle2, Phone, Star, Navigation } from "lucide-react";

type RouteSpec = {
  id: RouteKey;
  label: string;
  distance: string;
  duration: string;
  startingFare: string;
  highway: string;
  halt: string;
};

const ROUTE_SPECS: RouteSpec[] = [
  {
    id: "jaisalmer",
    label: "Jaisalmer",
    distance: "285 km",
    duration: "4.5–5h",
    startingFare: "₹4,200",
    highway: "NH-125 & NH-11",
    halt: "Pokhran Fort & Ramdevra halt • Direct Sam Dunes drop",
  },
  {
    id: "udaipur",
    label: "Udaipur",
    distance: "255 km",
    duration: "5–6h",
    startingFare: "₹4,000",
    highway: "NH-62 via Ranakpur",
    halt: "Om Banna Dham & Ranakpur Jain Temple (12 PM tourist entry)",
  },
  {
    id: "osian",
    label: "Osian Dunes",
    distance: "65 km",
    duration: "1.2h",
    startingFare: "₹1,800 RT",
    highway: "NH-62 Mandore Road",
    halt: "Sachiya Mata Temple, camel safari & desert sunset return",
  },
  {
    id: "jaipur",
    label: "Jaipur",
    distance: "335 km",
    duration: "5.5h",
    startingFare: "₹4,500",
    highway: "NH-25 & NH-48 6-Lane",
    halt: "Smooth expressway run with Pushkar / Ajmer Dargah detour",
  },
  {
    id: "mount-abu",
    label: "Mount Abu",
    distance: "265 km",
    duration: "4.5h",
    startingFare: "₹4,200",
    highway: "NH-62 & NH-27",
    halt: "28 km uphill ghat climb with non-stop AC • Dilwara & Nakki Lake",
  },
];

export function Hero() {
  const [activeRoute, setActiveRoute] = useState<RouteKey>("jaisalmer");

  const activeSpec = ROUTE_SPECS.find((r) => r.id === activeRoute) ?? ROUTE_SPECS[0];

  return (
    <section className="relative overflow-hidden bg-[#0B172A] text-text-dark border-b border-[#C8962E]/25 pt-8 pb-14 md:pt-14 md:pb-20">
      {/* 1. Illustrative Vector Route Map Background */}
      <HeroRouteBackdrop activeRoute={activeRoute} />

      {/* 2. Ambient Atmosphere Highlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[560px] w-[900px] rounded-full bg-[#C8962E]/10 blur-[140px]"
      />

      {/* 3. Foreground Content */}
      <Container className="relative z-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Brand, Value Proposition & Interactive Route Corridors */}
        <div className="lg:col-span-7">
          {/* Eyebrow Pill */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-medium">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-emerald-300 font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Cabs On Standby · 15 Min Pickup
            </span>
            <span className="text-[#A3B3CA]">•</span>
            <span className="flex items-center gap-1 text-[#E5B84B]">
              <MapPin className="h-3.5 w-3.5" /> Civil Airport Rd, Ratanada
            </span>
            <span className="text-[#A3B3CA]">•</span>
            <span className="flex items-center gap-1 text-white/90">
              <Star className="h-3.5 w-3.5 fill-[#E5B84B] text-[#E5B84B]" /> 4.9★ (850+ Reviews)
            </span>
          </div>

          {/* Cinematic Headline */}
          <SplitHeadline
            text="Jodhpur Taxi Service & Sightseeing Cabs — Upfront Per-KM Rates"
            as="h1"
            className="text-[clamp(2.1rem,4.2vw,3.6rem)] font-bold font-serif tracking-tight leading-[1.08] text-white"
          />

          {/* Authentic Subcopy */}
          <p className="mt-4 text-sm sm:text-base text-[#FAF7F2]/85 max-w-[54ch] leading-relaxed">
            Direct taxi booking in Jodhpur with Marwad Cabs. Clean AC Dzire, Ertiga, Innova Crysta & Tempo Travellers with local Marwari chauffeurs. Fixed per-km rates, zero hidden night charges, and no commission shopping stops.
          </p>

          {/* 4 Quick Rate Badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#132542]/90 border border-[#C8962E]/40 px-3 py-1 text-xs font-semibold text-white shadow-xs backdrop-blur-sm">
              <span className="text-[#A3B3CA]">Sedan:</span>
              <span className="text-[#E5B84B]">₹10/km</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#132542]/90 border border-[#C8962E]/40 px-3 py-1 text-xs font-semibold text-white shadow-xs backdrop-blur-sm">
              <span className="text-[#A3B3CA]">Ertiga:</span>
              <span className="text-[#E5B84B]">₹13/km</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#132542]/90 border border-[#C8962E]/40 px-3 py-1 text-xs font-semibold text-white shadow-xs backdrop-blur-sm">
              <span className="text-[#A3B3CA]">Crysta:</span>
              <span className="text-[#E5B84B]">₹17/km</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#132542]/90 border border-[#C8962E]/40 px-3 py-1 text-xs font-semibold text-white shadow-xs backdrop-blur-sm">
              <span className="text-[#A3B3CA]">Local 8Hr/80Km:</span>
              <span className="text-[#E5B84B]">₹1,800</span>
            </span>
          </div>

          {/* Interactive Route Corridor Control Bar (Syncs with the Background Route Illustration) */}
          <div className="mt-7 rounded-2xl border border-[#C8962E]/30 bg-[#070F1E]/80 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5B84B] flex items-center gap-1.5">
                <Navigation className="h-3 w-3" /> Rajasthan Highway Corridors
              </span>
              <span className="text-[10.5px] text-[#A3B3CA]">
                Click to highlight route on map
              </span>
            </div>

            {/* Route Selector Pills */}
            <div className="flex flex-wrap gap-1.5">
              {ROUTE_SPECS.map((r) => {
                const isSelected = activeRoute === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setActiveRoute(r.id)}
                    className={`group relative flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#C8962E] text-[#0B172A] font-bold shadow-xs shadow-[#C8962E]/50"
                        : "bg-white/5 text-[#E6DEC8] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{r.label}</span>
                    <span
                      className={`text-[10px] ${
                        isSelected ? "text-[#0B172A]/80 font-bold" : "text-[#A3B3CA]"
                      }`}
                    >
                      {r.distance}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Corridor Live Telemetry */}
            <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-[#FAF7F2]/80">
              <div className="leading-snug">
                <span className="font-semibold text-[#E5B84B]">{activeSpec.highway}: </span>
                <span>{activeSpec.halt}</span>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <span className="text-[11px] text-[#A3B3CA]">Starts from</span>
                <span className="font-bold text-white text-sm bg-white/10 px-2 py-0.5 rounded-md border border-white/15">
                  {activeSpec.startingFare}
                </span>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp & Call CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <WhatsAppButton
              message={contextMessage(
                `Hi Marwad Cabs, I want to book a taxi from Jodhpur to ${activeSpec.label} (${activeSpec.distance}). Please share car availability and best rate.`
              )}
              location="home-hero"
              page="/"
              variant="primary"
              size="lg"
              arrow
            >
              Book {activeSpec.label} on WhatsApp
            </WhatsAppButton>

            <a
              href={telHref()}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 active:scale-95 px-6 py-3.5 text-sm font-semibold text-white transition-all shadow-xs"
            >
              <Phone className="h-4 w-4 text-[#E5B84B] transition-transform group-hover:rotate-12" />
              <span>Call 24×7: {site.phoneDisplay}</span>
            </a>
          </div>

          {/* Honest Travel Guarantee */}
          <div className="mt-7 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#FAF7F2]/75">
            <p className="flex items-center gap-2 text-[#E5B84B] font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#E5B84B]" />
              Zero-Commission Promise: No forced shopping stops.
            </p>
            <div className="flex items-center gap-3 text-[#A3B3CA]">
              <span>15 Min Pickup</span>
              <span>•</span>
              <span>₹300 Driver Bhatta</span>
              <span>•</span>
              <span>FASTag at Actuals</span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating High-Converting Booking Form */}
        <div id="book" className="scroll-mt-24 lg:col-span-5">
          <Reveal delay={0.15}>
            <BookingForm sourcePage="/" dark={true} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
