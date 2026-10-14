import React, { useState, useEffect, useRef } from 'react';
import {
  Package,
  ArrowRight,
  CheckCircle2,
  Truck,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { OrderDetails } from '../../types/astrology';
import { FEATURED_GEMSTONES } from '../../data/astrologyData';
import { ShoppingView } from './ShoppingView';

interface OrdersScreenProps {
  currentOrder: OrderDetails | null;
  onTrackOrder: (order: OrderDetails) => void;
  onOpenProfile: () => void;
  onNewOrderCreated?: (order: OrderDetails) => void;
}

export type OrdersPageTab = 'shopping' | 'cart' | 'all' | 'processing' | 'shipped' | 'delivered';

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  currentOrder,
  onTrackOrder,
  onOpenProfile,
  onNewOrderCreated,
}) => {
  // Default tab MUST be 'shopping' as requested
  const [activeTab, setActiveTab] = useState<OrdersPageTab>('shopping');
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll the active pill into view when tab changes
  useEffect(() => {
    if (activePillRef.current) {
      activePillRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeTab]);

  // Curated list of user's past and active orders
  const [ordersList, setOrdersList] = useState<any[]>([
    ...(currentOrder
      ? [
          {
            ...currentOrder,
            statusLabel:
              currentOrder.currentStatus === 'dispatched'
                ? 'Shipped via Secure Transit'
                : currentOrder.currentStatus === 'delivered'
                ? 'Delivered & Consecrated'
                : 'Pooja in Progress',
            statusCategory:
              currentOrder.currentStatus === 'dispatched'
                ? 'shipped'
                : currentOrder.currentStatus === 'delivered'
                ? 'delivered'
                : 'processing',
            courier: 'BlueDart Air Express (Insured)',
            trackingNumber: 'BD-VEDA-884210',
            estimatedDelivery: 'Friday, Oct 3',
            date: 'Today, 10:14 AM',
          },
        ]
      : []),
    {
      orderId: 'KS48190',
      gemstone: FEATURED_GEMSTONES['blue-sapphire'],
      selectedMetal: 'Pure 925 Sterling Silver',
      ringSize: '19 (Indian Standard)',
      sankalpName: 'Devanand Sharma',
      sankalpGotra: 'Kashyapa',
      shippingAddress: {
        fullName: 'Devanand Sharma',
        phone: '+91 98201 44820',
        street: 'Flat 402, Suryavanshi Heights, C-Scheme',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001',
      },
      pricing: {
        gemstonePrice: 58000,
        metalPremium: 3500,
        consecrationCharge: 0,
        labCertCharge: 0,
        shipping: 0,
        discount: 0,
        totalAmount: 61500,
      },
      paymentMethod: 'UPI (Google Pay)',
      paymentId: 'PAY-VEDA-77192',
      orderTimestamp: '12 Sept 2026',
      currentStatus: 'shipped',
      statusLabel: 'Shipped via Secure Transit',
      statusCategory: 'shipped',
      courier: 'Sequel Secure Armored Logistics',
      trackingNumber: 'SEQL-992014-IN',
      estimatedDelivery: 'Tomorrow, by 6:00 PM',
      muhuratDate: '15 Sept 2026',
      muhuratTime: 'Twilight (Shaniwar)',
      date: '12 Sept 2026',
    },
    {
      orderId: 'KS47812',
      gemstone: {
        id: 'emerald-zambia-320',
        name: 'Zambian Natural Emerald (Panna)',
        sanskritName: 'Marakata Ratna',
        weightRatti: 3.20,
        weightCarat: 2.95,
        origin: 'Kagem Mines, Zambia',
        treatment: '100% Natural, Unoiled',
        shape: 'Octagonal Step Cut',
        colorGrade: 'Vivid Forest Green',
        rulingPlanet: 'Budha (Mercury)',
        deity: 'Lord Budha',
        beejMantra: 'ॐ बुं बुधाय नमः',
        basePrice: 32000,
        consecrationFee: 3000,
        certificationBody: 'IGI-GTL Recognized Laboratory',
        reportNumber: 'IGI-2026-EM-3810',
        benefits: ['Intellect & business clarity', 'Effective communication'],
        idealMetal: '18K Yellow Gold',
        wearingDay: 'Wednesday Sunrise',
        wearingFinger: 'Little Finger',
        description: 'Natural untreated emerald consecrated with 108 Budha Gayatris in Varanasi.',
      },
      selectedMetal: '18K Hallmarked Yellow Gold',
      ringSize: '18 (Indian Standard)',
      sankalpName: 'Devanand Sharma',
      sankalpGotra: 'Kashyapa',
      shippingAddress: {
        fullName: 'Devanand Sharma',
        phone: '+91 98201 44820',
        street: 'Flat 402, Suryavanshi Heights, C-Scheme',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001',
      },
      pricing: {
        gemstonePrice: 32000,
        metalPremium: 4200,
        consecrationCharge: 0,
        labCertCharge: 0,
        shipping: 0,
        discount: 0,
        totalAmount: 36200,
      },
      paymentMethod: 'NetBanking (HDFC Bank)',
      paymentId: 'PAY-HDFC-99120',
      orderTimestamp: '02 Aug 2026',
      currentStatus: 'delivered',
      statusLabel: 'Delivered & Consecrated',
      statusCategory: 'delivered',
      courier: 'BlueDart Express',
      trackingNumber: 'BD-991823-DEL',
      estimatedDelivery: 'Delivered on 07 Aug 2026',
      muhuratDate: '05 Aug 2026',
      muhuratTime: '06:12 AM - 07:30 AM',
      date: '02 Aug 2026',
    },
  ]);

  // Sync if currentOrder changes from parent
  useEffect(() => {
    if (currentOrder) {
      setOrdersList((prev) => {
        const exists = prev.some((o) => o.orderId === currentOrder.orderId);
        if (exists) return prev;
        return [
          {
            ...currentOrder,
            statusLabel:
              currentOrder.currentStatus === 'dispatched'
                ? 'Shipped via Secure Transit'
                : currentOrder.currentStatus === 'delivered'
                ? 'Delivered & Consecrated'
                : 'Pooja in Progress',
            statusCategory:
              currentOrder.currentStatus === 'dispatched'
                ? 'shipped'
                : currentOrder.currentStatus === 'delivered'
                ? 'delivered'
                : 'processing',
            courier: 'BlueDart Air Express (Insured)',
            trackingNumber: 'BD-VEDA-884210',
            estimatedDelivery: 'Friday, Oct 3',
            date: 'Today, 10:14 AM',
          },
          ...prev,
        ];
      });
    }
  }, [currentOrder]);

  // Handle new order placed from shopping view
  const handleNewOrderPlaced = (newOrder: OrderDetails) => {
    const formatted = {
      ...newOrder,
      statusLabel: 'Pooja in Progress',
      statusCategory: 'processing',
      courier: 'BlueDart Air Express (Insured)',
      trackingNumber: `BD-VEDA-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: 'In 3-5 business days',
      date: 'Just now',
    };
    setOrdersList((prev) => [formatted, ...prev]);
    onNewOrderCreated?.(formatted);
  };

  // The order pills: Shopping / Products (first & default), Cart / Bag, All Orders, Processing, Shipped, Delivered
  const tabs = [
    { id: 'shopping' as const, label: 'Shopping / Worlds' },
    { id: 'cart' as const, label: 'Cart / Bag' },
    { id: 'all' as const, label: 'All Orders' },
    { id: 'processing' as const, label: 'Processing' },
    { id: 'shipped' as const, label: 'Shipped' },
    { id: 'delivered' as const, label: 'Delivered' },
  ];

  const filteredOrders = ordersList.filter((o) => {
    if (activeTab === 'all') return true;
    return o.statusCategory === activeTab;
  });

  return (
    <div className="w-full h-full min-h-0 flex flex-col bg-[#0b0c14] select-none text-[#ede8dc] relative overflow-hidden animate-page-enter">
      {/* =================================================================== */}
      {/* 1. ORDERS SCREEN APP BAR                                            */}
      {/* =================================================================== */}
      <header className="shrink-0 sticky top-0 z-30 bg-[#0e1019]/96 backdrop-blur-md border-b border-[#dfb76c]/15 px-3.5 sm:px-6 py-2.5 flex items-center justify-between min-h-[56px]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 flex items-center justify-center shadow-xs">
            <div className="w-full h-full rounded-full bg-[#121422] flex items-center justify-center font-display text-xs font-bold text-[#dfb76c]">
              📦
            </div>
          </div>
          <div>
            <h1 className="font-display font-bold text-sm tracking-wide text-[#fcedc5]">
              Orders & Sanctum Store
            </h1>
            <p className="text-[10px] text-[#8e8779] font-serif-luxury italic">
              Vedic Consecrations & Mineralogical Shipments
            </p>
          </div>
        </div>

        {/* Profile access in header */}
        <button
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
          title="Open Profile"
        >
          <div className="w-full h-full rounded-full bg-[#161824] flex items-center justify-center text-xs font-bold text-[#dfb76c]">
            D
          </div>
        </button>
      </header>

      {/* =================================================================== */}
      {/* 2. FIVE ORDER PILLS (Shopping / Products Default + 4 Status Pills)  */}
      {/* =================================================================== */}
      <div className="shrink-0 px-3.5 sm:px-6 pt-3 pb-2.5 border-b border-[#1b2034] bg-[#0c0e18]">
        <div
          ref={pillsContainerRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-none scroll-smooth pb-0.5"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={isActive ? activePillRef : null}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#dfb76c] text-[#0e1017] font-semibold shadow-xs'
                    : 'bg-[#141726] border border-[#252c42] text-[#8e8779] hover:text-[#ede8dc] hover:border-[#dfb76c]/30'
                }`}
              >
                {tab.id === 'shopping' && (
                  <Sparkles className={`w-3 h-3 ${isActive ? 'text-[#0e1017]' : 'text-[#dfb76c]'}`} />
                )}
                {tab.id === 'cart' && (
                  <ShoppingBag className={`w-3 h-3 ${isActive ? 'text-[#0e1017]' : 'text-[#dfb76c]'}`} />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. TAB CONTENT                                                      */}
      {/* =================================================================== */}
      {activeTab === 'shopping' ? (
        <ShoppingView
          onOrderCreated={handleNewOrderPlaced}
          onNavigateToOrders={() => setActiveTab('all')}
        />
      ) : activeTab === 'cart' ? (
        <ShoppingView
          key="cart-view"
          initialShowCart={true}
          onOrderCreated={handleNewOrderPlaced}
          onNavigateToOrders={() => setActiveTab('all')}
        />
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 sm:px-6 py-4 pb-24 space-y-3.5 scrollbar-none">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, idx) => {
              const isProcessing = order.statusCategory === 'processing';
              const isShipped = order.statusCategory === 'shipped';
              const isDelivered = order.statusCategory === 'delivered';

              return (
                <div
                  key={`${order.orderId}-${idx}`}
                  className="p-4 rounded-2xl bg-[#121524]/95 border border-[#dfb76c]/20 hover:border-[#dfb76c]/35 transition-all shadow-lg shadow-black/30 space-y-3 group"
                >
                  {/* Header row: Order ID, Date, Status */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#dfb76c] uppercase block">
                        Order #{order.orderId} · {order.date}
                      </span>
                      <h3 className="font-semibold text-xs sm:text-sm text-[#fcedc5] mt-0.5">
                        {order.gemstone?.name || 'Sanctum Consecrated Item'}
                      </h3>
                      <p className="text-[11px] text-[#8e8779] font-serif-luxury italic">
                        {order.selectedMetal || 'Consecrated'} {order.gemstone?.origin ? `· ${order.gemstone.origin.split(',')[0]}` : ''}
                      </p>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1.5 shrink-0 border ${
                        isProcessing
                          ? 'bg-amber-500/15 border-amber-500/35 text-amber-300'
                          : isShipped
                          ? 'bg-sky-500/15 border-sky-500/35 text-sky-300'
                          : 'bg-emerald-500/15 border-emerald-500/35 text-emerald-300'
                      }`}
                    >
                      {isProcessing && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                      {isShipped && <Truck className="w-3 h-3 text-sky-400" />}
                      {isDelivered && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      <span>{order.statusLabel}</span>
                    </span>
                  </div>

                  {/* Consecration & Muhurat Context Box */}
                  <div className="p-3 rounded-xl bg-[#161a2c] border border-[#272f48] space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-[#8e8779]">
                      <span>Sankalp Native:</span>
                      <span className="text-[#ede8dc] font-medium">
                        {order.sankalpName || 'Devanand Sharma'} ({order.sankalpGotra || 'Kashyapa'} Gotra)
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#8e8779]">
                      <span>Muhurat Consecration:</span>
                      <span className="text-[#dfb76c] font-medium">
                        {order.muhuratDate || 'Upcoming Muhurat'}, {order.muhuratTime || 'Sunrise'}
                      </span>
                    </div>
                    {order.gemstone?.reportNumber && (
                      <div className="flex justify-between items-center text-[#8e8779]">
                        <span>Lab Certificate:</span>
                        <span className="text-emerald-400 font-mono text-[10.5px]">
                          {order.gemstone.reportNumber}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Total Price & Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#1c2136]">
                    <div>
                      <span className="text-[10px] text-[#8e8779] block">Total Amount Paid</span>
                      <span className="font-display font-bold text-sm sm:text-base text-[#fcedc5] font-mono">
                        ₹{(order.pricing?.totalAmount || 0).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTrackOrder(order as any)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#dfb76c] hover:bg-[#fcedc5] text-[#0e1017] font-semibold text-xs active:scale-95 transition-transform flex items-center gap-1 shadow-sm cursor-pointer"
                      >
                        <span>Track Order</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-10 text-center text-[#8e8779] space-y-4">
              <Package className="w-10 h-10 mx-auto text-[#dfb76c]/40" />
              <p className="text-xs">No orders found in this category.</p>
              <button
                onClick={() => setActiveTab('shopping')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#dfb76c] text-[#0e1017] text-xs font-semibold hover:bg-[#fcedc5] transition-all cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Sanctum Store</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
