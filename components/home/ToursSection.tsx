import Link from "next/link";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Section, SectionHeader } from "@/components/ui/Section";
import { routes } from "@/data/routes";

/** Destination-led cards — the four circuits travellers ask for most. */
const destinations = [
  { slug: "jodhpur-to-jaisalmer-taxi", photo: "Jaisalmer fort at golden hour" },
  { slug: "jodhpur-to-udaipur-taxi", photo: "Udaipur lakefront at dusk" },
  { slug: "jodhpur-to-jaipur-taxi", photo: "Jaipur old city gate" },
  { slug: "jodhpur-to-mount-abu-taxi", photo: "Mount Abu hill road" },
];

export function ToursSection() {
  const cards = destinations
    .map((entry) => ({
      entry,
      route: routes.find((route) => route.slug === entry.slug),
    }))
    .filter(
      (
        item,
      ): item is {
        entry: (typeof destinations)[number];
        route: (typeof routes)[number];
      } => Boolean(item.route),
    );

  return (
    <Section tone="sand" size="md">
      <SectionHeader
        number="06"
        eyebrow="Rajasthan destinations"
        title="Where travellers go from Jodhpur"
        description="The classic circuits — desert, lakes, pink city, hills — each with its own page of route notes, sights, and prices."
        action={
          <Link
            href="/taxi-fare"
            className="hover:text-brass-deep inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            All routes & fares <span aria-hidden="true">→</span>
          </Link>
        }
      />
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14">
        {cards.map(({ entry, route }) => (
          <li key={route.slug}>
            <Link href={`/${route.slug}`} className="group block">
              <PhotoPlaceholder
                src={route.image}
                label={entry.photo}
                alt={route.imageAlt}
                aspect="16 / 9"
                className="overflow-hidden"
              />
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <div>
                  <h3 className="text-[1.0625rem] font-medium">{route.to}</h3>
                  <p className="text-stone mt-1 text-sm font-medium italic">
                    {route.tagline}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="text-stone-light group-hover:text-brass-deep transition-colors"
                >
                  →
                </span>
              </div>
              <p className="text-stone mt-2 text-sm leading-relaxed">
                {route.highlights.join(" · ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
