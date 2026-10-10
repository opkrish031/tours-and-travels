import Link from "next/link";
import { Check, X } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/booking/BookingForm";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Section, SectionHeader } from "@/components/ui/Section";
import { routes } from "@/data/routes";
import type { Vehicle } from "@/data/vehicles";
import { fareExcludes, fareIncludes } from "@/data/policies";
import { estimateFare, formatRupees } from "@/lib/fare";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export function VehicleTemplate({ vehicle }: { vehicle: Vehicle }) {
  const routeCards = routes.map((route) => ({
    route,
    estimate: estimateFare({
      distanceKm: route.distanceKm,
      perKm: vehicle.perKm,
      tripType: "one-way",
    }),
  }));

  return (
    <>
      <JsonLd data={faqJsonLd(vehicle.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: vehicle.name, path: `/${vehicle.slug}` },
        ])}
      />

      <section className="border-line bg-paper border-b">
        <Container className="grid items-center gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ label: vehicle.name }]} />
            <p className="eyebrow text-stone mt-2">Fleet</p>
            <h1 className="display mt-4 text-[clamp(2.1rem,5vw,3.6rem)]">
              {vehicle.name} Taxi in Jodhpur
            </h1>
            <p className="text-stone mt-5 max-w-[48ch] leading-relaxed">
              {vehicle.comfort}
            </p>
            <ul className="border-line-strong mt-6 inline-flex flex-wrap gap-x-6 gap-y-2 rounded-sm border px-4 py-3 text-sm">
              <li className="text-stone">
                <span className="text-ink tabular font-medium">{vehicle.seats}</span>{" "}
                seats
              </li>
              <li className="text-stone">
                <span className="text-ink font-medium">{vehicle.luggage}</span>
              </li>
              <li className="text-stone">
                <span className="text-ink tabular font-medium">
                  {formatRupees(vehicle.perKm)}
                </span>{" "}
                / km
              </li>
              <li className="text-stone">
                <span className="text-ink tabular font-medium">
                  {vehicle.dailyKmLimit}
                </span>{" "}
                km/day
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <BookingForm
              sourcePage={`/${vehicle.slug}`}
              defaultPickup="Jodhpur"
              defaultVehicle={vehicle.slug}
            />
          </div>
        </Container>
      </section>

      <Section tone="sand" size="md">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Comfort and capacity"
              title={`Inside the ${vehicle.name.toLowerCase()}`}
              description={`Typical models: ${vehicle.models.join(", ")}. The exact car depends on what is free on your date; you receive the details before pickup.`}
            />
            <h2 className="eyebrow text-brass-deep mt-10 mb-4">Ideal for</h2>
            <ul className="space-y-2.5">
              {vehicle.idealFor.map((use) => (
                <li
                  key={use}
                  className="text-stone flex items-start gap-2.5 text-sm leading-relaxed"
                >
                  <Check
                    aria-hidden="true"
                    className="text-brass-deep mt-0.5 h-4 w-4 shrink-0"
                    strokeWidth={2}
                  />
                  <span>{use}</span>
                </li>
              ))}
            </ul>
            <p className="text-stone mt-8 max-w-[68ch] text-[0.9375rem] leading-relaxed">
              {vehicle.comfort} Round trips are billed on a daily kilometre limit of{" "}
              <span className="tabular">{vehicle.dailyKmLimit}</span> km per day; one-way
              trips are billed on distance alone.
            </p>
          </div>
          <div className="lg:col-span-5">
            <PhotoPlaceholder
              label={`${vehicle.name} · ${vehicle.models[0]}`}
              alt={vehicle.imageAlt}
              aspect="4 / 3"
            />
          </div>
        </div>
      </Section>

      <Section tone="paper" size="md">
        <SectionHeader
          eyebrow="The fare"
          title="What the per-km rate covers"
          description="The rate pays for the car, driver, and fuel over the planned kilometres. Everything outside the plan is listed as it applies."
        />
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="eyebrow text-brass-deep mb-4">Included</h3>
            <ul className="space-y-2.5">
              {fareIncludes.map((item) => (
                <li
                  key={item}
                  className="text-stone flex items-start gap-2.5 text-sm leading-relaxed"
                >
                  <Check
                    aria-hidden="true"
                    className="text-brass-deep mt-0.5 h-4 w-4 shrink-0"
                    strokeWidth={2}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-brass-deep mb-4">Charged extra</h3>
            <ul className="space-y-2.5">
              {fareExcludes.map((item) => (
                <li
                  key={item}
                  className="text-stone flex items-start gap-2.5 text-sm leading-relaxed"
                >
                  <X
                    aria-hidden="true"
                    className="text-stone-light mt-0.5 h-4 w-4 shrink-0"
                    strokeWidth={2}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="sand" size="md">
        <SectionHeader
          eyebrow="Routes"
          title={`Where the ${vehicle.name.toLowerCase()} goes`}
          description={`One-way estimates for this car class on every published route. Open a route for the full price table.`}
        />
        <ul className="bg-line mt-10 grid gap-px sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {routeCards.map(({ route, estimate }) => (
            <li key={route.slug} className="bg-sand">
              <Link
                href={`/${route.slug}`}
                className="group hover:bg-paper flex h-full flex-col p-6 transition-colors duration-200"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[1.0625rem] leading-snug font-medium">
                    {route.from} to {route.to}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="text-stone-light group-hover:text-brass-deep transition-colors"
                  >
                    →
                  </span>
                </div>
                <p className="text-stone mt-4 text-sm">
                  <span className="tabular">{route.distanceKm} km</span>
                  {" · "}
                  <span className="tabular">From {formatRupees(estimate.total)}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" size="md">
        <SectionHeader eyebrow="Questions" title={`${vehicle.name}, answered`} />
        <div className="mt-10 md:mt-14">
          <Accordion items={vehicle.faqs} />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
