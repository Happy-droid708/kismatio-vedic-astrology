import React from 'react';
import { Astrologer, OrderDetails, GemstoneProduct } from '../../types/astrology';
import {
  X,
  Star,
  ShieldCheck,
  Award,
  Clock,
  Phone,
  MessageSquare,
  Share2,
  Package,
  Sparkles,
  MapPin,
  Calendar,
  Gem,
} from 'lucide-react';
import { GemstoneIllustration } from '../GemstoneIllustration';

interface AstrologerInfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
  astrologer: Astrologer;
  order: OrderDetails | null;
  gemstone: GemstoneProduct;
  onStartChat: () => void;
  onOpenRecharge: () => void;
}

export const AstrologerInfoPanel: React.FC<AstrologerInfoPanelProps> = ({
  isOpen,
  onClose,
  astrologer,
  order,
  gemstone,
  onStartChat,
  onOpenRecharge,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-[100dvh] max-h-[100dvh] bg-[#11131e] border-l border-[#dfb76c]/30 shadow-2xl flex flex-col overflow-y-auto scrollbar-thin">
        {/* Top Header */}
        <div className="sticky top-0 z-10 bg-[#11131e]/90 backdrop-blur-md px-4 py-3 border-b border-[#202538] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#dfb76c] uppercase tracking-wider">
            Vedic Acharya Profile
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8e8779] hover:text-[#ede8dc] active:bg-[#202538] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Profile Block */}
        <div className="p-6 flex flex-col items-center text-center bg-gradient-to-b from-[#181c2c] to-[#11131e] border-b border-[#202538]">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#996e28] via-[#dfb76c] to-[#fef08a] p-1 shadow-xl">
              <div className="w-full h-full rounded-full bg-[#181a24] flex items-center justify-center font-display text-3xl font-bold text-[#dfb76c]">
                {astrologer.name.charAt(0)}
              </div>
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#11131e] ring-2 ring-emerald-500/50" />
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <h2 className="text-lg font-serif-luxury font-bold text-[#f5eedf]">
              {astrologer.name}
            </h2>
            <span className="w-4 h-4 rounded-full bg-[#dfb76c]/20 text-[#dfb76c] flex items-center justify-center text-[10px] font-bold">
              ✓
            </span>
          </div>

          <p className="text-xs text-[#dfb76c] font-medium mt-0.5">{astrologer.title}</p>
          <p className="text-xs text-[#9d9688] mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#dfb76c]" />
            <span>{astrologer.lineage}</span>
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-3 border-t border-[#202538] text-xs">
            <div className="p-2 rounded-xl bg-[#0c0d15] border border-[#202538]">
              <span className="text-[10px] text-[#7d776b] block">Rating</span>
              <span className="font-bold text-[#ede8dc] flex items-center justify-center gap-0.5 mt-0.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{astrologer.rating}</span>
              </span>
            </div>
            <div className="p-2 rounded-xl bg-[#0c0d15] border border-[#202538]">
              <span className="text-[10px] text-[#7d776b] block">Experience</span>
              <span className="font-bold text-[#ede8dc] mt-0.5 block">{astrologer.experienceYears} Yrs</span>
            </div>
            <div className="p-2 rounded-xl bg-[#0c0d15] border border-[#202538]">
              <span className="text-[10px] text-[#7d776b] block">Rate</span>
              <span className="font-bold text-[#dfb76c] mt-0.5 block font-mono">₹{astrologer.ratePerMinute}/min</span>
            </div>
          </div>
        </div>

        {/* Profile Content Sections */}
        <div className="p-5 space-y-5">
          {/* About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a8a192] mb-1.5">
              About & Vedic Lineage
            </h4>
            <p className="text-xs text-[#c4bdae] leading-relaxed">
              {astrologer.bio}
            </p>
          </div>

          {/* Specialisations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a8a192] mb-1.5">
              Specialisations
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {astrologer.specializations.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#181c2c] border border-[#2c334b] text-xs text-[#ede8dc]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a8a192] mb-1">
              Consultation Languages
            </h4>
            <p className="text-xs text-[#c4bdae]">{astrologer.languages.join(' · ')}</p>
          </div>

          {/* Products Recommended by this Astrologer */}
          <div className="pt-2 border-t border-[#202538]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a8a192] mb-2 flex items-center gap-1.5">
              <Gem className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span>Prescribed Ratna Remedy</span>
            </h4>
            <div className="p-3 rounded-xl bg-[#0e1017] border border-[#272d42] flex items-center gap-3">
              <GemstoneIllustration type="yellow-sapphire" size="sm" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-[#dfb76c] font-bold uppercase block">5.25 Ratti Ceylon</span>
                <h5 className="text-xs font-bold text-[#ede8dc] truncate">{gemstone.name}</h5>
                <span className="text-xs font-mono font-bold text-[#dfb76c]">₹{gemstone.basePrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Orders from this Conversation */}
          {order && (
            <div className="pt-2 border-t border-[#202538]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#a8a192] mb-2 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#dfb76c]" />
                <span>Orders from this Conversation</span>
              </h4>
              <div className="p-3 rounded-xl bg-[#0e1017] border border-[#272d42] text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#ede8dc]">Order #{order.orderId}</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded">
                    Pooja In Progress
                  </span>
                </div>
                <p className="text-[11px] text-[#9a9385]">Kashi Vishwanath Consecration · Gotra: {order.sankalpGotra}</p>
                <p className="text-[10px] text-amber-200">Scheduled: {order.muhuratDate}</p>
              </div>
            </div>
          )}

          {/* Trust Seal */}
          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-center gap-2.5 text-xs text-[#d5cebe]">
            <ShieldCheck className="w-4 h-4 text-[#dfb76c] shrink-0" />
            <span>Kashi Peeth Certified Vidvat Parishad & IGI Authenticated Ratna Shastra.</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-[#202538] bg-[#0c0d15] flex gap-2 shrink-0">
          <button
            onClick={() => {
              onStartChat();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#dfb76c] active:bg-[#c49746] text-[#0e1017] text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Conversation</span>
          </button>
          <button
            onClick={() => {
              onOpenRecharge();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-[#1c2132] border border-[#2e3752] text-xs text-[#ede8dc] hover:border-[#dfb76c] cursor-pointer min-h-[44px] flex items-center justify-center gap-1"
          >
            <Clock className="w-4 h-4 text-[#dfb76c]" />
            <span>Top-Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};
