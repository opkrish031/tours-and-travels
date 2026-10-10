import Link from "next/link";
import { BadgeCheck, CalendarClock, IndianRupee, Route } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";

const cards = [
  {
    icon: IndianRupee,
    title: "Fares you can check",
    body: "Every route and car class has a published per-km rate. The estimate shows the maths — distance, rate, and total — before you confirm anything.",
    href: "/taxi-fare",
    link: "See all fares",
  },
  {
    icon: CalendarClock,
    title: "Pickup on your schedule",
    body: "Airport arrivals, early train departures, or a hotel pickup at dawn — send the timing when you book and the car reaches you before it matters.",
    href: "/airport-taxi-jodhpur",
    link: "Airport transfers",
  },
  {
    icon: BadgeCheck,
    title: "Drivers you can verify",
    body: "Every driver holds a valid commercial licence. We share the driver's name and number before pickup, so you know who is coming and can reach them directly.",
    href: "/about",
    link: "How we work",
  },
  {
    icon: Route,
    title: "One car, whole trip",
    body: "Keep the same car and driver across city days, temple circuits, and long highway legs. Overnight halts and daily kilometre limits are written into the estimate.",
    href: "/round-trip-taxi-jodhpur",
    link: "Round trips",
  },
] as const;

export function WhyUs() {
  return (
    <Section tone="paper" size="md">
      <SectionHeader
        number="01"
        eyebrow="Why choose us"
        title="What a Marwar Cabs booking actually gives you"
        description="Four things we hold to on every trip, from a two-kilometre airport drop to a ten-day Rajasthan circuit."
      />
      <ul className="bg-line mt-10 grid gap-px sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {cards.map((card) => (
          <li key={card.title} className="bg-paper flex flex-col p-6 lg:p-7">
            <card.icon
              aria-hidden="true"
              className="text-brass-deep h-6 w-6"
              strokeWidth={1.5}
            />
            <h3 className="mt-5 text-[1.0625rem] leading-snug font-medium">
              {card.title}
            </h3>
            <p className="text-stone mt-3 flex-1 text-sm leading-relaxed">{card.body}</p>
            <Link
              href={card.href}
              className="hover:text-brass-deep mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              {card.link} <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
