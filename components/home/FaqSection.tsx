import { Accordion } from "@/components/ui/Accordion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { homeFaqs } from "@/data/faqs";

export function FaqSection() {
  return (
    <Section tone="paper" size="md">
      <SectionHeader
        number="11"
        eyebrow="Questions"
        title="Before you book"
        description="The things travellers ask most. Anything else — message us on WhatsApp and we will answer before you commit."
      />
      <div className="mt-10 md:mt-14">
        <Accordion items={homeFaqs} />
      </div>
    </Section>
  );
}
