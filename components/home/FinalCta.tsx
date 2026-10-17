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
          <span className="eyebrow text-gold font-semibold uppercase tracking-wider block mb-3">
            Immediate Dispatch &amp; Booking
          </span>

          <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-[-0.035em] leading-[1.06] text-white">
            Tell Us Your Date. We Will Dispatch the Car.
          </h2>

          <p className="mt-5 text-base md:text-lg text-text-dark-muted max-w-[54ch] mx-auto leading-relaxed">
            No advance required. Message your route on WhatsApp to receive the confirmed fare
            and vehicle details in under five minutes.
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
