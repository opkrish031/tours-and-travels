import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { telHref } from "@/lib/whatsapp";

export function TopBar() {
  return (
    <div className="bg-ink border-line-dark border-b">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2.5">
        <p className="text-stone-light flex items-center gap-2.5 text-xs">
          <span
            className="bg-brass inline-block h-1.5 w-1.5 rounded-full"
            aria-hidden="true"
          />
          Open {site.hours.replace("x", "×")} · Jodhpur, Rajasthan
        </p>
        <p className="flex items-center gap-5 text-xs">
          <a
            href={telHref()}
            className="text-stone-light hover:text-paper transition-colors"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-stone-light hover:text-paper hidden transition-colors sm:inline"
          >
            {site.email}
          </a>
        </p>
      </Container>
    </div>
  );
}
