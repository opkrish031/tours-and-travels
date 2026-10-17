import { Phone, MessageSquare, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { buildWhatsAppUrl, contextMessage, telHref } from "@/lib/whatsapp";

export function TopBar() {
  const whatsappUrl = buildWhatsAppUrl(
    contextMessage("Hi Marwad Cabs, I would like to check cab availability and fare."),
  );

  return (
    <div className="bg-[#0B172A] border-b border-[#C8962E]/25 text-white/90 text-[0.8125rem]">
      <Container className="flex flex-wrap items-center justify-between gap-y-2 py-2">
        {/* Live Rates Ticker */}
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#C8962E]/20 px-2.5 py-0.5 text-[0.6875rem] font-bold tracking-wider text-[#E5B84B] uppercase border border-[#C8962E]/40">
            <Zap className="h-3 w-3 text-[#E5B84B]" /> Fixed Rates
          </span>
          <div className="flex items-center gap-2 text-xs text-white/80">
            <span className="font-medium text-white">Sedan <span className="text-[#E5B84B] font-semibold">₹10/km</span></span>
            <span className="text-white/30">•</span>
            <span className="font-medium text-white">Ertiga <span className="text-[#E5B84B] font-semibold">₹13/km</span></span>
            <span className="text-white/30">•</span>
            <span className="font-medium text-white">Crysta <span className="text-[#E5B84B] font-semibold">₹17/km</span></span>
            <span className="text-white/30">•</span>
            <span className="font-medium text-white">Tempo <span className="text-[#E5B84B] font-semibold">₹24/km</span></span>
          </div>
        </div>

        {/* Quick Contact & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto text-xs">
          <span className="hidden md:inline-flex items-center gap-1.5 text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            24×7 Dispatch Office: Ratanada, Jodhpur
          </span>

          <a
            href={telHref()}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 font-medium text-white transition-colors border border-white/15"
            aria-label="Call Marwad Cabs 24x7"
          >
            <Phone className="h-3.5 w-3.5 text-[#E5B84B]" />
            <span className="font-semibold">{site.phoneDisplay}</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 px-3 py-1 font-semibold text-white shadow-xs transition-colors"
            aria-label="Chat with Marwad Cabs on WhatsApp"
          >
            <MessageSquare className="h-3.5 w-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </Container>
    </div>
  );
}
