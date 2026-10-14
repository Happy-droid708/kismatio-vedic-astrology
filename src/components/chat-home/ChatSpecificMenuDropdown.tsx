import React from 'react';
import {
  User,
  Search,
  Sparkles,
  Clock,
  Gem,
  Package,
  Bookmark,
  BellOff,
  AlertTriangle,
  X,
  Shield,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { ChatMenuItem } from '../../types/astrology';

interface ChatSpecificMenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: ChatMenuItem) => void;
  astrologerName: string;
  isMobile?: boolean;
  isChatEmpty?: boolean;
}

export const ChatSpecificMenuDropdown: React.FC<ChatSpecificMenuDropdownProps> = ({
  isOpen,
  onClose,
  onSelectAction,
  astrologerName,
  isMobile = false,
  isChatEmpty = false,
}) => {
  if (!isOpen) return null;

  const chatMenuItems: { id: ChatMenuItem; label: string; icon: React.ReactNode; isDestructive?: boolean; badge?: string }[] = [
    { id: 'astrologer_info', label: 'Astrologer Info', icon: <User className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'search_in_chat', label: 'Search in Chat', icon: <Search className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'consultation_details', label: 'Consultation Details', icon: <Sparkles className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'remaining_minutes', label: 'Remaining Minutes', icon: <Clock className="w-4 h-4 text-[#E7B743]" />, badge: 'Top-Up' },
    { id: 'recommended_products', label: 'Recommended Gemstones', icon: <Gem className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'saved_insights', label: 'Saved Insights', icon: <Bookmark className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'clear_chat', label: isChatEmpty ? 'Restore Consultation' : 'Clear Chat (Empty State)', icon: <RotateCcw className="w-4 h-4 text-[#E7B743]" /> },
    { id: 'mute', label: 'Mute', icon: <BellOff className="w-4 h-4 text-[#9685AE]" /> },
    { id: 'report', label: 'Report', icon: <AlertTriangle className="w-4 h-4 text-[#FFD76A]" />, isDestructive: true },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[#12091F]/80 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {isMobile ? (
        /* Mobile: Native Bottom Sheet */
        <div className="fixed inset-x-0 bottom-0 z-50 bg-[#24133B] border-t border-[#453052] rounded-t-3xl max-h-[85dvh] overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-200 shadow-2xl">
          {/* Sheet Handle */}
          <div className="w-full pt-3 pb-1 flex justify-center">
            <div className="w-12 h-1.5 rounded-full bg-[#453052]" />
          </div>

          <div className="px-5 py-3 border-b border-[#453052] flex items-center justify-between">
            <div>
              <span className="text-xs font-serif-luxury font-bold text-[#F7F0FF]">
                {astrologerName}
              </span>
              <p className="text-[10px] text-[#9685AE]">Consultation Actions & Sanctum</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-2 py-2 divide-y divide-[#453052]">
            {chatMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectAction(item.id);
                  onClose();
                }}
                className={`w-full px-4 py-3 flex items-center justify-between text-left text-xs transition-colors cursor-pointer min-h-[44px] ${
                  item.isDestructive
                    ? 'text-[#FFD76A] active:bg-[#352044]'
                    : 'text-[#C5B8D9] active:bg-[#352044] active:text-[#F7F0FF]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="p-1.5 rounded-lg bg-[#2B173C] border border-[#453052]">
                    {item.icon}
                  </span>
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2B173C] text-[#E7B743] border border-[#453052]">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-[#9685AE]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop: Anchored Dropdown */
        <div className="fixed top-14 right-4 z-50 w-72 bg-[#24133B] border border-[#453052] rounded-2xl shadow-2xl overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-2 border-b border-[#453052] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#F7F0FF] tracking-wide">
              {astrologerName}
            </span>
            <button onClick={onClose} className="p-1 rounded text-[#9685AE] hover:text-[#F7F0FF] cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="py-1">
            {chatMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectAction(item.id);
                  onClose();
                }}
                className={`w-full px-3.5 py-2 flex items-center justify-between text-left text-xs transition-colors cursor-pointer min-h-[38px] ${
                  item.isDestructive
                    ? 'text-[#FFD76A] hover:bg-[#352044]'
                    : 'text-[#C5B8D9] hover:bg-[#352044] hover:text-[#F7F0FF]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#2B173C] text-[#E7B743] font-bold border border-[#453052]">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
