import React, { useState } from 'react';
import { ShoppingProduct } from '../../data/shoppingProductsData';
import { CartItem } from './ShoppingCartDrawer';
import { OrderDetails } from '../../types/astrology';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  Lock,
  ArrowRight,
  Sparkles,
  Package,
} from 'lucide-react';

interface ShoppingCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  singleProduct?: ShoppingProduct | null;
  cartItems?: CartItem[];
  selectedMetal?: string;
  selectedSize?: string;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const ShoppingCheckoutModal: React.FC<ShoppingCheckoutModalProps> = ({
  isOpen,
  onClose,
  singleProduct,
  cartItems = [],
  selectedMetal = 'Sacred Panchdhatu',
  selectedSize = '18',
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [createdOrder, setCreatedOrder] = useState<OrderDetails | null>(null);

  // Form State
  const [fullName, setFullName] = useState('Devanand Sharma');
  const [phone, setPhone] = useState('+91 98201 44820');
  const [gotra, setGotra] = useState('Kashyapa');
  const [street, setStreet] = useState('Flat 402, Suryavanshi Heights, C-Scheme');
  const [city, setCity] = useState('Jaipur');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('302001');

  // Calculate items and total
  const checkoutItems = singleProduct
    ? [
        {
          id: singleProduct.id,
          product: singleProduct,
          quantity: 1,
          selectedMetal,
          selectedSize,
        },
      ]
    : cartItems;

  const totalAmount = checkoutItems.reduce(
    (sum, it) => sum + it.product.price * it.quantity,
    0
  );

  const primaryProduct = checkoutItems[0]?.product;

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    const generatedOrderId = `KS${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: OrderDetails = {
      orderId: generatedOrderId,
      gemstone: {
        id: primaryProduct.id,
        name: primaryProduct.name,
        sanskritName: primaryProduct.sanskritName,
        weightRatti: 5.25,
        weightCarat: 4.82,
        origin: primaryProduct.origin,
        treatment: '100% Natural, Certified Authentic',
        shape: 'Vedic Consecrated Specimen',
        colorGrade: 'AAA Jyotish Grade',
        rulingPlanet: primaryProduct.planetOrDeity,
        deity: primaryProduct.planetOrDeity,
        beejMantra: primaryProduct.beejMantra || 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
        basePrice: primaryProduct.price,
        consecrationFee: 0,
        certificationBody: primaryProduct.certification,
        reportNumber: `IGI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        benefits: primaryProduct.benefits,
        idealMetal: selectedMetal,
        wearingDay: primaryProduct.wearingGuidance || 'Auspicious Sunrise',
        wearingFinger: 'Prescribed Astrological Placement',
        description: primaryProduct.description,
      },
      selectedMetal: (selectedMetal.toLowerCase().includes('gold')
        ? '18k_gold'
        : selectedMetal.toLowerCase().includes('silver')
        ? 'sterling_silver'
        : 'panchdhatu') as any,
      ringSize: `${selectedSize} (Indian Standard)`,
      sankalpName: fullName,
      sankalpGotra: gotra,
      shippingAddress: {
        fullName,
        phone,
        street,
        city,
        state,
        pincode,
      },
      pricing: {
        gemstonePrice: totalAmount,
        metalPremium: 0,
        consecrationCharge: 0,
        labCertCharge: 0,
        shipping: 0,
        discount: 0,
        totalAmount,
      },
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI (Google Pay / PhonePe)'
          : paymentMethod === 'card'
          ? 'Credit Card'
          : 'NetBanking (HDFC Bank)',
      paymentId: `PAY-VEDA-${Math.floor(10000 + Math.random() * 90000)}`,
      orderTimestamp: 'Today, Just now',
      currentStatus: 'pooja_in_progress',
      muhuratDate: 'Upcoming Shukla Paksha Muhurat',
      muhuratTime: 'Sunrise Hour (06:15 AM - 07:30 AM)',
    };

    setTimeout(() => {
      setCreatedOrder(newOrder);
      setStep('success');
      onOrderSuccess(newOrder);
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => {
          if (step !== 'processing') onClose();
        }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0e1019] border border-[#dfb76c]/30 rounded-3xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-[#222739] flex items-center justify-between bg-[#121422]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#dfb76c]" />
            <h2 className="font-display font-bold text-sm text-[#fcedc5]">
              {step === 'success'
                ? 'Consecration Order Confirmed'
                : 'Sanctum Checkout & Vedic Sankalp'}
            </h2>
          </div>

          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#181c2b] text-[#8e8779] hover:text-[#ede8dc] border border-[#2b334d] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin">
          {/* STEP 1: FORM */}
          {step === 'form' && (
            <form id="checkout-form" onSubmit={handleSubmitPayment} className="space-y-4">
              {/* Order summary banner */}
              <div className="p-3 rounded-2xl bg-[#141724] border border-[#252c42] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8e8779] font-mono uppercase block">
                    Total Payable Amount
                  </span>
                  <span className="font-display font-bold text-lg text-[#fcedc5]">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right text-[11px] text-[#dfb76c] font-mono">
                  <span>{checkoutItems.length} item(s)</span>
                  <span className="block text-[9.5px] text-emerald-400">Armored Delivery</span>
                </div>
              </div>

              {/* Vedic Sankalp Information */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#dfb76c] uppercase tracking-wider block">
                  ✦ Vedic Sankalp Details (For Peeth Recitation)
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10.5px] text-[#8e8779] block mb-1">Devotee Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#131625] border border-[#252c42] text-xs text-[#ede8dc] outline-none focus:border-[#dfb76c]"
                    />
                  </div>
                  <div>
                    <label className="text-[10.5px] text-[#8e8779] block mb-1">Janma Gotra</label>
                    <input
                      type="text"
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      placeholder="e.g. Kashyapa, Bharadwaj"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#131625] border border-[#252c42] text-xs text-[#ede8dc] outline-none focus:border-[#dfb76c]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#8e8779] uppercase tracking-wider block">
                  Delivery Destination
                </span>
                <div>
                  <label className="text-[10.5px] text-[#8e8779] block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-[#131625] border border-[#252c42] text-xs text-[#ede8dc] outline-none focus:border-[#dfb76c]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10.5px] text-[#8e8779] block mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full px-2.5 py-2 rounded-xl bg-[#131625] border border-[#252c42] text-xs text-[#ede8dc] outline-none focus:border-[#dfb76c]"
                    />
                  </div>
                  <div>
                    <label className="text-[10.5px] text-[#8e8779] block mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="w-full px-2.5 py-2 rounded-xl bg-[#131625] border border-[#252c42] text-xs text-[#ede8dc] outline-none focus:border-[#dfb76c]"
                    />
                  </div>
                  <div>
                    <label className="text-[10.5px] text-[#8e8779] block mb-1">Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                      className="w-full px-2.5 py-2 rounded-xl bg-[#131625] border border-[#252c42] text-xs text-[#ede8dc] outline-none focus:border-[#dfb76c]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods (Razorpay Integration Simulation) */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#8e8779] uppercase tracking-wider block">
                  Select Payment Method
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'bg-[#1e2438] border-[#dfb76c] text-[#dfb76c]'
                        : 'bg-[#121524] border-[#252c42] text-[#8e8779] hover:text-[#ede8dc]'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span className="text-[11px] font-semibold">UPI / GPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#1e2438] border-[#dfb76c] text-[#dfb76c]'
                        : 'bg-[#121524] border-[#252c42] text-[#8e8779] hover:text-[#ede8dc]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-[11px] font-semibold">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'netbanking'
                        ? 'bg-[#1e2438] border-[#dfb76c] text-[#dfb76c]'
                        : 'bg-[#121524] border-[#252c42] text-[#8e8779] hover:text-[#ede8dc]'
                    }`}
                  >
                    <Landmark className="w-5 h-5" />
                    <span className="text-[11px] font-semibold">NetBanking</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: PROCESSING (Razorpay Auth) */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in">
              <div className="relative w-16 h-16">
                <div className="w-16 h-16 rounded-full border-4 border-[#252c42] border-t-[#dfb76c] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold text-[#dfb76c]">
                  ✦
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-[#fcedc5]">
                  Authorizing Razorpay Gateway...
                </h3>
                <p className="text-xs text-[#8e8779] max-w-xs">
                  Connecting with Kashi Vishwanath Sanctum Merchant Escrow. Please do not close or refresh.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && createdOrder && (
            <div className="py-4 space-y-4 animate-in zoom-in-95 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#dfb76c] uppercase tracking-wider">
                  Payment Verified · Order #{createdOrder.orderId}
                </span>
                <h3 className="font-display font-bold text-lg text-[#fcedc5]">
                  Consecration Scheduled in Varanasi
                </h3>
                <p className="text-xs text-[#8e8779] max-w-sm mx-auto">
                  Sankalp booked for {createdOrder.sankalpName} ({createdOrder.sankalpGotra} Gotra). Your order has been added to your Active Orders list.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#141724] border border-[#23293f] text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#1f2438] pb-1.5">
                  <span className="text-[#8e8779]">Consecration Muhurat</span>
                  <span className="text-[#dfb76c] font-medium">{createdOrder.muhuratDate}</span>
                </div>
                <div className="flex justify-between border-b border-[#1f2438] pb-1.5">
                  <span className="text-[#8e8779]">Item</span>
                  <span className="text-[#ede8dc] font-medium">{createdOrder.gemstone.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e8779]">Total Paid</span>
                  <span className="text-[#fcedc5] font-bold font-mono">
                    ₹{createdOrder.pricing.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222739] bg-[#121422] flex items-center justify-between">
          {step === 'form' && (
            <>
              <div className="flex items-center gap-1.5 text-[10px] text-[#8e8779]">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit Escrow Secured</span>
              </div>
              <button
                type="submit"
                form="checkout-form"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] hover:from-[#fcedc5] hover:to-[#dfb76c] text-[#0e1017] font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Authorize ₹{totalAmount.toLocaleString('en-IN')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'success' && (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#dfb76c] to-[#f59e0b] text-[#0e1017] font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>View in Orders Tab</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
