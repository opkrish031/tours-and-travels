"use client";

import { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "motion/react";
import { MapPin, Navigation, Clock, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, contextMessage } from "@/lib/whatsapp";
import { formatRupees } from "@/lib/fare";

type PopularRoute = {
  id: string;
  destination: string;
  distance: string;
  duration: string;
  highway: string;
  startingFare: number;
  highlight: string;
  slug: string;
};

const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: "jaisalmer",
    destination: "Jaisalmer",
    distance: "285 km",
    duration: "4.5–5 Hours",
    highway: "NH-125 & NH-11",
    startingFare: 4200,
    highlight: "Optional halt at Pokhran Fort & Ramdevra • Direct Sam Dunes drop",
    slug: "jodhpur-to-jaisalmer-taxi",
  },
  {
    id: "udaipur",
    destination: "Udaipur",
    distance: "255–285 km",
    duration: "5–6.5 Hours",
    highway: "NH-62 via Ranakpur",
    startingFare: 4000,
    highlight: "Scenic route stopping at Bullet Baba (Om Banna) & Ranakpur Jain Temple",
    slug: "jodhpur-to-udaipur-taxi",
  },
  {
    id: "osian",
    destination: "Osian Desert",
    distance: "65 km",
    duration: "1 Hr 15 Mins",
    highway: "NH-62 Mandore Road",
    startingFare: 1800,
    highlight: "Sachiya Mata Temple darshan, camel safari & desert sunset return",
    slug: "jodhpur-to-osian-taxi",
  },
  {
    id: "jaipur",
    destination: "Jaipur",
    distance: "335 km",
    duration: "5.5–6 Hours",
    highway: "NH-25 & NH-48 6-Lane",
    startingFare: 4500,
    highlight: "Smooth 6-lane run with optional 2-hr detour to Pushkar / Ajmer Dargah",
    slug: "jodhpur-to-jaipur-taxi",
  },
  {
    id: "mount-abu",
    destination: "Mount Abu",
    distance: "265 km",
    duration: "4.5–5 Hours",
    highway: "NH-62 & NH-27",
    startingFare: 4200,
    highlight: "28 km hill ghat climb with 100% continuous AC • Dilwara & Nakki Lake",
    slug: "jodhpur-to-mount-abu-taxi",
  },
];

export function HeroRouteVisualizer() {
  const [selectedRoute, setSelectedRoute] = useState<PopularRoute>(POPULAR_ROUTES[0]);

  return (
    <div className="mt-8 rounded-2xl border border-[#C8962E]/30 bg-[#070F1E]/80 p-4 sm:p-5 backdrop-blur-md shadow-lg shadow-black/40">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5B84B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E5B84B]"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#E5B84B]">
            Popular Highway Routes from Jodhpur
          </span>
        </div>
        <span className="text-[11px] text-[#A3B3CA]">
          Select route to preview time & fare
        </span>
      </div>

      {/* Route Switcher Tabs */}
      <div className="mt-3.5 flex flex-wrap gap-1.5 sm:gap-2">
        {POPULAR_ROUTES.map((route) => {
          const isActive = selectedRoute.id === route.id;
          return (
            <button
              key={route.id}
              type="button"
              onClick={() => setSelectedRoute(route)}
              className={`group relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#C8962E] text-[#0B172A] font-semibold shadow-xs shadow-[#C8962E]/40"
                  : "bg-white/5 text-[#E6DEC8] hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{route.destination}</span>
              <span
                className={`text-[10px] ${
                  isActive ? "text-[#0B172A]/75 font-bold" : "text-[#A3B3CA]"
                }`}
              >
                {route.distance.split(" ")[0]}km
              </span>
            </button>
          );
        })}
      </div>

      {/* Highway Pathway Track (The Visual Route Line) */}
      <div className="mt-4 rounded-xl bg-[#0B172A] border border-white/10 p-3.5 sm:p-4">
        <div className="relative flex items-center justify-between">
          {/* Origin Node */}
          <div className="flex items-center gap-2 z-10 bg-[#0B172A] pr-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E5B84B]/15 border border-[#E5B84B]/40 text-[#E5B84B]">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <span className="block text-[11px] text-[#A3B3CA] leading-tight">From Origin</span>
              <strong className="text-xs sm:text-sm font-semibold text-white">Jodhpur</strong>
            </div>
          </div>

          {/* Animated Connecting Track */}
          <div className="relative flex-1 mx-2 sm:mx-4 flex items-center">
            {/* Dashed track background */}
            <div className="w-full border-t border-dashed border-[#C8962E]/40"></div>
            
            {/* Center Highway Pill with Distance & Time */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[#132542] border border-[#C8962E]/40 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-[#E5B84B] shadow-xs whitespace-nowrap">
              <span>🚗</span>
              <span>{selectedRoute.distance}</span>
              <span className="opacity-40">•</span>
              <span>{selectedRoute.duration}</span>
            </div>
          </div>

          {/* Destination Node */}
          <div className="flex items-center gap-2 z-10 bg-[#0B172A] pl-2">
            <div className="text-right">
              <span className="block text-[11px] text-[#A3B3CA] leading-tight">To Destination</span>
              <strong className="text-xs sm:text-sm font-semibold text-[#E5B84B]">
                {selectedRoute.destination}
              </strong>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C8962E] text-[#0B172A] font-bold">
              <Navigation className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Dynamic Route Info Strip */}
        <AnimatePresence mode="wait">
          <m.div
            key={selectedRoute.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-3.5 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="text-xs text-[#FAF7F2]/80 leading-relaxed">
              <span className="text-[#E5B84B] font-semibold">{selectedRoute.highway}: </span>
              <span>{selectedRoute.highlight}</span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <div className="text-right">
                <span className="block text-[10px] text-[#A3B3CA] uppercase tracking-wider">Sedan Fare</span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  From {formatRupees(selectedRoute.startingFare)}
                </span>
              </div>

              <a
                href={buildWhatsAppUrl(
                  contextMessage(
                    `Hi Marwad Cabs, I want to book a cab from Jodhpur to ${selectedRoute.destination} (${selectedRoute.distance}). Please share car availability and best rate.`
                  )
                )}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-transform active:scale-95"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Book on WhatsApp</span>
              </a>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
