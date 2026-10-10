import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/booking/BookingForm";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Table, tdClass, thClass } from "@/components/ui/Table";
import { type Route, routes } from "@/data/routes";
import { vehicles } from "@/data/vehicles";
import { estimateFare, formatRupees } from "@/lib/fare";
import { durationLabel } from "@/lib/format";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export function RouteTemplate({ route }: { route: Route }) {
  const relatedRouteCards = route.relatedRoutes
    .map((slug) => routes.find((item) => item.slug === slug))
    .filter((item): item is Route => Boolean(item));

  const priceRows = vehicles.map((vehicle) => {
    const oneWay = estimateFare({
      distanceKm: route.distanceKm,
      perKm: vehicle.perKm,
      tripType: "one-way",
    });
    const round = estimateFare({
      distanceKm: route.distanceKm,
      perKm: vehicle.perKm,
      tripType: "round-trip",
      days: 1,
      minKmPerDay: vehicle.dailyKmLimit,
    });
    return { vehicle, oneWay, round };
  });

  return (
    <>
      <JsonLd data={faqJsonLd(route.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: `${route.from} to ${route.to} taxi`, path: `/${route.slug}` },
        ])}
      />

      <section className="border-line bg-paper border-b">
        <Container className="grid items-center gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ label: `${route.from} to ${route.to}` }]} />
            <p className="eyebrow text-stone mt-2">{route.tagline}</p>
            <h1 className="display mt-4 text-[clamp(2.1rem,5vw,3.6rem)]">
              {route.from} to {route.to} Taxi
            </h1>
            <p className="text-stone mt-5 max-w-[48ch] leading-relaxed">{route.intro}</p>
          </div>
          <div className="lg:col-span-6">
            <BookingForm
              sourcePage={`/${route.slug}`}
              defaultPickup={route.from}
              defaultDrop={route.to}
            />
          </div>
        </Container>
      </section>

      <Section tone="umber" size="sm">
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
          <div>
            <dt className="eyebrow text-stone-light">Distance</dt>
            <dd className="display tabular mt-2 text-3xl">{route.distanceKm} km</dd>
          </div>
          <div>
            <dt className="eyebrow text-stone-light">Travel time</dt>
            <dd className="display tabular mt-2 text-3xl">
              {durationLabel(route.durationHours)}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-stone-light">Starting fare</dt>
            <dd className="display tabular mt-2 text-3xl">
              {formatRupees(route.startingFare)}
            </dd>
          </div>
        </dl>
        <p className="text-stone-light mt-6 text-xs">
          Starting fare is a sedan, one way, from {route.from}. Tolls and state entry tax
          are extra, as per actual receipts.
        </p>
      </Section>

      <Section tone="paper" size="md">
        <SectionHeader
          eyebrow="Price table"
          title="Fares by car class"
          description="One-way fares use the full distance. The round-trip column shows the minimum one-day booking; for two or more days the billed kilometres are days times the car's daily limit."
        />
        <div className="mt-10 md:mt-14">
          <Table
            caption={`One-way and one-day round-trip fares from ${route.from} to ${route.to} by vehicle`}
            minWidth="36rem"
          >
            <thead>
              <tr>
                <th scope="col" className={thClass}>
                  Vehicle
                </th>
                <th scope="col" className={thClass}>
                  One-way
                </th>
                <th scope="col" className={thClass}>
                  Round trip · 1 day
                </th>
                <th scope="col" className={thClass}>
                  Daily limit
                </th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map(({ vehicle, oneWay, round }) => (
                <tr key={vehicle.slug}>
                  <td className={tdClass}>
                    <Link
                      href={`/${vehicle.slug}`}
                      className="hover:text-brass-deep font-medium transition-colors"
                    >
                      {vehicle.name}
                    </Link>
                  </td>
                  <td className={tdClass}>
                    <span className="tabular">{formatRupees(oneWay.total)}</span>
                  </td>
                  <td className={tdClass}>
                    <span className="tabular">{formatRupees(round.total)}</span>
                  </td>
                  <td className={tdClass}>{vehicle.dailyKmLimit} km</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <p className="text-stone mt-5 max-w-[75ch] text-sm leading-relaxed">
          Figures are estimates for the planned distance. Share your pickup point and
          dates and we send a written number before the booking is confirmed.{" "}
          <Link
            href="/taxi-fare"
            className="hover:text-brass-deep font-medium transition-colors"
          >
            Work out your exact fare in the calculator →
          </Link>
        </p>
      </Section>

      <Section tone="sand" size="md">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="The trip" title={`About the drive to ${route.to}`} />
            <div className="text-stone mt-8 max-w-[68ch] space-y-5 text-[0.9375rem] leading-relaxed">
              {route.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <PhotoPlaceholder
              label={`${route.to} · en route`}
              alt={route.imageAlt}
              aspect="4 / 3"
            />
            <h2 className="eyebrow text-brass-deep mt-10 mb-4">Sights and stops</h2>
            <ol className="space-y-2.5">
              {route.highlights.map((highlight, index) => (
                <li
                  key={highlight}
                  className="text-stone flex items-baseline gap-3 text-sm leading-relaxed"
                >
                  <span className="eyebrow text-stone-light tabular">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="paper" size="md">
        <SectionHeader
          eyebrow="Questions"
          title={`${route.from} to ${route.to}, answered`}
        />
        <div className="mt-10 md:mt-14">
          <Accordion items={route.faqs} />
        </div>
      </Section>

      <Section tone="sand" size="md">
        <SectionHeader
          eyebrow="Related routes"
          title="Where travellers go next"
          description="Other routes booked from Jodhpur, each with its own page of prices and travel notes."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {relatedRouteCards.map((related) => (
            <li key={related.slug}>
              <Link
                href={`/${related.slug}`}
                className="group border-line-strong hover:border-ink bg-paper block h-full rounded-md border p-6 transition-colors duration-200"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[1.0625rem] leading-snug font-medium">
                    {related.from} to {related.to}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="text-stone-light group-hover:text-brass-deep transition-colors"
                  >
                    →
                  </span>
                </div>
                <p className="text-stone mt-1 text-sm font-medium italic">
                  {related.tagline}
                </p>
                <p className="text-stone mt-4 text-sm">
                  <span className="tabular">{related.distanceKm} km</span>
                  {" · "}
                  <span className="tabular">
                    From {formatRupees(related.startingFare)}
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}
