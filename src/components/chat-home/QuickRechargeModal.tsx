import React from 'react';
import { Clock, Sparkles, Check, X, ShieldCheck, Zap } from 'lucide-react';
import { RechargePack } from '../../types/astrology';

interface QuickRechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPack: (pack: RechargePack) => void;
  astrologerName: string;
  currentRemainingSeconds: number;
  isMobile?: boolean;
}

export const RECHARGE_PACKS: RechargePack[] = [
  {
    id: 'pack-5',
    minutes: 5,
    price: 249,
    originalPrice: 325,
    perMinuteRate: 49.8,
  },
  {
    id: 'pack-15',
    minutes: 15,
    price: 599,
    originalPrice: 975,
    tag: 'MOST POPULAR',
    perMinuteRate: 39.9,
  },
  {
    id: 'pack-30',
    minutes: 30,
    price: 999,
    originalPrice: 1950,
    tag: 'SAVE 48%',
    perMinuteRate: 33.3,
  },
];

export const QuickRechargeModal: React.FC<QuickRechargeModalProps> = ({
  isOpen,
  onClose,
  onSelectPack,
  astrologerName,
  currentRemainingSeconds,
  isMobile = false,
}) => {
  if (!isOpen) return null;

  const mins = Math.floor(currentRemainingSeconds / 60);
  const secs = currentRemainingSeconds % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal / Bottom Sheet */}
      <div
        className={`fixed z-50 bg-[#121420] border border-[#dfb76c]/40 shadow-2xl overflow-y-auto ${
          isMobile
            ? 'inset-x-0 bottom-0 rounded-t-3xl max-h-[85dvh] pb-[max(1rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-200'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[90dvh] rounded-2xl animate-in zoom-in-95 duration-150'
        }`}
      >
        {/* Mobile Swipe / Drag indicator */}
        {isMobile && (
          <div className="w-full pt-3 pb-1 flex justify-center">
            <div className="w-12 h-1.5 rounded-full bg-[#373e56]" />
          </div>
        )}

        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-[#222739] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-[#dfb76c] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-serif-luxury font-bold text-[#f5eedf]">
                Recharge Consultation Time
              </h3>
              <p className="text-[11px] text-[#9d9688]">
                Preserve uninterrupted conversation with {astrologerName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8e8779] hover:text-[#ede8dc] hover:bg-[#1a1d2d] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Balance Banner */}
        <div className="px-5 py-2.5 bg-[#0a0b12] border-b border-[#1c2030] flex items-center justify-between">
          <span className="text-xs text-[#9d9688]">Current Session Timer:</span>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#181a28] border border-[#dfb76c]/30 text-xs font-mono font-bold text-[#dfb76c]">
            <Clock className="w-3 h-3 text-[#dfb76c]" />
            <span>{timeFormatted}</span>
          </div>
        </div>

        {/* Packs Selection */}
        <div className="p-4 sm:p-5 space-y-2.5">
          {RECHARGE_PACKS.map((pack) => {
            const isHighlight = pack.tag === 'MOST POPULAR';
            return (
              <div
                key={pack.id}
                onClick={() => onSelectPack(pack)}
                className={`group relative p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between min-h-[52px] ${
                  isHighlight
                    ? 'bg-gradient-to-r from-[#1c1f2e] via-[#1a1f33] to-[#171b2c] border-[#dfb76c] shadow-lg shadow-[#dfb76c]/10'
                    : 'bg-[#10121c] border-[#252b3e] hover:border-[#dfb76c]/60'
                }`}
              >
                {pack.tag && (
                  <span className="absolute -top-2 right-4 px-2 py-0.5 rounded-full bg-[#dfb76c] text-[#0e1017] text-[9px] font-bold tracking-wider uppercase shadow-sm">
                    {pack.tag}
                  </span>
                )}

                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-[#161826] border border-[#2b3145] flex items-center justify-center font-bold text-sm text-[#f5eedf] group-hover:text-[#dfb76c] shrink-0">
                    +{pack.minutes}m
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#ede8dc] truncate">
                      {pack.minutes} Minutes Consultation
                    </h4>
                    <span className="text-[10px] text-[#8e8779] block truncate">
                      ₹{pack.perMinuteRate.toFixed(1)}/min · Instant activation
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[10px] text-[#6b6455] line-through">
                      ₹{pack.originalPrice}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#dfb76c] font-mono">
                      ₹{pack.price}
                    </span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-medium block">
                    1-Tap Top-Up
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Guarantee */}
        <div className="px-5 py-3 bg-[#0a0b12] border-t border-[#1c2030] flex items-center justify-between text-[11px] text-[#787163]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#dfb76c]" />
            <span>Unused minutes carry forward indefinitely</span>
          </div>
          <span className="text-[#a49d8f] font-medium">100% Encrypted</span>
        </div>
      </div>
    </>
  );
};
