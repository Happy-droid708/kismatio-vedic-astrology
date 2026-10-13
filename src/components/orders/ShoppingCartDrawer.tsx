import React from 'react';
import { ShoppingProduct } from '../../data/shoppingProductsData';
import { ShoppingProductArtwork } from './ShoppingProductArtwork';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

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
}

export const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#0e1019] border-l border-[#dfb76c]/30 shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-4 border-b border-[#222739] flex items-center justify-between bg-[#121422]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#dfb76c]" />
            <h2 className="font-display font-bold text-sm text-[#fcedc5]">
              Sanctum Bag ({items.reduce((acc, it) => acc + it.quantity, 0)})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#181c2b] text-[#8e8779] hover:text-[#ede8dc] border border-[#2b334d] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8e8779] space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#141726] border border-[#272d42] flex items-center justify-center text-[#dfb76c]">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="font-display font-bold text-sm text-[#ede8dc]">
                Your bag is empty
              </h3>
              <p className="text-xs text-[#8e8779] max-w-xs">
                Explore our curated gemstones, authentic Nepali Rudraksha, and sacred Vedic jewellery.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#1a1f33] border border-[#dfb76c]/30 text-[#dfb76c] font-semibold text-xs cursor-pointer active:scale-95"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-[#141724] border border-[#23293f] flex items-center gap-3 relative group"
              >
                {/* Artwork Thumbnail */}
                <div className="w-14 h-14 rounded-xl bg-[#0e1019] border border-[#282f48] flex items-center justify-center shrink-0">
                  <ShoppingProductArtwork product={item.product} size="sm" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="font-semibold text-xs text-[#fcedc5] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[10px] text-[#8e8779] truncate space-x-1.5 font-mono">
                    <span>{item.selectedMetal || 'Panchdhatu'}</span>
                    {item.selectedSize && <span>· Size {item.selectedSize}</span>}
                  </div>
                  <div className="font-display font-bold text-xs text-[#dfb76c] mt-0.5">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#8e8779] hover:text-red-400 p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-[#0e1019] border border-[#282f48] rounded-lg px-1.5 py-0.5">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="text-[#8e8779] hover:text-[#ede8dc] cursor-pointer p-0.5"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs text-[#ede8dc] px-1 font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="text-[#8e8779] hover:text-[#ede8dc] cursor-pointer p-0.5"
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
          <div className="p-4 border-t border-[#222739] bg-[#121422] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#8e8779]">
                <span>Items Subtotal</span>
                <span className="font-mono font-medium text-[#ede8dc]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#8e8779]">
                <span>Prana Pratishtha Consecration</span>
                <span className="font-mono text-emerald-400 font-semibold">FREE (Kashi)</span>
              </div>
              <div className="flex justify-between text-[#8e8779]">
                <span>Insured Armored Logistics</span>
                <span className="font-mono text-emerald-400 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-1.5 border-t border-[#222739]">
                <span className="text-[#fcedc5]">Total Amount</span>
                <span className="font-display text-[#dfb76c] text-base">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-bold text-xs shadow-lg shadow-[#dfb76c]/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8e8779] text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Razorpay 256-Bit Encrypted Payment</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
