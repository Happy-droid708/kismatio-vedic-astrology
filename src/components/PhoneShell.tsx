import React, { useState } from 'react';
import { Smartphone, Monitor, RefreshCw, Sparkles, SlidersHorizontal, Users } from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';
import { MobileAppBar } from './MobileAppBar';
import { MobileStateFloatingPill } from './MobileStateFloatingPill';
import { MobileStateDrawer } from './MobileStateDrawer';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { AstrologerDiscoveryModal } from './AstrologerDiscoveryModal';
import { StreamingMessageBubble } from './StreamingMessageBubble';
import {
  ChatState,
  ChatMessageItem,
  Astrologer,
  GemstoneProduct,
  OrderDetails,
  KundliData,
  RechargePack,
} from '../types/astrology';

interface PhoneShellProps {
  currentState: ChatState;
  onSetState: (state: ChatState) => void;
  onTriggerNext: () => void;
  isAutoAdvancing: boolean;
  onToggleAutoAdvance: () => void;
  selectedAstrologer: Astrologer;
  onSelectAstrologer: (astro: Astrologer) => void;
  kundli: KundliData;
  onUpdateKundli: (updated: Partial<KundliData>) => void;
  gemstone: GemstoneProduct;
  messages: ChatMessageItem[];
  streamingText: string;
  streamingWords?: any[];
  isStreaming?: boolean;
  isThinking?: boolean;
  thinkingStatus?: string;
  remainingSeconds: number;
  isProcessingPayment: boolean;
  currentOrder: OrderDetails | null;
  onInspectGemstone: () => void;
  onProceedToCheckout: (config: any) => void;
  onProceedToPayment: (shippingInfo: any) => void;
  onStartPaymentProcessing: () => void;
  onPaymentSuccess: (paymentId: string, paymentMethod: string) => void;
  onContinueAfterSuccess: () => void;
  onContinueChatAfterOrder: () => void;
  onViewOrderTracking: () => void;
  onOpenRecharge: () => void;
  onRechargeComplete: (addedMinutes: number, pack: RechargePack) => void;
  onDismissRecharge: () => void;
  onSendMessage: (text: string) => void;
  onResetDemo: () => void;
  onBackToProduct: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const PhoneShell: React.FC<PhoneShellProps> = ({
  currentState,
  onSetState,
  onTriggerNext,
  isAutoAdvancing,
  onToggleAutoAdvance,
  selectedAstrologer,
  onSelectAstrologer,
  kundli,
  onUpdateKundli,
  gemstone,
  messages,
  streamingText,
  streamingWords = [],
  isStreaming = false,
  isThinking = false,
  thinkingStatus = '✦ Reading your chart...',
  remainingSeconds,
  isProcessingPayment,
  currentOrder,
  onInspectGemstone,
  onProceedToCheckout,
  onProceedToPayment,
  onStartPaymentProcessing,
  onPaymentSuccess,
  onContinueAfterSuccess,
  onContinueChatAfterOrder,
  onViewOrderTracking,
  onOpenRecharge,
  onRechargeComplete,
  onDismissRecharge,
  onSendMessage,
  onResetDemo,
  onBackToProduct,
  messagesEndRef,
}) => {
  // Desktop preview options
  const [deviceMode, setDeviceMode] = useState<'phone_standard' | 'phone_plus' | 'fullscreen'>('phone_standard');
  const [isStateDrawerOpen, setIsStateDrawerOpen] = useState(false);
  const [isAstrologerModalOpen, setIsAstrologerModalOpen] = useState(false);
  const [showKundliHeaderSummary, setShowKundliHeaderSummary] = useState(false);

  const phoneWidthClass =
    deviceMode === 'phone_standard'
      ? 'max-w-[400px]'
      : deviceMode === 'phone_plus'
      ? 'max-w-[440px]'
      : 'max-w-none w-full';

  return (
    <div className="min-h-screen bg-[#07080c] text-[#ede8dc] flex flex-col items-center justify-start selection:bg-[#dfb76c]/30 selection:text-[#fff9e6] relative overflow-x-hidden">
      {/* Background Sacred Geometric Aura */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#dfb76c_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Device & Journey Control Bar (Visible on desktop / large viewports) */}
      <header className="w-full bg-[#0c0e15]/90 border-b border-[#dfb76c]/15 backdrop-blur-md px-4 py-2 z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm sm:text-base tracking-wider text-[#ede8dc]">
              Jyotishya
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#dfb76c]/15 text-[#dfb76c] font-semibold border border-[#dfb76c]/30">
              Phone-First Sanctum
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDeviceMode('phone_standard')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                deviceMode === 'phone_standard'
                  ? 'bg-[#dfb76c] text-[#0e1017] border-[#dfb76c] font-bold'
                  : 'bg-[#151825] border-[#272d42] text-[#9a9385] hover:text-[#ede8dc]'
              }`}
              title="Standard Phone View (400px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phone 390px</span>
            </button>

            <button
              onClick={() => setDeviceMode('phone_plus')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                deviceMode === 'phone_plus'
                  ? 'bg-[#dfb76c] text-[#0e1017] border-[#dfb76c] font-bold'
                  : 'bg-[#151825] border-[#272d42] text-[#9a9385] hover:text-[#ede8dc]'
              }`}
              title="Wide Phone View (440px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phone 430px</span>
            </button>

            <button
              onClick={() => setDeviceMode('fullscreen')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                deviceMode === 'fullscreen'
                  ? 'bg-[#dfb76c] text-[#0e1017] border-[#dfb76c] font-bold'
                  : 'bg-[#151825] border-[#272d42] text-[#9a9385] hover:text-[#ede8dc]'
              }`}
              title="Expand to Full Screen View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full Screen</span>
            </button>

            {/* Quick Actions */}
            <div className="h-4 w-px bg-[#2b3147] mx-1" />

            <button
              onClick={() => setIsAstrologerModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#151825] border border-[#272d42] text-xs text-[#b8b1a3] hover:text-[#ede8dc] cursor-pointer"
              title="Change Astrologer & Kundli"
            >
              <Users className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span className="hidden md:inline">Acharya Peeth</span>
            </button>

            <button
              onClick={onResetDemo}
              className="p-1.5 rounded-lg bg-[#151825] border border-[#272d42] text-[#9a9385] hover:text-[#ede8dc] cursor-pointer"
              title="Restart Journey Flow"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Canvas */}
      <div className="w-full flex-1 flex items-center justify-center p-0 sm:p-4 md:py-6">
        {/* Smartphone Chassis / Viewport Container */}
        <div
          className={`w-full ${phoneWidthClass} ${
            deviceMode !== 'fullscreen'
              ? 'sm:rounded-[44px] sm:border-[5px] sm:border-[#2a2924] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(223,183,108,0.12)]'
              : ''
          } bg-[#0c0d15] flex flex-col h-[100dvh] sm:h-[844px] overflow-hidden relative`}
        >
          {/* 1. Mobile Status Bar (Sensor Pill, Time, 5G, Battery) */}
          <MobileStatusBar time="10:04" />

          {/* 2. Compact Mobile App Bar (Astrologer Avatar, Name, Rating, Live Timer, Drawer Trigger) */}
          <MobileAppBar
            astrologer={selectedAstrologer}
            remainingSeconds={remainingSeconds}
            onOpenRecharge={onOpenRecharge}
            onOpenAstrologers={() => setIsAstrologerModalOpen(true)}
            onToggleKundliSummary={() => setShowKundliHeaderSummary(!showKundliHeaderSummary)}
            showKundli={showKundliHeaderSummary}
            onOpenStateDrawer={() => setIsStateDrawerOpen(true)}
            currentState={currentState}
          />

          {/* 3. Compact Floating State Pill (Step 3/14 · STREAMING ▾ | Next ❯ | Auto) */}
          <MobileStateFloatingPill
            currentState={currentState}
            onOpenDrawer={() => setIsStateDrawerOpen(true)}
            onTriggerNext={onTriggerNext}
            isAutoAdvancing={isAutoAdvancing}
            onToggleAutoAdvance={onToggleAutoAdvance}
          />

          {/* 4. Chat Conversation Stream (Primary Product Surface) */}
          <main className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5 scrollbar-thin">
            {/* Header Kundli Drawer (if toggled) */}
            {showKundliHeaderSummary && (
              <div className="mb-3 animate-in fade-in">
                <ChatMessage
                  message={{
                    id: 'kundli-drawer',
                    sender: 'astrologer',
                    text: 'Janma Kundli calculated using Lahiri Ayanamsha (Vedic Chitra Paksha):',
                    timestamp: 'Active Chart',
                    widgetType: 'kundli_summary',
                  }}
                  astrologer={selectedAstrologer}
                  gemstone={gemstone}
                  kundli={kundli}
                  order={currentOrder}
                  remainingSeconds={remainingSeconds}
                  isProcessingPayment={isProcessingPayment}
                  onInspectGemstone={onInspectGemstone}
                  onProceedToCheckout={onProceedToCheckout}
                  onProceedToPayment={onProceedToPayment}
                  onStartPaymentProcessing={onStartPaymentProcessing}
                  onPaymentSuccess={onPaymentSuccess}
                  onContinueAfterSuccess={onContinueAfterSuccess}
                  onContinueChatAfterOrder={onContinueChatAfterOrder}
                  onViewOrderTracking={onViewOrderTracking}
                  onOpenRecharge={onOpenRecharge}
                  onRechargeComplete={onRechargeComplete}
                  onDismissRecharge={onDismissRecharge}
                  onAskAcharya={onSendMessage}
                  onBackToProduct={onBackToProduct}
                />
              </div>
            )}

            {/* In-Chat Message Flow with Embedded Widgets */}
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                astrologer={selectedAstrologer}
                gemstone={gemstone}
                kundli={kundli}
                order={currentOrder}
                remainingSeconds={remainingSeconds}
                isProcessingPayment={isProcessingPayment}
                onInspectGemstone={onInspectGemstone}
                onProceedToCheckout={onProceedToCheckout}
                onProceedToPayment={onProceedToPayment}
                onStartPaymentProcessing={onStartPaymentProcessing}
                onPaymentSuccess={onPaymentSuccess}
                onContinueAfterSuccess={onContinueAfterSuccess}
                onContinueChatAfterOrder={onContinueChatAfterOrder}
                onViewOrderTracking={onViewOrderTracking}
                onOpenRecharge={onOpenRecharge}
                onRechargeComplete={onRechargeComplete}
                onDismissRecharge={onDismissRecharge}
                onAskAcharya={onSendMessage}
                onBackToProduct={onBackToProduct}
              />
            ))}

            {/* STREAMING Real-Time SSE Assistant Container */}
            {(isStreaming || isThinking || streamingWords.length > 0 || (currentState === 'STREAMING' && streamingText)) && (
              <StreamingMessageBubble
                astrologer={selectedAstrologer}
                isThinking={isThinking}
                thinkingStatus={thinkingStatus}
                words={
                  streamingWords.length > 0
                    ? streamingWords
                    : streamingText
                    ? streamingText.split(' ').map((t, i) => ({ id: `old-${i}`, text: (i > 0 ? ' ' : '') + t, isNew: false }))
                    : []
                }
                streamedText={streamingText}
              />
            )}

            {/* TYPING State Bubble (Acharya meditating) */}
            {currentState === 'TYPING' && !isStreaming && (
              <div className="flex items-center gap-2 text-xs text-[#a69e90] p-2 pl-10 italic">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-bounce [animation-delay:0.4s]" />
                </div>
                <span>{selectedAstrologer.name} is contemplating your chart...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </main>

          {/* 5. Mobile Chat Input Bar with Suggestion Chips & Voice Note */}
          <ChatInput
            onSendMessage={onSendMessage}
            currentState={currentState}
            disabled={currentState === 'PAYMENT_PROCESSING'}
            isStreaming={isStreaming}
          />

          {/* Mobile Home Bar Pill Indicator */}
          <div className="w-full pb-1 pt-0.5 flex justify-center bg-[#0e1017]/95">
            <div className="w-28 h-1 rounded-full bg-white/30" />
          </div>
        </div>
      </div>

      {/* Mobile State Machine Bottom Drawer */}
      <MobileStateDrawer
        isOpen={isStateDrawerOpen}
        onClose={() => setIsStateDrawerOpen(false)}
        currentState={currentState}
        onSetState={onSetState}
        onTriggerNext={onTriggerNext}
        isAutoAdvancing={isAutoAdvancing}
        onToggleAutoAdvance={onToggleAutoAdvance}
      />

      {/* Astrologer Discovery & Kundli Selector Modal */}
      <AstrologerDiscoveryModal
        isOpen={isAstrologerModalOpen}
        onClose={() => setIsAstrologerModalOpen(false)}
        selectedAstrologer={selectedAstrologer}
        onSelectAstrologer={onSelectAstrologer}
        kundli={kundli}
        onUpdateKundli={onUpdateKundli}
        onStartConsultation={onResetDemo}
      />
    </div>
  );
};
