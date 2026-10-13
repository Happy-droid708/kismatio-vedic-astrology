import React from 'react';
import { ChatState } from '../types/astrology';
import { Play, SkipForward, ChevronDown, Sparkles } from 'lucide-react';
import { STATE_FLOW } from './MobileStateDrawer';
import { CelestialPill } from './ui/CelestialPill';

interface MobileStateFloatingPillProps {
  currentState: ChatState;
  onOpenDrawer: () => void;
  onTriggerNext: () => void;
  isAutoAdvancing: boolean;
  onToggleAutoAdvance: () => void;
}

export const MobileStateFloatingPill: React.FC<MobileStateFloatingPillProps> = ({
  currentState,
  onOpenDrawer,
  onTriggerNext,
  isAutoAdvancing,
  onToggleAutoAdvance,
}) => {
  const currentIndex = STATE_FLOW.findIndex((s) => s.state === currentState);

  return (
    <div className="px-3 py-1.5 bg-[#0e1017]/95 border-b border-[#dfb76c]/15 backdrop-blur-md flex items-center justify-between gap-2 z-20 select-none">
      {/* Current State Indicator Celestial Pill */}
      <CelestialPill
        variant="default"
        isSelected={true}
        onClick={onOpenDrawer}
        className="text-xs px-2.5 py-1 min-h-[32px] border-[#dfb76c]/40"
        title="Tap to view all 14 state transitions"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-ping shrink-0" />
        <span className="font-mono text-[10px] text-[#dfb76c] font-bold shrink-0">
          {currentIndex + 1}/14
        </span>
        <span className="font-semibold text-[11px] truncate max-w-[85px] xs:max-w-[115px] sm:max-w-[160px]">
          {currentState}
        </span>
        <ChevronDown className="w-3 h-3 text-[#9a9385] shrink-0" />
      </CelestialPill>

      {/* Quick Step Buttons */}
      <div className="flex items-center gap-1.5">
        <CelestialPill
          variant="default"
          isSelected={isAutoAdvancing}
          onClick={onToggleAutoAdvance}
          className="text-[11px] px-2.5 py-1 min-h-[32px]"
          title="Toggle Auto advance"
        >
          <Play className={`w-2.5 h-2.5 ${isAutoAdvancing ? 'fill-[#dfb76c] text-[#dfb76c]' : ''}`} />
          <span className="hidden xs:inline">{isAutoAdvancing ? 'Auto' : 'Play'}</span>
        </CelestialPill>

        <CelestialPill
          variant="recharge"
          rechargeAmount="Next Step"
          rechargeAddedText="✓ Next"
          onSelectAction={onTriggerNext}
          className="text-[11px] px-3 py-1 min-h-[32px] font-bold text-[#fcedc5]"
          title="Advance to next step"
        >
          <span className="flex items-center gap-1">
            <span>Next</span>
            <SkipForward className="w-3 h-3" />
          </span>
        </CelestialPill>
      </div>
    </div>
  );
};
