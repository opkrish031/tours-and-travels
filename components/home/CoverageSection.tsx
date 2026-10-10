import { MapPin } from "lucide-react";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { Section, SectionHeader } from "@/components/ui/Section";
import { routes } from "@/data/routes";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { contextMessage } from "@/lib/whatsapp";

export function CoverageSection() {
  const destinations = [...new Set(routes.map((route) => route.to))];

  return (
    <Section tone="sand" size="md">
      <SectionHeader
        number="12"
        eyebrow="Service coverage"
        title="Based in Jodhpur, driving all of Rajasthan"
        description="Local trips stay inside the city. Outstation routes run to every destination listed on this site, and trips beyond the list are quoted on request."
      />
      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h3 className="eyebrow text-brass-deep mb-4">Destinations we run</h3>
          <ul className="flex flex-wrap gap-2">
            {destinations.map((destination) => (
              <li
                key={destination}
                className="border-line-strong bg-paper text-stone rounded-xs border px-3 py-1.5 text-sm"
              >
                {destination}
              </li>
            ))}
          </ul>
          <h3 className="eyebrow text-brass-deep mt-8 mb-4">Local services</h3>
          <ul className="text-stone space-y-2.5 text-sm leading-relaxed">
            {services.map((service) => (
              <li key={service.slug} className="border-line border-b pb-2.5">
                {service.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="border-line-strong bg-paper rounded-md border p-6">
            <MapPin
              aria-hidden="true"
              className="text-brass-deep h-5 w-5"
              strokeWidth={1.5}
            />
            <p className="mt-4 text-[1.0625rem] font-medium">Office</p>
            <address className="text-stone mt-2 text-sm leading-relaxed not-italic">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </address>
            <p className="text-stone mt-4 text-sm">
              Open {site.hours.replace("x", "×")} — trips can be arranged any day of the
              week.
            </p>
            <WhatsAppButton
              variant="brass"
              size="sm"
              className="mt-5"
              location="home-coverage"
              page="/"
              message={contextMessage("I want to check if you cover my route")}
            >
              Ask about your route
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
