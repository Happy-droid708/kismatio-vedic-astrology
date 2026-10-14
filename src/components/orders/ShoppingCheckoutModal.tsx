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
  Lock,
  ArrowRight,
  Package,
} from 'lucide-react';

interface ShoppingCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  singleProduct?: ShoppingProduct | null;
  directProduct?: ShoppingProduct | null;
  cartItems?: CartItem[];
  selectedMetal?: string;
  initialMetal?: string;
  selectedSize?: string;
  initialRingSize?: string;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const ShoppingCheckoutModal: React.FC<ShoppingCheckoutModalProps> = ({
  isOpen,
  onClose,
  singleProduct,
  directProduct,
  cartItems = [],
  selectedMetal = 'Sacred Panchdhatu',
  initialMetal,
  selectedSize = '18',
  initialRingSize,
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

  const resolvedSingleProduct = singleProduct || directProduct || null;
  const resolvedMetal = initialMetal || selectedMetal || 'Sacred Panchdhatu';
  const resolvedSize = initialRingSize || selectedSize || '18';

  // Calculate items and total
  const checkoutItems: CartItem[] = resolvedSingleProduct
    ? [
        {
          id: resolvedSingleProduct.id,
          product: resolvedSingleProduct,
          quantity: 1,
          selectedMetal: resolvedMetal,
          selectedSize: resolvedSize,
        },
      ]
    : cartItems && cartItems.length > 0
    ? cartItems
    : [];

  const totalAmount = checkoutItems.reduce(
    (sum, it) => sum + (it.product ? it.product.price * it.quantity : 0),
    0
  );

  const primaryProduct = checkoutItems[0]?.product;

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!primaryProduct) return;

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
        idealMetal: resolvedMetal,
        wearingDay: primaryProduct.wearingGuidance || 'Auspicious Sunrise',
        wearingFinger: 'Prescribed Astrological Placement',
        description: primaryProduct.description,
      },
      selectedMetal: (resolvedMetal.toLowerCase().includes('gold')
        ? '18k_gold'
        : resolvedMetal.toLowerCase().includes('silver')
        ? 'sterling_silver'
        : 'panchdhatu') as any,
      ringSize: `${resolvedSize} (Indian Standard)`,
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
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#12091F]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#24133B] border border-transparent clay-float rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#453052]/30 flex items-center justify-between bg-[#2B173C]/60 backdrop-blur-xs">
          <div>
            <h2 className="font-serif-luxury font-bold text-sm sm:text-base text-[#F7F0FF]">
              {step === 'success' ? 'Consecration Confirmed' : 'Sacred Gotra Checkout'}
            </h2>
            <p className="text-[10px] text-[#9685AE] font-mono">
              Vedic Consecration & Secured Transit
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9685AE] hover:text-[#F7F0FF] hover:bg-[#352044] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin">
          {/* STEP 1: FORM */}
          {step === 'form' && (
            <form id="checkout-form" onSubmit={handleSubmitPayment} className="space-y-4">
              {/* Items summary chip */}
              <div className="p-3 rounded-2xl bg-[#180D2B] border border-transparent clay-surface space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E7B743] block">
                  Items In Checkout ({checkoutItems.length})
                </span>
                <div className="space-y-1.5 max-h-28 overflow-y-auto scrollbar-none">
                  {checkoutItems.map((it) => (
                    <div key={it.id} className="flex justify-between items-center text-xs">
                      <span className="text-[#F7F0FF] truncate max-w-[240px]">
                        {it.product.name} (x{it.quantity})
                      </span>
                      <span className="font-mono font-bold text-[#FFD76A]">
                        ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vedic Gotra Sankalp Details */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E7B743] block">
                  1. Sacred Vedic Sankalp Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-[#C5B8D9] block mb-1">Native Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#180D2B] border border-transparent clay-input text-xs text-[#F7F0FF] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#C5B8D9] block mb-1">Sacred Gotra</label>
                    <input
                      type="text"
                      required
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#180D2B] border border-transparent clay-input text-xs text-[#F7F0FF] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Insured Delivery Address */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E7B743] block">
                  2. Armored Insured Shipping Address
                </span>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Street Address, Flat / House No."
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#180D2B] border border-transparent clay-input text-xs text-[#F7F0FF] outline-none"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#180D2B] border border-transparent clay-input text-xs text-[#F7F0FF] outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#180D2B] border border-transparent clay-input text-xs text-[#F7F0FF] outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#180D2B] border border-transparent clay-input text-xs text-[#F7F0FF] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E7B743] block">
                  3. Select Payment Mode
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi' as const, label: 'UPI (GPay)', icon: Smartphone },
                    { id: 'card' as const, label: 'Cards', icon: CreditCard },
                    { id: 'netbanking' as const, label: 'NetBanking', icon: Landmark },
                  ].map((m) => {
                    const isSelected = paymentMethod === m.id;
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2B173C] border-[#E7B743] text-[#FFD76A] shadow-sm'
                            : 'bg-[#180D2B] border-transparent text-[#9685AE] hover:text-[#F7F0FF]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] font-medium">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: PROCESSING */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in">
              <div className="relative w-16 h-16">
                <div className="w-16 h-16 rounded-full border-4 border-[#453052] border-t-[#E7B743] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold text-[#E7B743]">
                  ✦
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-luxury font-bold text-base text-[#F7F0FF]">
                  Connecting to Kashi Sanctum Escrow...
                </h3>
                <p className="text-xs text-[#9685AE] max-w-xs">
                  Authorizing 256-bit encrypted transaction. Please do not close this window.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && createdOrder && (
            <div className="py-4 space-y-4 animate-in zoom-in-95 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 text-[#00D6A0] mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#E7B743] uppercase tracking-wider">
                  Payment Verified · Order #{createdOrder.orderId}
                </span>
                <h3 className="font-serif-luxury font-bold text-lg text-[#F7F0FF]">
                  Vedic Consecration Scheduled in Varanasi
                </h3>
                <p className="text-xs text-[#C5B8D9] max-w-sm mx-auto font-light">
                  Sankalp registered for {createdOrder.sankalpName} ({createdOrder.sankalpGotra} Gotra).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#180D2B] border border-transparent clay-surface text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#453052]/30 pb-2">
                  <span className="text-[#9685AE]">Consecration Muhurat</span>
                  <span className="text-[#FFD76A] font-medium">{createdOrder.muhuratDate}</span>
                </div>
                <div className="flex justify-between border-b border-[#453052]/30 pb-2">
                  <span className="text-[#9685AE]">Selected Item</span>
                  <span className="text-[#F7F0FF] font-medium">{createdOrder.gemstone.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9685AE]">Total Amount Paid</span>
                  <span className="text-[#FFD76A] font-bold font-mono">
                    ₹{createdOrder.pricing.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#453052]/30 bg-[#2B173C]/60 flex items-center justify-between">
          {step === 'form' && (
            <>
              <div className="flex items-center gap-1.5 text-[10px] text-[#9685AE]">
                <Lock className="w-3.5 h-3.5 text-[#00D6A0]" />
                <span>256-Bit Escrow Secured</span>
              </div>
              <button
                type="submit"
                form="checkout-form"
                className="px-6 py-2.5 rounded-xl clay-button-primary text-[#180D2B] font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Authorize ₹{totalAmount.toLocaleString('en-IN')}</span>
                <ArrowRight className="w-4 h-4 text-[#180D2B]" />
              </button>
            </>
          )}

          {step === 'success' && (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-xl clay-button-primary text-[#180D2B] font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4 text-[#180D2B]" />
              <span>View in Orders Tab</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
