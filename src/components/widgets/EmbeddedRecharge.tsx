import React, { useState } from 'react';
import { RECHARGE_PACKS } from '../../data/astrologyData';
import { RechargePack } from '../../types/astrology';
import { Clock, Zap, Check, Lock, Sparkles } from 'lucide-react';
import { CelestialPill } from '../ui/CelestialPill';

interface EmbeddedRechargeProps {
  onRechargeComplete: (addedMinutes: number, pack: RechargePack) => void;
  onDismiss: () => void;
}

export const EmbeddedRecharge: React.FC<EmbeddedRechargeProps> = ({
  onRechargeComplete,
  onDismiss,
}) => {
  const [selectedPackId, setSelectedPackId] = useState('pack-15');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeRechargePill, setActiveRechargePill] = useState<string | null>(null);

  const selectedPack = RECHARGE_PACKS.find((p) => p.id === selectedPackId) || RECHARGE_PACKS[1];

  const handleQuickPillRecharge = (pack: RechargePack) => {
    setActiveRechargePill(pack.id);
    setSelectedPackId(pack.id);
    setTimeout(() => {
      onRechargeComplete(pack.minutes, pack);
      setActiveRechargePill(null);
    }, 1100);
  };

  const handlePayRecharge = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onRechargeComplete(selectedPack.minutes, selectedPack);
    }, 1100);
  };

  return (
    <div className="my-2.5 p-3.5 sm:p-5 rounded-2xl bg-[#141724] border border-[#dfb76c]/40 shadow-2xl relative">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#252b3e]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#dfb76c]/15 border border-[#dfb76c]/30 flex items-center justify-center text-[#dfb76c]">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#dfb76c] font-bold block">
              1-Tap Minute Top-Up
            </span>
            <h4 className="text-xs sm:text-sm font-serif-luxury font-bold text-[#f5eedf]">
              Extend Astrological Consultation
            </h4>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-xs text-[#8e8779] active:text-[#ede8dc] cursor-pointer"
        >
          Dismiss
        </button>
      </div>

      {/* Section 11: Celestial Quick Recharge Pills */}
      <div className="my-3 pb-2 border-b border-[#222739] overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-[10px] text-[#8e8779] font-medium flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3 text-[#dfb76c]" />
            <span>Instant Top-Up Pills:</span>
          </span>
          {RECHARGE_PACKS.map((pack) => (
            <CelestialPill
              key={pack.id}
              variant="recharge"
              rechargeAmount={`+${pack.minutes} min · ₹${pack.price}`}
              rechargeAddedText={`✓ +${pack.minutes}m Added`}
              onSelectAction={() => handleQuickPillRecharge(pack)}
              className="text-xs py-1.5 px-3 min-h-[34px]"
            >
              +{pack.minutes} min · ₹{pack.price}
            </CelestialPill>
          ))}
        </div>
      </div>

      {/* Packs Selection */}
      <div className="space-y-2 my-3">
        {RECHARGE_PACKS.map((pack) => {
          const isSelected = selectedPackId === pack.id;
          return (
            <button
              key={pack.id}
              onClick={() => setSelectedPackId(pack.id)}
              className={`w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between min-h-[50px] relative ${
                isSelected
                  ? 'bg-[#212638] border-[#dfb76c] text-[#fbf6ea] shadow-md ring-1 ring-[#dfb76c]/40'
                  : 'bg-[#0f111a] border-[#222739] text-[#938c7f] active:border-[#353d5a]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-[#dfb76c] bg-[#dfb76c]' : 'border-[#4e546e]'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 text-[#0e1017] stroke-[3]" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-[#ede8dc]">{pack.minutes} Minutes</span>
                    {pack.tag && (
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#dfb76c] text-[#0e1017] uppercase tracking-wider">
                        {pack.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#857e70] block">₹{pack.perMinuteRate}/min Vedic Rate</span>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-base font-serif-luxury font-bold text-[#dfb76c] font-mono tabular-nums">
                    ₹{pack.price}
                  </span>
                  <span className="text-[10px] text-[#716a5d] line-through tabular-nums">
                    ₹{pack.originalPrice}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="pt-2.5 border-t border-[#252b3e] space-y-2">
        <button
          onClick={handlePayRecharge}
          disabled={isProcessing}
          className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#dfb76c] active:bg-[#c49746] disabled:opacity-60 text-[#0e1017] text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
        >
          {isProcessing ? (
            <span>Crediting {selectedPack.minutes} mins to session...</span>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Instant UPI Top-Up ₹{selectedPack.price}</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8e8779]">
          <Lock className="w-3 h-3 text-[#dfb76c]" />
          <span>Instant auto-balance reflection in ongoing chat</span>
        </div>
      </div>
    </div>
  );
};
