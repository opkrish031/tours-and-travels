import type { Metadata } from "next";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { FleetCards } from "@/components/home/FleetCards";
import { Hero } from "@/components/home/Hero";
import { PopularRoutes } from "@/components/home/PopularRoutes";
import { RoutesGrid } from "@/components/home/RoutesGrid";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyUs } from "@/components/home/WhyUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeFaqs } from "@/data/faqs";
import {
  buildMetadata,
  faqJsonLd,
  HOME_DESCRIPTION,
  HOME_TITLE,
  localBusinessJsonLd,
  websiteJsonLd,
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
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(homeFaqs)} />

      {/* 1. Hero (Editorial: mono masthead, Fraunces headline, WhatsApp CTA, Booking Card) */}
      <Hero />

      {/* 1b. Popular routes with starting fares — prefills the booking form */}
      <PopularRoutes />

      {/* 2. Assurance Strip (Light, 4 Short Statements, Stagger Reveal) */}
      <TrustStrip />

      {/* 3. Fleet (Snap Carousel with Segmented Filter & 1-Click WhatsApp Booking) */}
      <FleetCards />

      {/* 4. Routes (Interactive Index with Top 6 Corridors & Expand Toggle) */}
      <RoutesGrid />

      {/* 5. Specialised Services (Curated Core Services) */}
      <ServicesGrid />

      {/* 6. Why Choose Us (Bento Grid with Authentic Jodhpur Logistics) */}
      <WhyUs />

      {/* 6b. Passenger notes from data/testimonials.ts (real, permissioned) */}
      <TestimonialsSection />

      {/* 7. FAQ (Real Operational Inquiries) */}
      <FaqSection />

      {/* 8. Final CTA (Dark Surface, Direct Phone & WhatsApp Actions) */}
      <FinalCta />
    </>
  );
}
