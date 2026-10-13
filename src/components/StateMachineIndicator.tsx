import React from 'react';
import { ChatState } from '../types/astrology';
import { Play, SkipForward, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface StateMachineIndicatorProps {
  currentState: ChatState;
  onSetState: (state: ChatState) => void;
  onTriggerNext: () => void;
  isAutoAdvancing: boolean;
  onToggleAutoAdvance: () => void;
}

const STATE_FLOW: { state: ChatState; label: string; icon: string; description: string }[] = [
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

export const StateMachineIndicator: React.FC<StateMachineIndicatorProps> = ({
  currentState,
  onSetState,
  onTriggerNext,
  isAutoAdvancing,
  onToggleAutoAdvance,
}) => {
  const currentIndex = STATE_FLOW.findIndex((s) => s.state === currentState);
  const activeItem = STATE_FLOW[currentIndex] || STATE_FLOW[0];

  return (
    <div className="bg-[#12141c] border-b border-[#dfb76c]/20 px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Current Active State Overview */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#a69e90]">
            <span className="w-2 h-2 rounded-full bg-[#dfb76c] animate-ping" />
            <span className="font-semibold uppercase tracking-wider text-[#dfb76c]">State Machine:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#1e2230] border border-[#dfb76c]/30 text-xs font-mono font-semibold text-[#f5eedf]">
              {currentState}
            </span>
            <span className="text-xs text-[#b8b3a7] hidden sm:inline">
              · {activeItem.description}
            </span>
          </div>
        </div>

        {/* Right: Step Sequence Controller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={onToggleAutoAdvance}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
              isAutoAdvancing
                ? 'bg-[#dfb76c]/20 border-[#dfb76c] text-[#fbf6ea]'
                : 'bg-[#181a24] border-[#2f3447] text-[#a89d8d] hover:text-[#ede8dc]'
            }`}
            title="Auto-play all conversation states"
          >
            <Play className={`w-3 h-3 ${isAutoAdvancing ? 'fill-[#dfb76c] text-[#dfb76c]' : ''}`} />
            <span>{isAutoAdvancing ? 'Auto Running' : 'Auto Play'}</span>
          </button>

          <button
            onClick={onTriggerNext}
            className="flex items-center gap-1 px-3 py-1 rounded bg-[#dfb76c] hover:bg-[#c49746] text-[#12141c] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shadow-sm"
          >
            <span>Next Step</span>
            <SkipForward className="w-3 h-3" />
          </button>

          {/* Quick jump dropdown or mini pills */}
          <div className="flex items-center gap-1 pl-2 border-l border-[#2f3447]">
            {STATE_FLOW.slice(0, 9).map((step, idx) => {
              const isCurrent = step.state === currentState;
              const isPast = currentIndex > idx;
              return (
                <button
                  key={step.state}
                  onClick={() => onSetState(step.state)}
                  className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#dfb76c] text-[#0e1017] font-bold ring-2 ring-[#dfb76c]/30'
                      : isPast
                      ? 'bg-[#1e2333] text-[#dfb76c] hover:bg-[#252c40]'
                      : 'bg-[#151722] text-[#696f84] hover:text-[#c4bfb3]'
                  }`}
                  title={`${step.state}: ${step.description}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
