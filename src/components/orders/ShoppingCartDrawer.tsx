import React from 'react';
import { ShoppingProduct } from '../../data/shoppingProductsData';
import { ShoppingProductArtwork } from './ShoppingProductArtwork';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Maximize2,
} from 'lucide-react';

export interface CartItem {
  id: string; // unique item instance id
  product: ShoppingProduct;
  quantity: number;
  selectedMetal?: string;
  selectedSize?: string;
}

interface ShoppingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onOpenFullCart?: () => void;
}

export const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onOpenFullCart,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItemCount = items.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#12091F]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#180D2B] border-l border-[#453052]/30 shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-4 border-b border-[#453052]/20 flex items-center justify-between bg-[#24133B]/90 backdrop-blur-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2B173C] flex items-center justify-center text-[#E7B743] shadow-xs">
              <ShoppingBag className="w-4 h-4 text-[#E7B743]" />
            </div>
            <div>
              <h2 className="font-serif-luxury font-bold text-sm text-[#F7F0FF]">
                Sanctum Bag ({totalItemCount})
              </h2>
              <span className="text-[10px] text-[#9685AE] font-mono">
                Consecrated Items
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onOpenFullCart && (
              <button
                onClick={() => {
                  onClose();
                  onOpenFullCart();
                }}
                className="p-1.5 rounded-lg text-[#9685AE] hover:text-[#FFD76A] hover:bg-[#352044] transition-colors cursor-pointer"
                title="Expand to Full Cart Page"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9685AE] hover:text-[#F7F0FF] hover:bg-[#352044] transition-colors cursor-pointer"
              title="Close bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#9685AE] space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#24133B] clay-surface flex items-center justify-center text-[#E7B743]">
                <ShoppingBag className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="font-serif-luxury font-bold text-base text-[#F7F0FF]">
                Your bag is empty
              </h3>
              <p className="text-xs text-[#C5B8D9] max-w-xs font-light">
                Explore our curated gemstones, authentic Nepali Rudraksha, and sacred Vedic jewellery.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl clay-button-primary text-[#180D2B] font-bold text-xs cursor-pointer active:scale-95 transition-all shadow-md"
              >
                Browse Four Worlds
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#24133B] border border-transparent clay-card flex items-center gap-3 relative group"
              >
                {/* Artwork Thumbnail */}
                <div className="w-14 h-14 rounded-xl bg-[#180D2B] border border-transparent clay-surface flex items-center justify-center shrink-0">
                  <ShoppingProductArtwork product={item.product} size="sm" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="font-serif-luxury font-bold text-xs text-[#F7F0FF] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[10px] text-[#9685AE] truncate space-x-1.5 font-mono">
                    <span>{item.selectedMetal || 'Panchdhatu'}</span>
                    {item.selectedSize && <span>· Size {item.selectedSize}</span>}
                  </div>
                  <div className="font-serif-luxury font-bold text-xs text-[#FFD76A] mt-0.5">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#9685AE] hover:text-rose-400 p-1 cursor-pointer transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-[#180D2B] border border-transparent clay-input rounded-lg px-2 py-0.5">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer p-0.5"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs text-[#F7F0FF] px-1 font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer p-0.5"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#453052]/20 bg-[#24133B] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#C5B8D9]">
                <span>Items Subtotal</span>
                <span className="font-mono font-medium text-[#F7F0FF]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#C5B8D9]">
                <span>Prana Pratishtha Consecration</span>
                <span className="font-mono text-[#00D6A0] font-semibold">FREE (Kashi)</span>
              </div>
              <div className="flex justify-between text-[#C5B8D9]">
                <span>Insured Armored Logistics</span>
                <span className="font-mono text-[#00D6A0] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#453052]/30">
                <span className="font-serif-luxury text-[#F7F0FF]">Total Amount</span>
                <span className="font-serif-luxury text-[#FFD76A] text-base">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {onOpenFullCart && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenFullCart();
                  }}
                  className="py-3 px-3.5 rounded-xl bg-[#2B173C] hover:bg-[#352044] border border-transparent hover:border-[#A87B2A]/40 text-[#C5B8D9] hover:text-[#F7F0FF] font-semibold text-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  View Full Cart
                </button>
              )}

              <button
                type="button"
                onClick={onProceedToCheckout}
                className="flex-1 py-3.5 rounded-xl clay-button-primary text-[#180D2B] font-serif-luxury font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#180D2B]" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#9685AE] text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D6A0]" />
              <span>Razorpay 256-Bit Encrypted Payment</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
