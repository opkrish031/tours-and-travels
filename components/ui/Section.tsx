import type { ReactNode } from "react";
import { Container } from "./Container";

export type SectionTone =
  "snow" | "mist" | "graphite" | "black" | "paper" | "sand" | "umber" | "ink";

const toneStyles: Record<SectionTone, string> = {
  snow: "bg-snow text-text",
  mist: "bg-mist text-text",
  graphite: "bg-graphite text-text-dark",
  black: "bg-black text-text-dark",
  // Legacy aliases for backward compatibility
  paper: "bg-snow text-text",
  sand: "bg-mist text-text",
  umber: "bg-graphite text-text-dark",
  ink: "bg-black text-text-dark",
};

const sizes = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-20",
  lg: "py-16 md:py-24",
};

export function Section({
  id,
  tone = "snow",
  size = "md",
  container = true,
  className = "",
  children,
}: {
  id?: string;
  tone?: SectionTone;
  size?: keyof typeof sizes;
  container?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${toneStyles[tone]} ${sizes[size]} relative ${className}`}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  dark = false,
  number,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  dark?: boolean;
  number?: string;
}) {
  return (
    <div className="mb-12 grid gap-x-12 gap-y-6 md:mb-16 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p
          className={`eyebrow mb-3.5 flex items-center gap-2.5 ${
            dark ? "text-gold" : "text-gold-deep"
          }`}
        >
          {number ? <span className="font-mono text-xs opacity-75">{number}</span> : null}
          <span>{eyebrow}</span>
        </p>
        <h2 className="text-[clamp(1.85rem,3.5vw,2.85rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
          {title}
        </h2>
      </div>
      {description || action ? (
        <div className="flex flex-col justify-start gap-4 lg:col-span-5 lg:col-start-8 lg:pt-7">
          {description ? (
            <p
              className={`max-w-[48ch] text-[0.9375rem] leading-relaxed md:text-base ${
                dark ? "text-text-dark-muted" : "text-text-muted"
              }`}
            >
              {description}
            </p>
          ) : null}
          {action ? <div className="pt-1">{action}</div> : null}
        </div>
      ) : null}
    </div>
  );
}
