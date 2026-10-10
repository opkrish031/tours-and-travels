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
    title: "Refund and Cancellation Policy | Marwar Cabs",
    description: `How cancellations and refunds work at ${site.brandName}: the free-cancellation window, late cancellations, and how refunds are returned.`,
    path: "/refund-policy",
  });
}

const sections = [
  {
    heading: "Cancelling a booking",
    body: [cancellationPolicy],
  },
  {
    heading: "Free-cancellation window",
    body: [
      `Bookings cancelled at least ${site.cancellationWindowHours} hours before the agreed pickup time are eligible for a full refund of any advance paid. (DUMMY — confirm the window and advance terms with the client.)`,
    ],
  },
  {
    heading: "Late cancellations and no-shows",
    body: [
      "Cancellations inside the free window are assessed case by case: if the driver has already been assigned and is en route, a partial charge may apply to cover the driver's time and fuel. A no-show at the pickup point, with no message from you, is treated as a completed booking for the pickup leg.",
    ],
  },
  {
    heading: "Changes instead of cancellations",
    body: [
      "Moving a confirmed booking to another date is usually simpler than cancelling. Message us as early as you can and we will re-confirm the car for the new date at the same estimate, subject to availability.",
    ],
  },
  {
    heading: "How refunds are returned",
    body: [
      "Refunds are returned by the same mode the advance was paid — UPI or bank transfer — within a reasonable number of working days of the cancellation being agreed in writing on the booking chat or by email to " +
        site.email +
        ".",
    ],
  },
  {
    heading: "Fares we cannot refund",
    body: [
      "Tolls and state entry tax are collected and passed on as per actual receipts; they are not marked up and are not refundable once the trip has started. Kilometres already driven at the time of cancellation are billed as per the estimate.",
    ],
  },
] as const;

export default function RefundPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Refund and cancellation policy", path: "/refund-policy" },
        ])}
      />
      <Section tone="paper" size="sm">
        <Container className="max-w-[75ch]">
          <Breadcrumbs items={[{ label: "Refund and cancellation policy" }]} />
          <h1 className="display mt-6 text-[clamp(2rem,4.5vw,3rem)]">
            Refund and cancellation policy
          </h1>
          <p className="text-stone mt-4 text-sm leading-relaxed">
            Plans change. Here is how cancellations, date changes, and refunds are handled
            at {site.brandName}.
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
