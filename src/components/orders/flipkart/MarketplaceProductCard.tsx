import React, { useState } from 'react';
import { ShoppingProduct } from '../../../data/shoppingProductsData';
import { ShoppingProductArtwork } from '../ShoppingProductArtwork';
import { Star, Heart, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

interface MarketplaceProductCardProps {
  product: ShoppingProduct;
  onSelect: (product: ShoppingProduct) => void;
  onAddToCart?: (product: ShoppingProduct, e: React.MouseEvent) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: ShoppingProduct, e: React.MouseEvent) => void;
  badgeLabel?: string;
  badgeType?: 'festive' | 'deal' | 'exclusive' | 'bestseller';
  compact?: boolean;
}

export const MarketplaceProductCard: React.FC<MarketplaceProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
  badgeLabel,
  badgeType = 'deal',
  compact = false,
}) => {
  const [localWishlisted, setLocalWishlisted] = useState(isWishlisted);

  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalWishlisted((prev) => !prev);
    if (onToggleWishlist) {
      onToggleWishlist(product, e);
    }
  };

  const getBadgeStyle = () => {
    switch (badgeType) {
      case 'festive':
        return 'bg-gradient-to-r from-[#FF4668] to-[#E11D48] text-white';
      case 'exclusive':
        return 'bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white';
      case 'bestseller':
        return 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#180C2A]';
      default:
        return 'bg-[#00D6A0]/15 text-[#00D6A0] border border-[#00D6A0]/30';
    }
  };

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
      className={`group relative rounded-xl sm:rounded-2xl bg-[#1F1033] border border-[#442266]/30 hover:border-[#E7B743]/50 shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] ${
        compact ? 'w-[170px] sm:w-[210px] shrink-0' : 'w-full'
      }`}
    >
      {/* Top Bar: Discount / Tag & Wishlist Heart */}
      <div className="p-2 sm:p-2.5 pb-0 flex items-center justify-between gap-1 z-10">
        {/* Deal / Festive Badge */}
        {badgeLabel ? (
          <span
            className={`px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-bold tracking-wider shadow-sm truncate max-w-[120px] ${getBadgeStyle()}`}
          >
            {badgeLabel}
          </span>
        ) : discountPercent > 0 ? (
          <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-bold bg-[#00D6A0]/15 text-[#00D6A0] border border-[#00D6A0]/25">
            {discountPercent}% OFF
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-bold bg-[#2A1645] text-[#C5B8D9]">
            {product.astrologyTag.split('•')[0] || 'Vedic'}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={localWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="w-7 h-7 rounded-full bg-[#180B28]/80 hover:bg-[#2C1548] flex items-center justify-center text-[#9685AE] hover:text-[#FF4668] transition-colors cursor-pointer"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-all ${
              localWishlisted
                ? 'fill-[#FF4668] text-[#FF4668] scale-110'
                : 'stroke-[2] hover:scale-110'
            }`}
          />
        </button>
      </div>

      {/* Visual Product Artwork Area */}
      <div className="relative w-full py-2 sm:py-3.5 flex items-center justify-center overflow-hidden bg-gradient-to-b from-transparent via-[#26133F]/20 to-[#1A0B2B]/40">
        <div className="transition-transform duration-300 group-hover:scale-105">
          <ShoppingProductArtwork
            product={product}
            size={compact ? 'sm' : 'md'}
          />
        </div>

        {/* In Stock Dot */}
        {product.inStock && (
          <div className="absolute bottom-1 right-2 flex items-center gap-1 text-[8.5px] sm:text-[9px] font-mono text-[#00D6A0] bg-[#160B24]/90 px-1.5 py-0.5 rounded-md border border-[#00D6A0]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0] animate-pulse" />
            <span>Ready</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-2.5 sm:p-3 space-y-1.5 flex flex-col flex-1 justify-between bg-[#1C0E2E]/90">
        <div>
          {/* Star Rating & Planet Tag */}
          <div className="flex items-center justify-between gap-1 text-[10px]">
            <div className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-[#00D6A0]/20 text-[#00D6A0] font-mono font-bold text-[9.5px]">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-current" />
            </div>

            <span className="text-[9.5px] text-[#A78BFA] font-mono truncate max-w-[100px]">
              {product.planetOrDeity.split('(')[0]}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-display font-semibold text-xs sm:text-[13px] text-[#F7F0FF] line-clamp-1 group-hover:text-[#FFD76A] transition-colors mt-1">
            {product.name}
          </h3>

          {/* Sanskrit Name */}
          <p className="text-[10px] sm:text-[10.5px] text-[#9685AE] line-clamp-1 font-serif-luxury italic">
            {product.sanskritName}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="pt-1.5 border-t border-[#3B1F58]/40 space-y-1.5">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-display font-bold text-xs sm:text-base text-[#F7F0FF]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] sm:text-[11px] text-[#7A6B8E] line-through font-mono">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-[10px] font-mono font-bold text-[#00D6A0]">
                  {discountPercent}% off
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[9px] text-[#9685AE] mt-0.5">
              <ShieldCheck className="w-2.5 h-2.5 text-[#00D6A0] shrink-0" />
              <span className="truncate">Free Consecration Sankalp</span>
            </div>
          </div>

          {/* Quick Action Button: Add to Bag */}
          {onAddToCart && (
            <button
              type="button"
              onClick={(e) => onAddToCart(product, e)}
              className="w-full py-1.5 px-2 rounded-lg bg-gradient-to-r from-[#E7B743] to-[#C99827] hover:from-[#F0C356] hover:to-[#DBA833] text-[#180C2A] font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-[0_2px_8px_rgba(231,183,67,0.25)] hover:shadow-[0_4px_12px_rgba(231,183,67,0.4)] active:scale-98 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3 stroke-[2.2]" />
              <span>Add to Bag</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
