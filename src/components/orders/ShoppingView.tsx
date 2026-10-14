import React, { useState, useMemo } from 'react';
import {
  SHOPPING_PRODUCTS,
  ShoppingProduct,
} from '../../data/shoppingProductsData';
import { ShoppingProductArtwork } from './ShoppingProductArtwork';
import { ShoppingProductDetailModal } from './ShoppingProductDetailModal';
import { ShoppingCartDrawer, CartItem } from './ShoppingCartDrawer';
import { ShoppingCartPage } from './ShoppingCartPage';
import { ShoppingCheckoutModal } from './ShoppingCheckoutModal';
import { OrderDetails } from '../../types/astrology';
import {
  ShoppingWorldsNav,
  ShoppingWorldId,
} from './shopping-worlds/ShoppingWorldsNav';
import { NavratriWorld } from './shopping-worlds/NavratriWorld';
import { MonthEndWorld } from './shopping-worlds/MonthEndWorld';
import { ExclusiveVaultWorld } from './shopping-worlds/ExclusiveVaultWorld';
import { ValueForMoneyWorld } from './shopping-worlds/ValueForMoneyWorld';
import {
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
  Check,
} from 'lucide-react';

interface ShoppingViewProps {
  onOrderCreated: (order: OrderDetails) => void;
  onNavigateToOrders: () => void;
  initialShowCart?: boolean;
}

