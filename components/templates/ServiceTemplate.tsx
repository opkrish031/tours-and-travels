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
      <section className="relative overflow-hidden bg-snow border-b border-line pt-12 pb-20 md:pt-16 md:pb-24">
        <Container className="relative z-10 max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: service.name }]} />

          <div className="mt-6 max-w-3xl">
            <span className="eyebrow text-gold-deep font-semibold uppercase tracking-wider block mb-2">
              Marwad Cabs · Taxis in Jodhpur &amp; Rajasthan
            </span>

            <h1 className="text-[clamp(2rem,4.5vw,3.4rem)] font-semibold tracking-[-0.02em] leading-[1.15] text-text">
              {service.name}
            </h1>

            <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed max-w-[54ch]">
              {service.summary}
            </p>

            {/* Micro-Assurance Ticker */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-line bg-white p-3.5 shadow-xs">
                <span className="block text-xs font-semibold text-text">Ahead of Time</span>
                <span className="text-xs text-text-muted">Driver reaches before pickup</span>
              </div>
              <div className="rounded-2xl border border-line bg-white p-3.5 shadow-xs">
                <span className="block text-xs font-semibold text-text">Working AC</span>
                <span className="text-xs text-text-muted">Checked before departure</span>
              </div>
              <div className="rounded-2xl border border-line bg-white p-3.5 shadow-xs">
                <span className="block text-xs font-semibold text-text">Written Bill</span>
                <span className="text-xs text-text-muted">No hidden charges</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={buildWhatsAppUrl(contextMessage(`I would like to book the ${service.name} in Jodhpur`))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-black shadow-xs hover:bg-gold-bright transition-colors"
              >
                Book {service.name} on WhatsApp
              </a>
              <a
                href="#service-booking"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-text hover:bg-mist transition-colors"
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Stage 01
              </span>
              <h3 className="text-base font-semibold text-text mb-2">
                Written Quote
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Vehicle class, per-km rate, and toll terms sent on WhatsApp before you
                confirm.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 text-[0.6875rem] font-medium text-text-muted">
              No Advance Needed
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Stage 02
              </span>
              <h3 className="text-base font-semibold text-text mb-2">
                Driver &amp; Car Details
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Driver name, vehicle registration number, and mobile number shared
                before departure.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 text-[0.6875rem] font-medium text-text-muted">
              Commercial permit
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Stage 03
              </span>
              <h3 className="text-base font-semibold text-text mb-2">
                On-Time Arrival
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Driver reaches ahead of time; AC checked and luggage space ready.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 text-[0.6875rem] font-medium text-text-muted">
              Working AC, checked before departure
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/15 px-2.5 py-1 rounded-full inline-block mb-4">
                Stage 04
              </span>
              <h3 className="text-base font-semibold text-text mb-2">
                Toll Slips at Billing
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Trip ends with FASTag toll receipts at actual cost — you pay what the
                booth charged, nothing on top.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/60 text-[0.6875rem] font-medium text-text-muted">
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
            <div className="space-y-4 text-[0.9375rem] md:text-base text-text-muted leading-relaxed">
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

            <div className="mt-8 rounded-3xl border border-line bg-mist/60 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-deep mb-4">
                What Is Included
              </h3>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-text leading-relaxed"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-deep">
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
      <section id="service-booking" className="scroll-mt-24 bg-mist border-y border-line py-16 md:py-24">
        <Container className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="eyebrow text-gold-deep font-semibold uppercase tracking-wider block mb-2">
              Book It
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-text">
              Reserve Your {service.name}
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Pick your date and pickup point and we will send a written quote.
            </p>
          </div>

          <div className="max-w-xl mx-auto rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm">
            <BookingForm
              sourcePage={`/${service.slug}`}
              defaultPickup="Jodhpur"
            />
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
                  <th scope="col" className={thClass}>Package Name</th>
                  <th scope="col" className={thClass}>Duration</th>
                  <th scope="col" className={thClass}>Included Km</th>
                  <th scope="col" className={thClass}>From Rate (Sedan)</th>
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
                        <span className="font-semibold text-text">{pkg.label}</span>
                      </td>
                      <td className={tdClass}>{pkg.hours ?? "—"} Hours</td>
                      <td className={tdClass}>{pkg.km ?? "—"} km</td>
                      <td className={tdClass}>
                        <span className="tabular font-semibold text-gold-deep">
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {fleet.map((vehicle) => (
            <div
              key={vehicle.slug}
              className="flex flex-col justify-between rounded-3xl border border-line bg-white p-5 shadow-xs"
            >
              <div>
                <MediaFrame
                  label={vehicle.name}
                  alt={vehicle.imageAlt}
                  aspect="4 / 3"
                  icon="car"
                />
                <h3 className="mt-4 text-base font-semibold text-text">
                  {vehicle.name}
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  {vehicle.seats} seats · {formatRupees(vehicle.perKm)}/km
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-line/60">
                <Link
                  href={`/${vehicle.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold-deep hover:text-black transition-colors"
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {attractions.slice(0, 4).map((attraction) => (
              <div
                key={attraction.slug}
                className="rounded-3xl border border-line bg-white p-5 shadow-xs"
              >
                <MediaFrame
                  label={attraction.name}
                  alt={attraction.name}
                  aspect="16 / 9"
                  icon="fort"
                />
                <h3 className="mt-4 text-base font-semibold text-text">
                  {attraction.name}
                </h3>
                <p className="mt-1 text-xs text-text-muted leading-relaxed">
                  {attraction.blurb}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* FAQs */}
      <Section tone="snow" size="md">
        <SectionHeader
          eyebrow="Questions"
          title={`${service.name} FAQs`}
        />
        <div className="mt-8 max-w-4xl mx-auto">
          <Accordion items={service.faqs} defaultOpen={0} />
        </div>
      </Section>

      {/* Related Routes */}
      {relatedRouteCards.length > 0 ? (
        <Section tone="snow" size="md">
          <SectionHeader
            eyebrow="Routes"
            title="Routes connected with this service"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {relatedRouteCards.map((route) => (
              <Link
                key={route.slug}
                href={`/${route.slug}`}
                className="group flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
              >
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-text group-hover:text-gold-deep transition-colors">
                    {route.from} → {route.to}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">{route.tagline}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-line/70 flex items-center justify-between text-xs text-text-muted">
                  <span>{route.distanceKm} km</span>
                  <span className="tabular font-semibold text-gold-deep text-sm">
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
        <SectionHeader
          eyebrow="More"
          title="Other taxi services"
        />
        <div className="grid gap-6 sm:grid-cols-3 mt-8">
          {relatedServiceCards.map((other) => (
            <Link
              key={other.slug}
              href={`/${other.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-text group-hover:text-gold-deep transition-colors">
                  {other.name}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-text-muted leading-relaxed">
                  {other.summary}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-line/70 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted group-hover:text-black">
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
