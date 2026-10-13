import React from 'react';
import { Clock, Sparkles, User, RefreshCw } from 'lucide-react';

interface TopNavProps {
  remainingSeconds: number;
  onOpenRecharge: () => void;
  onOpenAstrologers: () => void;
  onResetDemo: () => void;
  activeAstrologerName: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  remainingSeconds,
  onOpenRecharge,
  onOpenAstrologers,
  onResetDemo,
  activeAstrologerName,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = remainingSeconds <= 60;

  return (
    <header className="sticky top-0 z-40 bg-[#0e1017]/90 backdrop-blur-md border-b border-[#dfb76c]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark in display face */}
        <a href="#home" className="text-xl md:text-2xl font-display font-semibold tracking-wider text-[#ede8dc] hover:text-[#dfb76c] transition-colors">
          Jyotishya
        </a>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-wider text-[#b8b3a7]">
          <button
            onClick={onOpenAstrologers}
            className="hover:text-[#dfb76c] transition-colors cursor-pointer py-1"
          >
            Vedic Acharyas
          </button>
          <a href="#kundli-preview" className="hover:text-[#dfb76c] transition-colors py-1">
            Kundli Analysis
          </a>
          <a href="#gemstones" className="hover:text-[#dfb76c] transition-colors py-1">
            Sacred Gemstones
          </a>
          <a href="#consecration" className="hover:text-[#dfb76c] transition-colors py-1">
            Kashi Consecration
          </a>
          <a href="#orders" className="hover:text-[#dfb76c] transition-colors py-1">
            Order Sanctum
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Astrologer indicator */}
          <button
            onClick={onOpenAstrologers}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161922] border border-[#2b3042] text-xs text-[#cdc7b9] hover:border-[#dfb76c]/40 transition-colors cursor-pointer"
            title="Switch Astrologer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="truncate max-w-[130px] font-medium">{activeAstrologerName}</span>
          </button>

          {/* Consultation Minutes Counter with Quick Recharge */}
          <button
            onClick={onOpenRecharge}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              isLowTime
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200 animate-pulse'
                : 'bg-[#1a1d28] border-[#dfb76c]/30 text-[#ede8dc] hover:border-[#dfb76c]'
            }`}
            title="Click to recharge minutes"
          >
            <Clock className={`w-3.5 h-3.5 ${isLowTime ? 'text-amber-400' : 'text-[#dfb76c]'}`} />
            <span className="tabular-nums font-mono font-medium">{formatTime(remainingSeconds)}</span>
            <span className="text-[#a89d8d] hidden md:inline">· Recharge</span>
          </button>

          {/* Reset Demo button for quick review */}
          <button
            onClick={onResetDemo}
            className="p-1.5 rounded-lg text-[#8f887b] hover:text-[#ede8dc] hover:bg-[#161922] transition-colors cursor-pointer"
            title="Restart Journey Demo"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
