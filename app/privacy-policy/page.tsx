import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `Privacy Policy | ${site.brandName}`,
    description: `How ${site.brandName} collects, uses, and protects details shared during Jodhpur taxi bookings.`,
    path: "/privacy-policy",
  });
}

const sections = [
  {
    heading: "What We Collect",
    body: [
      "When you send a booking enquiry — through the form, WhatsApp, or a phone call — we receive the details you choose to share: pickup and drop locations, travel date and time, vehicle preference, your name, and your phone number.",
      "The website itself sets no advertising cookies. Standard server logs may record IP address, browser type, and requested pages for security and error diagnosis.",
    ],
  },
  {
    heading: "How Information is Used",
    body: [
      "Your details are used exclusively to prepare a fare estimate, assign a car and driver, and coordinate your booking. We never sell, rent, or share personal data with external advertising parties.",
      "Trip details are shared directly with your assigned chauffeur — name, pickup point, and contact number — to ensure punctual pickup execution.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      `Enquiry records are retained solely for booking coordination, official invoices, and customer assistance. You may request record deletion at any time by writing to ${site.email}.`,
    ],
  },
  {
    heading: "Analytics & Cookies",
    body: [
      "We may use privacy-first aggregate analytics to count visits and improve performance. No advertising pixels or invasive trackers are loaded, and metrics remain disconnected from your identity.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      `You may request a copy of information held regarding your trips, or request correction and deletion, by contacting ${site.email}. We respond promptly to all verified requests.`,
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <Section tone="snow" size="sm">
        <Container className="max-w-[75ch]">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
          <h1 className="mt-6 text-[clamp(1.85rem,3.5vw,2.6rem)] font-semibold tracking-[-0.02em] text-text">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-text-muted leading-relaxed">
            This policy explains how {site.brandName} handles the information you share
            when booking a cab on this website or over WhatsApp.
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
