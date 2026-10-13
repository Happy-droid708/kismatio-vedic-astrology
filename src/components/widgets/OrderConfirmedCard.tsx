import React from 'react';
import { OrderDetails } from '../../types/astrology';
import { Calendar, MapPin, Truck, ChevronRight, Sparkles, Check, CheckCircle2 } from 'lucide-react';

interface OrderConfirmedCardProps {
  order: OrderDetails;
  onContinueChat: () => void;
  onViewTracking: () => void;
}

export const OrderConfirmedCard: React.FC<OrderConfirmedCardProps> = ({
  order,
  onContinueChat,
  onViewTracking,
}) => {
  return (
    <div className="my-2.5 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-b from-[#161928] via-[#141624] to-[#0f111c] border border-[#dfb76c]/40 shadow-2xl relative overflow-hidden">
      {/* Top Gold Ribbon Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c49746] via-[#dfb76c] to-[#996e28]" />

      {/* ======================================================== */}
      {/* Desktop / Tablet Horizontal Layout (>= sm: 640px)        */}
      {/* ======================================================== */}
      <div className="hidden sm:block">
        {/* Header row: Gemstone + Status */}
        <div className="flex items-center justify-between pb-3 border-b border-[#252b3e]">
          <div className="flex items-center gap-2">
            <span className="text-xl">💎</span>
            <div>
              <h4 className="text-base font-serif-luxury font-bold text-[#fcedc5]">
                {order.gemstone.name}
              </h4>
              <p className="text-xs text-[#a8a192]">
                {order.gemstone.weightRatti} Ratti ({order.gemstone.weightCarat} Carat) · Certified Natural
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>✓ Confirmed</span>
          </div>
        </div>

        {/* Order ID & Price Row */}
        <div className="flex items-center justify-between py-3">
          <div>
            <span className="text-[10px] text-[#787163] uppercase tracking-wider block">Sacred Order Reference</span>
            <span className="font-mono text-xs font-semibold text-[#cdc7ba]">
              Order #{order.orderId}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#787163] uppercase tracking-wider block">Consecrated Value</span>
            <span className="text-base font-mono font-bold text-[#dfb76c]">
              ₹{order.pricing.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Step Progression Bar: ✓ Confirmed → ✓ Packed → 🚚 Shipped */}
        <div className="p-3 rounded-xl bg-[#0b0c13] border border-[#202538] my-2">
          <div className="flex items-center justify-between text-xs text-[#cdc7ba]">
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Confirmed</span>
            </div>
            <span className="text-[#3b415a]">──&gt;</span>
            <div className="flex items-center gap-1 text-amber-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span>Pooja &amp; Consecration</span>
            </div>
            <span className="text-[#3b415a]">──&gt;</span>
            <div className="flex items-center gap-1 text-[#8e8779]">
              <Truck className="w-3.5 h-3.5" />
              <span>Shipped</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={onContinueChat}
            className="text-xs text-[#a8a192] hover:text-[#ede8dc] cursor-pointer flex items-center gap-1"
          >
            <span>Continue Consultation</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onViewTracking}
            className="min-h-[40px] px-5 py-2 rounded-xl bg-[#dfb76c] hover:bg-[#c49746] text-[#0e1017] text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* Mobile Vertical Layout (< sm: 640px)                     */}
      {/* ======================================================== */}
      <div className="sm:hidden space-y-2.5">
        <div className="flex items-center justify-between pb-2 border-b border-[#252b3e]">
          <div>
            <div className="flex items-center gap-1 text-[10px] text-[#dfb76c] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Order Confirmed</span>
            </div>
            <h4 className="text-xs font-serif-luxury font-bold text-[#fcedc5] mt-0.5">
              Order #{order.orderId}
            </h4>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-[#8e8779] block">Total</span>
            <span className="text-xs font-mono font-bold text-[#dfb76c]">
              ₹{order.pricing.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-[#0b0c13] border border-[#202538] text-xs space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#ede8dc] text-[11px]">{order.gemstone.name}</span>
            <span className="text-[10px] text-[#dfb76c]">{order.gemstone.weightRatti} Ratti</span>
          </div>
          <p className="text-[10px] text-[#a8a192]">Setting: Sacred Panchdhatu (Size {order.ringSize})</p>
          <div className="flex items-center gap-1 text-emerald-400 text-[10px] pt-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Gotra Sankalp recorded at Kashi</span>
          </div>
        </div>

        <div className="pt-1 flex flex-col gap-2">
          <button
            onClick={onViewTracking}
            className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#dfb76c] active:bg-[#c49746] text-[#0e1017] text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order</span>
          </button>
          <button
            onClick={onContinueChat}
            className="w-full py-2 text-xs text-[#a8a192] active:text-[#ede8dc] text-center cursor-pointer"
          >
            Continue with Acharya
          </button>
        </div>
      </div>
    </div>
  );
};
