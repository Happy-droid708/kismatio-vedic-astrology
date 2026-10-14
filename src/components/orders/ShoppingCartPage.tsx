import React, { useState } from 'react';
import { ShoppingProduct } from '../../data/shoppingProductsData';
import { CartItem } from './ShoppingCartDrawer';
import { ShoppingProductArtwork } from './ShoppingProductArtwork';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Lock,
  ArrowLeft,
  Check,
  Tag,
} from 'lucide-react';

interface ShoppingCartPageProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const ShoppingCartPage: React.FC<ShoppingCartPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const totalItemCount = items.reduce((sum, it) => sum + it.quantity, 0);

  const subtotal = items.reduce(
    (sum, it) => sum + it.product.price * it.quantity,
    0
  );

  const totalOriginal = items.reduce(
    (sum, it) => sum + (it.product.originalPrice || it.product.price) * it.quantity,
    0
  );

  const savings = Math.max(0, totalOriginal - subtotal);

  const discountAmount = appliedPromo === 'FESTIVE2026' ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    if (promoCode.trim().toUpperCase() === 'FESTIVE2026') {
      setAppliedPromo('FESTIVE2026');
      setPromoError(null);
    } else {
      setPromoError('Invalid promo code. Try "FESTIVE2026" for 10% festive discount.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6 text-center select-none py-20 animate-in fade-in duration-200">
        <div className="w-20 h-20 rounded-full bg-[#24133B] border border-transparent clay-card flex items-center justify-center text-[#E7B743] mb-5 shadow-lg">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>

        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E7B743] px-3 py-1 rounded-full bg-[#E7B743]/15 mb-2">
          Sanctum Bag Empty
        </span>

        <h2 className="font-serif-luxury font-bold text-2xl sm:text-3xl text-[#F7F0FF]">
          Your Sacred Cart is Waiting
        </h2>

        <p className="text-xs sm:text-sm text-[#C5B8D9] max-w-md mt-2 mb-6 font-light leading-relaxed">
          Discover our four worlds of consecrated gemstones, authentic Nepali Rudrakshas, and Vedic ornaments consecrated with sacred Mantras.
        </p>

        <button
          onClick={onContinueShopping}
          className="px-6 py-3 rounded-xl clay-button-primary text-[#180D2B] font-serif-luxury font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#180D2B]" />
          <span>Explore The Four Worlds</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#12091F] text-[#F7F0FF] p-4 sm:p-6 lg:p-8 select-none overflow-y-auto scrollbar-thin">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#453052]/30">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={onContinueShopping}
                className="p-1.5 -ml-1.5 rounded-lg text-[#9685AE] hover:text-[#F7F0FF] hover:bg-[#24133B] cursor-pointer transition-colors"
                title="Back to Shopping"
              >
                <ArrowLeft className="w-5 h-5 text-[#E7B743]" />
              </button>
              <h1 className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#F7F0FF]">
                My Sanctum Bag
              </h1>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#E7B743]/20 text-[#FFD76A]">
                {totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'}
              </span>
            </div>
            <p className="text-xs text-[#9685AE] mt-1 font-light">
              Review your consecrated selections before sacred Gotra Sankalp.
            </p>
          </div>

          <button
            onClick={onContinueShopping}
            className="text-xs text-[#E7B743] hover:text-[#FFD76A] hover:underline font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>+ Add More Sacred Items</span>
          </button>
        </div>

        {/* Main Grid: Items on Left, Order Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Items List (Col 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item) => {
              const itemTotal = item.product.price * item.quantity;
              const itemOrigTotal = (item.product.originalPrice || item.product.price) * item.quantity;
              const itemSavings = Math.max(0, itemOrigTotal - itemTotal);

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#24133B] border border-transparent clay-card flex flex-col sm:flex-row items-start sm:items-center gap-4 relative transition-all group"
                >
                  {/* Artwork Thumbnail */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#180D2B] border border-transparent clay-surface flex items-center justify-center shrink-0 shadow-inner">
                    <ShoppingProductArtwork product={item.product} size="md" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-[#E7B743] tracking-wider truncate">
                        {item.product.planetOrDeity}
                      </span>
                      {itemSavings > 0 && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 font-bold">
                          Save ₹{itemSavings.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif-luxury font-bold text-sm sm:text-base text-[#F7F0FF] truncate">
                      {item.product.name}
                    </h3>

                    <p className="text-xs text-[#9685AE] font-serif italic truncate">
                      {item.product.sanskritName}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#C5B8D9] font-mono">
                      <span className="px-2 py-0.5 rounded-md bg-[#180D2B] text-[#C5B8D9]">
                        Metal: {item.selectedMetal || 'Sacred Panchdhatu'}
                      </span>
                      {item.selectedSize && (
                        <span className="px-2 py-0.5 rounded-md bg-[#180D2B] text-[#C5B8D9]">
                          Size: {item.selectedSize}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Pricing Controls */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#453052]/30 shrink-0 gap-2">
                    <div className="text-left sm:text-right">
                      <div className="font-serif-luxury font-bold text-base sm:text-lg text-[#FFD76A]">
                        ₹{itemTotal.toLocaleString('en-IN')}
                      </div>
                      {itemOrigTotal > itemTotal && (
                        <div className="text-[11px] text-[#9685AE] line-through font-mono">
                          ₹{itemOrigTotal.toLocaleString('en-IN')}
                        </div>
                      )}
                    </div>

                    {/* Stepper & Trash */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-[#180D2B] border border-transparent clay-input rounded-xl px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer p-0.5"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs text-[#F7F0FF] px-2.5 font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer p-0.5"
                          title="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 rounded-lg text-[#9685AE] hover:text-rose-400 hover:bg-[#352044] transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Sacred Vedic Inclusions Notice */}
            <div className="p-4 rounded-2xl bg-[#180D2B] border border-transparent clay-surface space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FFD76A]">
                <ShieldCheck className="w-4 h-4 text-[#00D6A0]" />
                <span>Complimentary Sacred Vedic Consecration</span>
              </div>
              <p className="text-[11px] text-[#C5B8D9] font-light leading-relaxed">
                All sanctum items include 108 Vedic Beej Mantra energization at Kashi Vishwanath Peeth, authentic Govt-recognized gemological lab certificates, and tamper-proof insured delivery.
              </p>
            </div>
          </div>

          {/* RIGHT: Order Summary Card (Col 8-12) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-[#24133B] border border-transparent clay-float space-y-5 shadow-2xl">
              <h2 className="font-serif-luxury font-bold text-base text-[#F7F0FF] pb-3 border-b border-[#453052]/30">
                Order Summary
              </h2>

              {/* Price Rows */}
              <div className="space-y-2.5 text-xs text-[#C5B8D9]">
                <div className="flex justify-between">
                  <span>Bag Subtotal ({totalItemCount} items)</span>
                  <span className="font-mono font-medium text-[#F7F0FF]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Catalogue Special Savings</span>
                    <span className="font-mono font-medium">
                      -₹{savings.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#FFD76A]">
                    <span>Festive Code Discount (10%)</span>
                    <span className="font-mono font-bold">
                      -₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Prana Pratishtha Consecration</span>
                  <span className="font-mono text-emerald-400 font-semibold">FREE (Kashi)</span>
                </div>

                <div className="flex justify-between">
                  <span>Armored Insured Shipping</span>
                  <span className="font-mono text-emerald-400 font-semibold">FREE</span>
                </div>

                {/* Final Total */}
                <div className="flex justify-between items-baseline pt-4 border-t border-[#453052]/40 text-sm">
                  <span className="font-serif-luxury font-bold text-[#F7F0FF]">
                    Final Consecration Total
                  </span>
                  <div className="text-right">
                    <span className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#FFD76A]">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-[#9685AE] font-mono">
                      (All taxes & certificates included)
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5 pt-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#9685AE] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Promo code (e.g. FESTIVE2026)"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#180D2B] border border-transparent clay-input text-xs text-[#F7F0FF] placeholder:text-[#9685AE] uppercase font-mono outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-[#2B173C] hover:bg-[#352044] text-[#E7B743] hover:text-[#FFD76A] border border-transparent hover:border-[#A87B2A]/40 text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Coupon {appliedPromo} applied successfully!</span>
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-400 font-mono">
                    {promoError}
                  </p>
                )}
              </form>

              {/* Primary Checkout CTA */}
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-4 rounded-2xl clay-button-primary text-[#180D2B] font-serif-luxury font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 transition-all group"
              >
                <span>Proceed to Sacred Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#180D2B] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Security Trust Badges */}
              <div className="space-y-2 pt-2 text-[11px] text-[#9685AE] text-center border-t border-[#453052]/20">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted Sacred Checkout</span>
                </div>
                <p className="text-[10px] text-[#9685AE] leading-tight">
                  Supports UPI (GPay/PhonePe), Credit Cards, NetBanking, and EMI with full buyer consecration guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
