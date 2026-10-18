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
    title: "Get the Written Quote",
    body: "We reply with the fare, vehicle options, and what’s included — before you confirm anything.",
  },
  {
    number: "03",
    title: "Driver Assigned",
    body: "The car is held for your dates. Driver contact and vehicle number sent before pickup.",
  },
  {
    number: "04",
    title: "Travel & Pay at the End",
    body: "Pay the driver at the end of the trip — cash or UPI. Nothing online beforehand.",
  },
] as const;

export function HowItWorks({ number }: { number?: string }) {
  return (
    <Section tone="graphite" size="md">
      <SectionHeader
        number={number}
        eyebrow="How booking works"
        title="Four steps, no app needed."
        description="Booking is handled directly on WhatsApp or phone. The fare is agreed before your journey starts."
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

              <h3 className="text-lg font-semibold tracking-[-0.01em] text-white mb-2">
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
