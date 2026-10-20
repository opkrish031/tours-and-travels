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
      <section className="bg-snow border-line relative overflow-hidden border-b pt-10 pb-16 md:pt-16 md:pb-20">
        <Container className="relative z-10 mx-auto max-w-5xl">
          <Breadcrumbs items={[{ label: "Contact & Dispatch" }]} />

          <div className="mt-6 max-w-3xl">
            {/* Live Operations Telemetry Badge */}
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>Dispatch Desk · Ratanada, Jodhpur · Near Airport &amp; Junction</span>
            </div>

            <h1 className="text-text text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
              Call, WhatsApp, or send your dates
            </h1>

            <p className="text-text-muted mt-4 max-w-[56ch] text-base leading-relaxed md:text-lg">
              You’ll reach our own dispatch desk in Jodhpur — the same people who assign
              the cars. Written quotes, clean vehicles, no call-centre in between.
            </p>

            {/* Quick Micro-Telemetry Ticker */}
            <div className="text-text-muted border-line/60 mt-8 flex flex-wrap items-center gap-6 border-t pt-6 text-xs">
              <div>
                <span className="text-text tabular block text-sm font-semibold">
                  Ratanada
                </span>
                <span>Base near JDH &amp; Junction</span>
              </div>
              <div className="bg-line/80 h-6 w-px" />
              <div>
                <span className="text-text tabular block text-sm font-semibold">
                  ₹0 Advance
                </span>
                <span>Nothing to pay online</span>
              </div>
              <div className="bg-line/80 h-6 w-px" />
              <div>
                <span className="text-text tabular block text-sm font-semibold">
                  Commercial
                </span>
                <span>Yellow-plate permitted fleet</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tactile Concierge Channels Deck (3 Columns) */}
      <Section tone="mist" size="md">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Primary Channel: WhatsApp Priority Concierge */}
            <div className="border-gold/40 group hover:border-gold relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white p-7 shadow-xs transition-all duration-300 hover:shadow-md md:col-span-1">
              <div
                aria-hidden="true"
                className="bg-gold/10 pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full blur-2xl"
              />

              <div>
                <div className="bg-gold mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-black shadow-xs">
                  <MessageCircle className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="text-gold-deep mb-1 inline-block text-[0.6875rem] font-semibold">
                  Usually Fastest
                </div>
                <h2 className="text-text text-xl font-semibold tracking-tight">
                  WhatsApp
                </h2>
                <p className="text-text-muted mt-2 text-xs leading-relaxed md:text-sm">
                  Send your route and dates — we reply with the vehicle class, rate and
                  availability in one message.
                </p>

                {/* Pre-formatted quick prompts */}
                <div className="border-line/60 mt-4 space-y-2 border-t pt-4">
                  <span className="text-text-muted block text-[0.6875rem] font-semibold">
                    Quick Inquiries:
                  </span>
                  <a
                    href={buildWhatsAppUrl(
                      contextMessage("Airport pickup enquiry for Jodhpur"),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text bg-mist hover:bg-gold/15 hover:text-gold-deep block rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                  >
                    → Airport Arrival Transfer
                  </a>
                  <a
                    href={buildWhatsAppUrl(
                      contextMessage("Quote for Jodhpur to Jaisalmer cab"),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text bg-mist hover:bg-gold/15 hover:text-gold-deep block rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                  >
                    → Jodhpur to Jaisalmer Run
                  </a>
                  <a
                    href={buildWhatsAppUrl(
                      contextMessage("Local full day sightseeing enquiry in Jodhpur"),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text bg-mist hover:bg-gold/15 hover:text-gold-deep block rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                  >
                    → Full Day Fort Sightseeing
                  </a>
                </div>
              </div>

              <div className="border-line/60 mt-6 border-t pt-4">
                <a
                  href={buildWhatsAppUrl(
                    contextMessage("Hello, I would like to book a cab in Jodhpur."),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold hover:bg-gold-bright inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-black shadow-xs transition-colors"
                >
                  Open WhatsApp Chat →
                </a>
              </div>
            </div>

            {/* Direct Dispatch Phone */}
            <div className="border-line group flex flex-col justify-between rounded-3xl border bg-white p-7 shadow-xs transition-all duration-300 hover:border-black/20 hover:shadow-md md:col-span-1">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-xs">
                  <Phone className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="text-text-muted mb-1 inline-block text-[0.6875rem] font-semibold">
                  Urgent &amp; Same-Day
                </div>
                <h2 className="text-text text-xl font-semibold tracking-tight">
                  Direct Phone Line
                </h2>
                <div className="tabular text-text mt-1 font-mono text-lg font-semibold">
                  {site.phoneDisplay}
                </div>
                <p className="text-text-muted mt-3 text-xs leading-relaxed md:text-sm">
                  For airport or railway pickups, outstation trips, and anything same-day
                  — call the desk and sort it out on the phone.
                </p>

                <div className="bg-mist text-text-muted mt-6 rounded-2xl p-3.5 text-xs">
                  <div className="text-text mb-0.5 font-semibold">Dispatch desk</div>
                  <span>Open 24 hours for flight and train coordination.</span>
                </div>
              </div>

              <div className="border-line/60 mt-6 border-t pt-4">
                <a
                  href={telHref()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-black/80"
                >
                  Call Dispatch Desk →
                </a>
              </div>
            </div>

            {/* Corporate & Invoicing — commented out pending official client email
            <div className="border-line group flex flex-col justify-between rounded-3xl border bg-white p-7 shadow-xs transition-all duration-300 hover:border-black/20 hover:shadow-md md:col-span-1">
              <div>
                <div className="bg-mist text-text border-line mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-xs">
                  <Mail className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="text-text-muted mb-1 inline-block text-[0.6875rem] font-semibold">
                  Corporate &amp; Billing
                </div>
                <h2 className="text-text text-xl font-semibold tracking-tight">
                  Travel Desk Invoicing
                </h2>
                <div className="text-text mt-1 truncate text-sm font-semibold">
                  {site.email}
                </div>
                <p className="text-text-muted mt-3 text-xs leading-relaxed md:text-sm">
                  GST invoices for companies, multi-vehicle wedding fleets, and group
                  Tempo Traveller bookings.
                </p>

                <div className="bg-mist text-text-muted mt-6 rounded-2xl p-3.5 text-xs">
                  <div className="text-text mb-0.5 font-semibold">GST Invoices</div>
                  <span>Official tax invoices generated with company GSTIN.</span>
                </div>
              </div>

              <div className="border-line/60 mt-6 border-t pt-4">
                <a
                  href={`mailto:${site.email}`}
                  className="border-line bg-snow text-text hover:bg-mist inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold shadow-xs transition-colors"
                >
                  Email Travel Desk →
                </a>
              </div>
            </div>
            */}
          </div>
        </div>
      </Section>

      {/* Reservation Form & Operations Hub Deck */}
      <Section tone="snow" size="md">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Reservation Request */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <span className="eyebrow text-gold-deep mb-1 block font-semibold">
                Written Reservation
              </span>
              <h2 className="text-text text-2xl font-semibold tracking-tight sm:text-3xl">
                Send your trip details
              </h2>
              <p className="text-text-muted mt-2 text-sm leading-relaxed">
                Fill in your dates and route — we’ll open WhatsApp with the message ready,
                and reply with the fare.
              </p>
            </div>
            <BookingForm sourcePage="/contact" variant="contact" />
          </div>

          {/* Garage & Base Location Deck */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="mb-6">
                <span className="eyebrow text-text-muted mb-1 block font-semibold">
                  Physical Hub
                </span>
                <h3 className="text-text text-2xl font-semibold tracking-tight">
                  Jodhpur Base of Operations
                </h3>
              </div>

              {/* Physical Location Card */}
              <div className="border-line mb-5 rounded-2xl border bg-white p-6 shadow-xs">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-text text-sm font-semibold">
                      {site.brandName} Dispatch Center
                    </h4>
                    <p className="text-text-muted mt-1 text-xs leading-relaxed">
                      {site.address.street}, {site.address.locality},{" "}
                      {site.address.region} {site.address.postalCode}
                    </p>
                  </div>
                  <div className="bg-mist text-gold-deep flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>

                <div className="border-line/60 mt-4 grid grid-cols-2 gap-3 border-t pt-4 text-xs">
                  <div>
                    <span className="text-text-muted block">Dispatch Desk:</span>
                    <span className="text-text font-semibold">24 Hours / 7 Days</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">Location:</span>
                    <span className="text-text font-semibold">Ratanada, near JDH</span>
                  </div>
                </div>
              </div>

              {/* Embedded Map in Apple Frame */}
              <div className="border-line overflow-hidden rounded-3xl border bg-white shadow-xs">
                <iframe
                  title="Office Location Map"
                  src={mapSrc}
                  className="h-56 w-full border-0"
                  loading="lazy"
                />
                <div className="bg-mist/60 border-line border-t p-3 text-center">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.brandName} Jodhpur`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-deep text-xs font-semibold transition-colors hover:text-black"
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
