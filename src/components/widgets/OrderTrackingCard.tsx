import React, { useState } from 'react';
import { OrderDetails } from '../../types/astrology';
import { CheckCircle2, Award, ChevronRight, Sun, Calendar, MapPin, Sparkles } from 'lucide-react';
import { CelestialPill } from '../ui/CelestialPill';

interface OrderTrackingCardProps {
  order: OrderDetails;
  onAskAcharyaPostPurchase: (topic: string) => void;
  onClose?: () => void;
}

export const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({
  order,
  onAskAcharyaPostPurchase,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'tracking' | 'muhurat'>('tracking');
  const [selectedStatusStep, setSelectedStatusStep] = useState<string>('packed');

  const statusPills = [
    { id: 'confirmed', label: 'Confirmed', status: 'completed' as const },
    { id: 'packed', label: 'Packed & Consecrated', status: 'in_progress' as const },
    { id: 'shipped', label: 'Armored Dispatch', status: 'upcoming' as const },
    { id: 'delivered', label: 'Delivered', status: 'upcoming' as const },
  ];

  const steps = [
    {
      title: 'Gotra Sankalp Registered',
      description: `${order.sankalpGotra} Gotra recorded for ${order.sankalpName} at Kashi`,
      status: 'completed',
      time: 'Today 10:14 AM',
    },
    {
      title: 'Prana Pratishtha & 108 Japa',
      description: 'Consecration ritual conducted by senior Vedic archakas with Gangajal',
      status: 'in_progress',
      time: 'In Progress at Kashi Peeth',
    },
    {
      title: 'Sacred Setting & BIS Hallmarking',
      description: 'Forged in Panchdhatu (Size 18) by hereditary temple goldsmiths',
      status: 'upcoming',
      time: 'Tomorrow 11:30 AM',
    },
    {
      title: 'Insured Armored Courier Dispatch',
      description: 'Tamper-evident sacred casing dispatched with private tracking',
      status: 'upcoming',
      time: 'Expected Thursday',
    },
    {
      title: 'Sanctum Delivery & Unboxing',
      description: 'Delivered with holy Gangajal, raw turmeric, and IGI Certificate',
      status: 'upcoming',
      time: 'Estimated 2 Days',
    },
  ];

  return (
    <div className="my-2.5 p-3.5 sm:p-5 rounded-2xl bg-[#141724] border border-[#dfb76c]/40 shadow-2xl relative">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#252b3e]">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#dfb76c] font-bold block">
            Sanctum Order #{order.orderId}
          </span>
          <h4 className="text-xs sm:text-sm font-serif-luxury font-bold text-[#f5eedf]">
            {order.gemstone.name}
          </h4>
        </div>

        {/* Mobile Tab Pills */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#0e1017] border border-[#232739]">
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer min-h-[32px] ${
              activeTab === 'tracking' ? 'bg-[#222739] text-[#dfb76c]' : 'text-[#888173]'
            }`}
          >
            Tracker
          </button>
          <button
            onClick={() => setActiveTab('muhurat')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer min-h-[32px] ${
              activeTab === 'muhurat' ? 'bg-[#222739] text-[#dfb76c]' : 'text-[#888173]'
            }`}
          >
            Muhurat
          </button>
        </div>
      </div>

      {/* Section 12: Order Status Pills with progressive glow */}
      <div className="my-3 pb-2 border-b border-[#1e2336] overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[10px] text-[#787163] uppercase tracking-wider font-semibold mr-0.5">
            Status:
          </span>
          {statusPills.map((sp) => (
            <CelestialPill
              key={sp.id}
              variant="order-status"
              activeStatus={sp.status}
              isSelected={selectedStatusStep === sp.id}
              onClick={() => setSelectedStatusStep(sp.id)}
              className={`text-[11px] py-1 px-3 min-h-[30px] ${
                sp.status === 'in_progress' ? 'animate-progressive-glow' : ''
              }`}
            >
              {sp.label}
            </CelestialPill>
          ))}
        </div>
      </div>

      {activeTab === 'tracking' && (
        <div className="my-3 space-y-3">
          {/* Timeline steps */}
          <div className="relative pl-5 space-y-3.5 before:absolute before:left-2 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-[#252b3e]">
            {steps.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isInProgress = step.status === 'in_progress';
              return (
                <div key={idx} className="relative flex items-start gap-2.5">
                  {/* Dot */}
                  <div
                    className={`absolute -left-5 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        : isInProgress
                        ? 'bg-amber-500/20 text-[#dfb76c] border border-amber-500/60 animate-pulse'
                        : 'bg-[#181a26] text-[#4d536b] border border-[#2b3145]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h5 className={`text-[11px] font-bold ${isInProgress ? 'text-[#dfb76c]' : 'text-[#ede8dc]'}`}>
                        {step.title}
                      </h5>
                      <span className="text-[9px] text-[#787163] font-mono shrink-0">{step.time}</span>
                    </div>
                    <p className="text-[10px] text-[#9a9385] mt-0.5 leading-snug">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-2 rounded-xl bg-[#0c0d15] border border-[#202538] flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span className="text-[#cdc7ba]">Includes Video Pratishtha Proof</span>
            </div>
            <button
              onClick={() => onAskAcharyaPostPurchase('Can you share details of the Kashi Vishwanath Sankalp recital?')}
              className="text-[11px] text-[#dfb76c] active:underline cursor-pointer"
            >
              Ask Acharya
            </button>
          </div>
        </div>
      )}

      {activeTab === 'muhurat' && (
        <div className="my-3 space-y-2.5 text-xs">
          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/30 to-amber-900/10 border border-[#dfb76c]/30">
            <div className="flex items-center gap-1.5 text-[#dfb76c] font-bold text-xs mb-1">
              <Sun className="w-3.5 h-3.5" />
              <span>Wearing Muhurat for Jaipur, India</span>
            </div>
            <p className="text-[11px] text-[#dcd5c7]">
              Date: <span className="font-semibold text-amber-200">Upcoming Thursday (Shukla Paksha)</span><br />
              Time: <span className="font-mono text-amber-200 font-bold">06:18 AM – 07:44 AM (Amrit Choghadiya)</span>
            </p>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="p-2 rounded-lg bg-[#0e1017] border border-[#202538]">
              <span className="font-semibold text-amber-200">Purification: </span>
              <span className="text-[#a49d8f]">Bathe at sunrise, wear light yellow attire, face North-East.</span>
            </div>
            <div className="p-2 rounded-lg bg-[#0e1017] border border-[#202538]">
              <span className="font-semibold text-amber-200">Mantra Japa: </span>
              <span className="text-[#a49d8f] font-mono text-[10px] block mt-0.5">
                ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः (108 times)
              </span>
            </div>
            <div className="p-2 rounded-lg bg-[#0e1017] border border-[#202538]">
              <span className="font-semibold text-amber-200">Finger: </span>
              <span className="text-[#a49d8f]">Index Finger (Tarjani) of the dominant hand.</span>
            </div>
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-[#252b3e] flex items-center justify-between">
        <button
          onClick={() => onAskAcharyaPostPurchase('Acharya ji, what food or habits should I avoid after wearing Pukhraj?')}
          className="text-[11px] text-[#dfb76c] active:underline cursor-pointer flex items-center gap-1"
        >
          <span>Ask dietary / lifestyle guidelines</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
