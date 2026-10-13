import React from 'react';
import { Astrologer } from '../types/astrology';
import { Clock, Star, ChevronDown, Layers, Plus } from 'lucide-react';

interface MobileAppBarProps {
  astrologer: Astrologer;
  remainingSeconds: number;
  onOpenRecharge: () => void;
  onOpenAstrologers: () => void;
  onToggleKundliSummary: () => void;
  showKundli: boolean;
  onOpenStateDrawer: () => void;
  currentState: string;
}

export const MobileAppBar: React.FC<MobileAppBarProps> = ({
  astrologer,
  remainingSeconds,
  onOpenRecharge,
  onOpenAstrologers,
  onToggleKundliSummary,
  showKundli,
  onOpenStateDrawer,
  currentState,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = remainingSeconds <= 60;

  return (
    <header className="sticky top-0 z-30 bg-[#10121b]/95 backdrop-blur-md border-b border-[#dfb76c]/15 px-3 py-2 flex items-center justify-between min-h-[54px]">
      {/* Left Slot: Astrologer Avatar & Name */}
      <button
        onClick={onOpenAstrologers}
        className="flex items-center gap-2.5 text-left p-1 -ml-1 rounded-xl active:bg-[#181b28] transition-colors cursor-pointer group min-h-[44px]"
        title="Switch Vedic Acharya"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#996e28] via-[#dfb76c] to-[#fef08a] p-0.5">
            <div className="w-full h-full rounded-full bg-[#161824] flex items-center justify-center font-display text-sm font-bold text-[#dfb76c]">
              {astrologer.name.charAt(0)}
            </div>
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#10121b] ring-1 ring-emerald-500/50 animate-pulse" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm font-serif-luxury font-bold text-[#f5eedf] truncate max-w-[130px] sm:max-w-[160px]">
              {astrologer.name.replace('Acharya ', '')}
            </span>
            <ChevronDown className="w-3 h-3 text-[#a8a192] group-hover:text-[#dfb76c] transition-colors shrink-0" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#9d9688]">
            <span className="flex items-center gap-0.5 text-amber-300 font-medium">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>{astrologer.rating}</span>
            </span>
            <span className="text-[#555a6d]">·</span>
            <span className="truncate max-w-[90px] text-[#b8b2a3]">{astrologer.location.split('/')[0]}</span>
          </div>
        </div>
      </button>

      {/* Right Slot: Kundli Toggle + Time Pill + State Drawer Trigger */}
      <div className="flex items-center gap-1.5">
        {/* Kundli badge */}
        <button
          onClick={onToggleKundliSummary}
          className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-colors cursor-pointer min-h-[36px] flex items-center ${
            showKundli
              ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#dfb76c]'
              : 'bg-[#151825] border-[#292f44] text-[#b0a99a] active:bg-[#202538]'
          }`}
          title="Toggle Janma Kundli"
        >
          Kundli
        </button>

        {/* Consultation Timer Pill */}
        <button
          onClick={onOpenRecharge}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer min-h-[36px] ${
            isLowTime
              ? 'bg-amber-950/60 border-amber-500/80 text-amber-200 animate-pulse'
              : 'bg-[#161926] border-[#dfb76c]/30 text-[#ede8dc] active:border-[#dfb76c]'
          }`}
          title="Click to recharge minutes"
        >
          <Clock className={`w-3.5 h-3.5 ${isLowTime ? 'text-amber-400' : 'text-[#dfb76c]'}`} />
          <span className="font-semibold text-xs tabular-nums">{formatTime(remainingSeconds)}</span>
          <span className="w-4 h-4 rounded-full bg-[#dfb76c]/20 text-[#dfb76c] flex items-center justify-center text-[10px] font-bold">
            <Plus className="w-3 h-3" />
          </span>
        </button>

        {/* State Machine Drawer Button */}
        <button
          onClick={onOpenStateDrawer}
          className="p-2 rounded-lg bg-[#161926] border border-[#2b3147] text-[#dfb76c] active:bg-[#222739] transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
          title="Open State Machine Controller"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
