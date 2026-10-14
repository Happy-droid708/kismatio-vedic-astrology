import React, { useState } from 'react';
import { ChatMessageItem, Astrologer, OrderDetails, GemstoneProduct, KundliData, RechargePack } from '../types/astrology';
import { KundliWidget } from './widgets/KundliWidget';
import { GemstoneRecommendationCard } from './widgets/GemstoneRecommendationCard';
import { EmbeddedCatalogCard } from './widgets/EmbeddedCatalogCard';
import { EmbeddedProductView } from './widgets/EmbeddedProductView';
import { EmbeddedCheckout } from './widgets/EmbeddedCheckout';
import { EmbeddedPayment } from './widgets/EmbeddedPayment';
import { PaymentSuccessCard } from './widgets/PaymentSuccessCard';
import { OrderConfirmedCard } from './widgets/OrderConfirmedCard';
import { LowTimeAlert } from './widgets/LowTimeAlert';
import { EmbeddedRecharge } from './widgets/EmbeddedRecharge';
import { EmbeddedMinutesRechargeCard } from './widgets/EmbeddedMinutesRechargeCard';
import { OrderTrackingCard } from './widgets/OrderTrackingCard';
import { CheckCheck, Play, Pause, Volume2 } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageItem;
  astrologer: Astrologer;
  gemstone: GemstoneProduct;
  kundli: KundliData;
  order: OrderDetails | null;
  remainingSeconds: number;
  isProcessingPayment: boolean;
  searchHighlight?: string;
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
  onAskAcharya: (question: string) => void;
  onBackToProduct: () => void;
  onCatalogOrderPlaced?: (orderInfo: any) => void;
  onCatalogAddToCart?: (product: any) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  astrologer,
  gemstone,
  kundli,
  order,
  remainingSeconds,
  isProcessingPayment,
  searchHighlight = '',
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
  onAskAcharya,
  onBackToProduct,
  onCatalogOrderPlaced,
  onCatalogAddToCart,
}) => {
  const isAstrologer = message.sender === 'astrologer';
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (isSystem) {
    return (
      <div className="flex justify-center my-3">
        <span className="text-[11px] text-[#9d9688] bg-[#141622]/90 border border-[#23273a] px-3.5 py-1.5 rounded-full text-center shadow-xs">
          {message.text}
        </span>
      </div>
    );
  }

  // Highlight search terms if present
  const renderHighlightedText = (text: string) => {
    if (!searchHighlight.trim()) return text;
    const parts = text.split(new RegExp(`(${searchHighlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === searchHighlight.toLowerCase() ? (
        <mark key={i} className="bg-[#dfb76c] text-[#0e1017] px-0.5 rounded font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const isVoiceNote = message.text?.startsWith('[Voice Note]') || message.widgetType === 'wearing_guidance';
  const isWidgetMessage = Boolean(message.widgetType);

  return (
    <div className={`flex w-full mb-3.5 celestial-message-entry ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex gap-2 w-full ${
          isUser
            ? 'flex-row-reverse max-w-[85%] sm:max-w-[480px]'
            : isWidgetMessage
            ? 'flex-row w-full max-w-full sm:max-w-[640px]'
            : 'flex-row max-w-[92%] sm:max-w-[620px]'
        }`}
      >
        {/* Astrologer Avatar */}
        {isAstrologer && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 shrink-0 mt-0.5 shadow-sm">
            <div className="w-full h-full rounded-full bg-[#161824] flex items-center justify-center overflow-hidden">
              {astrologer.avatarUrl ? (
                <img
                  src={astrologer.avatarUrl}
                  alt={astrologer.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="font-display text-[11px] font-bold text-[#dfb76c]">
                  {astrologer.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 min-w-0">
          {/* Sender Header */}
          <div className={`flex items-center gap-1.5 mb-1 text-[10px] text-[#8e8779] ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="font-semibold text-[#cdc7ba]">
              {isUser ? kundli.name : astrologer.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>{message.timestamp}</span>
            {isUser && (
              <span title="Read" className="inline-flex items-center">
                <CheckCheck className="w-3 h-3 text-[#53bdeb] ml-0.5 stroke-[2.5]" />
              </span>
            )}
          </div>

          {/* Voice Note Simulation Card if audio message */}
          {isVoiceNote ? (
            <div className="p-3 rounded-2xl bg-[#1d2133] border border-[#394263] text-xs flex items-center gap-2.5 sm:gap-3 shadow-md max-w-full sm:max-w-sm overflow-hidden">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#dfb76c] text-[#0e1017] flex items-center justify-center cursor-pointer shadow-md shrink-0 hover:scale-105 active:scale-95 transition-transform"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-0.5 h-6 overflow-hidden">
                  {[4, 12, 18, 8, 22, 14, 20, 10, 16, 24, 12, 6, 18, 14, 8, 16, 20, 10, 14, 8].map((h, idx) => (
                    <div
                      key={idx}
                      className={`w-1 rounded-full transition-all shrink-0 ${
                        isPlayingAudio
                          ? 'bg-[#dfb76c] animate-pulse'
                          : 'bg-[#586184]'
                      }`}
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#9a9385] mt-1">
                  <span>{isPlayingAudio ? 'Playing...' : 'Voice message'}</span>
                  <span className="font-mono">0:24</span>
                </div>
              </div>
            </div>
          ) : (
            /* Regular Message Text Bubble */
            message.text && (
              <div
                className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-[14.5px] leading-relaxed whitespace-pre-line break-words [overflow-wrap:anywhere] ${
                  isUser
                    ? 'bg-[#1b2133]/96 backdrop-blur-md border border-[#3c4667] text-[#fcedc5] rounded-tr-xs shadow-xl shadow-black/30'
                    : 'bg-[#121420]/96 backdrop-blur-md border border-[#dfb76c]/30 text-[#f5eedf] rounded-tl-xs shadow-xl shadow-black/30'
                }`}
              >
                {renderHighlightedText(message.text)}
              </div>
            )
          )}

          {/* Embedded Widgets Right Inside the Chat */}
          {message.widgetType === 'kundli_summary' && (
            <div className="w-full max-w-full">
              <KundliWidget kundli={kundli} />
            </div>
          )}

          {(message.widgetType === 'gemstone_recommendation' || message.widgetType === 'catalog_card') && (
            <div className="w-full max-w-full">
              <EmbeddedCatalogCard
                onOrderPlaced={onCatalogOrderPlaced}
                onAddToCart={onCatalogAddToCart}
                onContinueChat={onContinueChatAfterOrder}
              />
            </div>
          )}

          {message.widgetType === 'product_view' && (
            <div className="w-full max-w-full">
              <EmbeddedProductView
                gemstone={gemstone}
                initialName={kundli.name}
                initialGotra={kundli.gotra}
                onProceedToCheckout={onProceedToCheckout}
                onAskAcharya={onAskAcharya}
              />
            </div>
          )}

          {message.widgetType === 'checkout' && (
            <div className="w-full max-w-full">
              <EmbeddedCheckout
                gemstone={gemstone}
                selectedMetal={order?.selectedMetal || 'panchdhatu'}
                ringSize={order?.ringSize || '18'}
                sankalpName={order?.sankalpName || kundli.name}
                sankalpGotra={order?.sankalpGotra || kundli.gotra}
                finalPrice={order?.pricing.totalAmount || 47300}
                onProceedToPayment={onProceedToPayment}
                onBackToProduct={onBackToProduct}
              />
            </div>
          )}

          {message.widgetType === 'payment_processing' && (
            <div className="w-full max-w-full">
              <EmbeddedPayment
                amount={order?.pricing.totalAmount || 47300}
                isProcessing={isProcessingPayment}
                onStartProcessing={onStartPaymentProcessing}
                onPaymentSuccess={onPaymentSuccess}
                onCancel={onBackToProduct}
              />
            </div>
          )}

          {message.widgetType === 'payment_success' && order && (
            <div className="w-full max-w-full">
              <PaymentSuccessCard
                paymentId={order.paymentId}
                paymentMethod={order.paymentMethod}
                amount={order.pricing.totalAmount}
                onContinue={onContinueAfterSuccess}
              />
            </div>
          )}

          {message.widgetType === 'order_confirmed' && order && (
            <div className="w-full max-w-full">
              <OrderConfirmedCard
                order={order}
                onContinueChat={onContinueChatAfterOrder}
                onViewTracking={onViewOrderTracking}
              />
            </div>
          )}

          {(message.widgetType === 'low_time_warning' || message.widgetType === 'recharge_pack') && (
            <div className="w-full max-w-full">
              <EmbeddedMinutesRechargeCard
                remainingSeconds={remainingSeconds}
                onRechargeComplete={(addedMinutes, pack) => {
                  onRechargeComplete(addedMinutes, pack as any);
                }}
                onContinueChat={onContinueChatAfterOrder}
              />
            </div>
          )}

          {message.widgetType === 'order_tracking' && order && (
            <div className="w-full max-w-full">
              <OrderTrackingCard
                order={order}
                onAskAcharyaPostPurchase={onAskAcharya}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
