import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { services } from "@/data/services";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function ServicesGrid() {
  return (
    <Section tone="mist" size="md">
      <SectionHeader
        eyebrow="Specialised Travel"
        title="Services Designed Around Your Itinerary"
        description="From punctual airport pickups to week-long Rajasthan heritage circuits, choose the service that matches your travel plans."
      />

      <Stagger as="div" className="space-y-4">
        {services.map((service, index) => (
          <StaggerItem key={service.slug} as="div">
            <Link
              href={`/${service.slug}`}
              className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-3xl border border-line bg-white/80 p-7 md:p-8 transition-all duration-300 hover:border-black/20 hover:bg-white hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 flex-1">
                {/* Index & Category */}
                <span className="font-mono text-xs font-semibold text-gold-deep tabular bg-gold/10 px-2.5 py-1 rounded-full w-fit">
                  0{index + 1}
                </span>

                {/* Title & Summary */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-text group-hover:text-black transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-sm md:text-[0.9375rem] text-text-muted max-w-[60ch] leading-relaxed">
                    {service.summary}
                  </p>
                </div>
              </div>

              {/* Action and Arrow */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted group-hover:text-text transition-colors hidden sm:inline">
                  View Details
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-mist text-text transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:scale-105">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
