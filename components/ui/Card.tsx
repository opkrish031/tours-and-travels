import type { ReactNode } from "react";

export type CardVariant = "default" | "mist" | "graphite" | "glass" | "bordered";

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  hoverEffect?: boolean;
  className?: string;
  as?: "div" | "article" | "section";
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white text-text border border-line shadow-xs",
  mist: "bg-mist/80 text-text border border-line/60 shadow-xs",
  graphite: "bg-graphite text-text-dark border border-line-dark shadow-sm",
  glass:
    "bg-white/80 backdrop-blur-md text-text border border-line/80 shadow-xs dark:bg-graphite/80 dark:text-text-dark dark:border-line-dark",
  bordered: "bg-transparent text-text border border-line dark:text-text-dark dark:border-line-dark",
};

export function Card({
  children,
  variant = "default",
  hoverEffect = false,
  className = "",
  as: Component = "div",
}: CardProps) {
  const hoverClasses = hoverEffect
    ? "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-black/15 dark:hover:border-gold/30"
    : "";

  return (
    <Component
      className={`rounded-2xl p-6 md:p-8 ${variantStyles[variant]} ${hoverClasses} ${className}`}
    >
      {children}
    </Component>
  );
}
