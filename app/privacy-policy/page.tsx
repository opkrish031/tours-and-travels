import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Privacy Policy | Marwar Cabs",
    description: `How ${site.brandName} collects, uses, and protects the details you share when booking a Jodhpur taxi.`,
    path: "/privacy-policy",
  });
}

const sections = [
  {
    heading: "What we collect",
    body: [
      "When you send a booking enquiry — through the form, WhatsApp, or a phone call — we receive the details you choose to share: pickup and drop locations, travel date and time, vehicle preference, your name, and your phone number.",
      "The website itself sets no advertising cookies. Standard server logs may record IP address, browser type, and the pages requested, for security and error diagnosis.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Your details are used for one purpose: to prepare a fare estimate, assign a car and driver, and contact you about that booking. We do not sell, rent, or share your information with advertisers.",
      "Trip details may be shared with the driver assigned to your booking — name, pickup point, and contact number — so the pickup runs smoothly.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiry records are retained only as long as needed for the booking and its records (invoices, receipts, and support). You can ask us to delete your enquiry details at any time by writing to " +
        site.email +
        ".",
    ],
  },
  {
    heading: "Analytics",
    body: [
      "The site may use privacy-focused analytics to count visits and understand which pages travellers use. No advertising pixels are loaded, and analytics data is not linked to your booking identity.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can request a copy of the data we hold about you, or ask us to correct or delete it, by emailing " +
        site.email +
        ". We respond to verified requests within a reasonable period.",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy policy", path: "/privacy-policy" },
        ])}
      />
      <Section tone="paper" size="sm">
        <Container className="max-w-[75ch]">
          <Breadcrumbs items={[{ label: "Privacy policy" }]} />
          <h1 className="display mt-6 text-[clamp(2rem,4.5vw,3rem)]">Privacy policy</h1>
          <p className="text-stone mt-4 text-sm leading-relaxed">
            This policy explains what {site.brandName} does with the information you share
            when booking a taxi on this site or over WhatsApp.
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
