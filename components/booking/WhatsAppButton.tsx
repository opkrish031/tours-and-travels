"use client";

import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

export function WhatsAppButton({
  message,
  children,
  variant = "primary",
  size = "md",
  onDark = false,
  arrow = false,
  className,
  location,
  page,
}: {
  message: string;
  children: React.ReactNode;
  variant?: "primary" | "brass" | "secondary";
  size?: "sm" | "md";
  onDark?: boolean;
  arrow?: boolean;
  className?: string;
  location: string;
  page: string;
}) {
  const handleClick = () => {
    trackEvent("whatsapp_click", { location, page });
    const href = buildWhatsAppUrl(message);
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = href;
    } else {
      window.open(href, "_blank", "noopener");
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onDark={onDark}
      arrow={arrow}
      className={className}
      onClick={handleClick}
      aria-label="Chat with us on WhatsApp"
    >
      {children}
    </Button>
  );
}
