import React, { useState, useEffect } from 'react';
import {
  Clock,
  Zap,
  Check,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  CreditCard,
  Landmark,
  Wallet,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { MinutePack, DEFAULT_RECHARGE_CONFIG, RechargeConfig } from '../../config/rechargeConfig';

export type MinutesRechargeCardState =
  | 'CARD_COMPACT'
  | 'CARD_EXPANDED'
  | 'CHECKOUT'
  | 'PAYMENT_PROCESSING'
  | 'PAYMENT_SUCCESS'
  | 'CONFIRMED_SUMMARY';

interface EmbeddedMinutesRechargeCardProps {
  remainingSeconds: number;
  config?: RechargeConfig;
  onRechargeComplete: (addedMinutes: number, pack: MinutePack) => void;
  onContinueChat?: () => void;
  isTimerActive?: boolean;
}

export const EmbeddedMinutesRechargeCard: React.FC<EmbeddedMinutesRechargeCardProps> = ({
  remainingSeconds,
  config = DEFAULT_RECHARGE_CONFIG,
  onRechargeComplete,
  onContinueChat,
  isTimerActive = true,
}) => {
  const [cardState, setCardState] = useState<MinutesRechargeCardState>('CARD_COMPACT');
  const [selectedPackId, setSelectedPackId] = useState<string>('pack-30');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [newTotalMinutes, setNewTotalMinutes] = useState<number>(0);
  const [successAnimationStep, setSuccessAnimationStep] = useState<'star' | 'gem' | 'check'>('star');

  const packs = config.packs;
  const selectedPack = packs.find((p) => p.id === selectedPackId) || packs[1];

  // Derived balance metrics
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingSecsMod = remainingSeconds % 60;
  const isZeroBalance = remainingSeconds <= 0;
  const isCritical = remainingSeconds > 0 && remainingSeconds <= config.criticalBalanceThresholdMinutes * 60;
  const isLow = remainingSeconds > 0 && remainingSeconds <= config.lowBalanceThresholdMinutes * 60;

  // Format mm:ss smoothly without flashing
  const formattedMinutes = String(remainingMinutes).padStart(2, '0');
  const formattedSecs = String(remainingSecsMod).padStart(2, '0');

  // Handle Pay Recharge action (Section 12, 13, 14)
  const handlePayRecharge = () => {
    setCardState('PAYMENT_PROCESSING');

    // Simulate secure Razorpay gateway verification
    setTimeout(() => {
      const addedMinutes = selectedPack.minutes;
      const computedNewTotal = remainingMinutes + addedMinutes;
      setNewTotalMinutes(computedNewTotal);
      setCardState('PAYMENT_SUCCESS');

      // Subtle completion animation sequence: ✦ → 💎 → ✓ (Section 14: 300-500ms)
      setSuccessAnimationStep('star');
      setTimeout(() => {
        setSuccessAnimationStep('gem');
        setTimeout(() => {
          setSuccessAnimationStep('check');
        }, 160);
      }, 160);
    }, 1300);
  };

  // Continue chat action (Section 15)
  const handleContinue = () => {
    setCardState('CONFIRMED_SUMMARY');
    onRechargeComplete(selectedPack.minutes, selectedPack);
    if (onContinueChat) {
      onContinueChat();
    }
  };

  return (
    <div className="w-full my-2 rounded-2xl bg-gradient-to-b from-[#121422] via-[#0e101b] to-[#0a0c14] border border-[#dfb76c]/30 shadow-xl relative overflow-hidden transition-all duration-300 ease-out select-none">
      {/* Top subtle golden aura line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dfb76c]/80 to-transparent" />

      {/* =================================================================== */}
      {/* STATE 1: INITIAL COMPACT RECHARGE CARD (Section 3 & 4)              */}
      {/* Sized to ~25-30% of chat viewport height                            */}
      {/* =================================================================== */}
      {cardState === 'CARD_COMPACT' && (
        <div className="p-3 sm:p-4 flex flex-col justify-between h-[27vh] min-h-[185px] max-h-[240px] animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-[#1f2438]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span className="text-[11px] font-display font-semibold tracking-wide text-[#fcedc5]">
                {isZeroBalance
                  ? '✦ Consultation paused'
                  : isCritical
                  ? '✦ Almost out of consultation time'
                  : '✦ Consultation time'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-mono text-[#a8a192]">
              <Clock className="w-3 h-3 text-[#dfb76c]" />
              <span>{formattedMinutes}:{formattedSecs}</span>
            </div>
          </div>

          {/* Central Body: Celestial Low-Balance Minutes Display (Section 5 & 6) */}
          <div className="flex items-center justify-between gap-3 py-1">
            <div className="space-y-1 max-w-[62%] sm:max-w-[68%]">
              <p className="text-xs text-[#ede8dc] font-medium leading-snug">
                {isZeroBalance
                  ? 'Your minutes have ended. Recharge to continue this conversation.'
                  : isCritical
                  ? `You have about ${Math.max(1, Math.ceil(remainingSeconds / 60))} minute remaining. Recharge to keep the conversation going.`
                  : `You have ${Math.max(1, Math.ceil(remainingSeconds / 60))} minutes remaining. Continue your conversation without interruption.`}
              </p>
              <p className="text-[10px] text-[#8e8779] font-serif-luxury italic">
                Preserve uninterrupted Jyotish guidance with Acharya ji.
              </p>
            </div>

            {/* Prominent Celestial Minutes Counter with Orbiting Stars */}
            <div className="relative flex flex-col items-center justify-center p-2 rounded-xl bg-[#141726] border border-[#dfb76c]/30 min-w-[78px] shrink-0 shadow-inner">
              {/* Subtle celestial orbital ring */}
              <div className="absolute inset-0 rounded-xl border border-dashed border-[#dfb76c]/20 animate-spin [animation-duration:12s] pointer-events-none" />

              <span className="text-[9px] text-[#dfb76c] font-bold">✦</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-base sm:text-lg font-mono font-bold text-[#fcedc5] tabular-nums">
                  {formattedMinutes}
                </span>
                <span className="text-[10px] font-mono text-[#a8a192]">m</span>
              </div>
              <span className="text-[8px] uppercase tracking-wider text-[#dfb76c] font-medium">
                💎 Remaining
              </span>
            </div>
          </div>

          {/* Action Button: Expands in place (min 44px touch target) */}
          <div className="pt-1.5 border-t border-[#1f2438]">
            <button
              onClick={() => setCardState('CARD_EXPANDED')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#ca8a04] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-bold text-xs uppercase tracking-wide transition-all shadow-md shadow-[#dfb76c]/20 active:scale-95 cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>+ Recharge Minutes</span>
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STATE 2: EXPANDED RECHARGE OPTIONS (Section 7, 8, 9)                 */}
      {/* Sized to ~35-50% of chat viewport height                            */}
      {/* =================================================================== */}
      {cardState === 'CARD_EXPANDED' && (
        <div className="p-3.5 sm:p-4 flex flex-col justify-between h-[48vh] min-h-[340px] max-h-[440px] animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2438]">
            <button
              onClick={() => setCardState('CARD_COMPACT')}
              className="flex items-center gap-1 text-xs text-[#a8a192] hover:text-[#fcedc5] cursor-pointer min-h-[36px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <span className="text-xs font-display font-semibold text-[#fcedc5]">
              Recharge consultation time
            </span>

            <span className="text-[10px] text-[#dfb76c] font-mono px-2 py-0.5 rounded-full bg-[#dfb76c]/10 border border-[#dfb76c]/20">
              Instant
            </span>
          </div>

          {/* Selectable Minute Pack Cards Grid (Section 8 & 9) */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-2 grid grid-cols-2 gap-2">
            {packs.map((pack) => {
              const isSelected = selectedPackId === pack.id;
              return (
                <button
                  key={pack.id}
                  onClick={() => setSelectedPackId(pack.id)}
                  className={`flex flex-col justify-between p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer min-h-[88px] relative ${
                    isSelected
                      ? 'bg-[#181d2f] border-[#dfb76c] text-[#fcedc5] shadow-lg shadow-[#dfb76c]/15 scale-[1.01]'
                      : 'bg-[#121422] border-[#252a3d] text-[#a8a192] hover:border-[#dfb76c]/40'
                  }`}
                >
                  {/* Top row: Minutes & Checkmark / Tag */}
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-bold text-[#ede8dc] flex items-center gap-1">
                      <span>{pack.minutes} MIN</span>
                      {isSelected && <Check className="w-3 h-3 text-[#dfb76c]" />}
                    </span>
                    {pack.tag && (
                      <span className="text-[8px] font-bold text-[#dfb76c] px-1.5 py-0.2 rounded bg-[#dfb76c]/15 uppercase tracking-wider shrink-0">
                        {pack.tag}
                      </span>
                    )}
                  </div>

                  {/* Price & savings */}
                  <div className="mt-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-mono font-bold text-[#dfb76c]">
                        ₹{pack.price}
                      </span>
                      {pack.originalPrice && (
                        <span className="text-[10px] text-[#6b7280] line-through font-mono">
                          ₹{pack.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-[#8e8779] block">
                      ₹{pack.perMinuteRate}/min • {pack.savingsPercent ? `${pack.savingsPercent}% OFF` : 'Standard'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Payment CTA (Section 10) */}
          <div className="pt-2 border-t border-[#1f2438] flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-[#8e8779] block">Selected Pack:</span>
              <span className="text-xs font-bold text-[#fcedc5]">
                {selectedPack.minutes} Minutes · ₹{selectedPack.price}
              </span>
            </div>

            <button
              onClick={() => setCardState('CHECKOUT')}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#ca8a04] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-bold text-xs uppercase tracking-wide transition-all shadow-md shadow-[#dfb76c]/20 active:scale-95 cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <span>Recharge ₹{selectedPack.price}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STATE 3: IN-PLACE PAYMENT METHOD SELECTOR (Section 11 & 12)         */}
      {/* =================================================================== */}
      {cardState === 'CHECKOUT' && (
        <div className="p-3.5 sm:p-4 flex flex-col justify-between h-[48vh] min-h-[340px] max-h-[440px] animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1f2438]">
            <button
              onClick={() => setCardState('CARD_EXPANDED')}
              className="flex items-center gap-1 text-xs text-[#a8a192] hover:text-[#fcedc5] cursor-pointer min-h-[36px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <span className="text-xs font-display font-semibold text-[#fcedc5]">
              Secure Minutes Recharge
            </span>

            <div className="flex items-center gap-1 text-[10px] text-[#10b981]">
              <Lock className="w-3 h-3" />
              <span>Razorpay Verified</span>
            </div>
          </div>

          {/* Payment Methods Content */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none py-2 space-y-2">
            {/* Summary card */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#141724] border border-[#232940]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#dfb76c]/15 border border-[#dfb76c]/30 flex items-center justify-center text-[#dfb76c]">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#ede8dc]">
                    {selectedPack.minutes} Minutes Consultation
                  </h4>
                  <span className="text-[10px] text-[#8e8779]">
                    Added instantly upon payment
                  </span>
                </div>
              </div>
              <span className="text-sm font-mono font-bold text-[#dfb76c]">
                ₹{selectedPack.price}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-[#8e8779] font-semibold uppercase tracking-wider block">
                Payment Method
              </span>

              {[
                {
                  id: 'upi',
                  label: 'UPI (Google Pay, PhonePe, Paytm)',
                  icon: <Smartphone className="w-4 h-4 text-[#dfb76c]" />,
                  badge: 'Instant & Zero Fee',
                },
                {
                  id: 'card',
                  label: 'Credit / Debit Card (Visa, RuPay)',
                  icon: <CreditCard className="w-4 h-4 text-[#dfb76c]" />,
                },
                {
                  id: 'netbanking',
                  label: 'Net Banking (All Indian Banks)',
                  icon: <Landmark className="w-4 h-4 text-[#dfb76c]" />,
                },
                {
                  id: 'wallet',
                  label: 'Sanctum Balance Wallet',
                  icon: <Wallet className="w-4 h-4 text-[#dfb76c]" />,
                  badge: 'Bal: ₹12,000',
                },
              ].map((method) => {
                const isSelected = selectedPaymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id as any)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer min-h-[44px] ${
                      isSelected
                        ? 'bg-[#181d2f] border-[#dfb76c] text-[#fcedc5] shadow-xs'
                        : 'bg-[#121422] border-[#252a3d] text-[#a8a192] hover:border-[#dfb76c]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {method.icon}
                      <span className="text-xs font-medium">{method.label}</span>
                    </div>
                    {method.badge && (
                      <span className="text-[9px] text-[#10b981] px-1.5 py-0.5 rounded bg-[#10b981]/10 font-mono">
                        {method.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pay CTA */}
          <div className="pt-2 border-t border-[#1f2438]">
            <button
              onClick={handlePayRecharge}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#ca8a04] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-bold text-xs uppercase tracking-wide transition-all active:scale-95 shadow-md shadow-[#dfb76c]/20 cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Pay ₹{selectedPack.price}</span>
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STATE 4: PAYMENT PROCESSING (Section 13)                            */}
      {/* =================================================================== */}
      {cardState === 'PAYMENT_PROCESSING' && (
        <div className="p-6 flex flex-col items-center justify-center text-center h-[48vh] min-h-[340px] max-h-[440px] animate-in fade-in duration-200">
          <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#dfb76c] animate-spin [animation-duration:3s]" />
            <div className="w-9 h-9 rounded-full bg-[#181d2f] border border-[#dfb76c]/60 flex items-center justify-center text-[#dfb76c] text-sm animate-pulse">
              ✦
            </div>
          </div>

          <h3 className="font-display font-bold text-sm text-[#fcedc5] tracking-wide">
            ✦ Processing payment...
          </h3>
          <p className="text-xs text-[#a8a192] max-w-xs mt-1">
            Authorizing ₹{selectedPack.price} via secure banking gateway...
          </p>
        </div>
      )}

      {/* =================================================================== */}
      {/* STATE 5: PAYMENT SUCCESS (Section 14 & 15)                          */}
      {/* =================================================================== */}
      {cardState === 'PAYMENT_SUCCESS' && (
        <div className="p-4 sm:p-5 flex flex-col items-center justify-between text-center h-[48vh] min-h-[340px] max-h-[440px] animate-in fade-in zoom-in-95 duration-300">
          <div className="flex-1 flex flex-col items-center justify-center space-y-3 w-full max-w-sm">
            {/* Celestial morph completion animation: ✦ → 💎 → ✓ */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 flex items-center justify-center shadow-lg shadow-[#dfb76c]/20">
                <div className="w-full h-full rounded-full bg-[#0d0f18] flex items-center justify-center text-[#dfb76c] text-xl font-bold transition-all duration-300">
                  {successAnimationStep === 'star' && <span>✦</span>}
                  {successAnimationStep === 'gem' && <span>💎</span>}
                  {successAnimationStep === 'check' && (
                    <CheckCircle2 className="w-8 h-8 text-[#dfb76c] animate-in zoom-in duration-200" />
                  )}
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-[#dfb76c] absolute -top-1 -right-1 animate-pulse" />
            </div>

            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#fcedc5]">
                Minutes Added
              </h3>
              <p className="text-sm font-bold text-[#dfb76c] mt-0.5">
                +{selectedPack.minutes} minutes
              </p>
              <p className="text-xs font-mono text-[#8e8779] mt-0.5">
                New balance: {newTotalMinutes} min
              </p>
            </div>

            <div className="w-full p-2.5 rounded-xl bg-[#121524] border border-[#232940] text-left text-xs space-y-1">
              <div className="flex items-center gap-2 text-[#10b981]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Payment verified via {selectedPaymentMethod.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2 text-[#fcedc5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb76c] shrink-0" />
                <span>Consultation session extended seamlessly</span>
              </div>
            </div>
          </div>

          {/* Continue Chat Action (Section 15) */}
          <div className="w-full pt-3 border-t border-[#1f2438]">
            <button
              onClick={handleContinue}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#ca8a04] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-bold text-xs uppercase tracking-wide transition-all active:scale-95 shadow-md shadow-[#dfb76c]/20 cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <span>Continue Chat</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* STATE 6: COLLAPSED SUMMARY (Section 15)                             */}
      {/* After user clicks Continue Chat                                     */}
      {/* =================================================================== */}
      {cardState === 'CONFIRMED_SUMMARY' && (
        <div className="p-3 flex items-center justify-between gap-2 text-xs bg-[#101322] border-t border-[#dfb76c]/20 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
            <span className="text-[#ede8dc] font-medium">
              ✓ {selectedPack.minutes} minutes added to consultation
            </span>
          </div>

          <button
            onClick={() => setCardState('CARD_EXPANDED')}
            className="text-[11px] text-[#dfb76c] hover:underline cursor-pointer"
          >
            + Add more
          </button>
        </div>
      )}
    </div>
  );
};
