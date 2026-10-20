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
        eyebrow="Sightseeing"
        title="Places your driver knows"
        description="Experience Jodhpur's cliffside fortresses, royal cenotaphs, and palatial gardens with a private car and dedicated chauffeur waiting at every gate."
        action={
          <Link
            href="/local-taxi-jodhpur"
            className="text-gold-deep inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-black"
          >
            Explore Local Packages <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      {/* Horizontal Rail of Rounded MediaFrame Cards */}
      <div className="-mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
        <ul className="flex snap-x snap-mandatory scrollbar-none gap-6 overflow-x-auto pb-4">
          {attractions.map((spot) => (
            <li
              key={spot.slug}
              className="border-line flex w-[82vw] shrink-0 snap-start flex-col rounded-3xl border bg-white p-5 shadow-xs transition-all duration-300 hover:border-black/15 hover:shadow-md sm:w-[320px] md:w-[360px]"
            >
              <MediaFrame
                src={spot.image}
                label={spot.name}
                alt={spot.name}
                aspect="16 / 9"
                icon="fort"
                category="Landmark"
              />

              <div className="mt-5 flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-text text-lg font-semibold tracking-tight">
                    {spot.name}
                  </h3>
                  <p className="text-text-muted mt-1.5 text-xs leading-relaxed md:text-sm">
                    {spot.blurb}
                  </p>
                </div>

                <div className="border-line/70 mt-5 flex items-center justify-between border-t pt-4">
                  <Chip variant="default" size="sm">
                    Sightseeing Spot
                  </Chip>
                  <Link
                    href="/local-taxi-jodhpur"
                    className="text-gold-deep text-xs font-semibold transition-colors hover:text-black"
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
      <div className="border-line mt-12 flex flex-col justify-between gap-6 rounded-3xl border bg-white/80 p-6 backdrop-blur-md md:flex-row md:items-center md:p-8">
        <div className="flex items-start gap-4">
          <div className="bg-gold/15 text-gold-deep border-gold/30 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-text text-base font-semibold tracking-tight">
              Jodhpur Dispatch Office &amp; Fleet Garage
            </h4>
            <address className="text-text-muted mt-0.5 text-xs not-italic">
              {site.address.street}, {site.address.locality}, {site.address.region}{" "}
              {site.address.postalCode} · Available {site.hours}
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
