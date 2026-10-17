import { BookingForm } from "@/components/booking/BookingForm";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { contextMessage } from "@/lib/whatsapp";
import { ShieldCheck, Clock, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-text-dark border-b border-line-dark pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Ambient gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gold/10 blur-[130px]"
      />

      {/* Subtle vehicle watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/4 h-96 w-96 opacity-[0.03]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 3c-.1.2-.1.4-.1.6v4.5c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      </div>

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left Editorial Column */}
        <div className="lg:col-span-7">
          {/* Eyebrow absorbing TopBar info */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-text-dark-muted font-medium">
            <span className="flex items-center gap-1 text-gold">
              <MapPin className="h-3.5 w-3.5" /> Jodhpur, Rajasthan
            </span>
            <span className="opacity-40">/</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-gold" /> 24/7 Available
            </span>
            <span className="opacity-40">/</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" /> Fixed Pricing
            </span>
          </div>

          {/* Split Headline (Server-safe + animated) */}
          <SplitHeadline
            text="Premier Chauffeur Travel Across Rajasthan"
            as="h1"
            className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-[-0.035em] leading-[1.05] text-white"
          />

          {/* Subcopy: 1 sentence */}
          <p className="mt-5 text-base md:text-lg text-text-dark-muted max-w-[50ch] leading-relaxed">
            Airport transfers, bespoke city sightseeing, and outstation taxi service with clean
            air-conditioned vehicles and all-inclusive fares.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <WhatsAppButton
              message={contextMessage("Hello, I would like to book a taxi in Jodhpur.")}
              location="home-hero"
              page="/"
              variant="primary"
              size="lg"
              arrow
            >
              Book on WhatsApp
            </WhatsAppButton>
            <Button href="#calculator" variant="secondary" size="lg" onDark>
              Calculate Fare
            </Button>
          </div>

          {/* Value Micro-Pills */}
          <div className="mt-10 pt-8 border-t border-line-dark grid grid-cols-3 gap-4 text-xs text-text-dark-muted">
            <div>
              <span className="tabular block text-base font-semibold text-white">4.9 ★</span>
              <span>Local Rating</span>
            </div>
            <div>
              <span className="tabular block text-base font-semibold text-white">100%</span>
              <span>AC Guaranteed</span>
            </div>
            <div>
              <span className="tabular block text-base font-semibold text-white">₹0</span>
              <span>Advance Needed</span>
            </div>
          </div>
        </div>

        {/* Right Floating Booking Card */}
        <div id="book" className="scroll-mt-24 lg:col-span-5">
          <Reveal delay={0.15}>
            <BookingForm sourcePage="/" dark={true} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
