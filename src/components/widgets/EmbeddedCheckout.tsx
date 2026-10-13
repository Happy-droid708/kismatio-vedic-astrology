import React, { useState } from 'react';
import { GemstoneProduct } from '../../types/astrology';
import { ShieldCheck, Lock, ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

interface EmbeddedCheckoutProps {
  gemstone: GemstoneProduct;
  selectedMetal: '18k_gold' | 'panchdhatu' | 'sterling_silver';
  ringSize: string;
  sankalpName: string;
  sankalpGotra: string;
  finalPrice: number;
  onProceedToPayment: (shippingInfo: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  }) => void;
  onBackToProduct: () => void;
}

export const EmbeddedCheckout: React.FC<EmbeddedCheckoutProps> = ({
  gemstone,
  selectedMetal,
  ringSize,
  sankalpName,
  sankalpGotra,
  finalPrice,
  onProceedToPayment,
  onBackToProduct,
}) => {
  const [fullName, setFullName] = useState(sankalpName);
  const [phone, setPhone] = useState('+91 98201 44820');
  const [street, setStreet] = useState('Flat 402, Suryavanshi Heights, C-Scheme');
  const [city, setCity] = useState('Jaipur');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('302001');

  const metalNameMap = {
    '18k_gold': '18K Yellow Gold',
    'panchdhatu': 'Vedic Panchdhatu',
    'sterling_silver': '925 Silver',
  };

  const handlePayClick = (e: React.FormEvent) => {
    e.preventDefault();
    onProceedToPayment({
      fullName,
      phone,
      street,
      city,
      state,
      pincode,
    });
  };

  return (
    <div className="my-2.5 p-3.5 sm:p-5 rounded-2xl bg-[#141724] border border-[#dfb76c]/40 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#252a3d]">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onBackToProduct}
            className="p-1 rounded-lg text-[#9a9385] active:text-[#ede8dc] cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            title="Back to Gemstone"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h4 className="text-xs sm:text-sm font-serif-luxury font-bold text-[#f5eedf]">
              Embedded Mobile Checkout
            </h4>
            <p className="text-[10px] text-[#9d9688]">Order #VEDA-8842</p>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#0f111a] border border-[#2b3145] text-[10px] text-emerald-400">
          <Lock className="w-3 h-3" />
          <span>256-Bit SSL</span>
        </div>
      </div>

      <form onSubmit={handlePayClick} className="space-y-3 my-3">
        {/* Order Summary Snapshot */}
        <div className="p-2.5 rounded-xl bg-[#0b0c13] border border-[#202538] text-xs space-y-1">
          <div className="flex justify-between text-[#c4beaf] text-[11px]">
            <span>{gemstone.name}</span>
            <span className="font-mono tabular-nums text-[#ede8dc]">₹{gemstone.basePrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-[#c4beaf] text-[11px]">
            <span>{metalNameMap[selectedMetal]} (Size {ringSize})</span>
            <span className="font-mono tabular-nums text-[#ede8dc]">
              ₹{(finalPrice - gemstone.basePrice).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between text-[#c4beaf] text-[11px]">
            <span>Kashi Consecration & Insured Delivery</span>
            <span className="font-mono tabular-nums text-emerald-400">Free</span>
          </div>
          <div className="pt-1.5 border-t border-[#1e2336] flex justify-between font-bold text-xs sm:text-sm">
            <span className="text-[#f5eedf]">Total Payable</span>
            <span className="font-mono tabular-nums text-[#dfb76c]">₹{finalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Delivery Address Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#cdc7ba]">
            <MapPin className="w-3 h-3 text-[#dfb76c]" />
            <span>Sacred Delivery Address</span>
          </div>

          <div>
            <label className="text-[9px] text-[#787163] block">Recipient Full Name</label>
            <input
              required
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c] min-h-[38px]"
            />
          </div>

          <div>
            <label className="text-[9px] text-[#787163] block">Mobile Number (For Transit OTP)</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c] min-h-[38px]"
            />
          </div>

          <div>
            <label className="text-[9px] text-[#787163] block">Address / Street</label>
            <input
              required
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c] min-h-[38px]"
            />
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-3 gap-1.5">
            <div className="min-w-0">
              <label className="text-[9px] text-[#787163] block">City</label>
              <input
                required
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c] min-h-[38px]"
              />
            </div>
            <div className="min-w-0">
              <label className="text-[9px] text-[#787163] block">State</label>
              <input
                required
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c] min-h-[38px]"
              />
            </div>
            <div className="min-w-0">
              <label className="text-[9px] text-[#787163] block">Pincode</label>
              <input
                required
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c] min-h-[38px]"
              />
            </div>
          </div>
        </div>

        {/* Consecration Guarantee */}
        <div className="flex items-center gap-1.5 p-2 rounded-lg bg-amber-950/20 border border-amber-500/20 text-[10px] text-[#ded7ca]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#dfb76c] shrink-0" />
          <span>Includes Gangajal sanctification, certificate, and sacred red box.</span>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            type="submit"
            className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#dfb76c] active:bg-[#c49746] text-[#0e1017] text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
          >
            <span>Proceed to In-Chat Payment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onBackToProduct}
            className="text-[11px] text-[#9d9688] active:text-[#ede8dc] text-center py-1 cursor-pointer"
          >
            ← Modify Ring Selection
          </button>
        </div>
      </form>
    </div>
  );
};
