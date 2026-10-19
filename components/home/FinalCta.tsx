import { CallButton } from "@/components/booking/CallButton";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { contextMessage } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="text-text-dark border-line-dark relative overflow-hidden border-t bg-black py-16 md:py-24">
      {/* Ambient gold glow */}
      <div
        aria-hidden="true"
        className="bg-gold/10 pointer-events-none absolute bottom-0 left-1/2 h-[450px] w-[750px] -translate-x-1/2 rounded-full blur-[140px]"
      />

      <Container className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="eyebrow text-gold mb-3 block font-semibold">
            Booking &amp; Dispatch
          </span>

          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-white">
            Tell us the date. We’ll confirm the car.
          </h2>

          <p className="text-text-dark-muted mx-auto mt-5 max-w-[54ch] text-base leading-relaxed md:text-lg">
            Send your dates on WhatsApp or call the Ratanada desk — we reply with the car,
            the driver&rsquo;s number, and the full fare before you travel.
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
