"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import { CallButton } from "@/components/booking/CallButton";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { navGroups, primaryNav, type NavLink } from "@/lib/nav";
import { contextMessage } from "@/lib/whatsapp";
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
        className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.875rem] font-medium tracking-tight transition-colors duration-150 cursor-pointer ${
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
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
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
      className={`relative block rounded-full px-3.5 py-1.5 text-[0.875rem] font-medium tracking-tight transition-colors duration-150 ${
        active ? "text-gold-deep font-semibold" : "text-text-muted hover:text-text"
      }`}
    >
      {item.label}
      {active && (
        <span className="absolute bottom-0 inset-x-3.5 h-[2px] bg-gold rounded-full" />
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
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-line bg-snow/85 backdrop-blur-xl shadow-xs"
            : "border-b border-transparent bg-snow/60 backdrop-blur-md"
        }`}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setOpenGroup(null);
          }
        }}
      >
        <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem] lg:gap-8">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 select-none"
            aria-label={`${site.brandName} — home`}
          >
            <span className="text-xl md:text-[1.375rem] font-semibold tracking-[-0.03em] text-text transition-colors group-hover:text-gold-deep">
              {site.brandName}
            </span>
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.6875rem] font-medium text-gold-deep border border-gold/30 hidden sm:inline-block">
              Jodhpur
            </span>
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
            <div className="hidden items-center gap-3 md:flex">
              <CallButton variant="secondary" size="sm" location="header" page={pathname}>
                <span className="tabular font-medium">{site.phoneDisplay}</span>
              </CallButton>
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
