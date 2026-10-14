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

// Flipkart-inspired components
import {
  FlipkartCategoryStrip,
  CategoryFilterId,
} from './flipkart/FlipkartCategoryStrip';
import { FlipkartPromoBanner } from './flipkart/FlipkartPromoBanner';
import { FlipkartShoppingHeader } from './flipkart/FlipkartShoppingHeader';
import { NavratriDealsSection } from './flipkart/NavratriDealsSection';
import { MonthEndDealsSection } from './flipkart/MonthEndDealsSection';
import { TwoDealsSection } from './flipkart/TwoDealsSection';
import { ValueForMoneySection } from './flipkart/ValueForMoneySection';
import { MarketplaceProductCard } from './flipkart/MarketplaceProductCard';

import {
  Check,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  ShieldCheck,
  ChevronRight,
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
  // Navigation & Category Filtering
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [selectedPlanetFilter, setSelectedPlanetFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

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
    e?: React.MouseEvent,
    selectedMetal: string = 'Sacred Panchdhatu',
    selectedSize: string = '18'
  ) => {
    if (e) e.stopPropagation();
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

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    const list = SHOPPING_PRODUCTS.filter((prod) => {
      if (prod.price > maxPrice) return false;

      // Category matching
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'gemstones' && prod.category !== 'gemstones') return false;
        if (selectedCategory === 'rudraksha' && prod.category !== 'rudraksha') return false;
        if (selectedCategory === 'jewellery' && (prod.category !== 'jewellery' || prod.subCategory !== 'rings')) return false;
        if (selectedCategory === 'malas' && (prod.category !== 'jewellery' || (prod.subCategory !== 'necklaces' && prod.subCategory !== 'bracelets'))) return false;
        if (selectedCategory === 'crystals' && !prod.intention.toLowerCase().includes('crystal') && !prod.sanskritName.toLowerCase().includes('sphatik')) {
          // If not explicit crystal, match pearl/sphatik/clear gemstones
          if (prod.gemType !== 'pearl' && prod.gemType !== 'diamond') return false;
        }
        if (selectedCategory === 'vastu' && !prod.intention.toLowerCase().includes('protection') && !prod.planetOrDeity.toLowerCase().includes('vastu') && !prod.benefits.some(b => b.toLowerCase().includes('vastu') || b.toLowerCase().includes('protection'))) {
          return false;
        }
        if (selectedCategory === 'gifting' && prod.price > 8000) return false;
      }

      // Planet filter
      if (selectedPlanetFilter !== 'all') {
        if (!prod.planetOrDeity.toLowerCase().includes(selectedPlanetFilter.toLowerCase())) {
          return false;
        }
      }

      // Search Query
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

    // Sorting
    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [maxPrice, selectedPlanetFilter, searchQuery, selectedCategory, sortBy]);

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  const isSearchOrCategoryActive = searchQuery.trim() !== '' || selectedCategory !== 'all';

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
      {/* 1. FLIPKART-STYLE STICKY MARKETPLACE HEADER                        */}
      {/* =================================================================== */}
      <FlipkartShoppingHeader
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setIsCartPageOpen(false);
          setSearchQuery(q);
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartPageOpen(true)}
        onNavigateToOrders={onNavigateToOrders}
        onOpenFilter={() => setIsFilterModalOpen(true)}
        isFilterActive={maxPrice < 50000 || selectedPlanetFilter !== 'all'}
      />

      {/* =================================================================== */}
      {/* 2. HORIZONTAL CATEGORY NAVIGATION STRIP                            */}
      {/* =================================================================== */}
      {!isCartPageOpen && (
        <FlipkartCategoryStrip
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            setIsCartPageOpen(false);
          }}
        />
      )}

      {/* =================================================================== */}
      {/* 3. CART PAGE OR MARKETPLACE SECTIONS                                */}
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
      ) : isSearchOrCategoryActive ? (
        /* ================================================================= */
        /* CATEGORY FILTERED OR SEARCH RESULTS VIEW                           */
        /* ================================================================= */
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4">
          {/* Header Bar with Breadcrumb, Clear, and Sorting */}
          <div className="p-3 sm:p-4 rounded-2xl bg-[#1C0E2E] border border-[#3E1F5A]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#9685AE] font-mono">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="hover:text-[#FFD76A] cursor-pointer"
                >
                  Sanctum Marketplace
                </button>
                <ChevronRight className="w-3 h-3 text-[#5A3B78]" />
                <span className="text-[#FFD76A] font-semibold capitalize">
                  {searchQuery.trim() ? `Search: "${searchQuery}"` : selectedCategory}
                </span>
              </div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-[#F7F0FF] mt-1">
                {searchQuery.trim()
                  ? `Search Results for "${searchQuery}"`
                  : `${selectedCategory.toUpperCase()} Catalogue`}
              </h2>
              <span className="text-xs text-[#C5B8D9]">
                Showing {filteredProducts.length} authentic consecrated items
              </span>
            </div>

            {/* Sort & Reset Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-[#26133C] px-2.5 py-1.5 rounded-xl border border-[#482868]/40 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#E7B743]" />
                <span className="text-[#9685AE] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-[#F7F0FF] focus:outline-none cursor-pointer text-xs"
                >
                  <option value="featured" className="bg-[#1C0E2E]">Featured</option>
                  <option value="price-asc" className="bg-[#1C0E2E]">Price: Low to High</option>
                  <option value="price-desc" className="bg-[#1C0E2E]">Price: High to Low</option>
                  <option value="rating" className="bg-[#1C0E2E]">Highest Rated</option>
                </select>
              </div>

              {(selectedCategory !== 'all' || searchQuery.trim() !== '') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#2D1644] hover:bg-[#3D1E5C] text-[#E7B743] border border-[#E7B743]/30 font-bold text-xs cursor-pointer transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center text-[#9685AE] space-y-3 bg-[#1C0E2E]/60 rounded-2xl border border-[#3E1F5A]/30 p-8">
              <Sparkles className="w-10 h-10 text-[#E7B743] mx-auto opacity-60" />
              <p className="text-sm">No items found matching your filter criteria.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setMaxPrice(50000);
                  setSelectedPlanetFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-[#E7B743] text-[#180C2A] font-bold text-xs cursor-pointer hover:bg-[#FFD76A] transition-colors"
              >
                View All Sacred Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {filteredProducts.map((product) => (
                <MarketplaceProductCard
                  key={product.id}
                  product={product}
                  onSelect={(p) => setSelectedProduct(p)}
                  onAddToCart={(p, e) => handleAddToCart(p, e)}
                  badgeType="deal"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ================================================================= */
        /* FULL FLIPKART-INSPIRED HOME MARKETPLACE VIEW                       */
        /* ================================================================= */
        <div className="w-full flex flex-col space-y-2 sm:space-y-4 pb-12">
          {/* Main Promotional Banner Carousel */}
          <FlipkartPromoBanner
            onCtaClick={(cat) => {
              if (cat && (cat === 'gemstones' || cat === 'rudraksha' || cat === 'jewellery')) {
                setSelectedCategory(cat as CategoryFilterId);
              }
            }}
          />

          {/* Section 1: Navratri Special Deals (horizontal carousel) */}
          <NavratriDealsSection
            products={filteredProducts}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, e) => handleAddToCart(p, e)}
            onViewAll={() => setSelectedCategory('gemstones')}
          />

          {/* Section 2: Month-End Deals (horizontal carousel) */}
          <MonthEndDealsSection
            products={filteredProducts}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, e) => handleAddToCart(p, e)}
            onViewAll={() => setSelectedCategory('rudraksha')}
          />

          {/* Section 3: Two Deals, Never Before (exactly 2 featured cards side-by-side) */}
          <TwoDealsSection
            products={filteredProducts}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, e) => handleAddToCart(p, e)}
            onBuyNow={(p) => handleBuyNow(p)}
          />

          {/* Section 4: Value for Money (high discoverability responsive grid) */}
          <ValueForMoneySection
            products={filteredProducts}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, e) => handleAddToCart(p, e)}
          />
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. MODALS, CART DRAWER & CHECKOUT                                   */}
      {/* =================================================================== */}
      {/* Product Detail Modal */}
      <ShoppingProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, metal, size) => {
          handleAddToCart(prod, undefined, metal, size);
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
          className="fixed inset-0 z-50 bg-[#12091F]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsFilterModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-[#24133B] border border-[#52297A]/50 p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#453052]/40 pb-3">
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

            {/* Planetary Energy Filter */}
            <div className="space-y-1.5">
              <label className="text-xs text-[#C5B8D9]">Planetary Affiliation</label>
              <select
                value={selectedPlanetFilter}
                onChange={(e) => setSelectedPlanetFilter(e.target.value)}
                className="w-full bg-[#1A0B2C] border border-[#482868]/60 rounded-xl px-3 py-2 text-xs text-[#F7F0FF] focus:outline-none focus:border-[#E7B743]"
              >
                <option value="all">All Planets & Deities</option>
                <option value="Jupiter">Brihaspati (Jupiter) - Wealth & Wisdom</option>
                <option value="Sun">Surya (Sun) - Authority & Vitality</option>
                <option value="Moon">Chandra (Moon) - Mental Peace & Intuition</option>
                <option value="Mars">Mangal (Mars) - Courage & Protection</option>
                <option value="Mercury">Budh (Mercury) - Intelligence & Trade</option>
                <option value="Venus">Shukra (Venus) - Love & Abundance</option>
                <option value="Saturn">Shani (Saturn) - Karma & Discipline</option>
                <option value="Rahu">Rahu - Illusion & Worldly Triumph</option>
                <option value="Ketu">Ketu - Moksha & Spiritual Sight</option>
                <option value="Shiva">Lord Shiva - Super-Consciousness</option>
              </select>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setMaxPrice(50000);
                  setSelectedPlanetFilter('all');
                }}
                className="flex-1 py-2 rounded-xl bg-[#2D1644] text-[#C5B8D9] text-xs font-semibold hover:text-[#F7F0FF] cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#E7B743] to-[#C99827] text-[#180C2A] text-xs font-bold shadow-md cursor-pointer"
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
