import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "brass" | "secondary";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  onDark?: boolean;
  arrow?: boolean;
  className?: string;
  "aria-label"?: string;
};

type Props = BaseProps & {
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

const sizes = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
};

function variantClass(variant: Variant, onDark: boolean) {
  switch (variant) {
    case "primary":
      return onDark
        ? "bg-paper text-ink hover:bg-sand"
        : "bg-ink text-paper hover:bg-umber";
    case "brass":
      return "bg-brass text-ink transition-colors duration-200 hover:bg-brass-deep hover:text-paper";
    case "secondary":
      return onDark
        ? "border border-line-dark text-paper hover:border-paper/60 hover:bg-paper/10"
        : "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.05]";
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
}: Props) {
  const cls = [
    "group inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-[0.01em]",
    "transition-colors duration-200",
    sizes[size],
    variantClass(variant, onDark),
    disabled ? "pointer-events-none opacity-50" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowRight
          aria-hidden
          strokeWidth={1.5}
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
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
