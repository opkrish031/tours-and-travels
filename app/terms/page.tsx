import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fareExcludes, fareIncludes } from "@/data/policies";
import { site } from "@/data/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Terms and Conditions | Marwar Cabs",
    description: `Booking terms for ${site.brandName}: how estimates work, what the fare covers, tolls and taxes, payments, and driver conduct.`,
    path: "/terms",
  });
}

const sections = [
  {
    heading: "Bookings and estimates",
    body: [
      "A booking is confirmed only after you approve the fare estimate we send. The estimate states the car class, the billed kilometres or package, and the total. Until you confirm, no car is assigned and no amount is owed.",
      "Pickup points, routes, and travel times shared in the estimate form the basis of the trip. Major changes (a different destination, an extra day, or a significantly different pickup area) are re-quoted before travel.",
    ],
  },
  {
    heading: "What the fare includes",
    body: [fareIncludes.join(". ") + "."],
  },
  {
    heading: "What is charged extra",
    body: [
      fareExcludes.join(". ") + ".",
      "Tolls and state entry tax are charged as per the actual receipts collected on the trip, shown to you at the end.",
    ],
  },
  {
    heading: "Payments",
    body: [
      "Payment is settled at the end of the trip by the mode agreed at booking — cash, UPI, or bank transfer. No online payment is collected on this site.",
    ],
  },
  {
    heading: "Driver conduct and vehicle standards",
    body: [
      "Drivers hold valid commercial licences and are expected to follow traffic rules, stay sober on duty, and keep to the agreed route and schedule. Vehicles are cleaned between trips and checked for basic roadworthiness before long drives.",
      "If anything about the trip goes wrong on the day, call or message us during the trip itself — most issues are resolved faster while the car is still with you.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "We run the car and driver with reasonable care and skill. We are not responsible for delays caused by weather, road closures, traffic, strikes, or other circumstances outside reasonable control. Entry tickets, parking fines from your own stops, and personal expenses remain the traveller's responsibility.",
    ],
  },
  {
    heading: "Governing terms",
    body: [
      `These terms are governed by the laws of India, and disputes are subject to the courts of ${site.address.region}. Questions about a specific booking are best raised on the same WhatsApp chat used for the estimate, so the full thread stays together.`,
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms and conditions", path: "/terms" },
        ])}
      />
      <Section tone="paper" size="sm">
        <Container className="max-w-[75ch]">
          <Breadcrumbs items={[{ label: "Terms and conditions" }]} />
          <h1 className="display mt-6 text-[clamp(2rem,4.5vw,3rem)]">
            Terms and conditions
          </h1>
          <p className="text-stone mt-4 text-sm leading-relaxed">
            These terms apply to every booking made with {site.brandName} through this
            site, WhatsApp, or a phone call.
          </p>
          {sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-[1.125rem] font-medium">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-stone mt-3 text-[0.9375rem] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </Container>
      </Section>
    </>
  );
}
