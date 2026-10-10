import { Section, SectionHeader } from "@/components/ui/Section";

const steps = [
  {
    title: "Send your trip",
    body: "Message on WhatsApp, call, or fill the booking form. Share the date, pickup point, destination, and how many of you are travelling.",
  },
  {
    title: "Get the estimate",
    body: "We reply with the car class, the fare for your route, and what is included. Tolls and state entry tax are listed as they apply.",
  },
  {
    title: "Confirm the car",
    body: "You approve the number first. The booking is held for your date, and the driver's name and number reach you before the travel day.",
  },
  {
    title: "Travel",
    body: "The driver reaches the pickup point on time. You pay at the end of the trip, by the mode you agreed when booking.",
  },
] as const;

export function HowItWorks({ number }: { number?: string }) {
  return (
    <Section tone="umber" size="md">
      <SectionHeader
        number={number}
        eyebrow="How booking works"
        title="Four steps, no app required"
        description="From the first message to the pickup, the whole booking runs on WhatsApp or a phone call — with the fare agreed before the car moves."
        dark
      />
      <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-10">
        {steps.map((step, index) => (
          <li key={step.title} className="border-line-dark border-t pt-5">
            <span className="display tabular text-brass text-3xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-[1.0625rem] font-medium">{step.title}</h3>
            <p className="text-stone-light mt-2 text-sm leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
