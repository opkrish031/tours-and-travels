import { CallButton } from "@/components/booking/CallButton";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { contextMessage } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-black text-text-dark border-t border-line-dark py-24 md:py-36">
      {/* Ambient gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[450px] w-[750px] rounded-full bg-gold/10 blur-[140px]"
      />

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <Reveal>
          <span className="eyebrow text-gold font-semibold block mb-3">
            Booking &amp; Dispatch
          </span>

          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-[-0.02em] leading-[1.15] text-white">
            Tell us the date. We’ll confirm the car.
          </h2>

          <p className="mt-5 text-base md:text-lg text-text-dark-muted max-w-[54ch] mx-auto leading-relaxed">
            No advance payment. Send your route on WhatsApp or call — we reply
            with the fare and car details for your dates.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <WhatsAppButton
                variant="primary"
                size="lg"
                location="home-final-cta"
                page="/"
                message={contextMessage("I want to book a taxi — here is my trip plan.")}
                arrow
              >
                Book on WhatsApp
              </WhatsAppButton>
            </Magnetic>

            <Magnetic>
              <CallButton
                variant="secondary"
                size="lg"
                onDark
                location="home-final-cta"
                page="/"
              >
                Call Support
              </CallButton>
            </Magnetic>

            <Button href="/taxi-fare" variant="outline" size="lg" onDark>
              Browse Rate Card
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
