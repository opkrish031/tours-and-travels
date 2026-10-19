import { Star } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";

/**
 * Social proof from real, permissioned trip notes in data/testimonials.ts.
 * Do not invent reviews. When the Google Business profile URL is set in
 * site.socials.googleBusiness, a "reviews" link appears in the header —
 * only claim a star rating there once it matches the live profile.
 */
export function TestimonialsSection() {
  const googleReviewsUrl = site.socials.googleBusiness;

  return (
    <Section tone="mist" size="md">
      <SectionHeader
        eyebrow="Passenger notes"
        title="What outstation guests say"
        description="Short notes from real trips. Same cars, same drivers, same written quote — whether it is a couple in a Dzire or a wedding fleet of Crystas."
        action={
          googleReviewsUrl ? (
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-deep inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-black"
            >
              <Star aria-hidden="true" className="fill-gold text-gold h-4 w-4" />
              Read more on Google
            </a>
          ) : null
        }
      />

      <Stagger as="div" className="grid gap-5 md:grid-cols-2">
        {testimonials.map((item) => (
          <StaggerItem
            key={item.name}
            as="article"
            className="border-line flex h-full flex-col justify-between rounded-3xl border bg-white p-6 shadow-xs sm:p-7"
          >
            <p className="text-text text-[0.9375rem] leading-relaxed">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="border-line/70 mt-5 border-t pt-4">
              <p className="text-text text-sm font-semibold tracking-tight">
                {item.name}
              </p>
              <p className="text-text-muted mt-0.5 text-xs">{item.trip}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
