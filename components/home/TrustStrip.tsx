import { Plane, Receipt, ShieldCheck, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const items = [
  {
    icon: MapPin,
    title: "Dispatch desk in Ratanada",
    note: "Call or WhatsApp — we answer and confirm the car.",
  },
  {
    icon: Plane,
    title: "Flight and PNR tracking",
    note: "Airport and junction pickups timed to your arrival.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed local drivers",
    note: "Commercial permits; drivers who know the Marwar routes.",
  },
  {
    icon: Receipt,
    title: "Yellow-plate fleet only",
    note: "Our own commercial cars — never a random broker vehicle.",
  },
] as const;

export function TrustStrip() {
  return (
    <section className="bg-snow text-text border-line border-b py-8 md:py-10">
      <Container>
        <Stagger as="ul" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <StaggerItem
              key={item.title}
              as="li"
              className="group hover:bg-mist/70 flex items-start gap-4 rounded-2xl p-3.5 transition-colors"
            >
              <div className="bg-gold/15 text-gold-deep border-gold/25 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                <item.icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-text text-sm font-semibold tracking-tight">
                  {item.title}
                </p>
                <p className="text-text-muted mt-0.5 text-xs leading-relaxed">
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
