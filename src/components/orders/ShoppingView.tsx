import React, { useState, useMemo } from 'react';
import {
  SHOPPING_PRODUCTS,
  ShoppingProduct,
  ShoppingCategory,
  JewellerySubcategory,
} from '../../data/shoppingProductsData';
import { ShoppingProductCard } from './ShoppingProductCard';
import { ShoppingProductArtwork } from './ShoppingProductArtwork';
import { ShoppingProductDetailModal } from './ShoppingProductDetailModal';
import { ShoppingCartDrawer, CartItem } from './ShoppingCartDrawer';
import { ShoppingCheckoutModal } from './ShoppingCheckoutModal';
import { OrderDetails } from '../../types/astrology';
import {
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
  ChevronRight,
  Filter,
  Check,
  Flame,
} from 'lucide-react';

interface ShoppingViewProps {
  onOrderCreated: (order: OrderDetails) => void;
  onNavigateToOrders: () => void;
}

export const ShoppingView: React.FC<ShoppingViewProps> = ({
  onOrderCreated,
  onNavigateToOrders,
}) => {
  // State
  const [activeCategory, setActiveCategory] = useState<ShoppingCategory>('all');
  const [activeJewellerySub, setActiveJewellerySub] = useState<JewellerySubcategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ShoppingProduct | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutDirectProduct, setCheckoutDirectProduct] = useState<ShoppingProduct | null>(null);
  const [checkoutMetal, setCheckoutMetal] = useState<string>('Sacred Panchdhatu');
  const [checkoutSize, setCheckoutSize] = useState<string>('18');

  // Filter options state
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [selectedPlanetFilter, setSelectedPlanetFilter] = useState<string>('all');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: SHOPPING_PRODUCTS[0], // Ceylon Yellow Sapphire
      quantity: 1,
      selectedMetal: 'Sacred Panchdhatu',
      selectedSize: '18',
    },
  ]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Add to cart handler
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
    showToast(`Added ${product.name} to bag`);
  };

  // Update cart item quantity
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

  // Remove cart item
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
    showToast('Item removed from bag');
  };

  // Direct Buy Now from modal
  const handleBuyNow = (product: ShoppingProduct, metal?: string, size?: string) => {
    setCheckoutDirectProduct(product);
    if (metal) setCheckoutMetal(metal);
    if (size) setCheckoutSize(size);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Proceed to Checkout from Cart Drawer
  const handleProceedToCheckoutFromCart = () => {
    setIsCartOpen(false);
    setCheckoutDirectProduct(null); // checkout whole cart
    setIsCheckoutOpen(true);
  };

  // On order placed successfully
  const handleOrderSuccess = (order: OrderDetails) => {
    onOrderCreated(order);
    if (!checkoutDirectProduct) {
      // If checked out entire cart, clear cart
      setCartItems([]);
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return SHOPPING_PRODUCTS.filter((prod) => {
      // Category filter
      if (activeCategory !== 'all' && prod.category !== activeCategory) {
        return false;
      }

      // Subcategory filter (if in jewellery)
      if (activeCategory === 'jewellery' && activeJewellerySub !== 'all') {
        if (prod.subCategory !== activeJewellerySub) return false;
      }

      // Price filter
      if (prod.price > maxPrice) return false;

      // Planet / Deity filter
      if (selectedPlanetFilter !== 'all') {
        if (!prod.planetOrDeity.toLowerCase().includes(selectedPlanetFilter.toLowerCase())) {
          return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesSanskrit = prod.sanskritName.toLowerCase().includes(q);
        const matchesPlanet = prod.planetOrDeity.toLowerCase().includes(q);
        const matchesTag = prod.astrologyTag.toLowerCase().includes(q);
        const matchesIntention = prod.intention.toLowerCase().includes(q);
        const matchesMukhi = prod.mukhiCount ? `${prod.mukhiCount} mukhi`.includes(q) : false;
        if (!matchesName && !matchesSanskrit && !matchesPlanet && !matchesTag && !matchesIntention && !matchesMukhi) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, activeJewellerySub, maxPrice, selectedPlanetFilter, searchQuery]);

  // Featured for You Products
  const featuredProducts = useMemo(() => {
    return SHOPPING_PRODUCTS.filter((p) => p.isFeatured);
  }, []);

  // Distinct groups for 'all' tab
  const gemstoneProducts = useMemo(() => {
    return filteredProducts.filter((p) => p.category === 'gemstones');
  }, [filteredProducts]);

  const rudrakshaProducts = useMemo(() => {
    return filteredProducts.filter((p) => p.category === 'rudraksha');
  }, [filteredProducts]);

  const jewelleryProducts = useMemo(() => {
    return filteredProducts.filter((p) => p.category === 'jewellery');
  }, [filteredProducts]);

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-[#0b0c14] select-none text-[#ede8dc] relative overflow-hidden">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-emerald-500/90 text-white text-xs font-semibold shadow-xl shadow-black/40 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
          <Check className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =================================================================== */}
      {/* 1. SHOPPING HEADER                                                  */}
      {/* =================================================================== */}
      <div className="px-3.5 sm:px-6 pt-3 pb-2.5 bg-[#0e1019] border-b border-[#202538] space-y-2.5 shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-display font-bold text-base sm:text-lg text-[#fcedc5]">
                Shopping
              </h1>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[#dfb76c]/15 text-[#dfb76c] border border-[#dfb76c]/30">
                Sanctum Store
              </span>
            </div>
            <p className="text-[11px] text-[#8e8779] leading-tight mt-0.5 max-w-sm">
              Find gemstones, rudraksha and astrology-inspired jewellery selected for your journey.
            </p>
          </div>

          {/* Cart Icon & Item Count */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-xl bg-[#141724] border border-[#2d344d] hover:border-[#dfb76c] active:scale-95 transition-all text-[#dfb76c] cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0 shadow-sm"
            title="Open Sanctum Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] text-[#0e1017] text-[9px] font-mono font-bold flex items-center justify-center shadow-xs">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar & Filter Toggle Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <Search className="w-3.5 h-3.5 text-[#7d7668] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gemstones, 5 mukhi, sapphire, rings..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#141726] border border-[#252c42] text-xs text-[#ede8dc] placeholder-[#6e685c] focus:outline-none focus:border-[#dfb76c] transition-colors min-h-[38px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 rounded-full text-[#8e8779] hover:text-[#ede8dc] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className={`p-2 rounded-xl border flex items-center justify-center cursor-pointer transition-colors min-h-[38px] min-w-[38px] ${
              selectedPlanetFilter !== 'all' || maxPrice < 50000
                ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#dfb76c]'
                : 'bg-[#141726] border-[#252c42] text-[#8e8779] hover:text-[#ede8dc]'
            }`}
            title="Filter products"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* =================================================================== */}
        {/* 2. CATEGORY NAVIGATION PILLS                                       */}
        {/* =================================================================== */}
        <div className="pt-0.5 space-y-1.5">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            {[
              { id: 'all' as const, label: '✦ All Products' },
              { id: 'gemstones' as const, label: '💎 Gemstones' },
              { id: 'rudraksha' as const, label: '📿 Rudraksha' },
              { id: 'jewellery' as const, label: '💍 Jewellery' },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#dfb76c] to-[#c49746] text-[#0e1017] font-bold shadow-xs'
                      : 'bg-[#141724] border border-[#252c42] text-[#8e8779] hover:text-[#ede8dc]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Jewellery Subcategories (when Jewellery is selected) */}
          {activeCategory === 'jewellery' && (
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-0.5 pb-1 animate-in fade-in duration-200">
              <span className="text-[10px] text-[#8e8779] font-mono mr-1">Type:</span>
              {[
                { id: 'all' as const, label: 'All Jewellery' },
                { id: 'rings' as const, label: 'Rings' },
                { id: 'necklaces' as const, label: 'Necklaces & Malas' },
                { id: 'pendants' as const, label: 'Pendants' },
                { id: 'bracelets' as const, label: 'Bracelets' },
              ].map((sub) => {
                const isSubActive = activeJewellerySub === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setActiveJewellerySub(sub.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isSubActive
                        ? 'bg-[#1e2438] border border-[#dfb76c] text-[#fcedc5] font-semibold'
                        : 'bg-[#121421] border border-[#23293f] text-[#8e8779] hover:text-[#ede8dc]'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. SCROLLABLE CATALOG CONTENT                                      */}
      {/* =================================================================== */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3.5 sm:px-6 py-4 pb-24 space-y-6 scrollbar-thin">
        {/* ================================================================= */}
        {/* FEATURED FOR YOU CAROUSEL (Always shown at top if All or no search) */}
        {/* ================================================================= */}
        {activeCategory === 'all' && !searchQuery.trim() && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-display font-bold text-[#fcedc5]">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb76c]" />
                <span>Featured for You</span>
              </div>
              <span className="text-[10px] text-[#dfb76c] font-mono">
                Personalized for Libra Lagna
              </span>
            </div>

            {/* Horizontal Product Carousel */}
            <div className="flex items-stretch gap-3 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
              {featuredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className="w-48 sm:w-56 shrink-0 rounded-2xl bg-gradient-to-b from-[#181d30] via-[#121524] to-[#0e1019] border border-[#dfb76c]/30 hover:border-[#dfb76c]/60 p-3.5 flex flex-col justify-between cursor-pointer active:scale-95 transition-all shadow-md group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono uppercase text-[#dfb76c] px-2 py-0.5 rounded-full bg-[#dfb76c]/15 border border-[#dfb76c]/25">
                      ✦ Recommended
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Kashi Seal</span>
                  </div>

                  <div className="my-2 flex justify-center group-hover:scale-105 transition-transform">
                    <ShoppingProductArtwork product={prod} size="md" />
                  </div>

                  <div className="space-y-1 mt-2">
                    <h4 className="font-display font-semibold text-xs text-[#fcedc5] truncate">
                      {prod.name}
                    </h4>
                    <p className="text-[10px] text-[#8e8779] truncate font-serif-luxury italic">
                      {prod.sanskritName}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#1e2337]">
                      <span className="font-display font-bold text-xs text-[#fcedc5]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10.5px] text-[#dfb76c] font-semibold group-hover:underline">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Results Count */}
        <div className="flex items-center justify-between text-xs text-[#8e8779] pt-1">
          <span>Showing {filteredProducts.length} sacred items</span>
          {(selectedPlanetFilter !== 'all' || maxPrice < 50000 || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedPlanetFilter('all');
                setMaxPrice(50000);
                setSearchQuery('');
              }}
              className="text-[10.5px] text-[#dfb76c] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* ================================================================= */}
        {/* VIEW MODE 1: ALL TAB (Grouped by Gemstones, Rudraksha, Jewellery) */}
        {/* ================================================================= */}
        {activeCategory === 'all' && (
          <div className="space-y-7">
            {/* 1. Gemstones Group */}
            {gemstoneProducts.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#1f2438] pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">💎</span>
                    <h3 className="font-display font-bold text-sm text-[#fcedc5]">
                      Navaratna Gemstones
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('gemstones')}
                    className="text-xs text-[#dfb76c] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All ({gemstoneProducts.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {gemstoneProducts.map((prod) => (
                    <ShoppingProductCard
                      key={prod.id}
                      product={prod}
                      onSelect={(p) => setSelectedProduct(p)}
                      onAddToCart={(p, e) => {
                        e.stopPropagation();
                        handleAddToCart(p);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 2. Rudraksha Group */}
            {rudrakshaProducts.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#1f2438] pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📿</span>
                    <h3 className="font-display font-bold text-sm text-[#fcedc5]">
                      Sacred Mukhi Rudraksha
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('rudraksha')}
                    className="text-xs text-[#dfb76c] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All ({rudrakshaProducts.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {rudrakshaProducts.map((prod) => (
                    <ShoppingProductCard
                      key={prod.id}
                      product={prod}
                      onSelect={(p) => setSelectedProduct(p)}
                      onAddToCart={(p, e) => {
                        e.stopPropagation();
                        handleAddToCart(p);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 3. Jewellery Group */}
            {jewelleryProducts.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#1f2438] pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">💍</span>
                    <h3 className="font-display font-bold text-sm text-[#fcedc5]">
                      Astrology Jewellery & Rings
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveCategory('jewellery')}
                    className="text-xs text-[#dfb76c] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All ({jewelleryProducts.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {jewelleryProducts.map((prod) => (
                    <ShoppingProductCard
                      key={prod.id}
                      product={prod}
                      onSelect={(p) => setSelectedProduct(p)}
                      onAddToCart={(p, e) => {
                        e.stopPropagation();
                        handleAddToCart(p);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW MODE 2: SPECIFIC CATEGORY TAB (Full Flat Grid)              */}
        {/* ================================================================= */}
        {activeCategory !== 'all' && (
          <div className="space-y-4">
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center text-[#8e8779] space-y-2">
                <p className="text-sm">No products found matching your filter criteria.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedPlanetFilter('all');
                    setMaxPrice(50000);
                  }}
                  className="text-xs text-[#dfb76c] hover:underline"
                >
                  Clear search and filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map((prod) => (
                  <ShoppingProductCard
                    key={prod.id}
                    product={prod}
                    onSelect={(p) => setSelectedProduct(p)}
                    onAddToCart={(p, e) => {
                      e.stopPropagation();
                      handleAddToCart(p);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* 4. MODALS & DRAWERS                                                 */}
      {/* =================================================================== */}

      {/* Product Detail Modal */}
      <ShoppingProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, metal, size) => handleAddToCart(prod, metal, size)}
        onBuyNow={(prod, metal, size) => handleBuyNow(prod, metal, size)}
      />

      {/* Slide-out Cart Drawer */}
      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckoutFromCart}
      />

      {/* Checkout & Payment Modal */}
      <ShoppingCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        singleProduct={checkoutDirectProduct}
        cartItems={cartItems}
        selectedMetal={checkoutMetal}
        selectedSize={checkoutSize}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setIsFilterModalOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-[#121422] border border-[#dfb76c]/30 rounded-2xl p-4 space-y-4 shadow-2xl z-10 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#23293f] pb-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#dfb76c]" />
                <h3 className="font-display font-bold text-xs text-[#fcedc5]">
                  Filter Sanctum Products
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 rounded-full text-[#8e8779] hover:text-[#ede8dc]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#cdc7ba]">
                <span>Maximum Price:</span>
                <span className="font-mono text-[#dfb76c] font-bold">
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
                className="w-full accent-[#dfb76c] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8e8779] font-mono">
                <span>₹1,000</span>
                <span>₹50,000+</span>
              </div>
            </div>

            {/* Planet / Deity Filter */}
            <div className="space-y-1.5">
              <label className="text-xs text-[#cdc7ba] block">Ruling Planet / Deity</label>
              <select
                value={selectedPlanetFilter}
                onChange={(e) => setSelectedPlanetFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#181c2d] border border-[#2b334d] text-xs text-[#ede8dc] outline-none"
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
                <option value="Laxmi">Goddess Mahalaxmi</option>
                <option value="Ganesha">Lord Ganesha</option>
                <option value="Hanuman">Lord Hanuman</option>
              </select>
            </div>

            <div className="pt-2 border-t border-[#23293f] flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMaxPrice(50000);
                  setSelectedPlanetFilter('all');
                }}
                className="flex-1 py-2 rounded-xl bg-[#181c2d] text-[#8e8779] hover:text-[#ede8dc] text-xs font-semibold cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#c49746] text-[#0e1017] text-xs font-bold shadow-xs cursor-pointer"
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
