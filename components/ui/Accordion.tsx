"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import { duration, ease } from "@/lib/motion";

export type AccordionItem = { q: string; a: string };

export function Accordion({
  items,
  defaultOpen = -1,
  dark = false,
}: {
  items: AccordionItem[];
  defaultOpen?: number;
  dark?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div
      className={`divide-y border-t border-b ${
        dark ? "divide-line-dark border-line-dark" : "divide-line border-line"
      }`}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-pnl-${index}`;

        return (
          <div key={item.q} className="group">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left cursor-pointer select-none"
              >
                <span
                  className={`text-[1.0625rem] md:text-lg font-medium tracking-[-0.01em] transition-colors duration-200 ${
                    isOpen
                      ? dark
                        ? "text-gold"
                        : "text-gold-deep"
                      : dark
                      ? "text-text-dark group-hover:text-gold"
                      : "text-text group-hover:text-gold-deep"
                  }`}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "border-gold bg-gold text-black rotate-45"
                      : dark
                      ? "border-white/15 text-text-dark-muted group-hover:border-white/30"
                      : "border-line text-text-muted group-hover:border-black/25"
                  }`}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { duration: duration.base, ease: ease.out },
                      opacity: { duration: duration.fast, delay: 0.05 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: duration.fast, ease: ease.out },
                      opacity: { duration: duration.fast },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <p
                    className={`max-w-[70ch] pr-8 pb-6 text-[0.9375rem] md:text-base leading-relaxed ${
                      dark ? "text-text-dark-muted" : "text-text-muted"
                    }`}
                  >
                    {item.a}
                  </p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
