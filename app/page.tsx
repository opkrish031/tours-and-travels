import type { Metadata } from "next";
import { FareCalculator } from "@/components/booking/FareCalculator";
import { CoverageSection } from "@/components/home/CoverageSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { FleetCards } from "@/components/home/FleetCards";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { RoutesGrid } from "@/components/home/RoutesGrid";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyUs } from "@/components/home/WhyUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section, SectionHeader } from "@/components/ui/Section";
import { homeFaqs } from "@/data/faqs";
import {
  buildMetadata,
  faqJsonLd,
  HOME_DESCRIPTION,
  HOME_TITLE,
  localBusinessJsonLd,
} from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/",
  });
}

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(homeFaqs)} />

      {/* 1. Hero (Dark, Huge Type, SplitHeadline, Gold Glow, Booking Card) */}
      <Hero />

      {/* 2. Assurance Strip (Light, 4 Short Statements, Stagger Reveal) */}
      <TrustStrip />

      {/* 3. Services (Editorial Rows with Hover Reveal) */}
      <ServicesGrid />

      {/* 4. Fleet (Snap Carousel with Segmented Filter) */}
      <FleetCards />

      {/* 5. Routes (Typographic Index with Hover Dim) */}
      <RoutesGrid />

      {/* 6. Fare Calculator (Dark, Animated Number, Segmented Control) */}
      <Section id="calculator" tone="black" size="md">
        <SectionHeader
          dark
          eyebrow="Instant Estimation"
          title="Transparent Fare Calculator"
          description="Calculate exact fares by route and vehicle category. All estimates match the fixed per-kilometre rates confirmed on WhatsApp."
        />
        <FareCalculator className="mt-8 md:mt-12" />
      </Section>

      {/* 7. Why Us (Bento Grid with Micro-animations) */}
      <WhyUs />

      {/* 8. How It Works (Connected Stepper Cards on Dark Surface) */}
      <HowItWorks />

      {/* 9. FAQ (Framer Motion Accordions) */}
      <FaqSection />

      {/* 10. Coverage / Attractions (Horizontal Rail of Rounded MediaFrames) */}
      <CoverageSection />

      {/* 11. Final CTA (Dark, Large Headline, Magnetic Buttons) */}
      <FinalCta />
    </>
  );
}
