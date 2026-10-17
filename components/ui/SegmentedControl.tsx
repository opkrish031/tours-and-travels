"use client";

import { useId, useRef, type KeyboardEvent } from "react";
import { m } from "motion/react";
import { spring } from "@/lib/motion";

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
  count?: number;
}

export interface SegmentedControlProps<T extends string = string> {
  options: readonly SegmentedOption<T>[] | readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  name?: string;
  dark?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  name,
  dark = false,
  className = "",
  size = "md",
}: SegmentedControlProps<T>) {
  const generatedId = useId();
  const groupId = name ?? generatedId;
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, currentIndex: number) => {
    let targetIndex = -1;

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        targetIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
        break;
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        targetIndex = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
        break;
      case "Home":
        e.preventDefault();
        targetIndex = 0;
        break;
      case "End":
        e.preventDefault();
        targetIndex = options.length - 1;
        break;
    }

    if (targetIndex >= 0 && targetIndex < options.length) {
      const nextOpt = options[targetIndex];
      if (nextOpt) {
        onChange(nextOpt.value);
        itemRefs.current[targetIndex]?.focus();
      }
    }
  };

  const sizeClasses =
    size === "sm"
      ? "p-0.5 text-xs h-9"
      : "p-1 text-sm h-11";

  return (
    <div
      role="tablist"
      aria-label="Filter options"
      onKeyDown={(e) => {
        const activeIdx = options.findIndex((opt) => opt.value === value);
        if (activeIdx !== -1) handleKeyDown(e, activeIdx);
      }}
      className={`inline-flex items-center rounded-full border ${
        dark
          ? "border-line-dark bg-graphite-2/90 text-text-dark"
          : "border-line bg-mist/90 text-text"
      } ${sizeClasses} ${className}`}
    >
      {options.map((option, index) => {
        const isSelected = option.value === value;
        const optId = `${groupId}-tab-${option.value}`;

        return (
          <button
            key={option.value}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            id={optId}
            role="tab"
            type="button"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={`relative flex items-center justify-center rounded-full px-3.5 py-1 font-medium tracking-tight transition-colors duration-150 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-gold ${
              isSelected
                ? dark
                  ? "text-black font-semibold"
                  : "text-text font-semibold"
                : dark
                ? "text-text-dark-muted hover:text-white"
                : "text-text-muted hover:text-text"
            }`}
          >
            {isSelected && (
              <m.div
                layoutId={`segment-active-${groupId}`}
                transition={spring.snappy}
                className={`absolute inset-0 rounded-full shadow-xs ${
                  dark ? "bg-gold" : "bg-white"
                }`}
              />
            )}
            <span className="relative z-10 whitespace-nowrap">
              {option.label}
              {"count" in option && option.count !== undefined ? (
                <span
                  className={`ml-1.5 rounded-full px-1.5 py-0.2 text-[0.6875rem] font-mono ${
                    isSelected
                      ? dark
                        ? "bg-black/15 text-black"
                        : "bg-mist text-text"
                      : dark
                      ? "bg-white/10 text-white/70"
                      : "bg-black/5 text-text-muted"
                  }`}
                >
                  {option.count}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
