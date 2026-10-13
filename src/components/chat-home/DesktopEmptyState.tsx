import React from 'react';
import { Sparkles, Lock } from 'lucide-react';

interface DesktopEmptyStateProps {
  onStartNewChat: () => void;
}

export const DesktopEmptyState: React.FC<DesktopEmptyStateProps> = ({ onStartNewChat }) => {
  return (
    <div className="flex-1 h-full bg-[#0b0c13] flex flex-col items-center justify-center p-4 sm:p-8 text-center relative overflow-hidden select-none">
      {/* Background Sacred Geometric Aura */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#dfb76c_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />

      {/* Central Celestial Constellation Glyph: ✦ */}
      <div className="relative mb-4 sm:mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#996e28] via-[#dfb76c] to-[#fef08a] p-1 shadow-2xl animate-pulse">
          <div className="w-full h-full rounded-full bg-[#10121c] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-2 rounded-full border border-[#dfb76c]/20" />
            <div className="absolute inset-4 rounded-full border border-dashed border-[#dfb76c]/30 animate-spin [animation-duration:25s]" />
            <span className="text-3xl sm:text-4xl text-[#dfb76c] font-display font-bold">✦</span>
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#181d2e] border border-[#dfb76c]/40 text-[10px] font-mono font-bold text-[#dfb76c] flex items-center gap-1 shadow-md">
          <Sparkles className="w-2.5 h-2.5" />
          <span>Kismatio Sanctum</span>
        </div>
      </div>

      {/* Headline & Subtitle per prompt specification */}
      <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#f5eedf] max-w-md">
        Your astrology conversations
      </h2>
      <p className="text-xs sm:text-sm text-[#a8a192] mt-2 max-w-md leading-relaxed">
        Select an astrologer from your conversations or start a new consultation.
      </p>

      {/* Primary Action Button per prompt specification */}
      <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3">
        <button
          onClick={onStartNewChat}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#dfb76c] to-[#c49746] hover:from-[#f0c87d] hover:to-[#dfb76c] text-[#0e1017] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xl shadow-[#dfb76c]/20 cursor-pointer flex items-center gap-2"
        >
          <span className="text-base font-bold">✦</span>
          <span>Start a Conversation</span>
        </button>

        {/* Security / Lineage Guarantee */}
        <div className="flex items-center gap-2 text-[11px] text-[#787163] mt-4">
          <Lock className="w-3.5 h-3.5 text-[#dfb76c]" />
          <span>End-to-end encrypted Vedic Agamic consultations</span>
        </div>
      </div>
    </div>
  );
};
