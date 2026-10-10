import Link from "next/link";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/booking/BookingForm";
import { FinalCta } from "@/components/home/FinalCta";
import { HowItWorks } from "@/components/home/HowItWorks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Section, SectionHeader } from "@/components/ui/Section";
import { attractions } from "@/data/attractions";
import type { Service } from "@/data/services";
import { services } from "@/data/services";
import { routes } from "@/data/routes";
import { vehicles } from "@/data/vehicles";
import { estimateFare, formatRupees } from "@/lib/fare";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

const sedan = vehicles.find((vehicle) => vehicle.category === "sedan") ?? vehicles[0];

export function ServiceTemplate({ service }: { service: Service }) {
  const hasPackages = (service.packages?.length ?? 0) > 0;
  const showSpots = service.slug === "local-taxi-jodhpur";

  const fleet = service.applicableVehicles
    .map((slug) => vehicles.find((vehicle) => vehicle.slug === slug))
    .filter((vehicle): vehicle is (typeof vehicles)[number] => Boolean(vehicle));

  const relatedRouteCards = service.relatedRoutes
    .map((slug) => routes.find((route) => route.slug === slug))
    .filter((route): route is (typeof routes)[number] => Boolean(route));

  const relatedServiceCards = services
    .filter((other) => other.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: service.name,
          description: service.summary,
          path: `/${service.slug}`,
        })}
      />
      <JsonLd data={faqJsonLd(service.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: service.name, path: `/${service.slug}` },
        ])}
      />

      <section className="border-line bg-paper border-b">
        <Container className="grid items-center gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ label: service.name }]} />
            <p className="eyebrow text-stone mt-2">Services</p>
            <h1 className="display mt-4 text-[clamp(2.1rem,5vw,3.6rem)]">
              {service.name}
            </h1>
            <p className="text-stone mt-5 max-w-[48ch] leading-relaxed">
              {service.summary}
            </p>
          </div>
          <div className="lg:col-span-6">
            <BookingForm sourcePage={`/${service.slug}`} defaultPickup="Jodhpur" />
          </div>
        </Container>
      </section>

      <Section tone="sand" size="md">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="About this service"
              title={`How the ${service.name.toLowerCase()} works`}
            />
            <div className="text-stone mt-8 max-w-[68ch] space-y-5 text-[0.9375rem] leading-relaxed">
              {service.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <PhotoPlaceholder
              label={`${service.name} · Jodhpur`}
              alt={service.imageAlt}
              aspect="4 / 3"
            />
            <h2 className="eyebrow text-brass-deep mt-10 mb-4">What is included</h2>
            <ul className="space-y-2.5">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="text-stone flex items-start gap-2.5 text-sm leading-relaxed"
                >
                  <Check
                    aria-hidden="true"
                    className="text-brass-deep mt-0.5 h-4 w-4 shrink-0"
                    strokeWidth={2}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {hasPackages ? (
        <Section tone="paper" size="md">
          <SectionHeader
            eyebrow="Package options"
            title="Book the car by the hour"
            description="A package reserves the car for a block of hours with a kilometre limit. The from-price is a sedan on the included kilometres; a bigger car is quoted on request."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14">
            {service.packages?.map((pkg) => {
              const estimate = pkg.km
                ? estimateFare({
                    distanceKm: pkg.km,
                    perKm: sedan.perKm,
                    tripType: "one-way",
                  })
                : null;
              return (
                <li
                  key={pkg.label}
                  className="border-line-strong rounded-md border p-6 lg:p-7"
                >
                  <h3 className="display text-2xl">{pkg.label}</h3>
                  <p className="text-stone mt-2 text-sm">
                    {pkg.hours
                      ? `${pkg.hours} hours of car and driver`
                      : "Car and driver"}
                    {pkg.km ? ` · ${pkg.km} km included` : ""}
                  </p>
                  {estimate ? (
                    <p className="mt-5">
                      <span className="eyebrow text-stone-light">From</span>{" "}
                      <span className="display tabular text-3xl">
                        {formatRupees(estimate.total)}
                      </span>
                      <span className="text-stone text-sm"> · {sedan.name}</span>
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Section>
      ) : null}

      <Section tone={hasPackages ? "sand" : "paper"} size="md">
        <SectionHeader
          eyebrow="Cars that run this service"
          title="Applicable vehicles and rates"
          description="Every class below can be booked for this service. Rates are per kilometre, on top of the car and driver."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {fleet.map((vehicle) => (
            <li
              key={vehicle.slug}
              className="border-line-strong bg-paper rounded-md border p-6"
            >
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
              </p>
              <Link
                href={`/${vehicle.slug}`}
                className="border-line-strong hover:border-ink hover:bg-ink/[0.04] mt-4 inline-flex h-10 w-full items-center justify-center rounded-sm border text-sm font-semibold transition-colors duration-200"
              >
                {vehicle.name} details
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone={hasPackages ? "paper" : "sand"} size="md">
        <SectionHeader
          eyebrow="Routes"
          title="Trips this service covers"
          description="Popular routes booked with this service. Open a route for its full price table and travel notes."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {relatedRouteCards.map((route) => (
            <li key={route.slug}>
              <Link
                href={`/${route.slug}`}
                className="group border-line-strong hover:border-ink bg-paper block h-full rounded-md border p-6 transition-colors duration-200"
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
                <p className="text-stone mt-1 text-sm font-medium italic">
                  {route.tagline}
                </p>
                <p className="text-stone mt-4 text-sm">
                  <span className="tabular">{route.distanceKm} km</span>
                  {" · "}
                  <span className="tabular">From {formatRupees(route.startingFare)}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <HowItWorks />

      {showSpots ? (
        <Section tone="paper" size="md">
          <SectionHeader
            eyebrow="Inside Jodhpur"
            title="Sights your driver waits at"
            description="The city's sights sit in a few compact clusters. The driver waits at each stop and moves on when you are ready."
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
      ) : null}

      <Section tone="sand" size="md">
        <SectionHeader eyebrow="Questions" title={`${service.name}, answered`} />
        <div className="mt-10 md:mt-14">
          <Accordion items={service.faqs} />
        </div>
      </Section>

      <Section tone="paper" size="md">
        <SectionHeader
          eyebrow="Related services"
          title="Other ways to travel"
          description="Every service runs from the same fleet, with the same published rates and written estimates."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {relatedServiceCards.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/${other.slug}`}
                className="group border-line-strong hover:border-ink bg-sand flex h-full flex-col rounded-md border p-6 transition-colors duration-200"
              >
                <h3 className="text-[1.0625rem] font-medium">{other.name}</h3>
                <p className="text-stone mt-2 flex-1 text-sm leading-relaxed">
                  {other.summary}
                </p>
                <span className="hover:text-brass-deep mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
                  View service <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}
