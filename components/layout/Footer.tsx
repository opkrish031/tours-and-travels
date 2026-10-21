import Link from "next/link";
import Image from "next/image";
import { Phone, MessageSquare, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/lib/nav";
import { site } from "@/data/site";
import { buildWhatsAppUrl, contextMessage, telHref } from "@/lib/whatsapp";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

const year = new Date().getFullYear();

function formatAddress() {
  const a = site.address;
  return `${a.street}, ${a.locality}, ${a.region} ${a.postalCode}, India`;
}

export function Footer() {
  const waUrl = buildWhatsAppUrl(
    contextMessage("Hi Marwad Cabs, I would like to inquire about booking a cab."),
  );

  return (
    <footer className="text-text-dark border-t border-[#C8962E]/25 bg-[#0B172A]">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand Column */}
          <div className="flex flex-col justify-between sm:col-span-2 lg:col-span-4">
            <div>
              <Link href="/" className="group mb-4 flex items-center gap-3 select-none">
                <div className="border-gold ring-gold/40 relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 bg-white shadow-md ring-1">
                  <Image
                    src="/logo.png"
                    alt="Marwad Cabs Logo"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="group-hover:text-gold text-xl font-bold tracking-[-0.02em] text-white transition-colors sm:text-2xl">
                    MARWAD CABS
                  </span>
                  <span className="text-[0.5625rem] font-semibold tracking-wider text-[#E5B84B] uppercase sm:text-[0.6875rem]">
                    Tour and Travels · Jodhpur
                  </span>
                </div>
              </Link>

              <p className="max-w-[36ch] text-sm leading-relaxed text-[#FAF7F2]/80">
                Direct taxi operator in Jodhpur. Upfront per-km rates, experienced Marwari
                chauffeurs, and zero-commission sightseeing for Rajasthan routes.
              </p>
            </div>

            <div className="mt-8 space-y-3.5 text-xs text-[#FAF7F2]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E5B84B]" />
                <address className="leading-relaxed not-italic">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:text-white hover:underline"
                  >
                    {formatAddress()}
                  </a>
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[#E5B84B]" />
                <span>24×7 Dispatch · Airport &amp; Junction pickups</span>
              </div>

              {site.gstNumber ? (
                <p className="text-[#FAF7F2]/60">
                  GSTIN {site.gstNumber} · {site.legalName}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href={telHref()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <Phone className="h-3.5 w-3.5 text-[#E5B84B]" />
                  <span>{site.phoneDisplay}</span>
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 font-bold text-white shadow-xs transition-colors hover:bg-emerald-500"
                >
                  <MessageSquare className="h-3.5 w-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>

                {site.socials.instagram ? (
                  <a
                    href={site.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Marwad Cabs on Instagram"
                    className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-white/10 px-3.5 py-1.5 font-semibold text-white transition-all hover:border-pink-500/60 hover:bg-white/20 hover:text-pink-300"
                  >
                    <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
                    <span>Instagram</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          {/* Navigation — concise lists so mobile stays short */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((group) => (
              <nav key={group.label} aria-label={`Footer — ${group.label}`}>
                <h3 className="mb-4 text-xs font-bold tracking-wider text-[#E5B84B] uppercase">
                  {group.label}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.8125rem] leading-snug text-[#FAF7F2]/75 transition-colors duration-150 hover:text-white sm:text-[0.875rem]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-[#FAF7F2]/60 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="max-w-full text-balance">
            © {year} {site.brandName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#E5B84B]"
            >
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#E5B84B]">
              Terms
            </Link>
            <Link
              href="/refund-policy"
              className="transition-colors hover:text-[#E5B84B]"
            >
              Refunds
            </Link>
            {site.socials.instagram ? (
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-[#E5B84B]"
              >
                <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
                <span>Instagram</span>
              </a>
            ) : null}
          </div>
        </Container>
      </div>
    </footer>
  );
}
