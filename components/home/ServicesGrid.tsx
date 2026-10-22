import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { services } from "@/data/services";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

// Exclude repetitive sub-variants (one-way and round-trip are encompassed by outstation-taxi-jodhpur)
const primaryServices = services.filter(
  (s) => s.slug !== "one-way-taxi-jodhpur" && s.slug !== "round-trip-taxi-jodhpur",
);

export function ServicesGrid() {
  return (
    <Section tone="snow" size="md">
      <SectionHeader
        eyebrow="What we run"
        title="Trips people book us for"
        description="From punctual airport pickups to week-long Rajasthan heritage circuits, choose the service that matches your travel plans."
      />

      <Stagger as="div" className="space-y-4">
        {primaryServices.map((service, index) => (
          <StaggerItem key={service.slug} as="div">
            <Link
              href={`/${service.slug}`}
              className="group border-line relative flex flex-col justify-between gap-6 rounded-3xl border bg-white/80 p-7 transition-all duration-300 hover:border-black/20 hover:bg-white hover:shadow-md md:flex-row md:items-center md:p-8"
            >
              <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-center md:gap-8">
                {/* Index & Category */}
                <span className="text-gold-deep tabular bg-gold/10 w-fit rounded-full px-2.5 py-1 font-mono text-xs font-semibold">
                  0{index + 1}
                </span>

                {/* Title & Summary */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-text text-xl font-semibold tracking-tight transition-colors group-hover:text-black md:text-2xl">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-text-muted mt-1.5 max-w-[60ch] text-sm leading-relaxed md:text-[0.9375rem]">
                    {service.summary}
                  </p>
                </div>
              </div>

              {/* Action and Arrow */}
              <div className="flex shrink-0 items-center gap-4">
                <span className="text-text-muted group-hover:text-text hidden text-xs font-semibold transition-colors sm:inline">
                  View Details
                </span>
                <div className="border-line bg-mist text-text flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-105 group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
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
