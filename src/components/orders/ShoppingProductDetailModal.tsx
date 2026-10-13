import React, { useState } from 'react';
import { ShoppingProduct } from '../../data/shoppingProductsData';
import { ShoppingProductArtwork } from './ShoppingProductArtwork';
import {
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
  ShoppingBag,
  Zap,
  ArrowRight,
  Clock,
  RotateCcw,
  Star,
} from 'lucide-react';

interface ShoppingProductDetailModalProps {
  product: ShoppingProduct | null;
  onClose: () => void;
  onAddToCart: (product: ShoppingProduct, selectedMetal?: string, selectedSize?: string) => void;
  onBuyNow: (product: ShoppingProduct, selectedMetal?: string, selectedSize?: string) => void;
}

export const ShoppingProductDetailModal: React.FC<ShoppingProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [selectedMetal, setSelectedMetal] = useState<string>(
    product.metalOptions && product.metalOptions.length > 0
      ? product.metalOptions[0]
      : 'Sacred Panchdhatu'
  );
  const [selectedRingSize, setSelectedRingSize] = useState<string>(
    product.ringSizes && product.ringSizes.length > 0 ? product.ringSizes[2] : '18'
  );
  const [activeTab, setActiveTab] = useState<'benefits' | 'consecration' | 'specs'>('benefits');
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedMetal, selectedRingSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedMetal, selectedRingSize);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#0e1019] border border-[#dfb76c]/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col z-10 animate-in slide-in-from-bottom duration-250">
        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-[#222739] flex items-center justify-between bg-[#121422]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#dfb76c] font-bold text-sm">✦</span>
            <div>
              <span className="font-display font-bold text-xs sm:text-sm text-[#fcedc5] block leading-tight">
                {product.name}
              </span>
              <span className="text-[10px] text-[#8e8779] font-mono">
                {product.certification}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#181c2b] text-[#8e8779] hover:text-[#ede8dc] border border-[#2b334d] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
          {/* Product Visual Hero & Atmospheric Glow */}
          <div className="relative rounded-2xl bg-gradient-to-b from-[#161a2b] to-[#10121d] border border-[#dfb76c]/20 p-6 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-2 right-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Authentic</span>
            </div>

            <div className="my-2">
              <ShoppingProductArtwork product={product} size="lg" />
            </div>

            <div className="text-center space-y-0.5 mt-2">
              <h2 className="font-display font-bold text-base sm:text-lg text-[#fcedc5]">
                {product.name}
              </h2>
              <p className="text-xs text-[#dfb76c] font-serif-luxury italic">
                {product.sanskritName}
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#181d2e] border border-[#dfb76c]/30 text-[#fcedc5] text-[10.5px] font-mono mt-1">
                <span>✦ {product.planetOrDeity}</span>
                <span>·</span>
                <span>{product.origin}</span>
              </div>
            </div>
          </div>

          {/* Pricing Highlight Row */}
          <div className="p-3.5 rounded-xl bg-[#141724] border border-[#23293f] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#8e8779] block uppercase tracking-wider font-mono">
                Sanctum Consecrated Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-bold text-xl text-[#fcedc5]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-[#8e8779] line-through font-mono">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#dfb76c] font-mono block">
                Free Armored Shipping
              </span>
              <span className="text-[10px] text-[#8e8779]">
                Includes Kashi Peeth Sankalp
              </span>
            </div>
          </div>

          {/* Metal Options Selection (if applicable) */}
          {product.metalOptions && product.metalOptions.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-[#8e8779] uppercase block tracking-wider">
                Select Consecration Metal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.metalOptions.map((metal) => {
                  const isSelected = selectedMetal === metal;
                  return (
                    <button
                      key={metal}
                      type="button"
                      onClick={() => setSelectedMetal(metal)}
                      className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1e2438] border-[#dfb76c] text-[#fcedc5] shadow-sm'
                          : 'bg-[#121524] border-[#252c42] text-[#8e8779] hover:text-[#ede8dc]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate text-[11.5px]">{metal}</span>
                        {isSelected && <span className="text-[#dfb76c] text-xs">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ring Sizes Selection (if applicable) */}
          {product.ringSizes && product.ringSizes.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono text-[#8e8779] uppercase tracking-wider">
                  Ring Size (Indian Standard)
                </label>
                <span className="text-[10px] text-[#dfb76c] font-mono">
                  Selected: Size {selectedRingSize}
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {product.ringSizes.map((size) => {
                  const isSelected = selectedRingSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedRingSize(size)}
                      className={`w-9 h-9 rounded-xl font-mono text-xs font-semibold shrink-0 border transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#dfb76c] text-[#0e1017] border-[#dfb76c]'
                          : 'bg-[#141724] border-[#252c42] text-[#8e8779] hover:text-[#ede8dc]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tabbed Info: Benefits / Consecration / Specifications */}
          <div className="space-y-2 pt-1">
            <div className="flex border-b border-[#222739] gap-4">
              <button
                type="button"
                onClick={() => setActiveTab('benefits')}
                className={`pb-2 text-xs font-semibold cursor-pointer transition-colors relative ${
                  activeTab === 'benefits'
                    ? 'text-[#dfb76c]'
                    : 'text-[#8e8779] hover:text-[#ede8dc]'
                }`}
              >
                <span>Astrological Benefits</span>
                {activeTab === 'benefits' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#dfb76c]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('consecration')}
                className={`pb-2 text-xs font-semibold cursor-pointer transition-colors relative ${
                  activeTab === 'consecration'
                    ? 'text-[#dfb76c]'
                    : 'text-[#8e8779] hover:text-[#ede8dc]'
                }`}
              >
                <span>Vedic Ritual & Muhurat</span>
                {activeTab === 'consecration' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#dfb76c]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-2 text-xs font-semibold cursor-pointer transition-colors relative ${
                  activeTab === 'specs'
                    ? 'text-[#dfb76c]'
                    : 'text-[#8e8779] hover:text-[#ede8dc]'
                }`}
              >
                <span>Specifications</span>
                {activeTab === 'specs' && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#dfb76c]" />
                )}
              </button>
            </div>

            <div className="text-xs text-[#cdc7ba] leading-relaxed pt-1">
              {activeTab === 'benefits' && (
                <div className="space-y-2">
                  <p className="text-[#a8a192]">{product.description}</p>
                  <ul className="space-y-1.5 pl-1">
                    {product.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#dfb76c] text-[10px] mt-0.5">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'consecration' && (
                <div className="space-y-2.5 p-3 rounded-xl bg-[#141724] border border-[#23293f]">
                  <div className="flex items-center gap-2 text-[#dfb76c] font-semibold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>Prana Pratishtha by Kashi Vishwanath Peeth</span>
                  </div>
                  <p className="text-[11.5px] text-[#9a9385]">
                    Every gemstone and rudraksha undergoes authentic Vedic purification with Panchamrita, followed by 108 Beej Mantra recitations dedicated to the native’s Janma Gotra.
                  </p>
                  {product.beejMantra && (
                    <div className="p-2 rounded-lg bg-[#0e1019] border border-[#2a3148] font-mono text-[11px] text-[#fcedc5] text-center">
                      Beej Mantra: {product.beejMantra}
                    </div>
                  )}
                  {product.wearingGuidance && (
                    <div className="text-[11px] text-[#dfb76c] italic">
                      ✦ {product.wearingGuidance}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-1.5 p-3 rounded-xl bg-[#141724] border border-[#23293f] font-mono text-[11px]">
                  <div className="flex justify-between py-1 border-b border-[#1f2438]">
                    <span className="text-[#8e8779]">Origin</span>
                    <span className="text-[#ede8dc]">{product.origin}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1f2438]">
                    <span className="text-[#8e8779]">Certification</span>
                    <span className="text-[#dfb76c]">{product.certification}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1f2438]">
                    <span className="text-[#8e8779]">Ruling Energy</span>
                    <span className="text-[#ede8dc]">{product.planetOrDeity}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#8e8779]">Authentication</span>
                    <span className="text-emerald-400">Govt. Registered Peeth</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer CTAs: Add to Cart & Buy Now */}
        <div className="p-3.5 sm:p-4 border-t border-[#222739] bg-[#121422] flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 rounded-xl bg-[#181c2b] hover:bg-[#22283d] border border-[#dfb76c]/35 text-[#dfb76c] font-semibold text-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{addedToast ? '✓ Added to Cart!' : 'Add to Cart'}</span>
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-bold text-xs shadow-lg shadow-[#dfb76c]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Buy Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
