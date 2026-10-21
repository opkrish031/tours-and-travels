import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "brass" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onDark?: boolean;
  arrow?: boolean;
  className?: string;
  "aria-label"?: string;
};

export type ButtonProps = BaseProps & {
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8125rem] gap-1.5",
  md: "h-11 px-6 text-[0.9375rem] gap-2",
  lg: "h-13 px-8 text-base gap-2.5",
};

function getVariantClasses(variant: ButtonVariant, onDark: boolean): string {
  switch (variant) {
    case "primary":
    case "brass":
      return "bg-gold text-black font-semibold hover:bg-gold-bright active:bg-gold-deep shadow-sm";
    case "secondary":
      return onDark
        ? "bg-graphite-2/80 text-text-dark border border-line-dark hover:bg-graphite hover:border-white/25"
        : "bg-white text-text border border-line hover:bg-mist hover:border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
    case "outline":
      return onDark
        ? "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10"
        : "border border-gold/50 text-gold-deep hover:border-gold hover:bg-gold/10";
    case "ghost":
      return onDark
        ? "text-text-dark hover:bg-white/8"
        : "text-text hover:bg-black/5";
  }
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  onDark = false,
  arrow = false,
  className = "",
  href,
  type = "button",
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const cls = [
    "group inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium tracking-[-0.01em] whitespace-nowrap",
    "transition-all duration-200 ease-out active:scale-[0.98] select-none",
    "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
    sizes[size],
    getVariantClasses(variant, onDark),
    disabled ? "pointer-events-none opacity-45 cursor-not-allowed" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (href !== undefined) {
    const external = /^(https?:|tel:|mailto:|wa\.me)/.test(href);
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          aria-label={ariaLabel}
          onClick={onClick}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
