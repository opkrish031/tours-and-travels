import type { Metadata } from "next";
import { FareCalculator } from "@/components/booking/FareCalculator";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { CoverageSection } from "@/components/home/CoverageSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { FleetCards } from "@/components/home/FleetCards";
import { FleetTable } from "@/components/home/FleetTable";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { RoutesGrid } from "@/components/home/RoutesGrid";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { SpotsSection } from "@/components/home/SpotsSection";
import { TopBar } from "@/components/home/TopBar";
import { ToursSection } from "@/components/home/ToursSection";
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

      <TopBar />
      <Hero />
      <TrustStrip />

      <WhyUs />
      <ServicesGrid />
      <FleetCards />
      <RoutesGrid />

      <Section id="calculator" tone="paper" size="md">
        <SectionHeader
          number="05"
          eyebrow="Fare calculator"
          title="Work out your fare before you book"
          description="Pick the route, car class and trip type. The estimate uses the same per-km rates and daily limits that go into every quote."
        />
        <FareCalculator className="mt-10 md:mt-14" />
      </Section>

      <ToursSection />
      <FleetTable />
      <HowItWorks number="08" />
      <SpotsSection />
      <ComparisonTable />
      <FaqSection />
      <CoverageSection />
      <FinalCta />
    </>
  );
}
