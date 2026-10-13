import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface MobileStatusBarProps {
  time?: string;
}

export const MobileStatusBar: React.FC<MobileStatusBarProps> = ({ time = '10:04' }) => {
  return (
    <div className="w-full px-6 pt-3 pb-2 flex items-center justify-between text-xs text-[#d8d2c4] select-none z-30">
      {/* Carrier Time */}
      <span className="font-semibold tracking-tight text-xs pl-1 text-[#ede8dc]">
        {time}
      </span>

      {/* Simulated Dynamic Island / Sensor Pill */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/5 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-amber-400/90 animate-pulse" />
        <span className="text-[10px] font-mono tracking-wider text-[#dfb76c] uppercase">
          Jyotish Peeth Live
        </span>
      </div>

      {/* Network / Battery status */}
      <div className="flex items-center gap-2 text-[#b0a99a] pr-1">
        <span className="text-[10px] font-bold tracking-wider font-mono">5G</span>
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono">98%</span>
          <div className="w-4 h-2.5 rounded-sm border border-[#a8a192] p-0.5 flex items-center">
            <div className="w-full h-full bg-[#dfb76c] rounded-xs" />
          </div>
        </div>
      </div>
    </div>
  );
};
