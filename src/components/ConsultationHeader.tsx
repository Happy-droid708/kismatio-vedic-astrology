import React from 'react';
import { Astrologer } from '../types/astrology';
import { ShieldCheck, Clock, Star, Sparkles, ChevronDown, Award, Zap } from 'lucide-react';

interface ConsultationHeaderProps {
  astrologer: Astrologer;
  remainingSeconds: number;
  onOpenRecharge: () => void;
  onOpenAstrologers: () => void;
  onToggleKundliSummary: () => void;
  showKundli: boolean;
}

export const ConsultationHeader: React.FC<ConsultationHeaderProps> = ({
  astrologer,
  remainingSeconds,
  onOpenRecharge,
  onOpenAstrologers,
  onToggleKundliSummary,
  showKundli,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = remainingSeconds <= 60;

  return (
    <div className="bg-[#10121b] border-b border-[#dfb76c]/15 px-4 sm:px-6 py-3">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Astrologer Info */}
        <div className="flex items-center gap-3">
          {/* Avatar with sacred saffron/gold ring */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#996e28] via-[#dfb76c] to-[#fef08a] p-0.5">
              <div className="w-full h-full rounded-full bg-[#181a24] flex items-center justify-center overflow-hidden">
                {/* Stylized Astrologer Icon / Monogram */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#251e13] to-[#12141c] text-[#dfb76c] font-display font-bold text-lg">
                  {astrologer.name.charAt(0)}
                </div>
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#10121b]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-serif-luxury font-bold text-[#f5eedf]">
                {astrologer.name}
              </h2>
              <button
                onClick={onOpenAstrologers}
                className="text-[11px] text-[#dfb76c] hover:underline flex items-center gap-0.5 cursor-pointer"
                title="View All Vedic Acharyas"
              >
                <span>Change</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#a49d8f]">
              <span className="text-[#dfb76c] font-medium">{astrologer.lineage}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-[#ede8dc] font-semibold">{astrologer.rating}</span> ({astrologer.totalConsultations.toLocaleString()})
              </span>
              <span aria-hidden="true">·</span>
              <span>{astrologer.experienceYears} Yrs Exp</span>
            </div>
          </div>
        </div>

        {/* Right: Live Consultation Timer & Rate */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          {/* Kundli Toggle */}
          <button
            onClick={onToggleKundliSummary}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
              showKundli
                ? 'bg-[#222739] border-[#dfb76c] text-[#dfb76c]'
                : 'bg-[#151824] border-[#292f44] text-[#b0a99a] hover:border-[#dfb76c]/40'
            }`}
          >
            {showKundli ? 'Hide Kundli' : 'View Kundli'}
          </button>

          {/* Time Clock Pill with Recharge */}
          <div
            className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border transition-all ${
              isLowTime
                ? 'bg-amber-950/50 border-amber-500 text-amber-200 animate-pulse'
                : 'bg-[#171a26] border-[#dfb76c]/30 text-[#ede8dc]'
            }`}
          >
            <Clock className={`w-4 h-4 ${isLowTime ? 'text-amber-400' : 'text-[#dfb76c]'}`} />
            <div className="text-left">
              <span className="text-[10px] text-[#8e8779] block leading-none">Remaining</span>
              <span className="font-mono text-sm font-bold tabular-nums">
                {formatTime(remainingSeconds)}
              </span>
            </div>
            <button
              onClick={onOpenRecharge}
              className="ml-1 px-2.5 py-1 rounded bg-[#dfb76c] hover:bg-[#c99f4c] text-[#0e1017] text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              + Add Mins
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
