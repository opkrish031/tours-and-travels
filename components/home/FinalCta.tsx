import { CallButton } from "@/components/booking/CallButton";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { contextMessage } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="bg-ink text-paper">
      <Container className="py-14 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-stone-light mb-4">Ready when you are</p>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">
              Tell us the date. We will send the fare.
            </h2>
            <p className="text-stone-light mt-4 max-w-[52ch] text-sm leading-relaxed">
              No payment online, no app to install. Share your trip on WhatsApp or call —
              the estimate reaches you before you confirm anything.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <WhatsAppButton
              variant="brass"
              location="home-final-cta"
              page="/"
              message={contextMessage("I want to book a taxi — here is my trip")}
            >
              Book on WhatsApp
            </WhatsAppButton>
            <CallButton variant="secondary" onDark location="home-final-cta" page="/">
              Call us
            </CallButton>
            <Button href="/taxi-fare" variant="secondary" onDark>
              See fares
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
