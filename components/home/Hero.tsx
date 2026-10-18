import { Fragment } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { HeroRouteBackdrop } from "@/components/home/HeroRouteBackdrop";
import { Container } from "@/components/ui/Container";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { contextMessage, telHref } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { Phone } from "lucide-react";

const stats = [
  { value: "₹10/km", label: "AC sedan rate" },
  { value: "250 km", label: "Daily minimum" },
  { value: "₹300", label: "Driver allowance/day" },
] as const;

const meta = ["Jodhpur · Rajasthan", "Airport · Local · Outstation"] as const;

export function Hero() {
  return (
    <section className="bg-navy text-text-dark relative isolate overflow-hidden">
      {/* Fort illustration — full-bleed behind content on desktop */}
      <HeroRouteBackdrop />

      {/* Legibility scrims */}
      <div
        aria-hidden="true"
        className="from-navy via-navy/76 to-navy/28 pointer-events-none absolute inset-0 bg-gradient-to-r"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_60%_40%,rgba(200,150,46,0.13),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="from-navy/80 via-navy/30 to-transparent pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t"
      />

      <Container className="relative z-10 grid items-start gap-x-10 gap-y-12 pt-10 pb-28 sm:pb-44 md:pb-48 lg:grid-cols-12 lg:gap-x-14 lg:pt-20 lg:pb-24">
        {/* Left: masthead meta → headline → proof → action */}
        <div className="lg:col-span-7">
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.6875rem] tracking-[0.08em] text-white/60 uppercase">
            {meta.map((item, index) => (
              <Fragment key={item}>
                {index > 0 ? (
                  <>
                    <span aria-hidden="true" className="text-white/35 sm:hidden">
                      ·
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden h-px w-6 bg-white/20 sm:block"
                    />
                  </>
                ) : null}
                <span className={index === 0 ? "text-gold-bright" : undefined}>
                  {item}
                </span>
              </Fragment>
            ))}
          </p>

          <SplitHeadline
            as="h1"
            text="Jodhpur taxi service. Fare told before you travel."
            className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-white"
          />

          <p className="mt-5 max-w-[52ch] text-base leading-[1.65] text-white/75 sm:text-[1.0625rem]">
            Airport pickups, city sightseeing, and outstation trips — Udaipur,
            Jaisalmer, Mount Abu and across Rajasthan. Clean AC cars, local
            drivers, and the full fare sent to you before you confirm. You pay
            the driver at the end of the trip.
          </p>

          {/* The numbers, plain and scannable */}
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-5 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="font-mono text-[0.625rem] tracking-[0.08em] text-white/55 uppercase sm:text-[0.6875rem]">
                  {stat.label}
                </dt>
                <dd className="tabular text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-[1.75rem]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <WhatsAppButton
              message={contextMessage(
                "Hi Marwad Cabs, I want to book a taxi in Jodhpur. Please share car availability and the best rate.",
              )}
              location="home-hero"
              page="/"
              variant="primary"
              size="lg"
              arrow
            >
              Book on WhatsApp
            </WhatsAppButton>

            <a
              href={telHref()}
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              <Phone
                aria-hidden="true"
                strokeWidth={1.75}
                className="text-gold-bright h-4 w-4 transition-transform group-hover:rotate-12"
              />
              <span className="tabular group-hover:border-gold-bright border-b border-white/25 pb-0.5 transition-colors">
                or call {site.phoneDisplay}
              </span>
            </a>
          </div>

          <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8125rem] text-white/60">
            <span>No online advance</span>
            <span aria-hidden="true">·</span>
            <span>Tolls at actuals</span>
            <span aria-hidden="true">·</span>
            <span>Driver allowance in the quote</span>
          </p>
        </div>

        {/* Right: booking desk */}
        <div id="book" className="scroll-mt-24 lg:col-span-5">
          <Reveal delay={0.15}>
            <BookingForm sourcePage="/" dark={true} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
