"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { m } from "motion/react";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl, contextMessage, telHref } from "@/lib/whatsapp";
import { spring } from "@/lib/motion";

/**
 * Mobile-only floating bottom action bar (below the md breakpoint).
 * Designed as an Apple-level glass dock with quick thumb accessibility.
 */
export function StickyActionBar() {
  const pathname = usePathname();

  return (
    <div
      className="fixed inset-x-4 bottom-3 z-40 md:hidden pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="region"
      aria-label="Quick actions"
    >
      <m.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={spring.snappy}
        className="pointer-events-auto mx-auto flex max-w-sm items-center justify-between rounded-full border border-white/20 bg-black/85 p-1.5 shadow-2xl backdrop-blur-xl"
      >
        {/* Call button */}
        <a
          href={telHref()}
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-semibold tracking-tight text-white/90 transition-opacity active:opacity-60"
          onClick={() =>
            trackEvent("call_click", { location: "sticky-bar", page: pathname })
          }
        >
          <Phone aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 text-white" />
          <span>Call</span>
        </a>

        {/* WhatsApp primary pill */}
        <a
          href={buildWhatsAppUrl(
            contextMessage("I found your website and would like a quote."),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-[1.4] items-center justify-center gap-1.5 rounded-full bg-gold py-2.5 text-xs font-semibold tracking-tight text-black shadow-sm transition-transform active:scale-95"
          onClick={() =>
            trackEvent("whatsapp_click", { location: "sticky-bar", page: pathname })
          }
        >
          <MessageCircle
            aria-hidden="true"
            strokeWidth={2}
            className="h-4 w-4 text-black"
          />
          <span>WhatsApp</span>
        </a>

        {/* Book / Fare button */}
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-semibold tracking-tight text-white/90 transition-opacity active:opacity-60"
        >
          <CalendarCheck
            aria-hidden="true"
            strokeWidth={1.75}
            className="h-4 w-4 text-white"
          />
          <span>Book</span>
        </Link>
      </m.div>
    </div>
  );
}
