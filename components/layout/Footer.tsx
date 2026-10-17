import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/lib/nav";
import { site } from "@/data/site";

const year = new Date().getFullYear();

function formatAddress() {
  const a = site.address;
  return `${a.street}, ${a.locality}, ${a.region} ${a.postalCode}, ${
    a.country === "IN" ? "India" : a.country
  }`;
}

export function Footer() {
  return (
    <footer className="bg-black text-text-dark border-t border-line-dark">
      <Container className="py-16 md:py-24">
        {/* Large brand statement & navigation */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand info */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                  {site.brandName}
                </span>
                <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-medium text-gold border border-gold/30">
                  Rajasthan
                </span>
              </div>
              <p className="text-sm md:text-[0.9375rem] text-text-dark-muted max-w-[34ch] leading-relaxed">
                {site.tagline}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <address className="text-text-dark-muted text-xs leading-relaxed not-italic max-w-[36ch]">
                {formatAddress()}
              </address>
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href={`tel:${site.phone}`}
                  className="tabular text-white hover:text-gold w-fit transition-colors font-medium"
                >
                  {site.phoneDisplay}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="text-text-dark-muted hover:text-gold w-fit transition-colors text-xs"
                >
                  {site.email}
                </a>
                <p className="text-text-dark-muted text-xs">
                  Available {site.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((group) => (
              <nav key={group.label} aria-label={`Footer — ${group.label}`}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4">
                  {group.label}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-text-dark-muted hover:text-white text-[0.875rem] leading-normal transition-colors duration-150"
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

      {/* Bottom bar */}
      <div className="border-t border-line-dark">
        <Container className="flex flex-col gap-4 py-6 text-xs text-text-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-gold transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
