"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { TopBar } from "@/components/home/TopBar";
import { navGroups, primaryNav, type NavLink } from "@/lib/nav";
import { contextMessage, telHref } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { duration, ease } from "@/lib/motion";

function Dropdown({
  label,
  items,
  open,
  hoveredRef,
  setOpen,
  close,
  pathname,
}: {
  label: string;
  items: NavLink[];
  open: boolean;
  hoveredRef: RefObject<boolean>;
  setOpen: () => void;
  close: () => void;
  pathname: string;
}) {
  const id = `nav-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const isAnyActive = items.some((item) => pathname === item.href);

  return (
    <li
      className="relative"
      onMouseEnter={() => {
        hoveredRef.current = true;
        setOpen();
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        close();
      }}
    >
      <button
        type="button"
        id={`${id}-button`}
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={() => {
          if (open && !hoveredRef.current) close();
          else setOpen();
        }}
        className={`relative flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.06em] transition-colors duration-150 cursor-pointer ${
          isAnyActive
            ? "text-gold-deep font-semibold"
            : open
            ? "text-text font-semibold"
            : "text-text-muted hover:text-text"
        }`}
      >
        <span>{label}</span>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.75}
          className={`h-3 w-3 transition-transform duration-200 ${
            open ? "rotate-180 text-text" : "opacity-60"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={`${id}-menu`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: duration.fast, ease: ease.out },
            }}
            exit={{
              opacity: 0,
              y: 4,
              scale: 0.98,
              transition: { duration: 0.15 },
            }}
            className="absolute top-full left-0 z-50 mt-1 min-w-[16rem] overflow-hidden rounded-2xl border border-line bg-white/95 p-1.5 shadow-xl backdrop-blur-xl"
          >
            <ul className="max-h-[22rem] overflow-y-auto space-y-0.5">
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[0.875rem] font-medium transition-colors ${
                        active
                          ? "bg-gold/15 text-gold-deep font-semibold"
                          : "text-text hover:bg-mist hover:text-black"
                      }`}
                    >
                      <span>{item.label}</span>
                      {active ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function TopNavLink({ item, pathname }: { item: NavLink; pathname: string }) {
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`relative block rounded-full px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.06em] transition-colors duration-150 ${
        active ? "text-gold-deep font-semibold" : "text-text-muted hover:text-text"
      }`}
    >
      {item.label}
      {active && (
        <span className="absolute bottom-0.5 inset-x-3 h-px bg-gold rounded-full" />
      )}
    </Link>
  );
}

export function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const hoveredRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close open menus when route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenGroup(null);
    setMenuOpen(false);
  }

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = () => setOpenGroup(null);

  return (
    <>
      <TopBar />
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-line bg-snow/95 backdrop-blur-xl shadow-xs"
            : "border-b border-line/50 bg-snow/80 backdrop-blur-md"
        }`}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setOpenGroup(null);
          }
        }}
      >
        <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem] lg:gap-8">
          {/* Brand Logo with Gold-Ringed Circular Badge */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 sm:gap-3 select-none py-1"
            aria-label={`${site.brandName} — home`}
          >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden border-2 border-gold shadow-xs bg-white shrink-0 ring-1 ring-gold/40">
              <Image
                src="/logo.png"
                alt="Marwad Cabs Logo"
                width={48}
                height={48}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-[-0.02em] text-text leading-tight group-hover:text-gold-deep transition-colors">
                MARWAD CABS
              </span>
              <span className="font-mono text-[0.5625rem] sm:text-[0.625rem] font-medium tracking-[0.08em] text-gold-deep uppercase">
                Tour and Travels · Jodhpur
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <TopNavLink item={primaryNav[0]} pathname={pathname} />
              </li>
              {navGroups.map((group) => (
                <Dropdown
                  key={group.label}
                  label={group.label}
                  items={group.items}
                  open={openGroup === group.label}
                  hoveredRef={hoveredRef}
                  setOpen={() => setOpenGroup(group.label)}
                  close={close}
                  pathname={pathname}
                />
              ))}
              {primaryNav.slice(1).map((item) => (
                <li key={item.href}>
                  <TopNavLink item={item} pathname={pathname} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-4 md:flex">
              <a
                href={telHref()}
                className="group inline-flex items-center gap-1.5 text-[0.8125rem] text-text-muted transition-colors hover:text-text"
                aria-label={`Call ${site.brandName}`}
              >
                <Phone
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="h-3.5 w-3.5 text-gold-deep transition-transform group-hover:rotate-12"
                />
                <span className="tabular font-medium border-b border-transparent pb-0.5 group-hover:border-gold/50 transition-colors">
                  {site.phoneDisplay}
                </span>
              </a>
              <WhatsAppButton
                message={contextMessage("I found your website and would like a quote.")}
                variant="primary"
                size="sm"
                location="header"
                page={pathname}
              >
                WhatsApp
              </WhatsAppButton>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/80 text-text transition-all hover:bg-mist active:scale-95 lg:hidden"
            >
              <Menu aria-hidden="true" strokeWidth={1.75} className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileNav open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
