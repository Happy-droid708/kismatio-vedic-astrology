import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PaymentSuccessCardProps {
  paymentId: string;
  paymentMethod: string;
  amount: number;
  onContinue: () => void;
}

export const PaymentSuccessCard: React.FC<PaymentSuccessCardProps> = ({
  paymentId,
  paymentMethod,
  amount,
  onContinue,
}) => {
  return (
    <div className="my-2.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#15231c] to-[#0f1713] border border-emerald-500/40 shadow-xl relative overflow-hidden">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
          <Check className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div className="flex-1">
          <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
            Payment Verified · Consecration Authorized
          </span>
          <h4 className="text-sm sm:text-base font-serif-luxury font-bold text-[#f5eedf]">
            ₹{amount.toLocaleString('en-IN')} Received
          </h4>
          <p className="text-[10px] text-[#9eb3a6] mt-0.5 truncate">
            Ref: <span className="font-mono text-emerald-300">{paymentId}</span> · {paymentMethod}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-emerald-900/40 flex items-center justify-between">
        <span className="text-[10px] text-[#a5b8ad]">Vedic Gotra Sankalp registered.</span>
        <button
          onClick={onContinue}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 active:bg-emerald-400 text-[#09140e] text-[11px] font-bold transition-all cursor-pointer min-h-[36px]"
        >
          <span>View Order Voucher</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
