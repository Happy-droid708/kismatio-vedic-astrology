import React from 'react';
import { KundliData } from '../../types/astrology';
import { Compass, ShieldCheck, AlertCircle } from 'lucide-react';

interface KundliWidgetProps {
  kundli: KundliData;
}

export const KundliWidget: React.FC<KundliWidgetProps> = ({ kundli }) => {
  return (
    <div className="my-2.5 p-3.5 sm:p-4 rounded-2xl bg-[#141724]/95 border border-[#dfb76c]/30 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#252a3d]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#dfb76c]/15 border border-[#dfb76c]/30 flex items-center justify-center text-[#dfb76c] shrink-0">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-serif-luxury font-bold text-[#f5eedf]">
              Janma Kundli Alignment
            </h4>
            <div className="flex items-center gap-1.5 text-[10px] text-[#a69e90]">
              <span>{kundli.name}</span>
              <span>·</span>
              <span>{kundli.gotra} Gotra</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#1f2438] border border-[#353d5c] text-[10px] text-[#dfb76c]">
          <ShieldCheck className="w-3 h-3" />
          <span>Vedic Cast</span>
        </div>
      </div>

      {/* 2x2 Grid of Key Planetary Placements */}
      <div className="grid grid-cols-2 gap-1.5 my-2.5">
        <div className="p-2 rounded-lg bg-[#0e1017] border border-[#232738]">
          <span className="text-[9px] text-[#8e8779] block">Lagna (Ascendant)</span>
          <span className="text-xs font-bold text-[#ede8dc]">{kundli.lagna}</span>
        </div>
        <div className="p-2 rounded-lg bg-[#0e1017] border border-[#232738]">
          <span className="text-[9px] text-[#8e8779] block">Chandra (Moon Sign)</span>
          <span className="text-xs font-bold text-[#ede8dc]">{kundli.moonSign}</span>
        </div>
        <div className="p-2 rounded-lg bg-[#0e1017] border border-[#232738]">
          <span className="text-[9px] text-[#8e8779] block">Nakshatra</span>
          <span className="text-xs font-bold text-[#ede8dc] truncate block">{kundli.nakshatra} (P{kundli.pada})</span>
        </div>
        <div className="p-2 rounded-lg bg-[#0e1017] border border-amber-900/40">
          <span className="text-[9px] text-amber-300/80 block">Current Dasha</span>
          <span className="text-xs font-bold text-amber-200">{kundli.currentMahadasha}-{kundli.currentAntardasha}</span>
        </div>
      </div>

      {/* Observation */}
      <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] text-[#d8cfbe] leading-relaxed">
        <div className="flex items-start gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-200">{kundli.activeDosha}: </span>
            <span className="text-[#bfb8aa]">{kundli.keyObservation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
