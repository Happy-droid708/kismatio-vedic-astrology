export interface MinutePack {
  id: string;
  minutes: number;
  price: number;
  originalPrice: number;
  perMinuteRate: number;
  tag?: string;
  savingsPercent?: number;
  description?: string;
}

export interface RechargeConfig {
  lowBalanceThresholdMinutes: number;      // Default: 5 minutes (300 seconds)
  criticalBalanceThresholdMinutes: number; // Default: 2 minutes (120 seconds)
  zeroBalanceThresholdMinutes: number;     // 0 minutes (0 seconds)
  packs: MinutePack[];
}

export const DEFAULT_RECHARGE_CONFIG: RechargeConfig = {
  lowBalanceThresholdMinutes: 5,
  criticalBalanceThresholdMinutes: 2,
  zeroBalanceThresholdMinutes: 0,
  packs: [
    {
      id: 'pack-10',
      minutes: 10,
      price: 299,
      originalPrice: 450,
      perMinuteRate: 30,
      savingsPercent: 33,
      description: 'Quick query clarification & follow-up',
    },
    {
      id: 'pack-30',
      minutes: 30,
      price: 799,
      originalPrice: 1200,
      perMinuteRate: 26,
      tag: '✦ MOST POPULAR',
      savingsPercent: 35,
      description: 'Complete Kundli & Mahadasha analysis',
    },
    {
      id: 'pack-60',
      minutes: 60,
      price: 1399,
      originalPrice: 2400,
      perMinuteRate: 23,
      tag: 'BEST VALUE',
      savingsPercent: 42,
      description: 'Deep remedial roadmap & career consultation',
    },
    {
      id: 'pack-120',
      minutes: 120,
      price: 2499,
      originalPrice: 4800,
      perMinuteRate: 20,
      tag: 'MAX SAVINGS',
      savingsPercent: 48,
      description: 'Extended family chart analysis & guidance',
    },
  ],
};
