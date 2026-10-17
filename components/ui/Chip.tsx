import type { ReactNode } from "react";

export type ChipVariant = "default" | "gold" | "dark" | "outline";
export type ChipSize = "sm" | "md";

export interface ChipProps {
  children: ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  className?: string;
  icon?: ReactNode;
}

const variantStyles: Record<ChipVariant, string> = {
  default: "bg-mist text-text border border-line",
  gold: "bg-gold/15 text-gold-deep border border-gold/30 dark:text-gold",
  dark: "bg-white/10 text-text-dark border border-white/15",
  outline: "bg-transparent text-text border border-line dark:text-text-dark dark:border-white/20",
};

const sizeStyles: Record<ChipSize, string> = {
  sm: "px-2.5 py-0.5 text-xs gap-1",
  md: "px-3.5 py-1 text-xs md:text-sm gap-1.5",
};

export function Chip({
  children,
  variant = "default",
  size = "sm",
  className = "",
  icon,
}: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium tracking-tight select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
    </span>
  );
}
