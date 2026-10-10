import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "paper" | "sand" | "umber" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  umber: "bg-umber text-paper",
  ink: "bg-ink text-paper",
};

const sizes = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

export function Section({
  id,
  tone = "paper",
  size = "md",
  container = true,
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  size?: keyof typeof sizes;
  container?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${tones[tone]} ${sizes[size]} ${className}`}>
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}

export function SectionHeader({
  number,
  eyebrow,
  title,
  description,
  action,
  dark = false,
}: {
  number?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-x-8 gap-y-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p
          className={`eyebrow mb-5 flex items-center gap-3 ${dark ? "text-stone-light" : "text-stone"}`}
        >
          {number ? (
            <>
              <span className={`tabular ${dark ? "text-brass" : "text-brass-deep"}`}>
                {number}
              </span>
              <span
                aria-hidden="true"
                className={`h-px w-7 ${dark ? "bg-line-dark" : "bg-line-strong"}`}
              />
            </>
          ) : null}
          <span>{eyebrow}</span>
        </p>
        <h2 className="display text-[clamp(1.9rem,4.4vw,3.4rem)]">{title}</h2>
      </div>
      {description || action ? (
        <div className="flex flex-col justify-end gap-5 lg:col-span-4 lg:col-start-9">
          {description ? (
            <p
              className={`max-w-[46ch] text-[0.9375rem] leading-relaxed ${dark ? "text-stone-light" : "text-stone"}`}
            >
              {description}
            </p>
          ) : null}
          {action}
        </div>
      ) : null}
    </div>
  );
}
