"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";

export type AccordionItem = { q: string; a: string };

export function Accordion({
  items,
  defaultOpen = -1,
}: {
  items: AccordionItem[];
  defaultOpen?: number;
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className="border-line border-t">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.q} className="border-line border-b">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span className="group-hover:text-brass-deep text-[1.0625rem] leading-snug font-medium transition-colors duration-200 sm:text-lg">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                    isOpen
                      ? "border-brass bg-brass text-ink"
                      : "border-line-strong text-stone group-hover:border-ink"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  ) : (
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                  )}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="text-stone max-w-[68ch] pr-10 pb-6 text-[0.9375rem] leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
