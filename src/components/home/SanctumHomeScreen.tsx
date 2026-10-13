import React from 'react';
import {
  Sparkles,
  Compass,
  MessageSquare,
  Clock,
  ArrowRight,
  ShieldCheck,
  Star,
  Flame,
  Sun,
  Moon,
  ChevronRight,
} from 'lucide-react';
import { Astrologer, ConversationThread, KundliData } from '../../types/astrology';
import { CURATED_ASTROLOGERS } from '../../data/astrologyData';

interface SanctumHomeScreenProps {
  kundli: KundliData;
  remainingSeconds: number;
  conversations: ConversationThread[];
  onOpenExplore: () => void;
  onOpenChats: () => void;
  onSelectAstrologer: (astro: Astrologer) => void;
  onOpenRecharge: () => void;
}

export const SanctumHomeScreen: React.FC<SanctumHomeScreenProps> = ({
  kundli,
  remainingSeconds,
  conversations,
  onOpenExplore,
  onOpenChats,
  onSelectAstrologer,
  onOpenRecharge,
}) => {
  const remainingMinutes = Math.max(1, Math.ceil(remainingSeconds / 60));

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-[#0b0c14] select-none text-[#ede8dc] relative overflow-hidden animate-page-enter">
      {/* 1. Header */}
      <header className="shrink-0 sticky top-0 z-30 bg-[#0e1019]/96 backdrop-blur-md border-b border-[#dfb76c]/15 px-3.5 sm:px-6 py-2.5 flex items-center justify-between min-h-[56px]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 flex items-center justify-center shadow-xs">
            <div className="w-full h-full rounded-full bg-[#121422] flex items-center justify-center font-display text-xs font-bold text-[#dfb76c]">
              ✦
            </div>
          </div>
          <div>
            <h1 className="font-display font-bold text-sm tracking-wide text-[#fcedc5]">
              Kismatio Sanctum
            </h1>
            <p className="text-[10px] text-[#8e8779] font-serif-luxury italic">
              Vedic Astrology & Consecrated Gemstones
            </p>
          </div>
        </div>

        {/* Balance badge */}
        <button
          onClick={onOpenRecharge}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#161a2b] border border-[#dfb76c]/30 text-[#dfb76c] text-[11px] font-mono hover:bg-[#1f243b] active:scale-95 transition-all cursor-pointer"
        >
          <Clock className="w-3 h-3 text-[#dfb76c]" />
          <span>{remainingMinutes}m</span>
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-6 py-3.5 pb-24 space-y-4 scrollbar-none">
        {/* Daily Panchang Bar */}
        <div className="p-3 rounded-2xl bg-[#121524] border border-[#dfb76c]/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-[#8e8779] block">Today's Vedic Panchang</span>
              <span className="text-xs font-semibold text-[#fcedc5]">
                Shukla Navami · Ashwini Nakshatra
              </span>
            </div>
          </div>
          <div className="text-right text-[10.5px]">
            <span className="text-[#8e8779] block">Abhijit Muhurat</span>
            <span className="text-emerald-400 font-mono">11:46 AM - 12:38 PM</span>
          </div>
        </div>

        {/* Personalized Horoscope Hero */}
        <div className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#181d33] via-[#121526] to-[#0c0e18] border border-[#dfb76c]/30 shadow-xl shadow-black/40 overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-radial from-[#dfb76c]/20 to-transparent blur-xl pointer-events-none" />

          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#dfb76c]/15 border border-[#dfb76c]/30 text-[#dfb76c] text-[10px] font-mono uppercase">
                ✦ Daily Guidance for {kundli.lagna}
              </span>
              <span className="text-[10px] text-[#8e8779]">{kundli.moonSign} Moon</span>
            </div>

            <h3 className="font-display font-bold text-base sm:text-lg text-[#fcedc5] leading-snug">
              "Jupiter's golden amrit drishti protects your 10th house of career today."
            </h3>

            <p className="text-xs text-[#b5ad9e] leading-relaxed line-clamp-3">
              Maintain patience in critical negotiations before 2:15 PM. Shani's 8th house transit tests persistence, but wearing natural Yellow Sapphire or chanting Guru Mantras dissolves the fog.
            </p>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => onSelectAstrologer(CURATED_ASTROLOGERS[0])}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] text-[#0e1017] font-semibold text-xs active:scale-95 transition-transform flex items-center justify-center gap-1 shadow-md cursor-pointer"
              >
                <span>Ask Acharya Rajiv</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenExplore}
                className="px-3.5 py-2 rounded-xl bg-[#181d2e] border border-[#dfb76c]/25 text-[#dfb76c] text-xs hover:bg-[#20273d] cursor-pointer"
              >
                Explore Remedies
              </button>
            </div>
          </div>
        </div>

        {/* Quick Access Pillars */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <button
            onClick={onOpenChats}
            className="p-2.5 rounded-2xl bg-[#121524] border border-[#252c42] hover:border-[#dfb76c]/40 active:scale-95 transition-all cursor-pointer flex flex-col items-center gap-1 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">💬</span>
            <span className="text-[10.5px] text-[#fcedc5] font-medium">Chats</span>
          </button>

          <button
            onClick={onOpenExplore}
            className="p-2.5 rounded-2xl bg-[#121524] border border-[#252c42] hover:border-[#dfb76c]/40 active:scale-95 transition-all cursor-pointer flex flex-col items-center gap-1 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">💎</span>
            <span className="text-[10.5px] text-[#fcedc5] font-medium">Gemstones</span>
          </button>

          <button
            onClick={onOpenExplore}
            className="p-2.5 rounded-2xl bg-[#121524] border border-[#252c42] hover:border-[#dfb76c]/40 active:scale-95 transition-all cursor-pointer flex flex-col items-center gap-1 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">🔮</span>
            <span className="text-[10.5px] text-[#fcedc5] font-medium">Tools</span>
          </button>

          <button
            onClick={onOpenRecharge}
            className="p-2.5 rounded-2xl bg-[#121524] border border-[#252c42] hover:border-[#dfb76c]/40 active:scale-95 transition-all cursor-pointer flex flex-col items-center gap-1 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">⏱</span>
            <span className="text-[10.5px] text-[#fcedc5] font-medium">Recharge</span>
          </button>
        </div>

        {/* Live Acharyas Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-semibold text-xs sm:text-sm text-[#fcedc5] tracking-wide flex items-center gap-1.5">
              <span className="text-[#dfb76c]">✦</span>
              <span>Available Acharyas</span>
            </h4>
            <button
              onClick={onOpenExplore}
              className="text-[11px] text-[#dfb76c] hover:underline cursor-pointer"
            >
              See all ›
            </button>
          </div>

          <div className="space-y-2">
            {CURATED_ASTROLOGERS.slice(0, 3).map((astro) => (
              <div
                key={astro.id}
                onClick={() => onSelectAstrologer(astro)}
                className="p-3 rounded-2xl bg-[#121524] border border-[#dfb76c]/15 hover:border-[#dfb76c]/40 flex items-center justify-between transition-all cursor-pointer group active:scale-[0.99]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 shadow-sm">
                    <div className="w-full h-full rounded-full bg-[#161824] flex items-center justify-center font-display text-xs font-bold text-[#dfb76c]">
                      {astro.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-[#fcedc5] group-hover:text-amber-200 transition-colors">
                      {astro.name}
                    </h5>
                    <p className="text-[10px] text-[#8e8779] line-clamp-1">
                      {astro.lineage}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Online · ₹{astro.ratePerMinute}/min</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="p-2 rounded-xl bg-[#dfb76c]/10 text-[#dfb76c] group-hover:bg-[#dfb76c] group-hover:text-[#0e1017] transition-all">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
