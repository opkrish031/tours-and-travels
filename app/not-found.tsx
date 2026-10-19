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
      <Section tone="black" size="lg" className="relative overflow-hidden text-center">
        {/* Ambient gold glow */}
        <div
          aria-hidden="true"
          className="bg-gold/10 pointer-events-none absolute top-1/2 left-1/2 h-[450px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          {/* Animated 404 & route line illustration */}
          <div className="relative mb-6">
            <span className="font-mono text-8xl font-bold tracking-tighter text-white/90 select-none md:text-9xl">
              404
            </span>

            {/* Gently moving route line illustration */}
            <div className="mx-auto mt-2 h-12 w-48">
              <svg viewBox="0 0 200 40" fill="none" className="text-gold h-full w-full">
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

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            This Route Took a Detour
          </h1>

          <p className="text-text-dark-muted mt-3 max-w-[46ch] text-base leading-relaxed">
            The page you are looking for has moved or does not exist. Browse the routes
            and services below, or head back to the home page.
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
        <SectionHeader eyebrow="Fleet" title="Popular travel categories" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="group border-line flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
            >
              <div>
                <h3 className="text-text group-hover:text-gold-deep text-lg font-semibold tracking-tight transition-colors">
                  {service.name}
                </h3>
                <p className="text-text-muted mt-2 text-xs leading-relaxed md:text-sm">
                  {service.summary}
                </p>
              </div>
              <div className="border-line/70 text-text-muted mt-6 flex items-center justify-between border-t pt-4 text-xs font-semibold group-hover:text-black">
                <span>View Details</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Popular Routes */}
      <Section tone="mist" size="md">
        <SectionHeader eyebrow="Routes" title="Frequent highway destinations" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routes.slice(0, 6).map((route) => (
            <Link
              key={route.slug}
              href={`/${route.slug}`}
              className="group border-line rounded-2xl border bg-white p-5 shadow-xs transition-all hover:border-black/20"
            >
              <h3 className="text-text group-hover:text-gold-deep font-semibold transition-colors">
                {route.from} to {route.to}
              </h3>
              <p className="text-text-muted mt-1 text-xs">{route.tagline}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
