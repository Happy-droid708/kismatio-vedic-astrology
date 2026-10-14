import React from 'react';
import { KundliData } from '../../types/astrology';
import { Compass, ShieldCheck, AlertCircle } from 'lucide-react';

interface KundliWidgetProps {
  kundli: KundliData;
}

export const KundliWidget: React.FC<KundliWidgetProps> = ({ kundli }) => {
  return (
    <div className="my-2.5 p-3.5 sm:p-4 rounded-2xl bg-[#2B173C] border border-transparent shadow-[0_6px_20px_-2px_rgba(18,9,31,0.55),inset_0_1px_1px_rgba(247,240,255,0.05)]">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#453052]/20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#24133B] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)] flex items-center justify-center text-[#E7B743] shrink-0">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-serif-luxury font-bold text-[#F7F0FF]">
              Janma Kundli Alignment
            </h4>
            <div className="flex items-center gap-1.5 text-[10px] text-[#9685AE]">
              <span>{kundli.name}</span>
              <span>·</span>
              <span>{kundli.gotra} Gotra</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#24133B] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)] text-[10px] text-[#E7B743]">
          <ShieldCheck className="w-3 h-3" />
          <span>Vedic Cast</span>
        </div>
      </div>

      {/* 2x2 Grid of Key Planetary Placements */}
      <div className="grid grid-cols-2 gap-1.5 my-2.5">
        <div className="p-2 rounded-xl bg-[#12091F] border border-transparent shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
          <span className="text-[9px] text-[#9685AE] block">Lagna (Ascendant)</span>
          <span className="text-xs font-bold text-[#F7F0FF]">{kundli.lagna}</span>
        </div>
        <div className="p-2 rounded-xl bg-[#12091F] border border-transparent shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
          <span className="text-[9px] text-[#9685AE] block">Chandra (Moon Sign)</span>
          <span className="text-xs font-bold text-[#F7F0FF]">{kundli.moonSign}</span>
        </div>
        <div className="p-2 rounded-xl bg-[#12091F] border border-transparent shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
          <span className="text-[9px] text-[#9685AE] block">Nakshatra</span>
          <span className="text-xs font-bold text-[#F7F0FF] truncate block">{kundli.nakshatra} (P{kundli.pada})</span>
        </div>
        <div className="p-2 rounded-xl bg-[#12091F] border border-transparent shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
          <span className="text-[9px] text-[#E7B743] block">Current Dasha</span>
          <span className="text-xs font-bold text-[#FFD76A]">{kundli.currentMahadasha}-{kundli.currentAntardasha}</span>
        </div>
      </div>

      {/* Observation */}
      <div className="p-2.5 rounded-xl bg-[#24133B] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)] text-[11px] text-[#C5B8D9] leading-relaxed">
        <div className="flex items-start gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-[#E7B743] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#FFD76A]">{kundli.activeDosha}: </span>
            <span className="text-[#C5B8D9]">{kundli.keyObservation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
