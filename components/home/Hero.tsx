import { BookingForm } from "@/components/booking/BookingForm";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { contextMessage } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="border-line bg-paper border-b">
      <Container className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24">
        <div className="lg:col-span-6">
          <p className="eyebrow text-stone">Jodhpur · Rajasthan</p>
          <h1 className="display mt-5 text-[clamp(2.4rem,6vw,4.5rem)]">
            Jodhpur taxi service for airport runs, city days, and Rajasthan roads.
          </h1>
          <p className="text-stone mt-5 max-w-[46ch] leading-relaxed">
            {site.brandName} provides chauffeur-driven cars for airport transfers, local
            sightseeing, and outstation trips — with clean vehicles, professional drivers,
            and a fare you can check before you confirm anything.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#book" variant="brass" arrow>
              Book now
            </Button>
            <WhatsAppButton
              message={contextMessage("I found your site and want to book a taxi")}
              location="home-hero"
              page="/"
              variant="secondary"
            >
              WhatsApp us
            </WhatsAppButton>
          </div>
        </div>
        <div id="book" className="scroll-mt-24 lg:col-span-6">
          <BookingForm sourcePage="/" />
        </div>
      </Container>
    </section>
  );
}
