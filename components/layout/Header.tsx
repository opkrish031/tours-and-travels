"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CallButton } from "@/components/booking/CallButton";
import { WhatsAppButton } from "@/components/booking/WhatsAppButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { navGroups, primaryNav, type NavLink } from "@/lib/nav";
import { contextMessage } from "@/lib/whatsapp";
import { site } from "@/data/site";

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
  const id = `nav-${label.toLowerCase()}`;

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
        className={`flex items-center gap-1.5 rounded-xs px-3 py-2 text-[0.8125rem] font-semibold tracking-[0.02em] transition-colors duration-150 ${
          open ? "text-brass-deep" : "text-ink hover:text-brass-deep"
        }`}
      >
        {label}
        <ChevronDown
          aria-hidden
          strokeWidth={1.5}
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={`${id}-menu`}
        aria-labelledby={`${id}-button`}
        className={`border-line-strong bg-paper absolute top-full left-0 z-50 min-w-[15rem] border py-1.5 transition duration-150 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="max-h-[22rem] overflow-y-auto">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={`hover:bg-ink/[0.05] hover:text-brass-deep block px-4 py-2 text-sm transition-colors duration-150 ${
                    active ? "text-brass-deep" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

function TopNavLink({ item, pathname }: { item: NavLink; pathname: string }) {
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`block rounded-xs px-3 py-2 text-[0.8125rem] font-semibold tracking-[0.02em] transition-colors duration-150 ${
        active ? "text-brass-deep" : "text-ink hover:text-brass-deep"
      }`}
    >
      {item.label}
    </Link>
  );
}

export function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const hoveredRef = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close open menus when the route changes (guarded render-time adjustment).
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
        className="border-line bg-paper sticky top-0 z-40 border-b"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setOpenGroup(null);
          }
        }}
      >
        <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem] lg:gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-baseline gap-2.5 whitespace-nowrap"
            aria-label={`${site.brandName} — home`}
          >
            <span className="display text-[1.4rem] tracking-[-0.01em] md:text-[1.55rem]">
              {site.brandName}
            </span>
            <span className="eyebrow text-stone hidden sm:inline">Jodhpur</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
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

          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-2.5 md:flex">
              <CallButton variant="secondary" size="sm" location="header" page={pathname}>
                <span className="tabular">{site.phoneDisplay}</span>
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
              className="text-ink hover:text-brass-deep -mr-2 flex h-11 w-11 items-center justify-center rounded-xs transition-colors lg:hidden"
            >
              <Menu aria-hidden strokeWidth={1.5} className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileNav open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
