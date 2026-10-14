import React from 'react';
import { ShoppingProduct } from '../../data/shoppingProductsData';
import { ShoppingProductArtwork } from './ShoppingProductArtwork';
import { Sparkles, Eye, Plus, ShoppingBag, Star } from 'lucide-react';

interface ShoppingProductCardProps {
  product: ShoppingProduct;
  onSelect: (product: ShoppingProduct) => void;
  onAddToCart?: (product: ShoppingProduct, e: React.MouseEvent) => void;
}

export const ShoppingProductCard: React.FC<ShoppingProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
}) => {
  return (
    <div
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      className="group relative rounded-2xl bg-[#2B173C] border border-transparent hover:border-[#A87B2A]/40 shadow-[0_6px_20px_-2px_rgba(18,9,31,0.55),inset_0_1px_1px_0_rgba(247,240,255,0.05)] hover:shadow-[0_10px_26px_-3px_rgba(18,9,31,0.65)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
    >
      {/* Top badges: Astrology Tag & Availability */}
      <div className="p-2 sm:p-2.5 flex items-center justify-between gap-1 z-10">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-[#24133B] text-[#E7B743] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)] truncate max-w-[130px]">
          <span>✦</span>
          <span className="truncate">{product.astrologyTag}</span>
        </span>

        {product.inStock && (
          <span className="text-[9px] text-[#00D6A0] font-mono flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
            <span className="hidden sm:inline">Certified</span>
          </span>
        )}
      </div>

      {/* Visual Artwork Center */}
      <div className="relative w-full py-2 sm:py-3 flex items-center justify-center overflow-hidden">
        <div className="transition-transform duration-300 group-hover:scale-105">
          <ShoppingProductArtwork product={product} size="md" />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-3 sm:p-3.5 pt-1 space-y-1.5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1 text-[10px] text-[#9685AE]">
            <Star className="w-3 h-3 text-[#E7B743] fill-current" />
            <span className="font-mono text-[#F7F0FF] font-semibold">{product.rating}</span>
            <span>({product.reviewsCount})</span>
          </div>

          <h3 className="font-display font-semibold text-xs sm:text-[13px] text-[#F7F0FF] line-clamp-1 group-hover:text-[#E7B743] transition-colors mt-0.5">
            {product.name}
          </h3>

          <p className="text-[10.5px] text-[#C5B8D9] line-clamp-1 font-serif-luxury italic">
            {product.sanskritName}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-[#453052]/20 flex items-center justify-between gap-1.5">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-xs sm:text-sm text-[#F7F0FF]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] text-[#9685AE] line-through font-mono">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[9.5px] text-[#9685AE] block -mt-0.5">
              Includes Puja Sankalp
            </span>
          </div>

          {/* Quick Action Button: View or + Cart */}
          <div className="flex items-center gap-1 shrink-0">
            {onAddToCart && (
              <button
                type="button"
                onClick={(e) => onAddToCart(product, e)}
                className="clay-button-secondary p-1.5 rounded-lg text-[#E7B743] cursor-pointer"
                title="Add to cart"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              className="clay-button-primary px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
