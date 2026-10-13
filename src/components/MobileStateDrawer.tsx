import React from 'react';
import { ChatState } from '../types/astrology';
import { Play, SkipForward, X, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';

interface MobileStateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: ChatState;
  onSetState: (state: ChatState) => void;
  onTriggerNext: () => void;
  isAutoAdvancing: boolean;
  onToggleAutoAdvance: () => void;
}

export const STATE_FLOW: { state: ChatState; label: string; icon: string; description: string }[] = [
  { state: 'IDLE', label: 'Idle', icon: '1', description: 'Consultation active, waiting for question' },
  { state: 'TYPING', label: 'Typing', icon: '2', description: 'Acharya meditating upon Graha positions' },
  { state: 'STREAMING', label: 'Streaming', icon: '3', description: 'Real-time Vedic revelation transmission' },
  { state: 'MESSAGE_COMPLETE', label: 'Complete', icon: '4', description: 'Chart analysis with Kundli breakdown' },
  { state: 'RECOMMENDATION', label: 'Remedy', icon: '5', description: 'Jyotish ratna prescription card' },
  { state: 'PRODUCT_VIEW', label: 'Product', icon: '6', description: 'In-chat certified gemstone inspection' },
  { state: 'CHECKOUT', label: 'Checkout', icon: '7', description: 'Gotra sankalp & delivery config' },
  { state: 'PAYMENT_PROCESSING', label: 'Processing', icon: '8', description: 'Encrypted UPI/card bank verification' },
  { state: 'PAYMENT_SUCCESS', label: 'Success', icon: '9', description: 'Consecration seal & payment receipt' },
  { state: 'ORDER_CONFIRMED', label: 'Confirmed', icon: '10', description: 'Sanctum pooja scheduled at Kashi' },
  { state: 'CONVERSATION_CONTINUES', label: 'Dialogue', icon: '11', description: 'Acharya continues deeper guidance' },
  { state: 'LOW_TIME', label: 'Low Time', icon: '12', description: 'Consultation expiry alert (<60s)' },
  { state: 'RECHARGE', label: 'Recharge', icon: '13', description: 'Instant in-chat 1-tap minute topup' },
  { state: 'ORDER_TRACKING', label: 'Tracking', icon: '14', description: 'Pooja progress & wearing Muhurat' },
];

export const MobileStateDrawer: React.FC<MobileStateDrawerProps> = ({
  isOpen,
  onClose,
  currentState,
  onSetState,
  onTriggerNext,
  isAutoAdvancing,
  onToggleAutoAdvance,
}) => {
  const currentIndex = STATE_FLOW.findIndex((s) => s.state === currentState);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#131622] border-t border-[#dfb76c]/30 rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[82dvh] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {/* iOS Style Drag Handle Bar */}
        <div className="pt-3 pb-1 flex justify-center cursor-pointer" onClick={onClose}>
          <div className="w-10 h-1.5 bg-[#424861] rounded-full" />
        </div>

        {/* Drawer Header */}
        <div className="px-5 py-3 border-b border-[#222739] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dfb76c] animate-pulse" />
            <h3 className="text-sm font-semibold text-[#f5eedf] uppercase tracking-wider">
              Chat State Machine ({currentIndex + 1}/14)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#9a9385] hover:text-[#ede8dc] active:bg-[#202538] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="p-3 bg-[#0d0f17] border-b border-[#202538] flex items-center justify-between gap-2">
          <button
            onClick={onToggleAutoAdvance}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer min-h-[40px] ${
              isAutoAdvancing
                ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#fbf6ea]'
                : 'bg-[#171a27] border-[#2c334b] text-[#a8a192]'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isAutoAdvancing ? 'fill-[#dfb76c] text-[#dfb76c]' : ''}`} />
            <span>{isAutoAdvancing ? 'Auto Advancing' : 'Auto Play Flow'}</span>
          </button>

          <button
            onClick={() => {
              onTriggerNext();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#dfb76c] active:bg-[#c49746] text-[#0e1017] text-xs font-bold transition-all shadow-md cursor-pointer min-h-[40px]"
          >
            <span>Next Step</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* States List */}
        <div className="overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
          {STATE_FLOW.map((item, idx) => {
            const isCurrent = item.state === currentState;
            const isPast = currentIndex > idx;
            return (
              <button
                key={item.state}
                onClick={() => {
                  onSetState(item.state);
                  onClose();
                }}
                className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between border transition-all cursor-pointer min-h-[44px] ${
                  isCurrent
                    ? 'bg-[#22283a] border-[#dfb76c] text-[#f5eedf] shadow-md ring-1 ring-[#dfb76c]/40'
                    : isPast
                    ? 'bg-[#151825] border-[#22273a] text-[#b3ac9f] active:bg-[#1d2233]'
                    : 'bg-[#0f111a] border-[#1d2130] text-[#71778f] active:bg-[#151825]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold ${
                      isCurrent
                        ? 'bg-[#dfb76c] text-[#0e1017]'
                        : isPast
                        ? 'bg-[#252c42] text-[#dfb76c]'
                        : 'bg-[#181a24] text-[#4d536b]'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-semibold block">{item.state}</span>
                    <span className="text-[10px] text-[#938c7f] line-clamp-1">{item.description}</span>
                  </div>
                </div>

                {isCurrent && (
                  <span className="text-[10px] font-mono uppercase bg-[#dfb76c]/20 text-[#dfb76c] px-2 py-0.5 rounded font-bold">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
