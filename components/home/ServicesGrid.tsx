import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { services } from "@/data/services";

export function ServicesGrid() {
  return (
    <Section tone="sand" size="md">
      <SectionHeader
        number="02"
        eyebrow="Services"
        title="Five ways to book a car in Jodhpur"
        description="Pick the service that fits the trip. Each page lists what is included, which cars run it, and the routes it covers."
      />
      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {services.map((service, index) => (
          <li key={service.slug}>
            <Link
              href={`/${service.slug}`}
              className="group border-line-strong bg-paper hover:border-ink flex h-full flex-col rounded-md border p-6 transition-colors duration-200 lg:p-7"
            >
              <span className="eyebrow text-stone-light tabular">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-4 text-2xl">{service.name}</h3>
              <p className="text-stone mt-3 flex-1 text-sm leading-relaxed">
                {service.summary}
              </p>
              <span className="hover:text-brass-deep mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
                View service
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
