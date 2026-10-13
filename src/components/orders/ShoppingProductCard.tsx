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
      className="group relative rounded-2xl bg-[#121524]/95 border border-[#dfb76c]/20 hover:border-[#dfb76c]/45 transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5 active:scale-[0.98] select-none"
    >
      {/* Top badges: Astrology Tag & Availability */}
      <div className="p-2 sm:p-2.5 flex items-center justify-between gap-1 z-10">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-[#dfb76c]/15 text-[#dfb76c] border border-[#dfb76c]/25 truncate max-w-[130px]">
          <span>✦</span>
          <span className="truncate">{product.astrologyTag}</span>
        </span>

        {product.inStock && (
          <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
          <div className="flex items-center gap-1 text-[10px] text-[#8e8779]">
            <Star className="w-3 h-3 text-[#dfb76c] fill-current" />
            <span className="font-mono text-[#fcedc5] font-semibold">{product.rating}</span>
            <span>({product.reviewsCount})</span>
          </div>

          <h3 className="font-display font-semibold text-xs sm:text-[13px] text-[#fcedc5] line-clamp-1 group-hover:text-[#dfb76c] transition-colors mt-0.5">
            {product.name}
          </h3>

          <p className="text-[10.5px] text-[#8e8779] line-clamp-1 font-serif-luxury italic">
            {product.sanskritName}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-[#1e2337] flex items-center justify-between gap-1.5">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-xs sm:text-sm text-[#fcedc5]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] text-[#8e8779] line-through font-mono">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[9.5px] text-[#8e8779] block -mt-0.5">
              Includes Puja Sankalp
            </span>
          </div>

          {/* Quick Action Button: View or + Cart */}
          <div className="flex items-center gap-1 shrink-0">
            {onAddToCart && (
              <button
                type="button"
                onClick={(e) => onAddToCart(product, e)}
                className="p-1.5 rounded-lg bg-[#191d2f] hover:bg-[#252c48] border border-[#dfb76c]/30 text-[#dfb76c] active:scale-90 transition-all cursor-pointer"
                title="Add to cart"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#dfb76c] to-[#c49746] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] text-[11px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
