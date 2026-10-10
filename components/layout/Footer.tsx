import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/lib/nav";
import { site } from "@/data/site";

const year = new Date().getFullYear();

function addressLine() {
  const a = site.address;
  return `${a.street}, ${a.locality}, ${a.region} ${a.postalCode}, ${a.country === "IN" ? "India" : a.country}`;
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Container className="py-14 md:py-18">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="display text-[1.6rem]">{site.brandName}</p>
            <p className="eyebrow text-stone-light mt-2">{site.tagline}</p>
            <address className="text-stone-light mt-6 max-w-[34ch] text-sm leading-relaxed not-italic">
              {addressLine()}
            </address>
            <div className="mt-4 flex flex-col gap-1.5 text-sm">
              <a
                href={`tel:${site.phone}`}
                className="tabular text-paper hover:text-brass w-fit transition-colors"
              >
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-paper hover:text-brass w-fit transition-colors"
              >
                {site.email}
              </a>
              <p className="text-stone-light">Open {site.hours}</p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.label} aria-label={`Footer — ${group.label}`}>
                <h2 className="eyebrow text-brass mb-4">{group.label}</h2>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-stone-light hover:text-paper text-[0.8125rem] leading-relaxed transition-colors duration-150"
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

      <div className="border-line-dark border-t">
        <Container className="text-stone-light flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-5">
            <Link href="/privacy-policy" className="hover:text-paper transition-colors">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-paper transition-colors">
              Terms
            </Link>
            <Link href="/refund-policy" className="hover:text-paper transition-colors">
              Refunds
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
