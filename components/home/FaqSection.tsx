import { Accordion } from "@/components/ui/Accordion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { homeFaqs } from "@/data/faqs";

export function FaqSection() {
  return (
    <Section tone="snow" size="md">
      <SectionHeader
        eyebrow="Questions"
        title="Common questions"
        description="Key information regarding upfront quotes, toll receipts, airport waiting policies, and booking confirmation."
      />
      <div className="mt-8 max-w-4xl mx-auto">
        <Accordion items={homeFaqs} defaultOpen={0} />
      </div>
    </Section>
  );
}
