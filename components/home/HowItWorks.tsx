import { Section, SectionHeader } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const steps = [
  {
    number: "01",
    title: "Share Your Plan",
    body: "Send your travel date, pickup location, and passenger count via WhatsApp or call.",
  },
  {
    number: "02",
    title: "Review Exact Quote",
    body: "Receive the verified fare with vehicle options and exact inclusions within minutes.",
  },
  {
    number: "03",
    title: "Chauffeur Assigned",
    body: "Vehicle is held. Driver contact, license, and car registration sent prior to departure.",
  },
  {
    number: "04",
    title: "Travel & Pay at End",
    body: "Driver arrives promptly. Settle payment comfortably upon destination arrival.",
  },
] as const;

export function HowItWorks({ number }: { number?: string }) {
  return (
    <Section tone="graphite" size="md">
      <SectionHeader
        number={number}
        eyebrow="Simple Reservation"
        title="Four Direct Steps. No App Needed."
        description="Booking is handled directly through WhatsApp or phone with total pricing agreed before your journey starts."
        dark
      />

      {/* Connected Steps Grid */}
      <Stagger
        as="ol"
        className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12"
      >
        {steps.map((step, index) => (
          <StaggerItem
            key={step.title}
            as="li"
            className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.08]"
          >
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-2xl font-bold tracking-tight text-gold">
                  {step.number}
                </span>
                <span className="h-2 w-2 rounded-full bg-gold/50" />
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-dark-muted leading-relaxed">
                {step.body}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-text-dark-muted/60 font-mono">
              Step 0{index + 1} of 04
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
