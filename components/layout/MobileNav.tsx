"use client";

import Link from "next/link";
import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronDown, X } from "lucide-react";
import { CallButton } from "@/components/booking/CallButton";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { navGroups, primaryNav } from "@/lib/nav";
import { contextMessage } from "@/lib/whatsapp";
import { site } from "@/data/site";

export function MobileNav({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Keep Tab focus inside the dialog while it is open.
  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const root = rootRef.current;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={rootRef}
      id="mobile-nav"
      className="bg-paper fixed inset-0 z-50 flex flex-col lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onKeyDown={trapFocus}
    >
      <div className="border-line flex h-16 items-center justify-between border-b px-5 sm:px-8">
        <span className="display text-[1.4rem]">{site.brandName}</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="text-ink hover:text-brass-deep -mr-2 flex h-11 w-11 items-center justify-center rounded-xs transition-colors"
        >
          <X aria-hidden strokeWidth={1.5} className="h-5 w-5" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-8 sm:px-8">
        <ul className="border-line border-t">
          {primaryNav.slice(0, 1).map((item) => (
            <li key={item.href} className="border-line border-b">
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="block py-4 text-lg font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {navGroups.map((group) => (
            <li key={group.label} className="border-line border-b">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                  {group.label}
                  <ChevronDown
                    aria-hidden
                    strokeWidth={1.5}
                    className="text-stone h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <ul className="pb-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={`block py-2 pl-3 text-[0.9375rem] ${
                          pathname === item.href ? "text-brass-deep" : "text-stone"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
          {primaryNav.slice(1).map((item) => (
            <li key={item.href} className="border-line border-b">
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="block py-4 text-lg font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-3">
          <CallButton variant="secondary" size="md" location="mobile-nav" page={pathname}>
            Call {site.phoneDisplay}
          </CallButton>
          <WhatsAppButton
            message={contextMessage("I found your website and would like a quote.")}
            variant="primary"
            size="md"
            location="mobile-nav"
            page={pathname}
          >
            Chat on WhatsApp
          </WhatsAppButton>
        </div>
      </nav>
    </div>
  );
}
