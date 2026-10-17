"use client";

import { trackEvent } from "@/lib/analytics";
import { telHref } from "@/lib/whatsapp";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

export function CallButton({
  children,
  variant = "secondary",
  size = "md",
  onDark = false,
  arrow = false,
  className,
  location,
  page,
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onDark?: boolean;
  arrow?: boolean;
  className?: string;
  location: string;
  page: string;
}) {
  return (
    <Button
      href={telHref()}
      variant={variant}
      size={size}
      onDark={onDark}
      arrow={arrow}
      className={className}
      onClick={() => trackEvent("call_click", { location, page })}
      aria-label="Call us"
    >
      {children}
    </Button>
  );
}
