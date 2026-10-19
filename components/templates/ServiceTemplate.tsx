import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/booking/BookingForm";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Table, tdClass, thClass } from "@/components/ui/Table";
import { attractions } from "@/data/attractions";
import type { Service } from "@/data/services";
import { services } from "@/data/services";
import { routes } from "@/data/routes";
import { vehicles } from "@/data/vehicles";
import { estimateFare, formatRupees } from "@/lib/fare";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

import { buildWhatsAppUrl, contextMessage } from "@/lib/whatsapp";

const sedan = vehicles.find((vehicle) => vehicle.category === "sedan") ?? vehicles[0];

export function ServiceTemplate({ service }: { service: Service }) {
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

      {/* Apple-Style Service Solutions Hero */}
      <section className="bg-snow border-line relative overflow-hidden border-b pt-12 pb-20 md:pt-16 md:pb-24">
        <Container className="relative z-10 mx-auto max-w-5xl">
          <Breadcrumbs items={[{ label: service.name }]} />

          <div className="mt-6 max-w-3xl">
            <span className="eyebrow text-gold-deep mb-2 block font-semibold">
              Marwad Cabs · Taxis in Jodhpur &amp; Rajasthan
            </span>

            <h1 className="text-text text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
              {service.name}
            </h1>

            <p className="text-text-muted mt-4 max-w-[54ch] text-base leading-relaxed md:text-lg">
              {service.summary}
            </p>

            {/* Micro-Assurance Ticker */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="border-line rounded-2xl border bg-white p-3.5 shadow-xs">
                <span className="text-text block text-xs font-semibold">
                  Ahead of Time
                </span>
                <span className="text-text-muted text-xs">
                  Driver reaches before pickup
                </span>
              </div>
              <div className="border-line rounded-2xl border bg-white p-3.5 shadow-xs">
                <span className="text-text block text-xs font-semibold">Working AC</span>
                <span className="text-text-muted text-xs">Checked before departure</span>
              </div>
              <div className="border-line rounded-2xl border bg-white p-3.5 shadow-xs">
                <span className="text-text block text-xs font-semibold">
                  Written Bill
                </span>
                <span className="text-text-muted text-xs">No hidden charges</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={buildWhatsAppUrl(
                  contextMessage(`I would like to book the ${service.name} in Jodhpur`),
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-gold-bright inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black shadow-xs transition-colors"
              >
                Book {service.name} on WhatsApp
              </a>
              <a
                href="#service-booking"
                className="border-line text-text hover:bg-mist inline-flex items-center gap-2 rounded-full border bg-white px-6 py-3 text-sm font-semibold transition-colors"
              >
                Send Booking Request ↓
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* The 4-Stage Chauffeur Protocol */}
      <Section tone="mist" size="md">
        <SectionHeader
          eyebrow="How booking works"
          title="From quote to drop, in 4 steps"
          description="How our booking desk runs a trip, from your first message to the drop."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-line flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs">
            <div>
              <span className="text-gold-deep tabular bg-gold/15 mb-4 inline-block rounded-full px-2.5 py-1 font-mono text-xs font-semibold">
                Stage 01
              </span>
              <h3 className="text-text mb-2 text-base font-semibold">Written Quote</h3>
              <p className="text-text-muted text-xs leading-relaxed">
                Vehicle class, per-km rate, and toll terms sent on WhatsApp before you
                confirm.
              </p>
            </div>
            <div className="border-line/60 text-text-muted mt-4 border-t pt-3 text-[0.6875rem] font-medium">
              No Advance Needed
            </div>
          </div>

          <div className="border-line flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs">
            <div>
              <span className="text-gold-deep tabular bg-gold/15 mb-4 inline-block rounded-full px-2.5 py-1 font-mono text-xs font-semibold">
                Stage 02
              </span>
              <h3 className="text-text mb-2 text-base font-semibold">
                Driver &amp; Car Details
              </h3>
              <p className="text-text-muted text-xs leading-relaxed">
                Driver name, vehicle registration number, and mobile number shared before
                departure.
              </p>
            </div>
            <div className="border-line/60 text-text-muted mt-4 border-t pt-3 text-[0.6875rem] font-medium">
              Commercial permit
            </div>
          </div>

          <div className="border-line flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs">
            <div>
              <span className="text-gold-deep tabular bg-gold/15 mb-4 inline-block rounded-full px-2.5 py-1 font-mono text-xs font-semibold">
                Stage 03
              </span>
              <h3 className="text-text mb-2 text-base font-semibold">On-Time Arrival</h3>
              <p className="text-text-muted text-xs leading-relaxed">
                Driver reaches ahead of time; AC checked and luggage space ready.
              </p>
            </div>
            <div className="border-line/60 text-text-muted mt-4 border-t pt-3 text-[0.6875rem] font-medium">
              Working AC, checked before departure
            </div>
          </div>

          <div className="border-line flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs">
            <div>
              <span className="text-gold-deep tabular bg-gold/15 mb-4 inline-block rounded-full px-2.5 py-1 font-mono text-xs font-semibold">
                Stage 04
              </span>
              <h3 className="text-text mb-2 text-base font-semibold">
                Toll Slips at Billing
              </h3>
              <p className="text-text-muted text-xs leading-relaxed">
                Trip ends with FASTag toll receipts at actual cost — you pay what the
                booth charged, nothing on top.
              </p>
            </div>
            <div className="border-line/60 text-text-muted mt-4 border-t pt-3 text-[0.6875rem] font-medium">
              Cash or UPI Settlement
            </div>
          </div>
        </div>
      </Section>

      {/* Service Details & Features */}
      <Section tone="snow" size="md">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Service details"
              title={`How the ${service.name} operates`}
            />
            <div className="text-text-muted space-y-4 text-[0.9375rem] leading-relaxed md:text-base">
              {service.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <MediaFrame
              label={`${service.name}`}
              alt={service.imageAlt}
              aspect="4 / 3"
              icon="car"
              category="Fleet Service"
            />

            <div className="border-line bg-mist/60 mt-8 rounded-3xl border p-6">
              <h3 className="text-gold-deep mb-4 text-sm font-semibold">
                What Is Included
              </h3>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-text flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <div className="bg-gold/20 text-gold-deep mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Dedicated Reservation Tray */}
      <section
        id="service-booking"
        className="bg-mist border-line scroll-mt-24 border-y py-16 md:py-24"
      >
        <Container className="mx-auto max-w-4xl">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <span className="eyebrow text-gold-deep mb-2 block font-semibold">
              Book It
            </span>
            <h2 className="text-text text-3xl font-semibold tracking-tight">
              Reserve Your {service.name}
            </h2>
            <p className="text-text-muted mt-2 text-sm">
              Pick your date and pickup point and we will send a written quote.
            </p>
          </div>

          <div className="border-line mx-auto max-w-xl rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
            <BookingForm sourcePage={`/${service.slug}`} defaultPickup="Jodhpur" />
          </div>
        </Container>
      </section>

      {/* Local Sightseeing Packages (if applicable) */}
      {service.packages && service.packages.length > 0 ? (
        <Section tone="mist" size="md">
          <SectionHeader
            eyebrow="Packages"
            title="Hourly and sightseeing options"
            description="Fixed rates covering waiting time, fuel, and driver."
          />

          <div className="mt-8">
            <Table caption="Sightseeing packages with hours, km, and pricing">
              <thead>
                <tr>
                  <th scope="col" className={thClass}>
                    Package Name
                  </th>
                  <th scope="col" className={thClass}>
                    Duration
                  </th>
                  <th scope="col" className={thClass}>
                    Included Km
                  </th>
                  <th scope="col" className={thClass}>
                    From Rate (Sedan)
                  </th>
                </tr>
              </thead>
              <tbody>
                {service.packages.map((pkg) => {
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
                      <td className={tdClass}>
                        <span className="text-text font-semibold">{pkg.label}</span>
                      </td>
                      <td className={tdClass}>{pkg.hours ?? "—"} Hours</td>
                      <td className={tdClass}>{pkg.km ?? "—"} km</td>
                      <td className={tdClass}>
                        <span className="tabular text-gold-deep font-semibold">
                          {from ? formatRupees(from) : "On Request"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Section>
      ) : null}

      {/* Available Vehicles for this Service */}
      <Section tone="snow" size="md">
        <SectionHeader
          eyebrow="Cars"
          title="Vehicles available for this service"
          description="Sedans, SUVs, or passenger vans — whichever suits your group."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((vehicle) => (
            <div
              key={vehicle.slug}
              className="border-line flex flex-col justify-between rounded-3xl border bg-white p-5 shadow-xs"
            >
              <div>
                <MediaFrame
                  label={vehicle.name}
                  alt={vehicle.imageAlt}
                  aspect="4 / 3"
                  icon="car"
                />
                <h3 className="text-text mt-4 text-base font-semibold">{vehicle.name}</h3>
                <p className="text-text-muted mt-1 text-xs">
                  {vehicle.seats} seats · {formatRupees(vehicle.perKm)}/km
                </p>
              </div>

              <div className="border-line/60 mt-5 border-t pt-3">
                <Link
                  href={`/${vehicle.slug}`}
                  className="text-gold-deep inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:text-black"
                >
                  View Vehicle <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Attractions rail if local service */}
      {showSpots ? (
        <Section tone="mist" size="md">
          <SectionHeader
            eyebrow="Coverage"
            title="Sightseeing locations covered"
            description="Our local package covers waiting at Jodhpur's main sights."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {attractions.slice(0, 4).map((attraction) => (
              <div
                key={attraction.slug}
                className="border-line rounded-3xl border bg-white p-5 shadow-xs"
              >
                <MediaFrame
                  label={attraction.name}
                  alt={attraction.name}
                  aspect="16 / 9"
                  icon="fort"
                />
                <h3 className="text-text mt-4 text-base font-semibold">
                  {attraction.name}
                </h3>
                <p className="text-text-muted mt-1 text-xs leading-relaxed">
                  {attraction.blurb}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* FAQs */}
      <Section tone="snow" size="md">
        <SectionHeader eyebrow="Questions" title={`${service.name} FAQs`} />
        <div className="mx-auto mt-8 max-w-4xl">
          <Accordion items={service.faqs} defaultOpen={0} />
        </div>
      </Section>

      {/* Related Routes */}
      {relatedRouteCards.length > 0 ? (
        <Section tone="snow" size="md">
          <SectionHeader eyebrow="Routes" title="Routes connected with this service" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedRouteCards.map((route) => (
              <Link
                key={route.slug}
                href={`/${route.slug}`}
                className="group border-line flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
              >
                <div>
                  <h3 className="text-text group-hover:text-gold-deep text-lg font-semibold tracking-tight transition-colors">
                    {route.from} → {route.to}
                  </h3>
                  <p className="text-text-muted mt-1 text-xs">{route.tagline}</p>
                </div>
                <div className="border-line/70 text-text-muted mt-5 flex items-center justify-between border-t pt-3 text-xs">
                  <span>{route.distanceKm} km</span>
                  <span className="tabular text-gold-deep text-sm font-semibold">
                    From {formatRupees(route.startingFare)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Related Services */}
      <Section tone="mist" size="md">
        <SectionHeader eyebrow="More" title="Other taxi services" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {relatedServiceCards.map((other) => (
            <Link
              key={other.slug}
              href={`/${other.slug}`}
              className="group border-line flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
            >
              <div>
                <h3 className="text-text group-hover:text-gold-deep text-lg font-semibold tracking-tight transition-colors">
                  {other.name}
                </h3>
                <p className="text-text-muted mt-2 text-xs leading-relaxed md:text-sm">
                  {other.summary}
                </p>
              </div>
              <div className="border-line/70 text-text-muted mt-6 flex items-center justify-between border-t pt-4 text-xs font-semibold group-hover:text-black">
                <span>View Service</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
