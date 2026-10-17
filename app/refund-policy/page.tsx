import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cancellationPolicy } from "@/data/policies";
import { site } from "@/data/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `Refund and Cancellation Policy | ${site.brandName}`,
    description: `How cancellations and refunds work at ${site.brandName}: free-cancellation windows, late policies, and process.`,
    path: "/refund-policy",
  });
}

const sections = [
  {
    heading: "Cancelling a Reservation",
    body: [cancellationPolicy],
  },
  {
    heading: "Free Cancellation Window",
    body: [
      `Bookings cancelled at least ${site.cancellationWindowHours} hours prior to scheduled departure are eligible for a 100% full refund of any token advance. (DUMMY — confirm window with client).`,
    ],
  },
  {
    heading: "Late Cancellations & No-Shows",
    body: [
      "Cancellations within the immediate departure window are reviewed fairly: if a vehicle has already been dispatched towards your pickup address, a minor partial charge may cover fuel and driver time. Unannounced no-shows are billed for the pickup leg.",
    ],
  },
  {
    heading: "Date & Time Modifications",
    body: [
      "Rescheduling a confirmed journey is simple. Message us on WhatsApp as early as possible, and we will transfer your reservation to your new date subject to vehicle availability at no extra fee.",
    ],
  },
  {
    heading: "Refund Processing",
    body: [
      `Eligible refunds are returned via the original payment method (UPI or bank transfer) within standard banking turnaround days following confirmation with ${site.email}.`,
    ],
  },
  {
    heading: "Non-Refundable Incurred Costs",
    body: [
      "Highway tolls and entry taxes already paid to toll plazas during active transit cannot be refunded. Distance already covered prior to mid-journey cancellation is calculated at standard rate.",
    ],
  },
] as const;

export default function RefundPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Refund and Cancellation Policy", path: "/refund-policy" },
        ])}
      />
      <Section tone="snow" size="sm">
        <Container className="max-w-[75ch]">
          <Breadcrumbs items={[{ label: "Refund Policy" }]} />
          <h1 className="mt-6 text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-[-0.035em] text-text">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="mt-4 text-sm text-text-muted leading-relaxed">
            Travel plans change. Here is how cancellations, date changes, and refunds are
            handled with transparency at {site.brandName}.
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
