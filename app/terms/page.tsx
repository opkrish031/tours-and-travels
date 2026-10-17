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
    title: `Terms and Conditions | ${site.brandName}`,
    description: `Booking terms for ${site.brandName}: how estimates work, what the fare covers, tolls and taxes, payments, and driver conduct.`,
    path: "/terms",
  });
}

const sections = [
  {
    heading: "Bookings & Fare Estimates",
    body: [
      "A booking is confirmed only after you explicitly approve the fare estimate we send. The estimate itemizes the car class, the billed kilometres or package, and the total. Until you confirm, no vehicle is locked and no payment is owed.",
      "Pickup points, route waypoints, and travel times shared in the estimate establish the journey parameters. Significant itinerary modifications are re-quoted prior to departure.",
    ],
  },
  {
    heading: "Inclusions",
    body: [fareIncludes.join(". ") + "."],
  },
  {
    heading: "Actuals & Extra Expenses",
    body: [
      fareExcludes.join(". ") + ".",
      "Highway tolls and state border entry taxes are charged strictly as per the physical receipts collected on your journey and presented at trip conclusion.",
    ],
  },
  {
    heading: "Payment Terms",
    body: [
      "Fares are settled at the end of the trip via the method agreed upon during reservation — cash, UPI, or direct bank transfer. No online payments are captured directly on this site.",
    ],
  },
  {
    heading: "Chauffeur Conduct & Vehicle Standards",
    body: [
      "Drivers hold valid commercial licences, adhere strictly to highway regulations, and remain sober on duty. Vehicles are cleaned between bookings and mechanically inspected prior to highway departures.",
      "If any concern arises on the road, message or call us immediately — issues are resolved fastest while your vehicle is still en route.",
    ],
  },
  {
    heading: "Liability & Force Majeure",
    body: [
      "We operate our chauffeur service with professional care. We are not liable for delays resulting from extreme weather, highway blockades, unforeseen traffic, or regional strikes. Monument tickets and personal expenses remain the guest's responsibility.",
    ],
  },
  {
    heading: "Jurisdiction",
    body: [
      `These terms are governed by the laws of India, with disputes subject to courts in ${site.address.region}.`,
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms and Conditions", path: "/terms" },
        ])}
      />
      <Section tone="snow" size="sm">
        <Container className="max-w-[75ch]">
          <Breadcrumbs items={[{ label: "Terms and Conditions" }]} />
          <h1 className="mt-6 text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.03em] text-text">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm text-text-muted leading-relaxed">
            These terms govern every reservation placed with {site.brandName} via our
            website, WhatsApp, or phone.
          </p>
          <div className="mt-10 space-y-10 divide-y divide-line">
            {sections.map((section) => (
              <section key={section.heading} className="pt-8 first:pt-0">
                <h2 className="text-lg font-semibold tracking-tight text-text">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-3 text-[0.9375rem] text-text-muted leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
