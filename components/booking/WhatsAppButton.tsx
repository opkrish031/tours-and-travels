"use client";

import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

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
  variant?: ButtonVariant;
  size?: ButtonSize;
  onDark?: boolean;
  arrow?: boolean;
  className?: string;
  location: string;
  page: string;
}) {
  const href = buildWhatsAppUrl(message);

  const handleClick = (e: React.MouseEvent) => {
    trackEvent("whatsapp_click", { location, page });
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
    if (isMobile) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <Button
      href={href}
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