export const ShoppingView: React.FC<ShoppingViewProps> = ({
  onOrderCreated,
  onNavigateToOrders,
  initialShowCart = false,
}) => {
  // Navigation & Worlds State
  const [activeWorld, setActiveWorld] = useState<ShoppingWorldId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [selectedPlanetFilter, setSelectedPlanetFilter] = useState<string>('all');

  // Full Cart Page View Toggle
  const [isCartPageOpen, setIsCartPageOpen] = useState<boolean>(initialShowCart);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ShoppingProduct | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutDirectProduct, setCheckoutDirectProduct] = useState<ShoppingProduct | null>(null);
  const [checkoutMetal, setCheckoutMetal] = useState<string>('Sacred Panchdhatu');
  const [checkoutSize, setCheckoutSize] = useState<string>('18');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: SHOPPING_PRODUCTS[0], // Ceylon Yellow Sapphire
      quantity: 1,
      selectedMetal: 'Sacred Panchdhatu',
      selectedSize: '18',
    },
  ]);

  // Toast Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Add to Cart
  const handleAddToCart = (
    product: ShoppingProduct,
    selectedMetal: string = 'Sacred Panchdhatu',
    selectedSize: string = '18'
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.product.id === product.id &&
          it.selectedMetal === selectedMetal &&
          it.selectedSize === selectedSize
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}-${Math.random()}`,
          product,
          quantity: 1,
          selectedMetal,
          selectedSize,
        },
      ];
    });
    showToast(`Added ${product.name} to sanctum bag`);
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove Cart Item
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
    showToast('Item removed from bag');
  };

  // Direct Buy Now
  const handleBuyNow = (product: ShoppingProduct, metal?: string, size?: string) => {
    setCheckoutDirectProduct(product);
    if (metal) setCheckoutMetal(metal);
    if (size) setCheckoutSize(size);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Checkout from Cart
  const handleProceedToCheckoutFromCart = () => {
    setIsCartOpen(false);
    setCheckoutDirectProduct(null);
    setIsCheckoutOpen(true);
  };

  // Order Success
  const handleOrderSuccess = (order: OrderDetails) => {
    onOrderCreated(order);
    if (!checkoutDirectProduct) {
      setCartItems([]);
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return SHOPPING_PRODUCTS.filter((prod) => {
      if (prod.price > maxPrice) return false;
      if (selectedPlanetFilter !== 'all') {
        if (!prod.planetOrDeity.toLowerCase().includes(selectedPlanetFilter.toLowerCase())) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesSanskrit = prod.sanskritName.toLowerCase().includes(q);
        const matchesPlanet = prod.planetOrDeity.toLowerCase().includes(q);
        const matchesTag = prod.astrologyTag.toLowerCase().includes(q);
        const matchesIntention = prod.intention.toLowerCase().includes(q);
        if (!matchesName && !matchesSanskrit && !matchesPlanet && !matchesTag && !matchesIntention) {
          return false;
        }
      }
      return true;
    });
  }, [maxPrice, selectedPlanetFilter, searchQuery]);

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Smooth scroll to world section
  const handleSelectWorld = (worldId: ShoppingWorldId) => {
    setIsCartPageOpen(false);
    setActiveWorld(worldId);
    if (worldId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setTimeout(() => {
      const elem = document.getElementById(worldId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-[#12091F] select-none text-[#F7F0FF] relative overflow-y-auto scrollbar-thin">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D6A0] to-emerald-600 text-[#180D2B] text-xs font-bold shadow-xl shadow-black/50 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =================================================================== */}
      {/* 1. STICKY LUXURY WORLDS NAVIGATION                                  */}
      {/* =================================================================== */}
      <ShoppingWorldsNav
        activeWorld={isCartPageOpen ? 'all' : activeWorld}
        onSelectWorld={handleSelectWorld}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartPageOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setIsCartPageOpen(false);
          setSearchQuery(q);
        }}
      />

      {/* Search match banner if active */}
      {!isCartPageOpen && searchQuery.trim() && (
        <div className="bg-[#24133B] border-b border-[#453052]/30 px-4 py-2 flex items-center justify-between text-xs text-[#C5B8D9]">
          <span>
            Found <strong className="text-[#FFD76A]">{filteredProducts.length}</strong> sacred items matching "{searchQuery}"
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-[#E7B743] hover:underline cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. CART PAGE OR THE FOUR WORLDS                                     */}
      {/* =================================================================== */}
      {isCartPageOpen ? (
        <ShoppingCartPage
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onProceedToCheckout={() => {
            setCheckoutDirectProduct(null);
            setIsCheckoutOpen(true);
          }}
          onContinueShopping={() => setIsCartPageOpen(false)}
        />
      ) : (
        <div className="w-full flex flex-col">
          {/* WORLD 01: NAVRATRI — The Festival of Extraordinary Finds */}
          {(activeWorld === 'all' || activeWorld === 'navratri') && (
            <NavratriWorld
              products={filteredProducts}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
            />
          )}

          {/* WORLD 02: MONTH-END — The Midnight Shopping Rush */}
          {(activeWorld === 'all' || activeWorld === 'month-end') && (
            <MonthEndWorld
              products={filteredProducts}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
            />
          )}

          {/* WORLD 03: TWO DEALS, NEVER BEFORE — The Exclusive Vault */}
          {(activeWorld === 'all' || activeWorld === 'vault') && (
            <ExclusiveVaultWorld
              products={filteredProducts}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
            />
          )}

          {/* WORLD 04: VALUE FOR MONEY — The Art of Smart Shopping */}
          {(activeWorld === 'all' || activeWorld === 'value') && (
            <ValueForMoneyWorld
              products={filteredProducts}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. MODALS, CART DRAWER & CHECKOUT                                   */}
      {/* =================================================================== */}
      {/* Product Detail Modal */}
      <ShoppingProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, metal, size) => {
          handleAddToCart(prod, metal, size);
        }}
        onBuyNow={(prod, metal, size) => {
          handleBuyNow(prod, metal, size);
        }}
      />

      {/* Shopping Cart Drawer */}
      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckoutFromCart}
        onOpenFullCart={() => setIsCartPageOpen(true)}
      />

      {/* Shopping Checkout Modal */}
      <ShoppingCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setCheckoutDirectProduct(null);
        }}
        directProduct={checkoutDirectProduct}
        cartItems={cartItems}
        initialMetal={checkoutMetal}
        initialRingSize={checkoutSize}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#12091F]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsFilterModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-[#24133B] border border-transparent clay-float p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#453052]/30 pb-3">
              <h3 className="font-serif-luxury font-bold text-sm text-[#F7F0FF]">
                Filter Sacred Items
              </h3>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 rounded-lg text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Price Filter */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#C5B8D9]">Maximum Price</span>
                <span className="font-mono font-bold text-[#FFD76A]">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#E7B743] cursor-pointer"
              />
            </div>

            {/* Planet Filter */}
            <div className="space-y-1.5">
              <label className="text-xs text-[#C5B8D9] block">Ruling Planet / Deity</label>
              <select
                value={selectedPlanetFilter}
                onChange={(e) => setSelectedPlanetFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#12091F] border border-transparent clay-input text-xs text-[#F7F0FF] outline-none"
              >
                <option value="all">All Planetary Energies</option>
                <option value="Jupiter">Jupiter (Guru)</option>
                <option value="Saturn">Saturn (Shani)</option>
                <option value="Sun">Sun (Surya)</option>
                <option value="Mercury">Mercury (Budh)</option>
                <option value="Mars">Mars (Mangal)</option>
                <option value="Venus">Venus (Shukra)</option>
                <option value="Moon">Moon (Chandra)</option>
                <option value="Rahu">Rahu (North Node)</option>
                <option value="Ketu">Ketu (South Node)</option>
                <option value="Shiva">Lord Shiva</option>
              </select>
            </div>

            <div className="pt-2 border-t border-[#453052]/30 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMaxPrice(50000);
                  setSelectedPlanetFilter('all');
                }}
                className="flex-1 py-2 rounded-xl bg-[#2B173C] text-[#9685AE] hover:text-[#F7F0FF] text-xs font-semibold cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 py-2 rounded-xl clay-button-primary text-[#180D2B] text-xs font-bold cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
