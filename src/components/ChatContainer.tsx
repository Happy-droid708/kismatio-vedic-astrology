import React, { useState, useEffect, useRef } from 'react';
import {
  ChatState,
  ChatMessageItem,
  Astrologer,
  GemstoneProduct,
  OrderDetails,
  KundliData,
  RechargePack,
} from '../types/astrology';
import {
  CURATED_ASTROLOGERS,
  FEATURED_GEMSTONES,
  SAMPLE_USER_KUNDLI,
  STREAMING_ASTROLOGER_RESPONSE,
} from '../data/astrologyData';
import { PhoneShell } from './PhoneShell';
import { useChatStream } from '../hooks/useChatStream';

export const ChatContainer: React.FC = () => {
  // Primary state machine state
  const [currentState, setCurrentState] = useState<ChatState>('STREAMING');
  const [isAutoAdvancing, setIsAutoAdvancing] = useState<boolean>(false);

  // Active Astrologer & User Profile
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer>(CURATED_ASTROLOGERS[0]);
  const [kundli, setKundli] = useState<KundliData>(SAMPLE_USER_KUNDLI);
  const [gemstone, setGemstone] = useState<GemstoneProduct>(FEATURED_GEMSTONES['yellow-sapphire']);

  // Modals & Panels
  const [isAstrologerModalOpen, setIsAstrologerModalOpen] = useState(false);
  const [showKundliHeaderSummary, setShowKundliHeaderSummary] = useState(false);

  // Consultation Timer (in seconds)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(175); // ~2m 55s
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const hasInitialStreamStarted = useRef<boolean>(false);

  // Real-Time SSE AI Streaming Hook
  const {
    isStreaming,
    isThinking,
    thinkingStatus,
    streamedText,
    words,
    startStream,
    stopStream,
  } = useChatStream({
    onFinish: (fullText) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === 'm3-streaming-finished' || m.text === fullText)) return prev;
        return [
          ...prev,
          {
            id: `astrologer-${Date.now()}`,
            sender: 'astrologer',
            text: fullText,
            timestamp: 'Just now',
          },
        ];
      });
      setCurrentState('MESSAGE_COMPLETE');
    },
    onError: (err) => {
      console.warn('ChatContainer stream failed:', err);
      setCurrentState('MESSAGE_COMPLETE');
    },
  });

  // Order Details state
  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>({
    orderId: 'VEDA-8842',
    gemstone: FEATURED_GEMSTONES['yellow-sapphire'],
    selectedMetal: 'panchdhatu',
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
      gemstonePrice: 42500,
      metalPremium: 4800,
      consecrationCharge: 0,
      labCertCharge: 0,
      shipping: 0,
      discount: 0,
      totalAmount: 47300,
    },
    paymentMethod: 'UPI (GPay)',
    paymentId: 'PAY-VEDA-889120',
    orderTimestamp: 'Today, 10:14 AM',
    currentStatus: 'pooja_in_progress',
    muhuratDate: 'Upcoming Thursday',
    muhuratTime: '06:18 AM - 07:44 AM',
  });

  // Master Conversation Messages
  const [messages, setMessages] = useState<ChatMessageItem[]>([
    {
      id: 'm1',
      sender: 'astrologer',
      text: 'Hari Om, Devanand ji. I have cast your Janma Kundli based on your birth coordinates in Jaipur (Libra Lagna, Pisces Moon in Uttara Bhadrapada Nakshatra). I see profound planetary movements at play in your chart right now.',
      timestamp: '10:02 AM',
      widgetType: 'kundli_summary',
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Pranam Acharya ji. Over the past 9 months, despite putting in 14-hour days, every major enterprise deal in my technology venture gets stalled right at the final signature. I feel an unexplained exhaustion and heavy resistance. What is happening in my Graha dasha?',
      timestamp: '10:03 AM',
    },
  ]);

  // Initial stream on load or STREAMING state
  useEffect(() => {
    if (currentState === 'STREAMING' && !hasInitialStreamStarted.current && !isStreaming) {
      hasInitialStreamStarted.current = true;
      startStream({
        message: 'Pranam Acharya ji. Over the past 9 months, despite putting in 14-hour days, every major enterprise deal in my technology venture gets stalled right at the final signature. I feel an unexplained exhaustion and heavy resistance. What is happening in my Graha dasha?',
        astrologer: selectedAstrologer,
        kundli: kundli,
        history: messages,
      });
    }
  }, [currentState, startStream, selectedAstrologer, kundli, messages, isStreaming]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedText, words, currentState]);

  // Consultation Timer countdown
  useEffect(() => {
    if (!isTimerActive || remainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        // Auto trigger low time state if not already in checkout/payment
        if (prev === 61 && currentState === 'CONVERSATION_CONTINUES') {
          handleSetState('LOW_TIME');
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerActive, remainingSeconds, currentState]);

  // Auto Advance orchestrator (when user enables Auto Play)
  useEffect(() => {
    if (!isAutoAdvancing) return;

    const autoTimer = setTimeout(() => {
      handleTriggerNext();
    }, 4500);

    return () => clearTimeout(autoTimer);
  }, [isAutoAdvancing, currentState]);

  // State Machine Step Switcher
  const handleSetState = (newState: ChatState) => {
    setCurrentState(newState);

    if (newState === 'TYPING') {
      // Just waiting
    } else if (newState === 'STREAMING') {
      // Handled by streaming effect
    } else if (newState === 'MESSAGE_COMPLETE') {
      // Ensure the streaming message is present
      setMessages((prev) => {
        if (prev.some((m) => m.id === 'm3-streaming-finished')) return prev;
        return [
          ...prev,
          {
            id: 'm3-streaming-finished',
            sender: 'astrologer',
            text: STREAMING_ASTROLOGER_RESPONSE,
            timestamp: '10:04 AM',
          },
        ];
      });
    } else if (newState === 'RECOMMENDATION') {
      // Ensure recommendation widget is present in chat
      setMessages((prev) => {
        if (prev.some((m) => m.widgetType === 'gemstone_recommendation')) return prev;
        return [
          ...prev,
          {
            id: 'm-recom',
            sender: 'astrologer',
            text: 'Based on your 10th bhava karma alignment and to pacify the Rahu-Shani affliction, I prescribe this untreated, consecrated Ceylon Yellow Sapphire.',
            timestamp: '10:05 AM',
            widgetType: 'gemstone_recommendation',
          },
        ];
      });
    } else if (newState === 'PRODUCT_VIEW') {
      // Ensure embedded product view widget is in chat
      setMessages((prev) => {
        if (prev.some((m) => m.widgetType === 'product_view')) return prev;
        return [
          ...prev,
          {
            id: 'm-product',
            sender: 'astrologer',
            text: 'Here is the certified 5.25 Ratti Ceylon Sapphire currently at our Kashi sanctum. You can customize the metal setting and configure your Gotra Sankalp right here inside our dialogue:',
            timestamp: '10:05 AM',
            widgetType: 'product_view',
          },
        ];
      });
    } else if (newState === 'CHECKOUT') {
      setMessages((prev) => {
        if (prev.some((m) => m.widgetType === 'checkout')) return prev;
        return [
          ...prev,
          {
            id: 'm-checkout',
            sender: 'astrologer',
            text: 'Please confirm your sacred delivery address and Gotra details for the Kashi Vishwanath Sankalp before we consecrate the order:',
            timestamp: '10:06 AM',
            widgetType: 'checkout',
          },
        ];
      });
    } else if (newState === 'PAYMENT_PROCESSING') {
      setIsProcessingPayment(true);
      setMessages((prev) => {
        if (prev.some((m) => m.widgetType === 'payment_processing')) return prev;
        return [
          ...prev,
          {
            id: 'm-payment',
            sender: 'astrologer',
            text: 'Authorising your consecrated gemstone order within our secure encrypted portal...',
            timestamp: '10:07 AM',
            widgetType: 'payment_processing',
          },
        ];
      });
    } else if (newState === 'PAYMENT_SUCCESS') {
      setIsProcessingPayment(false);
      setMessages((prev) => {
        if (prev.some((m) => m.widgetType === 'payment_success')) return prev;
        return [
          ...prev,
          {
            id: 'm-success',
            sender: 'astrologer',
            text: 'Kalyanam Astu! Payment of ₹47,300 has been verified.',
            timestamp: '10:08 AM',
            widgetType: 'payment_success',
          },
        ];
      });
    } else if (newState === 'ORDER_CONFIRMED') {
      setMessages((prev) => {
        if (prev.some((m) => m.widgetType === 'order_confirmed')) return prev;
        return [
          ...prev,
          {
            id: 'm-order-confirmed',
            sender: 'astrologer',
            text: 'Your order #VEDA-8842 has been registered in the Kashi Peeth Ledger. The Pandits have received your Kashyapa Gotra Sankalp.',
            timestamp: '10:08 AM',
            widgetType: 'order_confirmed',
          },
        ];
      });
    } else if (newState === 'CONVERSATION_CONTINUES') {
      setMessages((prev) => {
        if (prev.some((m) => m.id === 'm-continues-1')) return prev;
        return [
          ...prev,
          {
            id: 'm-continues-1',
            sender: 'astrologer',
            text: 'Ayushman Bhava, Devanand ji. Now that your Brihaspati Kavach is secured and being energized on the upcoming Thursday, let us address your second query regarding your tech venture’s leadership restructuring. The 10th lord Venus in Leo indicates that partnering with an overseas associate will bring favorable results starting next Shukla Paksha.',
            timestamp: '10:09 AM',
          },
        ];
      });
    } else if (newState === 'LOW_TIME') {
      setRemainingSeconds(45);
      setMessages((prev) => {
        if (prev.some((m) => m.widgetType === 'low_time_warning')) return prev;
        return [
          ...prev,
          {
            id: 'm-low-time',
            sender: 'system',
            timestamp: '10:10 AM',
            widgetType: 'low_time_warning',
          },
        ];
      });
    } else if (newState === 'RECHARGE') {
      setMessages((prev) => {
        if (prev.some((m) => m.widgetType === 'recharge_pack')) return prev;
        return [
          ...prev,
          {
            id: 'm-recharge',
            sender: 'astrologer',
            text: 'Devanand ji, our sacred time balance is nearly fulfilled. If you wish to examine the auspicious muhurat for your upcoming enterprise launch, please top up minutes to continue seamlessly:',
            timestamp: '10:10 AM',
            widgetType: 'recharge_pack',
          },
        ];
      });
    } else if (newState === 'ORDER_TRACKING') {
      setMessages((prev) => {
        if (prev.some((m) => m.widgetType === 'order_tracking')) return prev;
        return [
          ...prev,
          {
            id: 'm-tracking',
            sender: 'astrologer',
            text: 'Here is the live consecration progress from Kashi and your customized wearing Muhurat protocol for Jaipur:',
            timestamp: '10:11 AM',
            widgetType: 'order_tracking',
          },
        ];
      });
    }
  };

  // Next Step Trigger following the exact requested sequence
  const handleTriggerNext = () => {
    switch (currentState) {
      case 'IDLE':
        handleSetState('TYPING');
        break;
      case 'TYPING':
        handleSetState('STREAMING');
        break;
      case 'STREAMING':
        handleSetState('MESSAGE_COMPLETE');
        break;
      case 'MESSAGE_COMPLETE':
        handleSetState('RECOMMENDATION');
        break;
      case 'RECOMMENDATION':
        handleSetState('PRODUCT_VIEW');
        break;
      case 'PRODUCT_VIEW':
        handleSetState('CHECKOUT');
        break;
      case 'CHECKOUT':
        handleSetState('PAYMENT_PROCESSING');
        break;
      case 'PAYMENT_PROCESSING':
        handleSetState('PAYMENT_SUCCESS');
        break;
      case 'PAYMENT_SUCCESS':
        handleSetState('ORDER_CONFIRMED');
        break;
      case 'ORDER_CONFIRMED':
        handleSetState('CONVERSATION_CONTINUES');
        break;
      case 'CONVERSATION_CONTINUES':
        handleSetState('LOW_TIME');
        break;
      case 'LOW_TIME':
        handleSetState('RECHARGE');
        break;
      case 'RECHARGE':
        handleSetState('ORDER_TRACKING');
        break;
      case 'ORDER_TRACKING':
        handleSetState('CONVERSATION_CONTINUES');
        break;
      default:
        handleSetState('IDLE');
        break;
    }
  };

  // Actions from widgets
  const handleInspectGemstone = () => {
    handleSetState('PRODUCT_VIEW');
  };

  const handleProceedToCheckout = (config: any) => {
    setCurrentOrder((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        selectedMetal: config.selectedMetal,
        ringSize: config.ringSize,
        sankalpName: config.sankalpName,
        sankalpGotra: config.sankalpGotra,
        pricing: {
          ...prev.pricing,
          totalAmount: config.finalPrice,
        },
      };
    });
    handleSetState('CHECKOUT');
  };

  const handleProceedToPayment = (shippingInfo: any) => {
    setCurrentOrder((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        shippingAddress: shippingInfo,
      };
    });
    handleSetState('PAYMENT_PROCESSING');
  };

  const handleStartPaymentProcessing = () => {
    setIsProcessingPayment(true);
  };

  const handlePaymentSuccess = (paymentId: string, paymentMethod: string) => {
    setIsProcessingPayment(false);
    setCurrentOrder((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        paymentId,
        paymentMethod,
      };
    });
    handleSetState('PAYMENT_SUCCESS');
  };

  const handleContinueAfterSuccess = () => {
    handleSetState('ORDER_CONFIRMED');
  };

  const handleContinueChatAfterOrder = () => {
    handleSetState('CONVERSATION_CONTINUES');
  };

  const handleViewOrderTracking = () => {
    handleSetState('ORDER_TRACKING');
  };

  const handleOpenRecharge = () => {
    handleSetState('RECHARGE');
  };

  const handleRechargeComplete = (addedMinutes: number, pack: RechargePack) => {
    setRemainingSeconds((prev) => prev + addedMinutes * 60);
    setIsTimerActive(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `recharge-${Date.now()}`,
        sender: 'system',
        text: `Consultation extended by ${addedMinutes} minutes. Instant UPI payment of ₹${pack.price} confirmed.`,
        timestamp: 'Just now',
      },
      {
        id: `acharya-ack-${Date.now()}`,
        sender: 'astrologer',
        text: `Subhamastu. Your consultation has been replenished with ${addedMinutes} additional minutes. Let us continue with your chart analysis.`,
        timestamp: 'Just now',
      },
    ]);
    setCurrentState('CONVERSATION_CONTINUES');
  };

  const handleDismissRecharge = () => {
    setCurrentState('CONVERSATION_CONTINUES');
  };

  const handleBackToProduct = () => {
    handleSetState('PRODUCT_VIEW');
  };

  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessageItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);

    setCurrentState('STREAMING');
    startStream({
      message: text,
      astrologer: selectedAstrologer,
      kundli: kundli,
      history: [...messages, userMsg],
    });
  };

  const handleResetDemo = () => {
    stopStream();
    hasInitialStreamStarted.current = false;
    setRemainingSeconds(180);
    setIsTimerActive(true);
    setIsProcessingPayment(false);
    setMessages([
      {
        id: 'm1',
        sender: 'astrologer',
        text: 'Hari Om, Devanand ji. I have cast your Janma Kundli based on your birth coordinates in Jaipur (Libra Lagna, Pisces Moon in Uttara Bhadrapada Nakshatra). I see profound planetary movements at play in your chart right now.',
        timestamp: '10:02 AM',
        widgetType: 'kundli_summary',
      },
      {
        id: 'm2',
        sender: 'user',
        text: 'Pranam Acharya ji. Over the past 9 months, despite putting in 14-hour days, every major enterprise deal in my technology venture gets stalled right at the final signature. I feel an unexplained exhaustion and heavy resistance. What is happening in my Graha dasha?',
        timestamp: '10:03 AM',
      },
    ]);
    setCurrentState('STREAMING');
  };

  return (
    <PhoneShell
      currentState={currentState}
      onSetState={handleSetState}
      onTriggerNext={handleTriggerNext}
      isAutoAdvancing={isAutoAdvancing}
      onToggleAutoAdvance={() => setIsAutoAdvancing(!isAutoAdvancing)}
      selectedAstrologer={selectedAstrologer}
      onSelectAstrologer={(astro) => setSelectedAstrologer(astro)}
      kundli={kundli}
      onUpdateKundli={(updated) => setKundli((prev) => ({ ...prev, ...updated }))}
      gemstone={gemstone}
      messages={messages}
      streamingText={streamedText}
      streamingWords={words}
      isStreaming={isStreaming}
      isThinking={isThinking}
      thinkingStatus={thinkingStatus}
      remainingSeconds={remainingSeconds}
      isProcessingPayment={isProcessingPayment}
      currentOrder={currentOrder}
      onInspectGemstone={handleInspectGemstone}
      onProceedToCheckout={handleProceedToCheckout}
      onProceedToPayment={handleProceedToPayment}
      onStartPaymentProcessing={handleStartPaymentProcessing}
      onPaymentSuccess={handlePaymentSuccess}
      onContinueAfterSuccess={handleContinueAfterSuccess}
      onContinueChatAfterOrder={handleContinueChatAfterOrder}
      onViewOrderTracking={handleViewOrderTracking}
      onOpenRecharge={handleOpenRecharge}
      onRechargeComplete={handleRechargeComplete}
      onDismissRecharge={handleDismissRecharge}
      onSendMessage={handleSendMessage}
      onResetDemo={handleResetDemo}
      onBackToProduct={handleBackToProduct}
      messagesEndRef={messagesEndRef}
    />
  );
};
