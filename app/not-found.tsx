import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { routes } from "@/data/routes";
import { services } from "@/data/services";
import { contextMessage } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <>
      <Section tone="paper" size="lg">
        <p className="eyebrow text-stone">404</p>
        <h1 className="display mt-5 max-w-[20ch] text-[clamp(2.2rem,5vw,3.6rem)]">
          This page took a wrong turn.
        </h1>
        <p className="text-stone mt-5 max-w-[52ch] leading-relaxed">
          The link may be old, or the page never existed. The trips below are the ones
          travellers book most — or start from the home page and work from there.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="bg-ink text-paper hover:bg-ink/90 inline-flex h-11 items-center justify-center rounded-sm px-6 text-sm font-semibold transition-colors duration-200"
          >
            Go to home page
          </Link>
          <Link
            href="/taxi-fare"
            className="border-line-strong hover:border-ink hover:bg-ink/[0.04] inline-flex h-11 items-center justify-center rounded-sm border px-6 text-sm font-semibold transition-colors duration-200"
          >
            See all fares
          </Link>
          <WhatsAppButton
            location="404"
            page="/404"
            message={contextMessage("I could not find a page on your site")}
          >
            Ask on WhatsApp
          </WhatsAppButton>
        </div>
      </Section>

      <Section tone="sand" size="md">
        <SectionHeader eyebrow="Services" title="Ways to book a car" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/${service.slug}`}
                className="group border-line-strong hover:border-ink bg-sand block h-full rounded-md border p-6 transition-colors duration-200"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[1.0625rem] font-medium">{service.name}</h3>
                  <span
                    aria-hidden="true"
                    className="text-stone-light group-hover:text-brass-deep transition-colors"
                  >
                    →
                  </span>
                </div>
                <p className="text-stone mt-2 text-sm leading-relaxed">
                  {service.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" size="md">
        <SectionHeader eyebrow="Routes" title="Popular trips from Jodhpur" />
        <ul className="bg-line mt-10 grid gap-px sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {routes.map((route) => (
            <li key={route.slug} className="bg-paper">
              <Link
                href={`/${route.slug}`}
                className="group border-line-strong hover:border-ink block rounded-md border p-5 transition-colors duration-200"
              >
                <h3 className="font-medium">
                  {route.from} to {route.to}
                </h3>
                <p className="text-stone mt-1 text-sm">{route.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
