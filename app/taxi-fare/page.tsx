import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CallButton } from "@/components/booking/CallButton";
import { FareCalculator } from "@/components/booking/FareCalculator";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Table, tdClass, thClass } from "@/components/ui/Table";
import { homeFaqs } from "@/data/faqs";
import { routes } from "@/data/routes";
import { services } from "@/data/services";
import { vehicles } from "@/data/vehicles";
import { estimateFare, formatRupees } from "@/lib/fare";
import { durationLabel } from "@/lib/format";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, titleFor } from "@/lib/seo";
import { contextMessage } from "@/lib/whatsapp";

const fareFaqs = [homeFaqs[1], homeFaqs[2], homeFaqs[7]];
const localService = services.find((service) => (service.packages?.length ?? 0) > 0);
const sedan = vehicles.find((vehicle) => vehicle.category === "sedan") ?? vehicles[0];

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: titleFor("Jodhpur Taxi Fares & Rates"),
    description:
      "Check Jodhpur taxi fares for every route and car class: per-km rates, distances, starting prices and local packages. Estimate your trip and confirm on WhatsApp.",
    path: "/taxi-fare",
  });
}

const included = [
  "Car and driver for the booked hours or kilometres",
  "Fuel for the planned distance",
  "Driver allowance inside the quoted fare",
  "Waiting at each sightseeing stop within the package hours",
];

const excluded = [
  "Tolls, charged as per actual receipts",
  "State entry tax, charged as per actual receipts",
  "Parking charges",
  "Monument entry tickets and boat rides",
];

