import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { attractions } from "@/data/attractions";

export function SpotsSection() {
  return (
    <Section tone="paper" size="md">
      <SectionHeader
        number="09"
        eyebrow="Inside Jodhpur"
        title="Sightseeing spots your driver knows"
        description="The city's sights sit in a few compact clusters. A local package keeps the car waiting while you walk, then moves to the next stop when you are ready."
        action={
          <Link
            href="/local-taxi-jodhpur"
            className="hover:text-brass-deep inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            Local taxi packages <span aria-hidden="true">→</span>
          </Link>
        }
      />
      <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {attractions.map((spot, index) => (
          <li key={spot.slug} className="border-line border-t pt-4">
            <span className="eyebrow text-stone-light tabular">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-[1.0625rem] leading-snug font-medium">
              {spot.name}
            </h3>
            <p className="text-stone mt-2 text-sm leading-relaxed">{spot.blurb}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
