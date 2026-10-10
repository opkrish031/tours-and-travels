import Link from "next/link";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Section, SectionHeader } from "@/components/ui/Section";
import { vehicles } from "@/data/vehicles";
import { formatRupees } from "@/lib/fare";

export function FleetCards() {
  return (
    <Section tone="paper" size="md">
      <SectionHeader
        number="03"
        eyebrow="The fleet"
        title="Four car classes, priced by the kilometre"
        description="Every class lists its rate and daily limit up front. Choose one in the calculator to see what your route costs in that car."
        action={
          <Link
            href="/taxi-fare"
            className="hover:text-brass-deep inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            Compare all rates <span aria-hidden="true">→</span>
          </Link>
        }
      />
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {vehicles.map((vehicle) => (
          <li key={vehicle.slug} className="flex flex-col">
            <PhotoPlaceholder
              label={`${vehicle.name} · ${vehicle.models[0]}`}
              alt={vehicle.imageAlt}
              aspect="4 / 3"
            />
            <div className="mt-4 flex flex-1 flex-col">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[1.0625rem] font-medium">{vehicle.name}</h3>
                {vehicle.popular ? (
                  <span className="bg-brass/15 text-brass-deep rounded-xs px-2 py-0.5 text-[0.625rem] font-semibold tracking-wider uppercase">
                    Popular
                  </span>
                ) : null}
              </div>
              <p className="text-stone mt-1 text-sm">
                {vehicle.seats} seats · {vehicle.luggage}
              </p>
              <p className="mt-3">
                <span className="display tabular text-2xl">
                  {formatRupees(vehicle.perKm)}
                </span>
                <span className="text-stone text-sm"> / km</span>
                <span className="text-stone-light text-xs">
                  {" "}
                  · {vehicle.dailyKmLimit} km/day
                </span>
              </p>
              <Link
                href={`/${vehicle.slug}`}
                className="border-line-strong hover:border-ink hover:bg-ink/[0.04] mt-4 inline-flex h-10 items-center justify-center rounded-sm border text-sm font-semibold transition-colors duration-200"
              >
                Book {vehicle.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
