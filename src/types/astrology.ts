export type ChatState =
  | 'IDLE'
  | 'TYPING'
  | 'STREAMING'
  | 'MESSAGE_COMPLETE'
  | 'RECOMMENDATION'
  | 'PRODUCT_VIEW'
  | 'CHECKOUT'
  | 'PAYMENT_PROCESSING'
  | 'PAYMENT_SUCCESS'
  | 'ORDER_CONFIRMED'
  | 'CONVERSATION_CONTINUES'
  | 'LOW_TIME'
  | 'RECHARGE'
  | 'ORDER_TRACKING'
  | 'POST_PURCHASE_GUIDANCE';

export interface Astrologer {
  id: string;
  name: string;
  title: string;
  lineage: string;
  experienceYears: number;
  rating: number;
  totalConsultations: number;
  ratePerMinute: number;
  languages: string[];
  specializations: string[];
  bio: string;
  location: string;
  avatarSeed: string;
  accentColor: string;
}

export interface KundliData {
  name: string;
  dob: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gotra: string;
  lagna: string;
  moonSign: string;
  sunSign: string;
  nakshatra: string;
  pada: number;
  currentMahadasha: string;
  currentAntardasha: string;
  activeDosha?: string;
  keyObservation: string;
}

export interface GemstoneProduct {
  id: string;
  name: string;
  sanskritName: string;
  weightRatti: number;
  weightCarat: number;
  origin: string;
  treatment: string;
  shape: string;
  colorGrade: string;
  rulingPlanet: string;
  deity: string;
  beejMantra: string;
  basePrice: number;
  consecrationFee: number;
  certificationBody: string;
  reportNumber: string;
  benefits: string[];
  idealMetal: string;
  wearingDay: string;
  wearingFinger: string;
  description: string;
}

export interface OrderDetails {
  orderId: string;
  gemstone: GemstoneProduct;
  selectedMetal: '18k_gold' | 'panchdhatu' | 'sterling_silver';
  ringSize: string;
  sankalpName: string;
  sankalpGotra: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  pricing: {
    gemstonePrice: number;
    metalPremium: number;
    consecrationCharge: number;
    labCertCharge: number;
    shipping: number;
    discount: number;
    totalAmount: number;
  };
  paymentMethod: string;
  paymentId: string;
  orderTimestamp: string;
  currentStatus: 'sankalp_scheduled' | 'pooja_in_progress' | 'ring_crafting' | 'dispatched' | 'delivered';
  muhuratDate: string;
  muhuratTime: string;
}

export interface RechargePack {
  id: string;
  minutes: number;
  price: number;
  originalPrice: number;
  tag?: string;
  perMinuteRate: number;
}

export type MessageSender = 'astrologer' | 'user' | 'system';

export type WidgetType =
  | 'kundli_summary'
  | 'gemstone_recommendation'
  | 'catalog_card'
  | 'product_view'
  | 'checkout'
  | 'payment_processing'
  | 'payment_success'
  | 'order_confirmed'
  | 'low_time_warning'
  | 'recharge_pack'
  | 'order_tracking'
  | 'wearing_guidance';

export interface ChatMessageItem {
  id: string;
  sender: MessageSender;
  text?: string;
  timestamp: string;
  widgetType?: WidgetType;
  widgetData?: any;
}

export type ConversationFilter = 'all' | 'unread' | 'astrologers' | 'active' | 'orders' | 'saved';

export type ConversationStatus = 'active' | 'unread' | 'completed' | 'order' | 'offline';

export interface ConversationThread {
  id: string;
  astrologerId: string;
  astrologerName: string;
  astrologerTitle: string;
  astrologerLineage: string;
  isVerified: boolean;
  avatarSeed: string;
  avatarColor: string;
  status: ConversationStatus;
  statusLabel?: string;
  remainingSeconds?: number;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  isOnline: boolean;
  isSaved?: boolean;
  orderId?: string;
  topics: string[];
  productName?: string;
  guruId?: string;
}

export type MainAppMenuItem =
  | 'chats'
  | 'astrologers'
  | 'tools'
  | 'horoscope'
  | 'gemstones'
  | 'orders'
  | 'notifications'
  | 'profile'
  | 'settings';

export type ChatMenuItem =
  | 'astrologer_info'
  | 'search_in_chat'
  | 'consultation_details'
  | 'remaining_minutes'
  | 'recommended_products'
  | 'orders'
  | 'saved_insights'
  | 'mute'
  | 'clear_chat'
  | 'report';

