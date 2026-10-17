import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { Section, SectionHeader } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { attractions } from "@/data/attractions";
import { site } from "@/data/site";
import { contextMessage } from "@/lib/whatsapp";
import { Chip } from "@/components/ui/Chip";

export function CoverageSection() {
  return (
    <Section tone="mist" size="md">
      <SectionHeader
        eyebrow="Sightseeing & Coverage"
        title="Attractions & Heritage Destinations"
        description="Experience Jodhpur's cliffside fortresses, royal cenotaphs, and palatial gardens with a private car and dedicated chauffeur waiting at every gate."
        action={
          <Link
            href="/local-taxi-jodhpur"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-deep hover:text-black transition-colors"
          >
            Explore Local Packages <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      {/* Horizontal Rail of Rounded MediaFrame Cards */}
      <div className="-mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
        <ul className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
          {attractions.map((spot) => (
            <li
              key={spot.slug}
              className="flex w-[82vw] sm:w-[320px] md:w-[360px] shrink-0 snap-start flex-col rounded-3xl border border-line bg-white p-5 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md"
            >
              <MediaFrame
                label={spot.name}
                alt={spot.name}
                aspect="16 / 9"
                icon="fort"
                category="Landmark"
              />

              <div className="mt-5 flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-text">
                    {spot.name}
                  </h3>
                  <p className="mt-1.5 text-xs md:text-sm text-text-muted leading-relaxed">
                    {spot.blurb}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-line/70 pt-4">
                  <Chip variant="default" size="sm">
                    Sightseeing Spot
                  </Chip>
                  <Link
                    href="/local-taxi-jodhpur"
                    className="text-xs font-semibold uppercase tracking-wider text-gold-deep hover:text-black transition-colors"
                  >
                    Include in Tour →
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Dispatch Office Info Bar */}
      <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-3xl border border-line bg-white/80 p-6 md:p-8 backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold-deep border border-gold/30">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold tracking-tight text-text">
              Jodhpur Dispatch Office &amp; Fleet Garage
            </h4>
            <address className="text-xs text-text-muted not-italic mt-0.5">
              {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode} · Available {site.hours}
            </address>
          </div>
        </div>

        <WhatsAppButton
          variant="primary"
          size="md"
          location="home-coverage"
          page="/"
          message={contextMessage("I would like to check custom route availability.")}
          arrow
        >
          Inquire Custom Route
        </WhatsAppButton>
      </div>
    </Section>
  );
}
