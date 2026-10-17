import { Clock, Receipt, ShieldCheck, Wallet } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const items = [
  {
    icon: Clock,
    title: "Always On Call",
    note: "Instant dispatch any hour of day or night.",
  },
  {
    icon: Wallet,
    title: "Transparent Fares",
    note: "Complete quote provided before you travel.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Chauffeurs",
    note: "Commercial permits and highway specialists.",
  },
  {
    icon: Receipt,
    title: "Zero Hidden Costs",
    note: "Tolls and parking billed at exact cost.",
  },
] as const;

export function TrustStrip() {
  return (
    <section className="bg-snow text-text border-b border-line py-8 md:py-10">
      <Container>
        <Stagger
          as="ul"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => (
            <StaggerItem
              key={item.title}
              as="li"
              className="group flex items-start gap-4 rounded-2xl p-3.5 transition-colors hover:bg-mist/70"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-deep border border-gold/25">
                <item.icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight text-text">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-text-muted leading-relaxed">
                  {item.note}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
