import React, { useState, useEffect } from 'react';
import { ShieldCheck, Smartphone, CreditCard, Building2, Lock, Loader2, CheckCircle2, Zap } from 'lucide-react';

interface EmbeddedPaymentProps {
  amount: number;
  onPaymentSuccess: (paymentId: string, paymentMethod: string) => void;
  onCancel: () => void;
  isProcessing: boolean;
  onStartProcessing: () => void;
}

export const EmbeddedPayment: React.FC<EmbeddedPaymentProps> = ({
  amount,
  onPaymentSuccess,
  onCancel,
  isProcessing,
  onStartProcessing,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'cred' | 'manual'>('gpay');
  const [upiId, setUpiId] = useState('devanand@okhdfcbank');
  const [processingStage, setProcessingStage] = useState(0);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;

    if (isProcessing) {
      setProcessingStage(1);
      timer1 = setTimeout(() => {
        setProcessingStage(2);
      }, 1200);

      timer2 = setTimeout(() => {
        setProcessingStage(3);
      }, 2400);

      timer3 = setTimeout(() => {
        const generatedId = `PAY-VEDA-${Math.floor(100000 + Math.random() * 900000)}`;
        const appLabel = selectedUpiApp === 'manual' ? 'UPI' : selectedUpiApp.toUpperCase();
        onPaymentSuccess(generatedId, paymentMethod === 'upi' ? `UPI (${appLabel})` : paymentMethod.toUpperCase());
      }, 3400);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isProcessing, onPaymentSuccess, paymentMethod, selectedUpiApp]);

  if (isProcessing) {
    return (
      <div className="my-2.5 p-4 sm:p-5 rounded-2xl bg-[#141724] border border-[#dfb76c]/40 shadow-2xl text-center space-y-4">
        {/* Animated Sacred Mandala Spinner */}
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#dfb76c]/20 animate-ping" />
          <div className="w-14 h-14 rounded-full border-2 border-transparent border-t-[#dfb76c] border-r-[#dfb76c] animate-spin" />
          <div className="w-8 h-8 rounded-full bg-[#dfb76c]/20 border border-[#dfb76c]/40 flex items-center justify-center text-[#dfb76c]">
            <Lock className="w-3.5 h-3.5 animate-pulse" />
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#dfb76c] font-bold block">
            State: PAYMENT_PROCESSING
          </span>
          <h4 className="text-sm sm:text-base font-serif-luxury font-bold text-[#fcedc5] mt-1">
            Authorising Sacred Consecration Payment
          </h4>
          <p className="text-xs text-[#a39c8d] mt-0.5">
            Amount: <span className="font-mono text-[#dfb76c] font-semibold">₹{amount.toLocaleString('en-IN')}</span>
          </p>
        </div>

        {/* Steps */}
        <div className="w-full text-left text-[11px] space-y-2 pt-1 bg-[#0b0c13] p-3 rounded-xl border border-[#202538]">
          <div className="flex items-center gap-2 text-[#cfc8ba]">
            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${processingStage >= 1 ? 'text-emerald-400' : 'text-[#4e546e]'}`} />
            <span>Establishing 256-bit encrypted banking bridge...</span>
          </div>
          <div className="flex items-center gap-2 text-[#cfc8ba]">
            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${processingStage >= 2 ? 'text-emerald-400' : 'text-[#4e546e]'}`} />
            <span>Authorising transaction via NPCI / Indian Clearing...</span>
          </div>
          <div className="flex items-center gap-2 text-[#cfc8ba]">
            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${processingStage >= 3 ? 'text-emerald-400' : 'text-[#4e546e]'}`} />
            <span>Recording Gotra Sankalp token at Kashi Vishwanath...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-2.5 p-3.5 sm:p-5 rounded-2xl bg-[#141724] border border-[#dfb76c]/40 shadow-2xl">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#252a3d]">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#dfb76c] font-bold block">
            Embedded Mobile Payment
          </span>
          <h4 className="text-xs sm:text-sm font-serif-luxury font-bold text-[#f5eedf]">
            Select Payment Method
          </h4>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-[#8e8779] block">Total Amount</span>
          <span className="text-base font-serif-luxury font-bold text-[#dfb76c] font-mono tabular-nums">
            ₹{amount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Payment Category Tabs */}
      <div className="grid grid-cols-3 gap-1.5 my-3">
        <button
          onClick={() => setPaymentMethod('upi')}
          className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl border text-[10px] sm:text-[11px] transition-all cursor-pointer min-h-[44px] ${
            paymentMethod === 'upi'
              ? 'bg-[#212638] border-[#dfb76c] text-[#fbf6ea] ring-1 ring-[#dfb76c]/40'
              : 'bg-[#10121c] border-[#222739] text-[#938c7f]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 mb-0.5 text-[#dfb76c] shrink-0" />
          <span className="font-semibold truncate">UPI Apps</span>
        </button>

        <button
          onClick={() => setPaymentMethod('card')}
          className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl border text-[10px] sm:text-[11px] transition-all cursor-pointer min-h-[44px] ${
            paymentMethod === 'card'
              ? 'bg-[#212638] border-[#dfb76c] text-[#fbf6ea] ring-1 ring-[#dfb76c]/40'
              : 'bg-[#10121c] border-[#222739] text-[#938c7f]'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 mb-0.5 text-[#dfb76c] shrink-0" />
          <span className="font-semibold truncate">Card</span>
        </button>

        <button
          onClick={() => setPaymentMethod('netbanking')}
          className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl border text-[10px] sm:text-[11px] transition-all cursor-pointer min-h-[44px] ${
            paymentMethod === 'netbanking'
              ? 'bg-[#212638] border-[#dfb76c] text-[#fbf6ea] ring-1 ring-[#dfb76c]/40'
              : 'bg-[#10121c] border-[#222739] text-[#938c7f]'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 mb-0.5 text-[#dfb76c] shrink-0" />
          <span className="font-semibold truncate">NetBanking</span>
        </button>
      </div>

      {/* UPI Mobile 1-Tap App Selector */}
      {paymentMethod === 'upi' && (
        <div className="space-y-2.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-[#a8a192] block">
            Instant 1-Tap Mobile UPI
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'gpay', label: 'Google Pay', sub: 'Fast 1-Tap' },
              { id: 'phonepe', label: 'PhonePe', sub: 'UPI Linked' },
              { id: 'paytm', label: 'Paytm UPI', sub: 'Bank Verified' },
              { id: 'cred', label: 'CRED Pay', sub: 'Rewards Active' },
            ].map((app) => {
              const isSelected = selectedUpiApp === app.id;
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setSelectedUpiApp(app.id as any)}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between cursor-pointer min-h-[44px] transition-all gap-1.5 ${
                    isSelected
                      ? 'bg-[#22283a] border-[#dfb76c] text-[#f5eedf] shadow-sm'
                      : 'bg-[#0f111a] border-[#202538] text-[#8e8779]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs font-semibold block text-[#ede8dc] truncate">{app.label}</span>
                    <span className="text-[8.5px] sm:text-[9px] text-[#7d776a] block leading-none truncate">{app.sub}</span>
                  </div>
                  {isSelected && <Zap className="w-3.5 h-3.5 text-[#dfb76c] fill-current shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Or enter custom UPI ID */}
          <div className="p-2.5 rounded-xl bg-[#0b0c13] border border-[#202538] space-y-1.5 mt-2">
            <span className="text-[10px] text-[#cdc7ba] block">Or enter any UPI ID:</span>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#141624] border border-[#292f44] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c] min-h-[36px]"
                placeholder="mobile@upi"
              />
              <button
                type="button"
                onClick={() => setSelectedUpiApp('manual')}
                className="px-2.5 py-1 rounded-lg bg-[#1f2436] border border-[#333b54] text-[10px] text-[#dfb76c] min-h-[36px]"
              >
                Use
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card Tab */}
      {paymentMethod === 'card' && (
        <div className="p-3 rounded-xl bg-[#0b0c13] border border-[#202538] space-y-2 text-xs">
          <div>
            <label className="text-[10px] text-[#827a6c] block">Card Number</label>
            <input
              type="text"
              defaultValue="•••• •••• •••• 4829"
              className="w-full px-2.5 py-1.5 rounded-lg bg-[#151825] border border-[#2c3349] text-xs text-[#ede8dc] min-h-[36px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-[#827a6c] block">Expiry</label>
              <input
                type="text"
                defaultValue="08/29"
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#151825] border border-[#2c3349] text-xs text-[#ede8dc] min-h-[36px]"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#827a6c] block">CVV</label>
              <input
                type="password"
                defaultValue="842"
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#151825] border border-[#2c3349] text-xs text-[#ede8dc] min-h-[36px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* NetBanking Tab */}
      {paymentMethod === 'netbanking' && (
        <div className="p-2.5 rounded-xl bg-[#0b0c13] border border-[#202538] grid grid-cols-2 gap-2 text-xs">
          <button type="button" className="p-2 rounded-lg bg-[#1a1f30] border border-[#dfb76c]/40 text-left text-xs font-semibold text-[#f5eedf]">
            HDFC Bank
          </button>
          <button type="button" className="p-2 rounded-lg bg-[#121522] border border-[#242a3e] text-left text-xs text-[#9d9688]">
            ICICI Bank
          </button>
          <button type="button" className="p-2 rounded-lg bg-[#121522] border border-[#242a3e] text-left text-xs text-[#9d9688]">
            State Bank of India
          </button>
          <button type="button" className="p-2 rounded-lg bg-[#121522] border border-[#242a3e] text-left text-xs text-[#9d9688]">
            Axis Bank
          </button>
        </div>
      )}

      {/* Bottom Button Bar */}
      <div className="mt-4 pt-2.5 border-t border-[#252a3d] space-y-2">
        <button
          onClick={onStartProcessing}
          className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#dfb76c] active:bg-[#c49746] text-[#0e1017] text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Authorise & Pay ₹{amount.toLocaleString('en-IN')}</span>
        </button>

        <button
          onClick={onCancel}
          className="w-full py-1.5 text-center text-[11px] text-[#8e8779] active:text-[#ede8dc] cursor-pointer"
        >
          Cancel and return to gemstone
        </button>
      </div>
    </div>
  );
};
