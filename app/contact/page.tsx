import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingForm } from "@/components/booking/BookingForm";
import { CallButton } from "@/components/booking/CallButton";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/data/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { buildWhatsAppUrl, contextMessage } from "@/lib/whatsapp";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Contact Marwar Cabs — Jodhpur Taxi Booking",
    description:
      "Call, WhatsApp, or send a booking enquiry to Marwar Cabs in Jodhpur. Office address, hours, and a trip form that reaches us on WhatsApp.",
    path: "/contact",
  });
}

const { geo } = site;
const mapBbox = [geo.lng - 0.02, geo.lat - 0.015, geo.lng + 0.02, geo.lat + 0.015].join(
  ",",
);
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(mapBbox)}&layer=mapnik&marker=${geo.lat},${geo.lng}`;

type Channel = { icon: LucideIcon; label: string; value: string; href?: string; note: string };

const channels: Channel[] = [
  {
    icon: Phone,
    label: "Phone",
    value: site.phoneDisplay,
    href: `tel:${site.phone}`,
    note: "Call any hour — trips can be arranged same day.",
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "For invoices, receipts, and longer itineraries.",
  },
  {
    icon: MapPin,
    label: "Office",
    value: `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`,
    note: "Pickups and drops happen at your address; the office is for paperwork.",
  },
  {
    icon: Clock,
    label: "Hours",
    value: site.hours.replace("x", "×"),
    note: "Messages and calls are answered around the clock.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="border-line bg-paper border-b">
        <Container className="grid items-center gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Breadcrumbs items={[{ label: "Contact" }]} />
            <p className="eyebrow text-stone mt-2">Contact</p>
            <h1 className="display mt-4 text-[clamp(2.1rem,5vw,3.4rem)]">
              Tell us the trip. We will send the fare.
            </h1>
            <p className="text-stone mt-5 max-w-[46ch] leading-relaxed">
              Call, message on WhatsApp, or fill the form — whichever is easier. The form
              opens WhatsApp with your details typed out, so nothing gets lost between
              apps.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppButton
                location="contact-hero"
                page="/contact"
                message={contextMessage("I want to book a taxi — here is my trip")}
              >
                Book on WhatsApp
              </WhatsAppButton>
              <CallButton location="contact-hero" page="/contact">
                Call us
              </CallButton>
            </div>
          </div>
          <div className="lg:col-span-7">
            <BookingForm sourcePage="/contact" variant="contact" />
          </div>
        </Container>
      </section>

      <Section tone="sand" size="md">
        <SectionHeader
          eyebrow="Reach us"
          title="Every channel, one team"
          description="The same people answer the phone, WhatsApp, and the form — so the estimate you get is the same wherever you write."
        />
        <ul className="bg-line mt-10 grid gap-px sm:grid-cols-2 lg:mt-14">
          {channels.map((channel) => (
            <li key={channel.label} className="bg-sand p-6 lg:p-7">
              <channel.icon
                aria-hidden="true"
                className="text-brass-deep h-5 w-5"
                strokeWidth={1.5}
              />
              <p className="eyebrow text-stone mt-4">{channel.label}</p>
              {channel.href ? (
                <a
                  href={channel.href}
                  className="hover:text-brass-deep mt-1.5 inline-block font-medium transition-colors"
                >
                  {channel.value}
                </a>
              ) : (
                <p className="mt-1.5 font-medium">{channel.value}</p>
              )}
              <p className="text-stone mt-2 text-sm leading-relaxed">{channel.note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            href={buildWhatsAppUrl(contextMessage("I have a question about a trip"))}
            variant="brass"
            size="sm"
          >
            Open WhatsApp chat
          </Button>
        </div>
      </Section>

      <Section tone="paper" size="md">
        <SectionHeader
          eyebrow="Find us"
          title="Office in Jodhpur"
          description="Pickups happen at your hotel, home, airport, or station — the office is there when you want to meet or settle paperwork."
        />
        <div className="border-line-strong mt-10 overflow-hidden rounded-md border md:mt-14">
          <iframe
            title={`Map showing the ${site.brandName} office in ${site.address.locality}`}
            src={mapSrc}
            loading="lazy"
            className="h-[22rem] w-full border-0 grayscale-[0.35]"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="text-stone-light mt-4 text-xs">
          Map data © OpenStreetMap contributors. The pin marks the office area, not a
          private residence.
        </p>
      </Section>
    </>
  );
}
