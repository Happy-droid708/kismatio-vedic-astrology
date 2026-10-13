import React from 'react';
import { Clock, Zap } from 'lucide-react';
import { CelestialPill } from '../ui/CelestialPill';

interface LowTimeAlertProps {
  remainingSeconds: number;
  onOpenRecharge: () => void;
}

export const LowTimeAlert: React.FC<LowTimeAlertProps> = ({
  remainingSeconds,
  onOpenRecharge,
}) => {
  return (
    <div className="my-2.5 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-[#181b28] to-amber-950/60 border border-amber-500/50 text-amber-100 shadow-xl space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Consultation Time Expiring
              </span>
              <span className="px-1.5 py-0.2 rounded bg-amber-900/60 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-200">
                {remainingSeconds}s remaining
              </span>
            </div>
            <p className="text-[11px] text-[#ded6c7] line-clamp-1 truncate">
              Top up minutes to preserve Vedic revelations without disconnection
            </p>
          </div>
        </div>

        <button
          onClick={onOpenRecharge}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400 active:bg-amber-300 text-[#14120c] text-xs font-bold transition-all shadow-md cursor-pointer shrink-0 min-h-[36px]"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Top Up</span>
        </button>
      </div>

      {/* Quick Time Pills inside Low Time Alert */}
      <div className="flex items-center gap-2 pt-1 border-t border-amber-500/20 overflow-x-auto scrollbar-none">
        <span className="text-[10px] text-amber-300/80 font-medium shrink-0">Quick Recharge:</span>
        <CelestialPill
          variant="recharge"
          rechargeAmount="+5 min · ₹249"
          rechargeAddedText="✓ +5m Added"
          onSelectAction={onOpenRecharge}
          className="text-[11px] py-1 px-2.5 min-h-[30px]"
        >
          +5 min · ₹249
        </CelestialPill>
        <CelestialPill
          variant="recharge"
          rechargeAmount="+15 min · ₹599"
          rechargeAddedText="✓ +15m Added"
          onSelectAction={onOpenRecharge}
          className="text-[11px] py-1 px-2.5 min-h-[30px]"
        >
          +15 min · ₹599
        </CelestialPill>
        <CelestialPill
          variant="recharge"
          rechargeAmount="+30 min · ₹999"
          rechargeAddedText="✓ +30m Added"
          onSelectAction={onOpenRecharge}
          className="text-[11px] py-1 px-2.5 min-h-[30px]"
        >
          +30 min · ₹999
        </CelestialPill>
      </div>
    </div>
  );
};
