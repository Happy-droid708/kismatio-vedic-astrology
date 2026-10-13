import React, { useState, useEffect, useRef } from 'react';
import {
  ChatState,
  ChatMessageItem,
  Astrologer,
  GemstoneProduct,
  OrderDetails,
  KundliData,
  RechargePack,
  ConversationThread,
  ConversationFilter,
  MainAppMenuItem,
  ChatMenuItem,
} from '../../types/astrology';
import {
  CURATED_ASTROLOGERS,
  FEATURED_GEMSTONES,
  SAMPLE_USER_KUNDLI,
  STREAMING_ASTROLOGER_RESPONSE,
  INITIAL_CONVERSATIONS,
} from '../../data/astrologyData';
import { useResponsiveBreakpoint, ViewportSimulationMode } from '../../hooks/useResponsiveBreakpoint';
import { ChatHomeHeader } from './ChatHomeHeader';
import { ChatSearchBar } from './ChatSearchBar';
import { ChatFilterPills } from './ChatFilterPills';
import { ChatListView } from './ChatListView';
import { MainAppMenuDropdown } from './MainAppMenuDropdown';
import { ChatSpecificMenuDropdown } from './ChatSpecificMenuDropdown';
import { AstrologerInfoPanel } from './AstrologerInfoPanel';
import { NewConversationModal } from './NewConversationModal';
import { DesktopEmptyState } from './DesktopEmptyState';
import { MobileBottomNav, MobileTab } from './MobileBottomNav';
import { InChatSearchBar } from './InChatSearchBar';
import { QuickRechargeModal } from './QuickRechargeModal';
import { CelestialRainBackground } from './CelestialRainBackground';
import { EmptyConversationState } from './EmptyConversationState';
import { ChatMessage } from '../ChatMessage';
import { ChatInput } from '../ChatInput';
import { MobileStateDrawer } from '../MobileStateDrawer';
import { MobileStateFloatingPill } from '../MobileStateFloatingPill';
import { CelestialPill } from '../ui/CelestialPill';
import { useChatStream } from '../../hooks/useChatStream';
import { StreamingMessageBubble } from '../StreamingMessageBubble';
import { ExploreScreen } from '../explore/ExploreScreen';
import { ProfileScreen } from '../profile/ProfileScreen';
import { OrdersScreen } from '../orders/OrdersScreen';
import { ToolsScreen } from '../tools/ToolsScreen';
import { SanctumHomeScreen } from '../home/SanctumHomeScreen';
import { DEFAULT_RECHARGE_CONFIG } from '../../config/rechargeConfig';
import {
  ArrowLeft,
  Clock,
  MoreVertical,
  Search,
  Sparkles,
  Compass,
  ArrowDown,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

export const KismatioApp: React.FC = () => {
  // Responsive hook
  const {
    windowWidth,
    actualBreakpoint,
    effectiveBreakpoint,
    simulationMode,
    setSimulationMode,
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isLargeDesktop,
  } = useResponsiveBreakpoint();

  // Conversations State
  const [conversations, setConversations] = useState<ConversationThread[]>(INITIAL_CONVERSATIONS);
  const [selectedConvId, setSelectedConvId] = useState<string | null>('conv-rajiv');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<ConversationFilter>('all');
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('chats');
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Tablet Sidebar Collapse State
  const [isTabletSidebarCollapsed, setIsTabletSidebarCollapsed] = useState<boolean>(false);

  // In-Chat Search State
  const [isInChatSearchOpen, setIsInChatSearchOpen] = useState<boolean>(false);
  const [inChatSearchQuery, setInChatSearchQuery] = useState<string>('');
  const [inChatMatchIndex, setInChatMatchIndex] = useState<number>(0);

  // Modals & Panels
  const [isMainAppMenuOpen, setIsMainAppMenuOpen] = useState<boolean>(false);
  const [isChatMenuOpen, setIsChatMenuOpen] = useState<boolean>(false);
  const [isAstrologerInfoOpen, setIsAstrologerInfoOpen] = useState<boolean>(false);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState<boolean>(false);
  const [isQuickRechargeOpen, setIsQuickRechargeOpen] = useState<boolean>(false);
  const [isStateDrawerOpen, setIsStateDrawerOpen] = useState<boolean>(false);
  const [showKundliHeaderSummary, setShowKundliHeaderSummary] = useState<boolean>(false);

  // Active Astrologer & Kundli State
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer>(CURATED_ASTROLOGERS[0]);
  const [kundli, setKundli] = useState<KundliData>(SAMPLE_USER_KUNDLI);
  const [gemstone, setGemstone] = useState<GemstoneProduct>(FEATURED_GEMSTONES['yellow-sapphire']);

  // Chat State Machine & Timer
  const [currentState, setCurrentState] = useState<ChatState>('STREAMING');
  const [isAutoAdvancing, setIsAutoAdvancing] = useState<boolean>(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(522); // 08:42
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Smart Scrolling State (Section 9)
  const [isNearBottom, setIsNearBottom] = useState<boolean>(true);
  const [hasNewUnseenMessage, setHasNewUnseenMessage] = useState<boolean>(false);
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialStreamStarted = useRef<boolean>(false);
  const isUserScrollingUpRef = useRef<boolean>(false);

  // Order Details
  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>({
    orderId: 'KS48291',
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
    paymentMethod: 'UPI (Google Pay)',
    paymentId: 'PAY-KS48291-88912',
    orderTimestamp: 'Today, 10:14 AM',
    currentStatus: 'pooja_in_progress',
    muhuratDate: 'Upcoming Thursday',
    muhuratTime: '06:18 AM - 07:44 AM',
  });

  // Conversation Messages
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
      text: 'Pranam Acharya ji. Over the past 9 months, despite putting in 14-hour days, every major deal and promotion in my tech enterprise has gotten stalled at the final signature. I feel an unexplained exhaustion and heavy resistance. What is happening in my Graha dasha?',
      timestamp: '10:03 AM',
    },
    {
      id: 'm-recom',
      sender: 'astrologer',
      text: 'I recommend these stones based on your chart and current planetary transits to dissolve this resistance and unlock your Rajayoga momentum:',
      timestamp: '10:04 AM',
      widgetType: 'gemstone_recommendation',
    },
  ]);

  // Real-Time SSE AI Streaming Hook
  const {
    isStreaming,
    isThinking,
    loaderPhase,
    morphStage,
    isPillsReady,
    thinkingStatus,
    activeSequence,
    streamedText,
    words,
    error,
    isCompleted,
    startStream,
    stopStream,
    retryLastStream,
  } = useChatStream({
    onFinish: (fullText) => {
      if (!fullText || !fullText.trim()) return;
      setMessages((prev) => [
        ...prev,
        {
          id: `astrologer-${Date.now()}`,
          sender: 'astrologer',
          text: fullText.trim(),
          timestamp: 'Just now',
        },
      ]);
      if (selectedConvId) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === selectedConvId
              ? { ...c, lastMessage: fullText.slice(0, 80) + '...', lastMessageTimestamp: 'Just now' }
              : c
          )
        );
      }
      setCurrentState('MESSAGE_COMPLETE');
    },
    onError: (err) => {
      console.warn('Stream failed:', err);
      setCurrentState('MESSAGE_COMPLETE');
    },
  });

  // Handle scroll events on chat container: stops auto-scrolling when user scrolls up
  const handleChatScroll = () => {
    const container = chatScrollContainerRef.current;
    if (!container) return;
    const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    const near = distanceToBottom < 85;
    setIsNearBottom(near);
    isUserScrollingUpRef.current = !near;
    if (near) {
      setHasNewUnseenMessage(false);
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
    setHasNewUnseenMessage(false);
    setIsNearBottom(true);
    isUserScrollingUpRef.current = false;
  };

  // Follow bottom when messages, stream tokens, or state change ONLY if user is already near bottom
  useEffect(() => {
    if (isNearBottom) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      setHasNewUnseenMessage(true);
    }
  }, [messages, words, streamedText, isThinking, currentState, isNearBottom]);

  // Consultation timer countdown
  useEffect(() => {
    if (!isTimerActive || remainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        if (prev === 61 && currentState === 'CONVERSATION_CONTINUES') {
          handleSetState('LOW_TIME');
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerActive, remainingSeconds, currentState]);

  // Automatic Low-Balance Trigger (Section 1, 2, 16):
  // Triggers when remaining balance reaches lowBalanceThresholdMinutes (default: 5 min / 300s)
  // NEVER interrupts an active streamed message.
  useEffect(() => {
    if (isStreaming || isThinking) return;

    if (remainingSeconds <= DEFAULT_RECHARGE_CONFIG.lowBalanceThresholdMinutes * 60) {
      setMessages((prev) => {
        const alreadyHasCard = prev.some(
          (m) => m.widgetType === 'low_time_warning' || m.widgetType === 'recharge_pack'
        );
        if (alreadyHasCard) return prev;
        return [
          ...prev,
          {
            id: `auto-low-time-${Date.now()}`,
            sender: 'astrologer',
            text: 'Your consultation time is almost over. You can top up your minutes right here without interrupting our dialogue:',
            timestamp: 'Just now',
            widgetType: 'recharge_pack',
          },
        ];
      });
    }
  }, [remainingSeconds, isStreaming, isThinking]);

  // Initial streaming on load or STREAMING state
  useEffect(() => {
    if (currentState === 'STREAMING' && !hasInitialStreamStarted.current && !isStreaming) {
      hasInitialStreamStarted.current = true;
      startStream({
        message: 'Pranam Acharya ji. Over the past 9 months, despite putting in 14-hour days, every major deal and promotion in my tech enterprise has gotten stalled at the final signature. I feel an unexplained exhaustion and heavy resistance. What is happening in my Graha dasha?',
        astrologer: selectedAstrologer,
        kundli: kundli,
        history: messages,
      });
    }
  }, [currentState, startStream, selectedAstrologer, kundli, messages, isStreaming]);

  // Auto Advance orchestrator
  useEffect(() => {
    if (!isAutoAdvancing) return;
    const autoTimer = setTimeout(() => {
      handleTriggerNext();
    }, 4500);
    return () => clearTimeout(autoTimer);
  }, [isAutoAdvancing, currentState]);

  // State Machine Step Handler
  const handleSetState = (newState: ChatState) => {
    setCurrentState(newState);

    if (newState === 'MESSAGE_COMPLETE') {
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
            text: 'Your order #KS48291 has been registered in the Kashi Peeth Ledger. The Pandits have received your Kashyapa Gotra Sankalp.',
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
      setRemainingSeconds(120); // 2 minutes (Critical balance demo)
      setIsTimerActive(true);
      setMessages((prev) => {
        if (prev.some((m) => m.widgetType === 'low_time_warning' || m.widgetType === 'recharge_pack')) return prev;
        return [
          ...prev,
          {
            id: `m-low-time-${Date.now()}`,
            sender: 'astrologer',
            text: 'Your consultation time is almost over. You can top up your minutes right here without interrupting our dialogue:',
            timestamp: 'Just now',
            widgetType: 'recharge_pack',
          },
        ];
      });
    } else if (newState === 'RECHARGE') {
      setRemainingSeconds(0); // 0 minutes (Consultation paused demo - Section 18)
      setIsTimerActive(false);
      setMessages((prev) => {
        if (prev.some((m) => m.widgetType === 'low_time_warning' || m.widgetType === 'recharge_pack')) return prev;
        return [
          ...prev,
          {
            id: `m-recharge-${Date.now()}`,
            sender: 'astrologer',
            text: 'Devanand ji, our consultation minutes are nearly fulfilled. Top up minutes to preserve the flow of sacred Vedic insights:',
            timestamp: 'Just now',
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

  // Chat message sending with real AI streaming
  const handleSendMessage = (text: string, isVoice: boolean = false) => {
    const userMsg: ChatMessageItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);

    // Update conversation last message in list
    if (selectedConvId) {
      setConversations((prev) =>
        prev.map((c) => (c.id === selectedConvId ? { ...c, lastMessage: text, lastMessageTimestamp: 'Just now' } : c))
      );
    }

    // Trigger authentic real-time SSE stream
    setCurrentState('STREAMING');
    startStream({
      message: text,
      astrologer: selectedAstrologer,
      kundli: kundli,
      history: [...messages, userMsg],
    });
  };

  // Regenerate last response cleanly without flashing whole conversation (Section 19)
  const handleRegenerate = () => {
    if (isStreaming) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
    if (!lastUserMsg || !lastUserMsg.text) return;

    // Pop the latest astrologer message if present
    setMessages((prev) => {
      const lastIndex = prev.map((m) => m.sender).lastIndexOf('astrologer');
      if (lastIndex !== -1 && lastIndex === prev.length - 1) {
        return prev.slice(0, lastIndex);
      }
      return prev;
    });

    setCurrentState('STREAMING');
    startStream({
      message: lastUserMsg.text,
      astrologer: selectedAstrologer,
      kundli: kundli,
      history: messages.slice(0, -1),
    });
  };

  // Gemstone inspect
  const handleInspectGemstone = () => {
    handleSetState('PRODUCT_VIEW');
  };

  const handleProceedToCheckout = (config: any) => {
    if (currentOrder) {
      setCurrentOrder({
        ...currentOrder,
        selectedMetal: config.selectedMetal,
        ringSize: config.ringSize,
        sankalpName: config.sankalpName,
        sankalpGotra: config.sankalpGotra,
        pricing: {
          ...currentOrder.pricing,
          totalAmount: config.finalPrice,
        },
      });
    }
    handleSetState('CHECKOUT');
  };

  const handleBackToProduct = () => {
    handleSetState('PRODUCT_VIEW');
  };

  const handleProceedToPayment = (shippingInfo: any) => {
    if (currentOrder) {
      setCurrentOrder({
        ...currentOrder,
        shippingAddress: shippingInfo,
      });
    }
    handleSetState('PAYMENT_PROCESSING');
    setTimeout(() => {
      handlePaymentSuccess('PAY-KS48291-88912', 'UPI (Google Pay)');
    }, 2200);
  };

  const handleStartPaymentProcessing = () => {
    handleSetState('PAYMENT_PROCESSING');
  };

  const handlePaymentSuccess = (paymentId: string, paymentMethod: string) => {
    if (currentOrder) {
      setCurrentOrder({
        ...currentOrder,
        paymentId,
        paymentMethod,
        currentStatus: 'pooja_in_progress',
      });
    }
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

  // Embedded Catalog Card Order Placed Handler (Sections 10, 11, 12, 13, 14)
  const handleCatalogOrderPlaced = (orderInfo: {
    product: any;
    orderId: string;
    amount: number;
    paymentMethod: string;
  }) => {
    // 1. Update currentOrder
    const updatedOrder: OrderDetails = {
      orderId: orderInfo.orderId,
      gemstone: {
        id: orderInfo.product.id,
        name: orderInfo.product.name,
        sanskritName: orderInfo.product.sanskritName,
        weightRatti: parseFloat(orderInfo.product.ratti) || 4.5,
        weightCarat: parseFloat(orderInfo.product.carat) || 4.12,
        origin: orderInfo.product.origin,
        treatment: '100% Natural, Untreated & Unheated',
        shape: 'Oval / Cushion Brilliant Cut',
        colorGrade: 'Vivid Royal Grade',
        rulingPlanet: orderInfo.product.planet,
        deity: 'Prescribed Graha Devata',
        beejMantra: 'ॐ शान्तिः शान्तिः शान्तिः',
        basePrice: orderInfo.amount,
        consecrationFee: 0,
        certificationBody: 'IGI-GTL Govt. Recognized Gemological Laboratory',
        reportNumber: orderInfo.product.certificateId || 'IGI-2026-IND-3910',
        benefits: orderInfo.product.benefits,
        idealMetal: 'Vedic Ashtadhatu or 925 Pure Silver',
        wearingDay: 'Auspicious Muhurat',
        wearingFinger: 'Prescribed Hand & Finger',
        description: orderInfo.product.shortDesc,
      },
      selectedMetal: 'panchdhatu',
      ringSize: '18 (Standard)',
      sankalpName: kundli.name,
      sankalpGotra: kundli.gotra,
      shippingAddress: {
        fullName: kundli.name,
        phone: '+91 98201 44820',
        street: 'Flat 402, Suryavanshi Heights, C-Scheme',
        city: 'Jaipur',
        state: 'Rajasthan',
        pincode: '302001',
      },
      pricing: {
        gemstonePrice: orderInfo.amount,
        metalPremium: 0,
        consecrationCharge: 0,
        labCertCharge: 0,
        shipping: 0,
        discount: 0,
        totalAmount: orderInfo.amount,
      },
      paymentMethod: orderInfo.paymentMethod,
      paymentId: `PAY-${orderInfo.orderId}-${Math.floor(1000 + Math.random() * 9000)}`,
      orderTimestamp: 'Just now',
      currentStatus: 'pooja_in_progress',
      muhuratDate: 'Upcoming Thursday',
      muhuratTime: '06:18 AM - 07:44 AM',
    };

    setCurrentOrder(updatedOrder);

    // Update conversation order status in list
    if (selectedConvId) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConvId
            ? {
                ...c,
                status: 'order',
                statusLabel: `Order #${orderInfo.orderId}`,
                orderId: orderInfo.orderId,
                productName: orderInfo.product.name,
                lastMessage: `Order placed: ${orderInfo.product.name} (Consecration Scheduled)`,
                lastMessageTimestamp: 'Just now',
              }
            : c
        )
      );
    }

    // 2. CRITICAL REQUIREMENT (Section 14):
    // After order confirmation, the conversation continues naturally.
    // Automatically appends an astrologer response in the active chat thread.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `astrologer-order-ack-${Date.now()}`,
          sender: 'astrologer',
          text: `Hari Om, ${kundli.name}. Your ${orderInfo.product.name} order #${orderInfo.orderId} has been confirmed. The Vedic consecration has been scheduled for upcoming Thursday sunrise at our Kashi sanctum. You can continue our consultation here.`,
          timestamp: 'Just now',
        },
      ]);
    }, 600);
  };

  const handleCatalogAddToCart = (_product: any) => {
    // Handled in embedded component state with toast
  };

  const handleOpenRecharge = () => {
    setIsQuickRechargeOpen(true);
  };

  const handleRechargeComplete = (addedMinutes: number, pack: RechargePack) => {
    setRemainingSeconds((prev) => prev + addedMinutes * 60);
    setIsTimerActive(true);
    setIsQuickRechargeOpen(false);

    setMessages((prev) => [
      ...prev,
      {
        id: `recharge-${Date.now()}`,
        sender: 'system',
        text: `Consultation extended by ${addedMinutes} minutes (${pack.id ? `₹${pack.price}` : 'Top-Up'}). Session expires at current balance.`,
        timestamp: 'Just now',
      },
      {
        id: `astro-thank-${Date.now()}`,
        sender: 'astrologer',
        text: `Thank you Devanand ji. Our consultation minutes have been extended. Let us continue with your reading.`,
        timestamp: 'Just now',
      },
    ]);
    setCurrentState('CONVERSATION_CONTINUES');
  };

  const handleDismissRecharge = () => {
    handleSetState('CONVERSATION_CONTINUES');
  };

  // Conversation Selection & Actions
  const handleSelectConversation = (conv: ConversationThread) => {
    setSelectedConvId(conv.id);
    const foundAstro = CURATED_ASTROLOGERS.find((a) => a.id === conv.astrologerId);
    if (foundAstro) {
      setSelectedAstrologer(foundAstro);
    }
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleTogglePin = (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, isPinned: !c.isPinned } : c))
    );
  };

  const handleToggleArchive = (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, isArchived: !c.isArchived } : c))
    );
  };

  const handleToggleRead = (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId ? { ...c, unreadCount: c.unreadCount > 0 ? 0 : 1 } : c
      )
    );
  };

  const handleStartNewChatWithAstrologer = (astro: Astrologer) => {
    const existing = conversations.find((c) => c.astrologerId === astro.id);
    if (existing) {
      handleSelectConversation(existing);
    } else {
      const newConv: ConversationThread = {
        id: `conv-${astro.id}-${Date.now()}`,
        astrologerId: astro.id,
        astrologerName: astro.name,
        astrologerTitle: astro.title,
        astrologerLineage: astro.lineage,
        isVerified: true,
        avatarSeed: astro.avatarSeed,
        avatarColor: astro.accentColor,
        status: 'active',
        remainingSeconds: 600,
        lastMessage: `Namaste. I am ready to analyze your Janma Kundli.`,
        lastMessageTimestamp: 'Just now',
        unreadCount: 0,
        isPinned: false,
        isArchived: false,
        isOnline: true,
        topics: astro.specializations,
      };
      setConversations((prev) => [newConv, ...prev]);
      setSelectedConvId(newConv.id);
      setSelectedAstrologer(astro);
    }
    setIsNewChatModalOpen(false);
  };

  const handleResetDemo = () => {
    stopStream();
    hasInitialStreamStarted.current = false;
    setConversations(INITIAL_CONVERSATIONS);
    setSelectedConvId('conv-rajiv');
    setSelectedAstrologer(CURATED_ASTROLOGERS[0]);
    setRemainingSeconds(522);
    setIsTimerActive(true);
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
        text: 'Pranam Acharya ji. Over the past 9 months, despite putting in 14-hour days, every major deal and promotion in my tech enterprise has gotten stalled at the final signature. I feel an unexplained exhaustion and heavy resistance. What is happening in my Graha dasha?',
        timestamp: '10:03 AM',
      },
    ]);
    setCurrentState('STREAMING');
  };

  // Filtered conversations
  const filteredConversations = conversations.filter((c) => {
    if (c.isArchived) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = c.astrologerName.toLowerCase().includes(q);
      const matchesMsg = c.lastMessage.toLowerCase().includes(q);
      const matchesTopic = c.topics.some((t) => t.toLowerCase().includes(q));
      const matchesProduct = c.productName?.toLowerCase().includes(q);
      const matchesOrder = c.orderId?.toLowerCase().includes(q);

      if (!matchesName && !matchesMsg && !matchesTopic && !matchesProduct && !matchesOrder) {
        return false;
      }
    }

    if (activeFilter === 'unread') return c.unreadCount > 0;
    if (activeFilter === 'active') return c.status === 'active';
    if (activeFilter === 'orders') return c.status === 'order' || Boolean(c.orderId);
    if (activeFilter === 'saved') return Boolean(c.isSaved);
    if (activeFilter === 'astrologers') return true;

    return true;
  });

  const totalUnreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const activeOrderCount = conversations.filter((c) => c.status === 'order' || Boolean(c.orderId)).length;
  const archivedCount = conversations.filter((c) => c.isArchived).length;
  const selectedConversation = conversations.find((c) => c.id === selectedConvId) || null;

  // In-chat search matching logic
  const inChatMatches = messages.filter((m) => {
    if (!inChatSearchQuery.trim()) return false;
    return m.text?.toLowerCase().includes(inChatSearchQuery.toLowerCase());
  });

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = remainingSeconds <= 60;

  // =========================================================================
  // RENDER: Left Panel / Chat Home List
  // =========================================================================
  const renderChatHomeListPanel = () => (
    <div className="w-full h-full flex flex-col bg-[#0f111a] border-r border-[#1e2336] select-none relative">
      {/* 1. Mobile & Desktop Chat Home Header */}
      <ChatHomeHeader
        onOpenSearch={() => setSearchQuery('career')}
        onOpenNewChat={() => setIsNewChatModalOpen(true)}
        onToggleMenu={() => setIsMainAppMenuOpen(true)}
        unreadCountTotal={totalUnreadCount}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* 2. Instant Search Bar */}
      <ChatSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />

      {/* 3. Category Filter Pills: All, Unread, Active, Orders */}
      <ChatFilterPills
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        counts={{
          all: conversations.filter((c) => !c.isArchived).length,
          unread: conversations.filter((c) => c.unreadCount > 0).length,
          astrologers: conversations.length,
          active: conversations.filter((c) => c.status === 'active').length,
          orders: activeOrderCount,
          saved: conversations.filter((c) => c.isSaved).length,
        }}
      />

      {/* 4. Conversations List (Pinned + All) */}
      <ChatListView
        conversations={filteredConversations}
        selectedConversationId={selectedConvId || undefined}
        onSelectConversation={(conv) => {
          handleSelectConversation(conv);
        }}
        onTogglePin={handleTogglePin}
        onToggleArchive={handleToggleArchive}
        onToggleRead={handleToggleRead}
        archivedCount={archivedCount}
        liveRemainingSeconds={remainingSeconds}
      />

      {/* 5. Mobile Floating Action Button (✦ Start Consultation) */}
      {isMobile && (
        <div className="absolute bottom-16 right-4 z-20">
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#dfb76c] to-[#fef08a] text-[#0e1017] flex items-center justify-center shadow-xl shadow-[#dfb76c]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            title="Start new consultation"
          >
            <span className="text-2xl font-bold font-display group-hover:rotate-45 transition-transform">✦</span>
          </button>
        </div>
      )}

    </div>
  );

  // =========================================================================
  // RENDER: Right Panel / Active Conversation View
  // =========================================================================
  const renderActiveConversationView = () => {
    if (!selectedConversation) {
      return <DesktopEmptyState onStartNewChat={() => setIsNewChatModalOpen(true)} />;
    }

    return (
      <div className="flex-1 min-h-0 h-full flex flex-col bg-[#0c0d15] relative overflow-hidden">
        {/* Active Chat Header */}
        <header className="shrink-0 sticky top-0 z-30 bg-[#10121b]/98 backdrop-blur-md border-b border-[#dfb76c]/15 px-2.5 sm:px-4 py-1.5 sm:py-2 flex flex-col gap-1.5 sm:gap-0 justify-center min-h-[56px] select-none">
          {/* Main Top Row */}
          <div className="flex items-center justify-between w-full gap-1.5 sm:gap-2">
            {/* Left: Back button (on mobile or collapsed tablet) + Astrologer Info */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1">
              {/* Back button for mobile single-panel navigation */}
              {isMobile && (
                <button
                  onClick={() => setSelectedConvId(null)}
                  className="p-1 sm:p-1.5 -ml-1 rounded-lg text-[#9a9385] hover:text-[#ede8dc] active:text-[#ede8dc] active:bg-[#181b28] cursor-pointer shrink-0 transition-colors"
                  title="Back to all conversations"
                  aria-label="Back to conversations"
                >
                  <ArrowLeft className="w-5 h-5 text-[#dfb76c]" />
                </button>
              )}

              {/* Tablet sidebar toggle button */}
              {isTablet && (
                <button
                  onClick={() => setIsTabletSidebarCollapsed(!isTabletSidebarCollapsed)}
                  className="p-1.5 rounded-lg text-[#9a9385] hover:text-[#ede8dc] cursor-pointer mr-1 shrink-0"
                  title={isTabletSidebarCollapsed ? 'Show conversations list' : 'Hide conversations list'}
                >
                  {isTabletSidebarCollapsed ? (
                    <PanelLeftOpen className="w-5 h-5 text-[#dfb76c]" />
                  ) : (
                    <PanelLeftClose className="w-5 h-5" />
                  )}
                </button>
              )}

              {/* Astrologer Profile Trigger */}
              <button
                onClick={() => setIsAstrologerInfoOpen(true)}
                className="flex items-center gap-2 sm:gap-2.5 text-left p-0.5 sm:p-1 rounded-xl hover:bg-[#181b28] active:bg-[#181b28] transition-colors cursor-pointer group min-w-0"
                title="View Astrologer profile & remedies"
              >
                <div className="relative shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#996e28] via-[#dfb76c] to-[#fef08a] p-0.5 shadow-sm">
                    <div className="w-full h-full rounded-full bg-[#161824] flex items-center justify-center font-display text-xs sm:text-sm font-bold text-[#dfb76c]">
                      {selectedAstrologer.name.charAt(0)}
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#10121b] animate-pulse" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs sm:text-sm font-serif-luxury font-bold text-[#f5eedf] group-hover:text-[#dfb76c] transition-colors truncate max-w-[105px] xs:max-w-[140px] sm:max-w-[200px]">
                      {selectedAstrologer.name}
                    </h3>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#dfb76c]/20 text-[#dfb76c] flex items-center justify-center text-[9px] font-bold shrink-0">
                      ✓
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] text-[#9d9688]">
                    <span className="text-emerald-400 font-semibold shrink-0">🟢 Online</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline truncate max-w-[140px] md:max-w-[220px] text-[#b8b2a3]">
                      {selectedAstrologer.title}
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Right Header Controls */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Desktop-only Search button (On mobile, rendered in Row 2) */}
              {!isMobile && (
                <CelestialPill
                  variant="default"
                  isSelected={isInChatSearchOpen}
                  onClick={() => setIsInChatSearchOpen(!isInChatSearchOpen)}
                  className="hidden sm:flex p-1.5 min-h-[34px] min-w-[34px]"
                  title="Search within conversation"
                >
                  <Search className="w-3.5 h-3.5" />
                </CelestialPill>
              )}

              {/* Desktop-only Kundli summary toggle (On mobile, rendered in Row 2) */}
              {!isMobile && (
                <CelestialPill
                  variant="default"
                  isSelected={showKundliHeaderSummary}
                  onClick={() => setShowKundliHeaderSummary(!showKundliHeaderSummary)}
                  className="hidden sm:flex text-[11px] min-h-[34px] py-1 px-2.5"
                  icon={<Compass className="w-3.5 h-3.5 text-[#dfb76c]" />}
                  title="View Kundli chart summary"
                >
                  Kundli
                </CelestialPill>
              )}

              {/* Consultation Countdown Timer Pill (Section 11 & 28) */}
              <CelestialPill
                variant="recharge"
                rechargeAmount={isMobile ? formatTime(remainingSeconds) : `${formatTime(remainingSeconds)} · Top-Up`}
                rechargeAddedText="✓ Top-Up"
                onSelectAction={handleOpenRecharge}
                className={`text-[11px] sm:text-xs font-mono min-h-[32px] sm:min-h-[34px] py-1 px-2 sm:px-3 ${
                  isLowTime ? 'border-amber-500 bg-amber-950/60 text-amber-200' : ''
                }`}
                icon={
                  <Clock
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${
                      isLowTime ? 'text-amber-400' : 'text-[#dfb76c]'
                    }`}
                  />
                }
                title="Consultation Timer · Click to Top-Up"
              >
                <span className="tabular-nums">{formatTime(remainingSeconds)}</span>
                {!isMobile && <span className="text-[#a49d8f] font-normal"> · Top-Up</span>}
              </CelestialPill>

              {/* Chat Specific Menu 3-dots */}
              <button
                onClick={() => setIsChatMenuOpen(true)}
                className="p-1.5 rounded-lg text-[#9a9385] hover:text-[#ede8dc] hover:bg-[#1a1d2b] active:bg-[#1a1d2b] transition-colors cursor-pointer min-h-[32px] min-w-[32px] sm:min-h-[36px] sm:min-w-[36px] flex items-center justify-center shrink-0"
                title="Chat menu & orders"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Secondary Action Strip: Guarantees ALL components appear on mobile screen */}
          {isMobile && (
            <div className="flex items-center gap-1.5 pt-1.5 border-t border-[#dfb76c]/10 w-full overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 min-w-max">
                {/* Search in chat button */}
                <CelestialPill
                  variant="default"
                  isSelected={isInChatSearchOpen}
                  onClick={() => setIsInChatSearchOpen(!isInChatSearchOpen)}
                  className="text-[11px] py-1 px-2.5 min-h-[30px]"
                  icon={<Search className="w-3.5 h-3.5 text-[#dfb76c]" />}
                  title="Search within conversation"
                >
                  Search
                </CelestialPill>

                {/* Kundli summary toggle */}
                <CelestialPill
                  variant="default"
                  isSelected={showKundliHeaderSummary}
                  onClick={() => setShowKundliHeaderSummary(!showKundliHeaderSummary)}
                  className="text-[11px] py-1 px-2.5 min-h-[30px]"
                  icon={<Compass className="w-3.5 h-3.5 text-[#dfb76c]" />}
                  title="View Kundli chart summary"
                >
                  Kundli
                </CelestialPill>

                {/* Astrologer Title / Specialty Badge */}
                <CelestialPill
                  variant="default"
                  onClick={() => setIsAstrologerInfoOpen(true)}
                  className="text-[10px] py-1 px-2 min-h-[30px] max-w-[170px] truncate"
                  title="View Astrologer credentials"
                >
                  <span className="truncate">{selectedAstrologer.title}</span>
                </CelestialPill>
              </div>
            </div>
          )}
        </header>

        {/* Collapsible In-Chat Search Bar */}
        <InChatSearchBar
          isOpen={isInChatSearchOpen}
          onClose={() => {
            setIsInChatSearchOpen(false);
            setInChatSearchQuery('');
          }}
          onSearch={(q) => {
            setInChatSearchQuery(q);
            setInChatMatchIndex(0);
          }}
          matchCount={inChatMatches.length}
          currentMatchIndex={inChatMatchIndex}
          onNextMatch={() => {
            if (inChatMatches.length > 0) {
              setInChatMatchIndex((prev) => (prev + 1) % inChatMatches.length);
            }
          }}
          onPrevMatch={() => {
            if (inChatMatches.length > 0) {
              setInChatMatchIndex((prev) => (prev - 1 + inChatMatches.length) % inChatMatches.length);
            }
          }}
        />

        {/* State Machine Step Controller Floating Pill */}
        <MobileStateFloatingPill
          currentState={currentState}
          onOpenDrawer={() => setIsStateDrawerOpen(true)}
          onTriggerNext={handleTriggerNext}
          isAutoAdvancing={isAutoAdvancing}
          onToggleAutoAdvance={() => setIsAutoAdvancing(!isAutoAdvancing)}
        />

        {/* Active Conversation Viewport with Animated Celestial Rain Background */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {/* Layer 1: Animated Celestial Rain Background (strictly behind conversation content) */}
          <CelestialRainBackground isEmpty={messages.length === 0} />

          {/* Layer 2: Main Scroll Container (Chat Content) */}
          <main
            ref={chatScrollContainerRef}
            onScroll={handleChatScroll}
            className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-2 scrollbar-thin relative z-10"
          >
            {/* Constrain conversational readable width on wide desktop screens (Section 11) */}
            <div className="w-full max-w-[880px] mx-auto min-h-full flex flex-col justify-start space-y-2">
              {messages.length === 0 ? (
                /* Empty Chat State with atmospheric celestial rain */
                <EmptyConversationState
                  astrologer={selectedAstrologer}
                  onSendSuggestedPrompt={handleSendMessage}
                />
              ) : (
                <>
                  {/* Vedic Date Separator */}
                  <div className="flex justify-center my-1 select-none">
                    <span className="text-[10px] uppercase font-mono font-medium tracking-wider text-[#dfb76c]/90 bg-[#141624]/90 border border-[#dfb76c]/25 px-3.5 py-1 rounded-full shadow-md backdrop-blur-md">
                      Today · Shukla Navami, Ashwini Nakshatra
                    </span>
                  </div>

                  {/* Kundli Drawer if toggled */}
                  {showKundliHeaderSummary && (
                    <div className="mb-3 animate-in fade-in">
                      <ChatMessage
                        message={{
                          id: 'kundli-drawer',
                          sender: 'astrologer',
                          text: 'Active Janma Kundli calculation with Lahiri Ayanamsha (Chitra Paksha):',
                          timestamp: 'Current Session',
                          widgetType: 'kundli_summary',
                        }}
                        astrologer={selectedAstrologer}
                        gemstone={gemstone}
                        kundli={kundli}
                        order={currentOrder}
                        remainingSeconds={remainingSeconds}
                        isProcessingPayment={isProcessingPayment}
                        searchHighlight={inChatSearchQuery}
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
                        onAskAcharya={handleSendMessage}
                        onBackToProduct={handleBackToProduct}
                        onCatalogOrderPlaced={handleCatalogOrderPlaced}
                        onCatalogAddToCart={handleCatalogAddToCart}
                      />
                    </div>
                  )}

                  {/* Render all in-chat messages and embedded widgets */}
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
                      searchHighlight={inChatSearchQuery}
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
                      onAskAcharya={handleSendMessage}
                      onBackToProduct={handleBackToProduct}
                      onCatalogOrderPlaced={handleCatalogOrderPlaced}
                      onCatalogAddToCart={handleCatalogAddToCart}
                    />
                  ))}

                  {/* STREAMING Real-Time SSE Assistant Container with Astrology Loader & Morph System (Section 1 to 12) */}
                  {(isStreaming || isThinking || loaderPhase === 'transitioning' || loaderPhase === 'completing' || Boolean(streamedText && loaderPhase !== 'complete') || (words.length > 0 && loaderPhase !== 'complete') || error) && (
                    <StreamingMessageBubble
                      astrologer={selectedAstrologer}
                      isThinking={isThinking}
                      loaderPhase={loaderPhase}
                      morphStage={morphStage}
                      thinkingStatus={thinkingStatus}
                      activeSequence={activeSequence}
                      words={words}
                      streamedText={streamedText}
                      error={error}
                      isCompleted={isCompleted}
                      onStop={stopStream}
                      onRetry={retryLastStream}
                    />
                  )}

                  {/* TYPING meditating indicator */}
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
                </>
              )}
            </div>

            {/* Smart Auto-Scroll: Floating '✦ Jump to latest ↓' indicator */}
            {!isNearBottom && (hasNewUnseenMessage || isStreaming) && (
              <div className="sticky bottom-4 w-full flex justify-center pointer-events-none z-20">
                <button
                  onClick={() => scrollToBottom('smooth')}
                  className="pointer-events-auto px-4 py-2 rounded-full bg-gradient-to-r from-[#dfb76c] to-[#fef08a] text-[#0e1017] text-xs font-bold shadow-xl shadow-[#dfb76c]/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer animate-progressive-glow"
                  title="Scroll to latest stream"
                >
                  <span className="text-sm font-bold">✦</span>
                  <span>Jump to latest</span>
                  <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Chat Input Bar (fixed/sticky at bottom, above background) */}
        <div className="w-full flex justify-center bg-[#0e1017]/95 relative z-20">
          <div className="w-full max-w-[880px]">
            <ChatInput
              onSendMessage={handleSendMessage}
              currentState={currentState}
              disabled={currentState === 'PAYMENT_PROCESSING' || remainingSeconds <= 0}
              disabledPlaceholder={
                remainingSeconds <= 0 ? 'Recharge minutes to continue' : undefined
              }
              isStreaming={isStreaming || loaderPhase === 'completing'}
              isPillsReady={isPillsReady}
              onStopStreaming={stopStream}
              onRegenerate={handleRegenerate}
            />
          </div>
        </div>
      </div>
    );
  };

  // Determine left panel width based on effective breakpoint (Section 8)
  const getLeftPanelWidthClass = () => {
    switch (effectiveBreakpoint) {
      case 'mobile':
        return 'w-full';
      case 'tablet':
        return isTabletSidebarCollapsed ? 'hidden' : 'w-[290px] shrink-0';
      case 'laptop':
        return 'w-[320px] shrink-0';
      case 'desktop':
        return 'w-[370px] shrink-0';
      case 'large_desktop':
        return 'w-[390px] shrink-0';
      default:
        return 'w-[360px] shrink-0';
    }
  };

  // Determine application shell wrapper class (Section 8 & 11)
  const getShellWrapperClass = () => {
    switch (effectiveBreakpoint) {
      case 'mobile':
        return simulationMode === 'mobile'
          ? 'w-full max-w-[430px] h-full rounded-2xl border border-[#dfb76c]/30 shadow-2xl'
          : 'w-full h-full max-w-full rounded-none border-0';
      case 'tablet':
        return simulationMode === 'tablet'
          ? 'w-full max-w-[860px] h-full rounded-xl border border-[#dfb76c]/25 shadow-2xl'
          : 'w-full h-full max-w-full rounded-none sm:rounded-xl border-x-0 sm:border border-[#dfb76c]/20';
      case 'laptop':
        return 'w-full h-full max-w-6xl xl:max-w-7xl rounded-xl lg:rounded-2xl border border-[#dfb76c]/25 shadow-2xl';
      case 'desktop':
        return 'w-full h-full max-w-[1440px] rounded-2xl border border-[#dfb76c]/25 shadow-2xl';
      case 'large_desktop':
        return 'w-full h-full max-w-[1600px] rounded-2xl border border-[#dfb76c]/25 shadow-2xl';
      default:
        return 'w-full h-full max-w-7xl rounded-2xl border border-[#dfb76c]/25';
    }
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full bg-[#07080d] text-[#ede8dc] flex flex-col selection:bg-[#dfb76c]/30 selection:text-[#fff9e6] relative overflow-hidden">
      {/* Background Sacred Geometric Aura */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#dfb76c_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* ================================================================= */}
      {/* Main Responsive Application Shell                                 */}
      {/* ================================================================= */}
      <div className="flex-1 min-h-0 w-full flex items-center justify-center p-0 sm:p-2 lg:p-3 overflow-hidden">
        <div
          className={`${getShellWrapperClass()} bg-[#0c0d15] flex overflow-hidden transition-all duration-200`}
        >
          {isMobile ? (
            /* ============================================================= */
            /* Mobile Full-Screen App Experience (Chats, Explore, Orders, Tools) */
            /* Profile is a full-screen view accessed via header avatar      */
            /* ============================================================= */
            <div className="w-full h-full min-h-0 flex flex-col overflow-hidden relative">
              {/* Screen Content Container */}
              <div className="flex-1 min-h-0 w-full flex flex-col overflow-hidden relative">
                {isProfileOpen ? (
                  <ProfileScreen
                    kundli={kundli}
                    onUpdateKundli={(updated) => setKundli((prev) => ({ ...prev, ...updated }))}
                    currentOrder={currentOrder}
                    remainingSeconds={remainingSeconds}
                    onOpenRecharge={handleOpenRecharge}
                    onTrackOrder={() => {
                      setIsProfileOpen(false);
                      handleSetState('ORDER_TRACKING');
                      setActiveMobileTab('chats');
                    }}
                    onBackToChats={() => setIsProfileOpen(false)}
                  />
                ) : (
                  <>
                    {activeMobileTab === 'explore' && (
                      <ExploreScreen
                        onStartChatWithAstrologer={(astro) => {
                          handleStartNewChatWithAstrologer(astro);
                          setActiveMobileTab('chats');
                        }}
                        onInspectGemstone={(gem) => {
                          setGemstone(gem);
                          handleInspectGemstone();
                          setActiveMobileTab('chats');
                        }}
                        onOpenNotifications={() => {
                          setActiveMobileTab('chats');
                          setSelectedConvId(null);
                        }}
                        onOpenProfile={() => setIsProfileOpen(true)}
                      />
                    )}

                    {activeMobileTab === 'orders' && (
                      <OrdersScreen
                        currentOrder={currentOrder}
                        onTrackOrder={(order) => {
                          setCurrentOrder(order);
                          handleSetState('ORDER_TRACKING');
                          setActiveMobileTab('chats');
                        }}
                        onOpenProfile={() => setIsProfileOpen(true)}
                        onNewOrderCreated={(order) => setCurrentOrder(order)}
                      />
                    )}

                    {activeMobileTab === 'tools' && (
                      <ToolsScreen
                        onStartChatWithAstrologer={(astro) => {
                          handleStartNewChatWithAstrologer(astro);
                          setActiveMobileTab('chats');
                        }}
                        onOpenProfile={() => setIsProfileOpen(true)}
                      />
                    )}

                    {activeMobileTab === 'chats' && (
                      <div className="w-full h-full min-h-0 flex flex-col overflow-hidden">
                        {selectedConvId ? renderActiveConversationView() : renderChatHomeListPanel()}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Fixed Mobile Bottom Navigation (docked across the 4 primary tabs: Chats, Explore, Orders, Tools) */}
              {!isProfileOpen && (!selectedConvId || activeMobileTab !== 'chats') && (
                <div className="shrink-0 z-40">
                  <MobileBottomNav
                    activeTab={activeMobileTab}
                    onSelectTab={(tab) => {
                      setActiveMobileTab(tab);
                    }}
                    unreadCount={totalUnreadCount}
                    activeOrderCount={activeOrderCount}
                  />
                </div>
              )}
            </div>
          ) : (
            /* ============================================================= */
            /* Multi-Panel Experience (Tablet / Laptop / Desktop / Large)    */
            /* ============================================================= */
            <div className="w-full h-full min-h-0 flex flex-col overflow-hidden relative">
              {/* Desktop App Header Bar with Tab Switcher & Profile Avatar */}
              <header className="shrink-0 h-13 bg-[#0a0c14] border-b border-[#dfb76c]/15 px-4 lg:px-6 flex items-center justify-between z-30 select-none">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 flex items-center justify-center shadow-xs">
                    <div className="w-full h-full rounded-full bg-[#121422] flex items-center justify-center font-display text-xs font-bold text-[#dfb76c]">
                      ✦
                    </div>
                  </div>
                  <span className="font-display font-bold text-sm tracking-wider text-[#fcedc5]">
                    KISMATIO SANCTUM
                  </span>
                  <span className="hidden sm:inline-block text-[10px] text-[#dfb76c] font-mono uppercase px-2 py-0.5 rounded-full bg-[#dfb76c]/10 border border-[#dfb76c]/20">
                    Vedic Astrology & Gems
                  </span>
                </div>

                {/* Center Navigation Tabs: EXACTLY 4 TABS (Chats, Explore, Orders, Tools) */}
                <nav className="flex items-center gap-1.5 p-1 rounded-xl bg-[#121524] border border-[#232940]">
                  {(['chats', 'explore', 'orders', 'tools'] as MobileTab[]).map((tab) => {
                    const isActive = !isProfileOpen && activeMobileTab === tab;
                    const labels: Record<MobileTab, { label: string; icon: string }> = {
                      chats: { label: 'Chats', icon: '💬' },
                      explore: { label: 'Explore', icon: '✦' },
                      orders: { label: 'Orders', icon: '📦' },
                      tools: { label: 'Tools', icon: '◉' },
                    };
                    const badgeCount =
                      tab === 'chats'
                        ? totalUnreadCount
                        : tab === 'orders'
                        ? activeOrderCount
                        : 0;

                    return (
                      <button
                        key={tab}
                        onClick={() => {
                          setIsProfileOpen(false);
                          setActiveMobileTab(tab);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-[#dfb76c] text-[#0e1017] font-semibold shadow-xs'
                            : 'text-[#8e8779] hover:text-[#ede8dc]'
                        }`}
                      >
                        <span>{labels[tab].icon}</span>
                        <span>{labels[tab].label}</span>
                        {badgeCount > 0 && (
                          <span
                            className={`px-1.5 rounded-full text-[9px] font-bold ${
                              isActive
                                ? 'bg-[#0e1017] text-[#dfb76c]'
                                : 'bg-[#dfb76c] text-[#0e1017]'
                            }`}
                          >
                            {badgeCount}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Right: Minutes, Demo States & Profile Avatar Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenRecharge}
                    className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#14182b] border border-[#dfb76c]/30 text-xs text-[#dfb76c] hover:bg-[#1a203a] cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono font-medium">{formatTime(remainingSeconds)}</span>
                    <span className="text-[#8e8779] text-[10px] hidden md:inline">+ Recharge</span>
                  </button>

                  <button
                    onClick={() => setIsStateDrawerOpen(true)}
                    className="px-2.5 py-1 rounded-xl bg-[#161a29] border border-[#2b324c] text-[11px] text-[#cdc7ba] hover:text-[#dfb76c] cursor-pointer"
                    title="Simulate Consultation State"
                  >
                    <span>⚡ Demo States</span>
                  </button>

                  {/* Header Profile Avatar Trigger (Profile is NOT in bottom nav) */}
                  <button
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                      isProfileOpen
                        ? 'bg-[#dfb76c]/15 border-[#dfb76c] text-[#dfb76c] ring-1 ring-[#dfb76c]/40'
                        : 'bg-[#14182b] border-[#2b324c] text-[#cdc7ba] hover:border-[#dfb76c]/40 hover:text-[#ede8dc]'
                    }`}
                    title="My Profile & Janma Kundli"
                  >
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 flex items-center justify-center">
                      <div className="w-full h-full rounded-[6px] bg-[#0b0c14] flex items-center justify-center text-[11px] font-bold text-[#fcedc5]">
                        👤
                      </div>
                    </div>
                    <span className="text-xs font-medium pr-1 hidden lg:inline">Profile</span>
                  </button>
                </div>
              </header>

              {/* Desktop Content Body */}
              <div className="flex-1 min-h-0 w-full flex overflow-hidden">
                {isProfileOpen ? (
                  <div className="w-full h-full max-w-3xl mx-auto flex flex-col overflow-hidden">
                    <ProfileScreen
                      kundli={kundli}
                      onUpdateKundli={(updated) => setKundli((prev) => ({ ...prev, ...updated }))}
                      currentOrder={currentOrder}
                      remainingSeconds={remainingSeconds}
                      onOpenRecharge={handleOpenRecharge}
                      onTrackOrder={() => {
                        setIsProfileOpen(false);
                        handleSetState('ORDER_TRACKING');
                        setActiveMobileTab('chats');
                      }}
                      onBackToChats={() => setIsProfileOpen(false)}
                    />
                  </div>
                ) : (
                  <>
                    {activeMobileTab === 'explore' && (
                      <div className="w-full h-full max-w-6xl mx-auto flex flex-col overflow-hidden">
                        <ExploreScreen
                          onStartChatWithAstrologer={(astro) => {
                            handleStartNewChatWithAstrologer(astro);
                            setActiveMobileTab('chats');
                          }}
                          onInspectGemstone={(gem) => {
                            setGemstone(gem);
                            handleInspectGemstone();
                            setActiveMobileTab('chats');
                          }}
                          onOpenNotifications={() => setActiveMobileTab('chats')}
                          onOpenProfile={() => setIsProfileOpen(true)}
                        />
                      </div>
                    )}

                    {activeMobileTab === 'orders' && (
                      <div className="w-full h-full max-w-4xl mx-auto flex flex-col overflow-hidden">
                        <OrdersScreen
                          currentOrder={currentOrder}
                          onTrackOrder={(order) => {
                            setCurrentOrder(order);
                            handleSetState('ORDER_TRACKING');
                            setActiveMobileTab('chats');
                          }}
                          onOpenProfile={() => setIsProfileOpen(true)}
                          onNewOrderCreated={(order) => setCurrentOrder(order)}
                        />
                      </div>
                    )}

                    {activeMobileTab === 'tools' && (
                      <div className="w-full h-full max-w-4xl mx-auto flex flex-col overflow-hidden">
                        <ToolsScreen
                          onStartChatWithAstrologer={(astro) => {
                            handleStartNewChatWithAstrologer(astro);
                            setActiveMobileTab('chats');
                          }}
                          onOpenProfile={() => setIsProfileOpen(true)}
                        />
                      </div>
                    )}

                    {activeMobileTab === 'chats' && (
                      <div className="w-full h-full min-h-0 flex overflow-hidden">
                        {/* Left Panel: Conversations Navigation */}
                        <div className={`${getLeftPanelWidthClass()} h-full min-h-0 flex flex-col relative overflow-hidden`}>
                          {renderChatHomeListPanel()}
                        </div>

                        {/* Right Panel: Active Conversation or Desktop Empty State */}
                        <div className="flex-1 min-h-0 h-full flex flex-col overflow-hidden">
                          {renderActiveConversationView()}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================================================================= */}
      {/* Global & Chat Menus / Drawers                                     */}
      {/* ================================================================= */}

      {/* Global Main App Menu (Section 23 & 25) */}
      <MainAppMenuDropdown
        isOpen={isMainAppMenuOpen}
        onClose={() => setIsMainAppMenuOpen(false)}
        isMobile={isMobile}
        onSelectAction={(action) => {
          if (action === 'astrologers') setIsNewChatModalOpen(true);
          if (action === 'orders') {
            setActiveMobileTab('orders');
            setIsProfileOpen(false);
          }
          if (action === 'tools') {
            setActiveMobileTab('tools');
            setIsProfileOpen(false);
          }
          if (action === 'profile') {
            setIsProfileOpen(true);
          }
          if (action === 'gemstones') {
            handleSelectConversation(conversations[1]);
            setIsProfileOpen(false);
          }
          setIsMainAppMenuOpen(false);
        }}
      />

      {/* Chat Specific Menu (Section 24 & 25) */}
      <ChatSpecificMenuDropdown
        isOpen={isChatMenuOpen}
        onClose={() => setIsChatMenuOpen(false)}
        astrologerName={selectedAstrologer.name}
        isMobile={isMobile}
        isChatEmpty={messages.length === 0}
        onSelectAction={(action) => {
          if (action === 'astrologer_info') setIsAstrologerInfoOpen(true);
          if (action === 'search_in_chat') setIsInChatSearchOpen(true);
          if (action === 'remaining_minutes') handleOpenRecharge();
          if (action === 'recommended_products') handleSetState('RECOMMENDATION');
          if (action === 'orders') handleSetState('ORDER_TRACKING');
          if (action === 'consultation_details') setShowKundliHeaderSummary(true);
          if (action === 'saved_insights') setActiveFilter('saved');
          if (action === 'clear_chat') {
            if (messages.length === 0) {
              handleResetDemo();
            } else {
              setMessages([]);
              setCurrentState('IDLE');
            }
          }
        }}
      />

      {/* Quick Recharge Modal / Sheet */}
      <QuickRechargeModal
        isOpen={isQuickRechargeOpen}
        onClose={() => setIsQuickRechargeOpen(false)}
        onSelectPack={(pack) => handleRechargeComplete(pack.minutes, pack)}
        astrologerName={selectedAstrologer.name}
        currentRemainingSeconds={remainingSeconds}
        isMobile={isMobile}
      />

      {/* Astrologer Info Slide-Over Panel */}
      <AstrologerInfoPanel
        isOpen={isAstrologerInfoOpen}
        onClose={() => setIsAstrologerInfoOpen(false)}
        astrologer={selectedAstrologer}
        order={currentOrder}
        gemstone={gemstone}
        onStartChat={() => {}}
        onOpenRecharge={handleOpenRecharge}
      />

      {/* New Conversation (Astrologer Discovery) Modal */}
      <NewConversationModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onSelectAstrologer={handleStartNewChatWithAstrologer}
      />

      {/* Mobile State Machine Drawer */}
      <MobileStateDrawer
        isOpen={isStateDrawerOpen}
        onClose={() => setIsStateDrawerOpen(false)}
        currentState={currentState}
        onSetState={handleSetState}
        onTriggerNext={handleTriggerNext}
        isAutoAdvancing={isAutoAdvancing}
        onToggleAutoAdvance={() => setIsAutoAdvancing(!isAutoAdvancing)}
      />
    </div>
  );
};
