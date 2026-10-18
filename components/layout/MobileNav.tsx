"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronDown, X } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import { CallButton } from "@/components/booking/CallButton";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { navGroups, primaryNav } from "@/lib/nav";
import { contextMessage } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { duration, ease, stagger } from "@/lib/motion";

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
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Keep Tab focus inside dialog
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
      last?.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first?.focus();
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

  return (
    <AnimatePresence>
      {open && (
        <div
          ref={rootRef}
          id="mobile-nav"
          className="fixed inset-0 z-50 flex flex-col lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          onKeyDown={trapFocus}
        >
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer content */}
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: duration.base, ease: ease.out }}
            className="relative z-10 flex h-full w-full flex-col bg-snow/98 backdrop-blur-2xl"
          >
            {/* Top Bar */}
            <div className="flex h-16 items-center justify-between border-b border-line px-6 sm:px-8">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2.5 select-none"
              >
                <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-gold shadow-xs bg-white shrink-0 ring-1 ring-gold/40">
                  <Image
                    src="/logo.png"
                    alt="Marwad Cabs Logo"
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold tracking-[-0.01em] text-text leading-tight">
                    MARWAD CABS
                  </span>
                  <span className="text-[0.5625rem] font-semibold tracking-wider text-gold-deep uppercase">
                    Tour and Travels • Jodhpur
                  </span>
                </div>
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-text transition-colors hover:bg-mist active:scale-95"
              >
                <X aria-hidden="true" strokeWidth={1.75} className="h-5 w-5" />
              </button>
            </div>

            {/* Nav list */}
            <nav
              aria-label="Mobile Navigation"
              className="flex-1 overflow-y-auto px-6 py-6 sm:px-8"
            >
              <m.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: stagger.fast },
                  },
                }}
                className="divide-y divide-line/70"
              >
                {/* First primary nav item */}
                {primaryNav.slice(0, 1).map((item) => (
                  <m.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="py-1"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`block py-3 text-lg font-medium tracking-tight ${
                        pathname === item.href ? "text-gold-deep font-semibold" : "text-text"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}

                {/* Nav groups */}
                {navGroups.map((group) => {
                  const isExpanded = openGroup === group.label;
                  return (
                    <m.li
                      key={group.label}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="py-1"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenGroup(isExpanded ? null : group.label)
                        }
                        className="flex w-full items-center justify-between py-3 text-left text-lg font-medium tracking-tight text-text"
                      >
                        <span>{group.label}</span>
                        <ChevronDown
                          aria-hidden="true"
                          strokeWidth={1.75}
                          className={`h-4 w-4 text-text-muted transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-gold-deep" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <ul className="mb-2 space-y-1 rounded-2xl bg-mist/80 p-2">
                          {group.items.map((subItem) => (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                onClick={onClose}
                                aria-current={
                                  pathname === subItem.href ? "page" : undefined
                                }
                                className={`block rounded-xl px-3 py-2 text-sm font-medium ${
                                  pathname === subItem.href
                                    ? "bg-gold/15 text-gold-deep font-semibold"
                                    : "text-text-muted hover:text-text"
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </m.li>
                  );
                })}

                {/* Remaining primary nav items */}
                {primaryNav.slice(1).map((item) => (
                  <m.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="py-1"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`block py-3 text-lg font-medium tracking-tight ${
                        pathname === item.href ? "text-gold-deep font-semibold" : "text-text"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </m.ul>

              {/* Bottom CTAs inside menu */}
              <div className="mt-8 grid gap-3">
                <CallButton
                  variant="secondary"
                  size="md"
                  location="mobile-nav"
                  page={pathname}
                >
                  Call {site.phoneDisplay}
                </CallButton>
                <WhatsAppButton
                  message={contextMessage(
                    "I found your website and would like a quote.",
                  )}
                  variant="primary"
                  size="md"
                  location="mobile-nav"
                  page={pathname}
                >
                  Chat on WhatsApp
                </WhatsAppButton>
              </div>
            </nav>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
