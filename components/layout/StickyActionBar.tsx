"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl, contextMessage, telHref } from "@/lib/whatsapp";

/**
 * Mobile-only fixed bottom action bar (below the md breakpoint).
 * Always visible so Call / WhatsApp / Book are one thumb-reach away.
 */
export function StickyActionBar() {
  const pathname = usePathname();

  const cellClass =
    "flex flex-col items-center justify-center gap-1 py-2 text-[0.625rem] font-semibold tracking-[0.12em] uppercase transition-opacity duration-150 active:opacity-70";

  return (
    <div
      className="border-line-dark bg-ink text-paper fixed inset-x-0 bottom-0 z-40 border-t md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="region"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-3">
        <a
          href={telHref()}
          className={cellClass}
          onClick={() =>
            trackEvent("call_click", { location: "sticky-bar", page: pathname })
          }
        >
          <Phone aria-hidden strokeWidth={1.5} className="h-[1.15rem] w-[1.15rem]" />
          Call
        </a>
        <a
          href={buildWhatsAppUrl(
            contextMessage("I found your website and would like a quote."),
          )}
          className={`${cellClass} bg-brass text-ink`}
          onClick={() =>
            trackEvent("whatsapp_click", { location: "sticky-bar", page: pathname })
          }
        >
          <MessageCircle
            aria-hidden
            strokeWidth={1.5}
            className="h-[1.15rem] w-[1.15rem]"
          />
          WhatsApp
        </a>
        <Link href="/contact" className={cellClass}>
          <CalendarCheck
            aria-hidden
            strokeWidth={1.5}
            className="h-[1.15rem] w-[1.15rem]"
          />
          Book
        </Link>
      </div>
    </div>
  );
}
