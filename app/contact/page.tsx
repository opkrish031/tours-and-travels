import type { Metadata } from "next";
import { Clock, Mail, Phone, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { buildWhatsAppUrl, contextMessage, telHref } from "@/lib/whatsapp";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `Contact ${site.brandName} — Jodhpur Cab Booking`,
    description: `Call, WhatsApp, or send a reservation enquiry to ${site.brandName} in Jodhpur. Direct dispatch number, garage address, and 24/7 assistance.`,
    path: "/contact",
  });
}

const { geo } = site;
const mapBbox = [geo.lng - 0.02, geo.lat - 0.015, geo.lng + 0.02, geo.lat + 0.015].join(
  ",",
);
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(mapBbox)}&layer=mapnik&marker=${geo.lat},${geo.lng}`;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      {/* Apple-Style Concierge Hero (Luminous Light Canvas) */}
      <section className="relative overflow-hidden bg-snow border-b border-line pt-10 pb-16 md:pt-16 md:pb-20">
        <Container className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: "Concierge & Dispatch" }]} />

          <div className="mt-6 max-w-3xl">
            {/* Live Operations Telemetry Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-800 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Dispatch Desk Active · Paota Base · 24/7 Roadside &amp; Terminal Standby</span>
            </div>

            <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-semibold tracking-[-0.035em] leading-[1.06] text-text">
              Direct Concierge &amp; Dispatch Desk
            </h1>

            <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed max-w-[56ch]">
              Connect directly with our local fleet dispatchers in Jodhpur. Transparent written
              quotes, guaranteed clean vehicles, and immediate coordination without call-center delays.
            </p>

            {/* Quick Micro-Telemetry Ticker */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-text-muted border-t border-line/60 pt-6">
              <div>
                <span className="font-semibold text-text tabular block text-sm">&lt; 3 Min</span>
                <span>Avg WhatsApp Reply</span>
              </div>
              <div className="h-6 w-px bg-line/80" />
              <div>
                <span className="font-semibold text-text tabular block text-sm">₹0 Advance</span>
                <span>Zero Booking Fee</span>
              </div>
              <div className="h-6 w-px bg-line/80" />
              <div>
                <span className="font-semibold text-text tabular block text-sm">Commercial</span>
                <span>Licensed Fleet Permit</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tactile Concierge Channels Deck (3 Columns) */}
      <Section tone="mist" size="md">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Primary Channel: WhatsApp Priority Concierge */}
            <div className="md:col-span-1 rounded-3xl border border-gold/40 bg-white p-7 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-gold hover:shadow-md transition-all duration-300">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-gold/10 blur-2xl"
              />

              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-black shadow-xs mb-5">
                  <MessageCircle className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="inline-block text-[0.6875rem] font-semibold uppercase tracking-wider text-gold-deep mb-1">
                  Fastest Channel
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-text">
                  WhatsApp Concierge
                </h2>
                <p className="mt-2 text-xs md:text-sm text-text-muted leading-relaxed">
                  Instant quotes with vehicle photos and fixed rates sent directly to your chat.
                </p>

                {/* Pre-formatted quick prompts */}
                <div className="mt-4 pt-4 border-t border-line/60 space-y-2">
                  <span className="text-[0.6875rem] uppercase font-semibold text-text-muted block">
                    Quick Inquiries:
                  </span>
                  <a
                    href={buildWhatsAppUrl(contextMessage("Airport pickup enquiry for Jodhpur"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-medium text-text bg-mist hover:bg-gold/15 hover:text-gold-deep px-3 py-1.5 rounded-lg transition-colors"
                  >
                    → Airport Arrival Transfer
                  </a>
                  <a
                    href={buildWhatsAppUrl(contextMessage("Quote for Jodhpur to Jaisalmer cab"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-medium text-text bg-mist hover:bg-gold/15 hover:text-gold-deep px-3 py-1.5 rounded-lg transition-colors"
                  >
                    → Jodhpur to Jaisalmer Run
                  </a>
                  <a
                    href={buildWhatsAppUrl(contextMessage("Local full day sightseeing enquiry in Jodhpur"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-medium text-text bg-mist hover:bg-gold/15 hover:text-gold-deep px-3 py-1.5 rounded-lg transition-colors"
                  >
                    → Full Day Fort Sightseeing
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60">
                <a
                  href={buildWhatsAppUrl(contextMessage("Hello, I would like to book a cab in Jodhpur."))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-black shadow-xs hover:bg-gold-bright transition-colors"
                >
                  Open WhatsApp Chat →
                </a>
              </div>
            </div>

            {/* Direct Dispatch Phone */}
            <div className="md:col-span-1 rounded-3xl border border-line bg-white p-7 shadow-xs flex flex-col justify-between group hover:border-black/20 hover:shadow-md transition-all duration-300">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-xs mb-5">
                  <Phone className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="inline-block text-[0.6875rem] font-semibold uppercase tracking-wider text-text-muted mb-1">
                  Urgent &amp; Same-Day
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-text">
                  Direct Phone Line
                </h2>
                <div className="mt-1 font-mono text-lg font-semibold tabular text-text">
                  {site.phoneDisplay}
                </div>
                <p className="mt-3 text-xs md:text-sm text-text-muted leading-relaxed">
                  Speak directly with our local fleet manager for immediate airport or railway
                  station pickups.
                </p>

                <div className="mt-6 rounded-2xl bg-mist p-3.5 text-xs text-text-muted">
                  <div className="font-semibold text-text mb-0.5">Duty Dispatcher Available</div>
                  <span>Available 24 hours daily for flight coordination.</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60">
                <a
                  href={telHref()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-black py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white shadow-xs hover:bg-black/80 transition-colors"
                >
                  Call Dispatch Desk →
                </a>
              </div>
            </div>

            {/* Corporate & Invoicing */}
            <div className="md:col-span-1 rounded-3xl border border-line bg-white p-7 shadow-xs flex flex-col justify-between group hover:border-black/20 hover:shadow-md transition-all duration-300">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-text border border-line shadow-xs mb-5">
                  <Mail className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="inline-block text-[0.6875rem] font-semibold uppercase tracking-wider text-text-muted mb-1">
                  Corporate &amp; Billing
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-text">
                  Travel Desk Invoicing
                </h2>
                <div className="mt-1 text-sm font-semibold text-text truncate">
                  {site.email}
                </div>
                <p className="mt-3 text-xs md:text-sm text-text-muted leading-relaxed">
                  For corporate GST billings, multi-vehicle wedding fleets, and bespoke luxury
                  tempo traveller itineraries.
                </p>

                <div className="mt-6 rounded-2xl bg-mist p-3.5 text-xs text-text-muted">
                  <div className="font-semibold text-text mb-0.5">GST Invoices</div>
                  <span>Official tax invoices generated with company GSTIN.</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60">
                <a
                  href={`mailto:${site.email}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-line bg-snow py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-text shadow-xs hover:bg-mist transition-colors"
                >
                  Email Travel Desk →
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Reservation Form & Operations Hub Deck */}
      <Section tone="snow" size="md">
        <div className="max-w-5xl mx-auto grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Reservation Request */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <span className="eyebrow text-gold-deep font-semibold uppercase tracking-wider block mb-1">
                Written Reservation
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text">
                Submit Travel Requirements
              </h2>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                Provide your travel details to generate a customized WhatsApp reservation message
                with transparent pricing.
              </p>
            </div>
            <BookingForm sourcePage="/contact" variant="contact" />
          </div>

          {/* Garage & Base Location Deck */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="eyebrow text-text-muted font-semibold uppercase tracking-wider block mb-1">
                  Physical Hub
                </span>
                <h3 className="text-2xl font-semibold tracking-tight text-text">
                  Jodhpur Base of Operations
                </h3>
              </div>

              {/* Physical Location Card */}
              <div className="rounded-2xl border border-line bg-white p-6 shadow-xs mb-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-text">
                      {site.brandName} Dispatch Center
                    </h4>
                    <p className="mt-1 text-xs text-text-muted leading-relaxed">
                      Mandore Road, Paota Circle, Jodhpur, Rajasthan 342001
                    </p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mist text-gold-deep shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-line/60 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-text-muted block">Dispatch Desk:</span>
                    <span className="font-semibold text-text">24 Hours / 7 Days</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">Airport Proximity:</span>
                    <span className="font-semibold text-text">12 Minutes to JDH</span>
                  </div>
                </div>
              </div>

              {/* Embedded Map in Apple Frame */}
              <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xs">
                <iframe
                  title="Office Location Map"
                  src={mapSrc}
                  className="h-56 w-full border-0"
                  loading="lazy"
                />
                <div className="p-3 bg-mist/60 border-t border-line text-center">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.brandName} Jodhpur`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-gold-deep hover:text-black transition-colors"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
