"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { routes } from "@/data/routes";
import { services } from "@/data/services";
import { contextMessage } from "@/lib/whatsapp";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Section tone="black" size="lg" className="text-center relative overflow-hidden">
        {/* Ambient gold glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[750px] rounded-full bg-gold/10 blur-[140px]"
        />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          {/* Animated 404 & route line illustration */}
          <div className="relative mb-6">
            <span className="font-mono text-8xl md:text-9xl font-bold tracking-tighter text-white/90 select-none">
              404
            </span>

            {/* Gently moving route line illustration */}
            <div className="w-48 h-12 mx-auto mt-2">
              <svg viewBox="0 0 200 40" fill="none" className="w-full h-full text-gold">
                <m.path
                  d="M 10 20 Q 50 5 100 20 T 190 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  fill="transparent"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -40 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />
                <circle cx="10" cy="20" r="4" fill="currentColor" />
                <circle cx="190" cy="20" r="4" fill="currentColor" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            This Route Took a Detour
          </h1>

          <p className="mt-3 text-base text-text-dark-muted max-w-[46ch] leading-relaxed">
            The page you are looking for has moved or does not exist. Browse our most booked
            destinations below or return to the main station.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Button href="/" variant="primary" size="md">
              Return Home
            </Button>
            <Button href="/taxi-fare" variant="secondary" size="md" onDark>
              Browse Rate Card
            </Button>
            <WhatsAppButton
              location="404"
              page="/404"
              variant="outline"
              size="md"
              onDark
              message={contextMessage("I could not find a page on your site")}
            >
              Ask on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </Section>

      {/* Popular Services Directory */}
      <Section tone="snow" size="md">
        <SectionHeader
          eyebrow="Explore Fleet"
          title="Popular Travel Categories"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-text group-hover:text-gold-deep transition-colors">
                  {service.name}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-text-muted leading-relaxed">
                  {service.summary}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line/70 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted group-hover:text-black">
                <span>View Details</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Popular Routes */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="Direct Routes"
          title="Frequent Highway Destinations"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {routes.slice(0, 6).map((route) => (
            <Link
              key={route.slug}
              href={`/${route.slug}`}
              className="group rounded-2xl border border-line bg-white p-5 shadow-xs transition-all hover:border-black/20"
            >
              <h3 className="font-semibold text-text group-hover:text-gold-deep transition-colors">
                {route.from} to {route.to}
              </h3>
              <p className="text-xs text-text-muted mt-1">{route.tagline}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
