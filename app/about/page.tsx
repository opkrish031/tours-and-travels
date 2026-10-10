import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Section, SectionHeader } from "@/components/ui/Section";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { vehicles } from "@/data/vehicles";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "About Marwar Cabs — Jodhpur Taxi Service",
    description:
      "Marwar Cabs runs chauffeur-driven taxis from Jodhpur: licensed drivers, published per-km rates, and written fare estimates before every booking.",
    path: "/about",
  });
}

const practices = [
  {
    title: "Licensed drivers only",
    body: "Every driver holds a valid commercial licence. We assign drivers to routes they know, and we share the driver's name and number before pickup so you can reach them directly.",
  },
  {
    title: "Fares in writing first",
    body: "Nothing is confirmed until you approve the estimate. The per-km rate, daily limit, and toll treatment are written into it, so the maths stays checkable on your side.",
  },
  {
    title: "Fleet kept to four classes",
    body: "Sedan, SUV, Innova Crysta, and Tempo Traveller — each class with a published rate and daily limit. You know what you are booking before the car is assigned.",
  },
  {
    title: "Open every day of the week",
    body: "Messages and calls are answered around the clock, including early airport pickups and late train arrivals. Trips can be arranged any day you need one.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="border-line bg-paper border-b">
        <Container className="py-10 md:py-14">
          <Breadcrumbs items={[{ label: "About" }]} />
          <p className="eyebrow text-stone mt-2">About us</p>
          <h1 className="display mt-4 max-w-[18ch] text-[clamp(2.1rem,5vw,3.6rem)]">
            Chauffeur-driven cars, run the honest way
          </h1>
          <p className="text-stone mt-5 max-w-[56ch] leading-relaxed">
            {site.brandName} is a Jodhpur taxi service for airport transfers, city
            sightseeing, and outstation trips across Rajasthan. The rules are simple:
            licensed drivers, published rates, and a written estimate before the car is
            assigned.
          </p>
        </Container>
      </section>

      <Section tone="sand" size="md">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Our story" title="Built around one promise" />
            <div className="text-stone mt-8 max-w-[68ch] space-y-5 text-[0.9375rem] leading-relaxed">
              <p>
                Travellers reaching Jodhpur — for Mehrangarh at sunrise, a wedding in the
                old city, or the long road to Jaisalmer — usually face the same
                uncertainty: what will the car cost, who is driving, and will it show up
                on time. {site.brandName} exists to remove that uncertainty. Every route
                and car class has a published rate, every trip starts with a written
                estimate, and every driver&apos;s details reach you before the travel day.
              </p>
              <p>
                We run from {site.address.locality}, {site.address.region}, with cars that
                cover the city and the highways in equal measure: a sedan for airport
                runs, an SUV or Innova Crysta for family highway days, and a Tempo
                Traveller when the whole group travels together. The same car and driver
                stay with you across a multi-day itinerary.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <PhotoPlaceholder
              label="Marwar Cabs fleet line-up"
              alt="Marwar Cabs vehicles parked in a line in Jodhpur"
              aspect="4 / 3"
            />
          </div>
        </div>
      </Section>

      <Section tone="paper" size="md">
        <SectionHeader
          eyebrow="How we work"
          title="Four standards we hold on every trip"
          description="These are the practices behind the claims on this site — each one you can verify before or during the booking."
        />
        <ul className="bg-line mt-10 grid gap-px sm:grid-cols-2 lg:mt-14">
          {practices.map((practice) => (
            <li key={practice.title} className="bg-paper p-6 lg:p-7">
              <h3 className="text-[1.0625rem] leading-snug font-medium">
                {practice.title}
              </h3>
              <p className="text-stone mt-3 text-sm leading-relaxed">{practice.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand" size="md">
        <SectionHeader
          eyebrow="The fleet"
          title="Four classes, each with a published rate"
          description="Capacity, luggage, and per-km rates are listed on every vehicle page. Choose the class that fits the trip."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {vehicles.map((vehicle) => (
            <li
              key={vehicle.slug}
              className="bg-paper border-line-strong rounded-md border p-6"
            >
              <h3 className="text-[1.0625rem] font-medium">{vehicle.name}</h3>
              <p className="text-stone mt-1 text-sm">
                {vehicle.seats} seats · {vehicle.luggage}
              </p>
              <Link
                href={`/${vehicle.slug}`}
                className="hover:text-brass-deep mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                View class <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" size="md">
        <SectionHeader
          eyebrow="Services"
          title="What we drive you through"
          description="Five ways to book, all on the same fleet and the same published rates."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/${service.slug}`}
                className="group border-line-strong bg-sand hover:border-ink flex h-full flex-col rounded-md border p-6 transition-colors duration-200"
              >
                <h3 className="text-[1.0625rem] font-medium">{service.name}</h3>
                <p className="text-stone mt-2 flex-1 text-sm leading-relaxed">
                  {service.summary}
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
