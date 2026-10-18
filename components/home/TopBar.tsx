import { Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function TopBar() {
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

        <span className="ml-auto hidden md:inline-flex items-center gap-1.5 text-xs text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Dispatch Office: Ratanada, Jodhpur
        </span>
      </Container>
    </div>
  );
}