export default function TaxiFarePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Fares", path: "/taxi-fare" },
        ])}
      />
      <JsonLd data={faqJsonLd(fareFaqs)} />

      <Container>
        <Breadcrumbs items={[{ label: "Taxi fares" }]} />
        <header className="border-line-strong border-b pt-4 pb-10 md:pb-14">
          <p className="eyebrow mb-5">Fares</p>
          <h1 className="display text-[clamp(2.4rem,6vw,4.5rem)]">
            Jodhpur taxi fares, in plain numbers
          </h1>
          <p className="text-stone mt-6 max-w-[58ch] text-base leading-relaxed md:text-[1.0625rem]">
            Every route and car class with its distance, per-km rate and starting fare,
            laid out the way we would quote it on the phone. Use the calculator for your
            exact trip, then confirm the number on WhatsApp before you book.
          </p>
        </header>
      </Container>

      <Section id="calculator" tone="sand" size="md" className="scroll-mt-24">
        <SectionHeader
          number="01"
          eyebrow="Fare calculator"
          title="Work out your fare"
          description="Pick the route, car class and trip type. The estimate uses the same per-km rates and daily limits that go into every quote."
        />
        <FareCalculator className="mt-10 md:mt-14" />
      </Section>

      <Section tone="paper" size="md">
        <SectionHeader
          number="02"
          eyebrow="Car classes"
          title="Per-km rates and daily limits"
          description="Sedans, SUVs, the Innova Crysta and the Tempo Traveller, each with its rate and the kilometres covered per day."
        />
        <div className="mt-10 md:mt-14">
          <Table caption="Per-km rates for every vehicle class">
            <thead>
              <tr>
                <th scope="col" className={thClass}>
                  Vehicle
                </th>
                <th scope="col" className={thClass}>
                  Seats
                </th>
                <th scope="col" className={thClass}>
                  Luggage
                </th>
                <th scope="col" className={thClass}>
                  Per km
                </th>
                <th scope="col" className={thClass}>
                  Daily km limit
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.slug}>
                  <td className={tdClass}>
                    <Link
                      href={`/${vehicle.slug}`}
                      className="hover:text-brass-deep font-medium transition-colors"
                    >
                      {vehicle.name} taxi in Jodhpur
                    </Link>
                  </td>
                  <td className={tdClass}>{vehicle.seats}</td>
                  <td className={tdClass}>{vehicle.luggage}</td>
                  <td className={tdClass}>{formatRupees(vehicle.perKm)}</td>
                  <td className={tdClass}>{vehicle.dailyKmLimit} km</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Section>

      <Section tone="sand" size="md">
        <SectionHeader
          number="03"
          eyebrow="Outstation routes"
          title="Distances and starting fares"
          description="Starting fares are for a sedan, one way. Round trips price on days and distance, which the calculator above works out for your car class."
        />
        <div className="mt-10 md:mt-14">
          <Table
            caption="Distance, travel time and starting fare for each route"
            minWidth="40rem"
          >
            <thead>
              <tr>
                <th scope="col" className={thClass}>
                  Route
                </th>
                <th scope="col" className={thClass}>
                  Distance
                </th>
                <th scope="col" className={thClass}>
                  Travel time
                </th>
                <th scope="col" className={thClass}>
                  One-way from
                </th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.slug}>
                  <td className={tdClass}>
                    <Link
                      href={`/${route.slug}`}
                      className="hover:text-brass-deep font-medium transition-colors"
                    >
                      Jodhpur to {route.to} taxi
                    </Link>
                  </td>
                  <td className={tdClass}>{route.distanceKm} km</td>
                  <td className={tdClass}>{durationLabel(route.durationHours)}</td>
                  <td className={tdClass}>{formatRupees(route.startingFare)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Section>

      {localService?.packages?.length ? (
        <Section tone="paper" size="md">
          <SectionHeader
            number="04"
            eyebrow="Inside Jodhpur"
            title="Local sightseeing packages"
            description="A block of hours with the driver waiting at each stop. The from-price is a sedan on the included kilometres; choose a bigger car in the calculator."
          />
          <div className="mt-10 md:mt-14">
            <Table caption="Local sightseeing packages with hours, kilometres and from-price">
              <thead>
                <tr>
                  <th scope="col" className={thClass}>
                    Package
                  </th>
                  <th scope="col" className={thClass}>
                    Hours
                  </th>
                  <th scope="col" className={thClass}>
                    Kilometres
                  </th>
                  <th scope="col" className={thClass}>
                    From (sedan)
                  </th>
                </tr>
              </thead>
              <tbody>
                {localService.packages.map((pkg) => {
                  const from =
                    pkg.km && pkg.km > 0
                      ? estimateFare({
                          distanceKm: pkg.km,
                          perKm: sedan.perKm,
                          tripType: "one-way",
                        }).total
                      : null;
                  return (
                    <tr key={pkg.label}>
                      <td className={tdClass}>{pkg.label}</td>
                      <td className={tdClass}>{pkg.hours ?? "—"} hr</td>
                      <td className={tdClass}>{pkg.km ?? "—"} km</td>
                      <td className={tdClass}>
                        {from ? formatRupees(from) : "On request"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Section>
      ) : null}

      <Section tone="umber" size="md">
        <SectionHeader
          number="05"
          eyebrow="The fine print"
          title="What the fare covers"
          dark
        />
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="eyebrow text-brass mb-4">Included in the quote</h3>
            <ul className="text-stone-light space-y-3 text-[0.9375rem] leading-relaxed">
              {included.map((item) => (
                <li key={item} className="border-line-dark border-b pb-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-brass mb-4">Charged extra</h3>
            <ul className="text-stone-light space-y-3 text-[0.9375rem] leading-relaxed">
              {excluded.map((item) => (
                <li key={item} className="border-line-dark border-b pb-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-stone-light mt-8 max-w-[70ch] text-sm leading-relaxed">
          Extra charges come from actual receipts, so you pay what the road charges rather
          than an estimate. The final fare is confirmed on WhatsApp or call before the car
          is assigned.
        </p>
      </Section>

      <Section tone="paper" size="md">
        <SectionHeader number="06" eyebrow="Questions" title="Fares, answered" />
        <div className="mt-10 md:mt-14">
          <Accordion items={fareFaqs} />
        </div>
      </Section>

      <Section tone="ink" size="sm">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="display text-[clamp(1.6rem,3.4vw,2.4rem)]">
              Want the exact number for your trip?
            </h2>
            <p className="text-stone-light mt-3 max-w-[46ch] text-sm leading-relaxed">
              Send the date, pickup and destination on WhatsApp. The estimate reaches you
              before you confirm anything.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton
              variant="brass"
              location="taxi-fare-cta"
              page="/taxi-fare"
              message={contextMessage(
                "I want to confirm a fare from the taxi fares page",
              )}
            >
              Get my fare on WhatsApp
            </WhatsAppButton>
            <CallButton
              variant="secondary"
              onDark
              location="taxi-fare-cta"
              page="/taxi-fare"
            >
              Call us
            </CallButton>
          </div>
        </div>
      </Section>
    </>
  );
}
