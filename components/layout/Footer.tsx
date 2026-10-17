import Link from "next/link";
import Image from "next/image";
import { Phone, MessageSquare, MapPin, Clock, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/lib/nav";
import { site } from "@/data/site";
import { buildWhatsAppUrl, contextMessage, telHref } from "@/lib/whatsapp";

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
    <footer className="bg-[#0B172A] text-text-dark border-t border-[#C8962E]/25">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4 select-none group">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-gold shadow-md bg-white shrink-0 ring-1 ring-gold/40">
                  <Image
                    src="/logo.png"
                    alt="Marwad Cabs Logo"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
                    MARWAD CABS
                  </span>
                  <span className="text-[0.6875rem] font-semibold tracking-wider text-[#E5B84B] uppercase">
                    Tour and Travels • Jodhpur
                  </span>
                </div>
              </Link>

              <p className="text-sm text-[#FAF7F2]/80 max-w-[36ch] leading-relaxed">
                Direct taxi operator in Jodhpur. Upfront per-km rates, experienced Marwari chauffeurs, and zero-commission sightseeing for Rajasthan routes.
              </p>
            </div>

            <div className="mt-8 space-y-3.5 text-xs text-[#FAF7F2]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#E5B84B] shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  {formatAddress()}
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-[#E5B84B] shrink-0" />
                <span>24×7 Dispatch Office (Airport & Junction Pickups)</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={telHref()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3.5 py-1.5 font-semibold text-white border border-white/15 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#E5B84B]" />
                  <span>{site.phoneDisplay}</span>
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 font-bold text-white shadow-xs transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5 fill-current" />
                  <span>WhatsApp 24×7</span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((group) => (
              <nav key={group.label} aria-label={`Footer — ${group.label}`}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5B84B] mb-4">
                  {group.label}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[#FAF7F2]/75 hover:text-white text-[0.875rem] leading-normal transition-colors duration-150"
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
        <Container className="flex flex-col gap-4 py-6 text-xs text-[#FAF7F2]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-[#E5B84B] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#E5B84B] transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-[#E5B84B] transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
