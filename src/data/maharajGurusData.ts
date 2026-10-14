import { Astrologer } from '../types/astrology';

export type GuruBadge = 'flagship' | 'preferred' | 'expert' | 'specialist';

export type GuruBackgroundKey =
  | 'romantic_celestial'     // GURU 01: ADIT
  | 'cosmic_timeline'        // GURU 02: GURU NUPUR
  | 'neural_cosmos'          // GURU 03: DR. ADITI
  | 'vastu_architecture'     // GURU 04: KAVYA
  | 'indigo_observatory'     // GURU 05: ACHARYA VASUDEV
  | 'kundali_mandala'        // GURU 06: ACHARYA GURU (Flagship)
  | 'stormy_metallic'        // GURU 07: KHOJI BABA
  | 'judicial_architecture'; // GURU 08: NYAYA GURU

export type GuruCategory = 'all' | 'flagship' | 'astrology' | 'love' | 'vastu' | 'specialized';

export interface GuruStructuredData {
  type: 'timeline' | 'vastu' | 'chart' | 'kundali' | 'search_clues' | 'legal_case' | 'compatibility' | 'mindset';
  title: string;
  subtitle: string;
  badge: string;
  items: Array<{
    label: string;
    value: string;
    detail?: string;
    status?: 'active' | 'pending' | 'favorable' | 'caution';
  }>;
  disclaimer?: string;
}

export interface MaharajGuru {
  id: string;
  num: string;
  name: string;
  title: string;
  specialization: string;
  shortDescription: string;
  route: string;
  backgroundKey: GuruBackgroundKey;
  welcomeMessage: string;
  quickActions: string[];
  badge?: GuruBadge;
  badgeLabel?: string;
  category: GuruCategory;
  accentColor: string;
  secondaryColor: string;
  glowColor: string;
  symbol: string;
  avatarUrl: string;
  avatarSeed: string;
  experienceYears: number;
  rating: number;
  totalConsultations: number;
  ratePerMinute: number;
  languages: string[];
  location: string;
  bio: string;
  structuredData: GuruStructuredData;
}

export const MAHARAJ_GURUS: MaharajGuru[] = [
  // =========================================================================
  // GURU 01 — ADIT (Love Guru)
  // =========================================================================
  {
    id: 'adit',
    num: '01',
    name: 'ADIT',
    title: 'Love Guru',
    specialization: 'Love, relationships, emotional connections, compatibility, and relationship guidance.',
    shortDescription: 'Understand your relationships, explore emotional connections, and find clarity in matters of the heart.',
    route: '/chats/adit',
    backgroundKey: 'romantic_celestial',
    welcomeMessage: "Welcome. I'm Adit, your Love Guru. Let's explore what's on your mind and find clarity in your relationships.",
    quickActions: [
      'Love & Relationships',
      'Compatibility',
      'Marriage Guidance',
      'Emotional Clarity',
    ],
    badge: 'specialist',
    badgeLabel: 'Love & Relationships',
    category: 'love',
    accentColor: '#f43f5e',
    secondaryColor: '#be185d',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    symbol: '❤️',
    avatarUrl: '/images/gurus/adit.jpg',
    avatarSeed: 'adit',
    experienceYears: 14,
    rating: 4.96,
    totalConsultations: 18450,
    ratePerMinute: 60,
    languages: ['Hindi', 'English'],
    location: 'Jaipur / Mumbai Peeth',
    bio: 'Specializes in Venusian (Shukra) relationship dynamics, emotional compatibility, marriage muhurats, and heartfelt relationship clarity.',
    structuredData: {
      type: 'compatibility',
      title: 'Relationship Harmony & Compatibility Insights',
      subtitle: 'Venus (Shukra) and 7th House Kalatra Sthana Dynamics',
      badge: 'Shukra Alignment',
      items: [
        { label: '7th House Lord', value: 'Mars in Aries', detail: 'Passionate commitment and protective devotion', status: 'favorable' },
        { label: 'Venus Position', value: 'Exalted in Pisces (Revati)', detail: 'Deep empathy, spiritual romantic connection', status: 'favorable' },
        { label: 'Guna Milan Index', value: '29 / 36 Gunas', detail: 'High planetary harmony for marriage & long-term union', status: 'favorable' },
        { label: 'Recommended Focus', value: 'Open communication during Shukra transit', detail: 'Dissolves lingering emotional misunderstandings', status: 'active' },
      ],
      disclaimer: 'Astrological compatibility offers perspective on emotional dynamics and should be paired with mutual respect and honest dialogue.',
    },
  },

  // =========================================================================
  // GURU 02 — GURU NUPUR (Preferred — Real-Time Timeline & Charts)
  // =========================================================================
  {
    id: 'nupur',
    num: '02',
    name: 'Guru Nupur',
    title: 'Preferred — Real-Time Timeline & Charts',
    specialization: 'Real-time astrological timelines, planetary movements, chart-based interpretation, and astrological period analysis.',
    shortDescription: 'Explore your astrological timeline through chart-based insights and planetary movements.',
    route: '/chats/nupur',
    backgroundKey: 'cosmic_timeline',
    welcomeMessage: "Namaste. I'm Guru Nupur. Let's explore your astrological timeline and understand the planetary patterns relevant to your questions.",
    quickActions: [
      'Explore My Timeline',
      'Understand Planetary Transits',
      'View Astrological Charts',
      'Explore Important Periods',
    ],
    badge: 'preferred',
    badgeLabel: 'Preferred',
    category: 'astrology',
    accentColor: '#06b6d4',
    secondaryColor: '#0891b2',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    symbol: '⏱️',
    avatarUrl: '/images/gurus/nupur.jpg',
    avatarSeed: 'nupur',
    experienceYears: 19,
    rating: 4.98,
    totalConsultations: 24100,
    ratePerMinute: 70,
    languages: ['Hindi', 'English', 'Gujarati'],
    location: 'Ujjain Transit Observatory',
    bio: 'Master of Gochara (planetary transits) and Vimshottari dasha timelines, mapping turning points and planetary conjunction windows in real time.',
    structuredData: {
      type: 'timeline',
      title: 'Real-Time Astrological Timeline & Transits',
      subtitle: 'Vimshottari Dasha Periods & Planetary Conjunction Windows',
      badge: 'Active Timeline',
      items: [
        { label: 'Current Mahadasha', value: 'Brihaspati (Jupiter) Mahadasha', detail: 'Period of intellectual expansion & mentorship (till 2029)', status: 'active' },
        { label: 'Active Antardasha', value: 'Shani (Saturn) Antardasha', detail: 'Testing perseverance and structured discipline', status: 'caution' },
        { label: 'Next Major Transit', value: 'Surya enters Libra', detail: 'Transition occurring on 17th of this month', status: 'favorable' },
        { label: 'Gochara Highlight', value: 'Guru 5th Drishti on 10th Bhava', detail: 'Shields professional ventures against sudden stalls', status: 'favorable' },
      ],
      disclaimer: 'Calculated using Lahiri (Chitra Paksha) Ayanamsha based on user birth coordinates. Placeholders reflect documented astrological periods.',
    },
  },

  // =========================================================================
  // GURU 03 — DR. ADITI (Astro-Psychologist)
  // =========================================================================
  {
    id: 'dr-aditi',
    num: '03',
    name: 'Dr. Aditi',
    title: 'Astro-Psychologist',
    specialization: 'Astrological reflection, self-understanding, emotional patterns, personality exploration, and personal growth.',
    shortDescription: 'Explore your personality, emotional patterns, and personal growth through thoughtful astrological reflection.',
    route: '/chats/dr-aditi',
    backgroundKey: 'neural_cosmos',
    welcomeMessage: "Hello, I'm Dr. Aditi. We can explore your thoughts, patterns, and personal journey through reflective conversations and astrological perspectives.",
    quickActions: [
      'Personality Reflection',
      'Emotional Patterns',
      'Self-Discovery',
      'Personal Growth',
    ],
    badge: 'specialist',
    badgeLabel: 'Astro-Psychology',
    category: 'specialized',
    accentColor: '#a855f7',
    secondaryColor: '#7c3aed',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    symbol: '🧠',
    avatarUrl: '/images/gurus/dr-aditi.jpg',
    avatarSeed: 'dr-aditi',
    experienceYears: 17,
    rating: 4.94,
    totalConsultations: 15200,
    ratePerMinute: 65,
    languages: ['English', 'Hindi'],
    location: 'Bengaluru / Rishikesh',
    bio: 'Blends traditional Manasik Jyotish (Moon/Mercury dynamics) with reflective behavioral guidance, fostering deep self-awareness and emotional balance.',
    structuredData: {
      type: 'mindset',
      title: 'Mindset & Emotional Pattern Reflection',
      subtitle: 'Moon (Manas) & Mercury (Buddhi) Cognitive Balance',
      badge: 'Reflective Framework',
      items: [
        { label: 'Moon Sign (Manas)', value: 'Pisces (Meena) · Uttara Bhadrapada', detail: 'Deeply intuitive, reflective, processes experiences internally', status: 'active' },
        { label: 'Mercury (Buddhi)', value: 'Virgo (Kanya) · Chitra', detail: 'Strong analytical discernment with high attention to detail', status: 'favorable' },
        { label: 'Stress Pattern', value: 'Overthinking during Mercury retrograde', detail: 'Tendency to carry project delays as personal burdens', status: 'caution' },
        { label: 'Reflective Focus', value: 'Mindful boundary-setting & pause rituals', detail: 'Allow natural resting cycles between intense work sprints', status: 'favorable' },
      ],
      disclaimer: 'Astrological reflection provides spiritual and self-reflective perspectives. It does not constitute clinical psychological diagnosis or medical treatment.',
    },
  },

  // =========================================================================
  // GURU 04 — KAVYA (Vastu Shastra — Home & Office)
  // =========================================================================
  {
    id: 'kavya',
    num: '04',
    name: 'Kavya',
    title: 'Vastu Shastra — Home & Office',
    specialization: 'Vastu Shastra, home layouts, office environments, spatial organization, and traditional architectural guidance.',
    shortDescription: 'Explore Vastu-inspired ideas for creating balanced and thoughtfully organized living and working spaces.',
    route: '/chats/kavya',
    backgroundKey: 'vastu_architecture',
    welcomeMessage: "Namaste. I'm Kavya, your Vastu Guru. Tell me about your home, office, room layout, or architectural concerns, and we'll explore suitable Vastu-inspired guidance.",
    quickActions: [
      'Home Vastu',
      'Office Vastu',
      'Room Layout',
      'Entrance & Directions',
    ],
    badge: 'specialist',
    badgeLabel: 'Vastu Shastra',
    category: 'vastu',
    accentColor: '#10b981',
    secondaryColor: '#059669',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    symbol: '🏛️',
    avatarUrl: '/images/gurus/kavya.jpg',
    avatarSeed: 'kavya',
    experienceYears: 15,
    rating: 4.93,
    totalConsultations: 13800,
    ratePerMinute: 60,
    languages: ['Hindi', 'English', 'Marathi'],
    location: 'Pune / Varanasi',
    bio: 'Specializes in spatial energy balancing, Vedic architectural alignment (Sthapatya Veda), and practical modern non-destructive Vastu rectifications.',
    structuredData: {
      type: 'vastu',
      title: 'Vastu Shastra Spatial Cardinal Alignment',
      subtitle: 'Eight Directions (Ashta Dik) Energy Balance Matrix',
      badge: 'Vastu Mandala',
      items: [
        { label: 'Ishanya (North-East)', value: 'Jala (Water) / Devata Realm', detail: 'Ideal for meditation, study, puja, and clear natural light', status: 'favorable' },
        { label: 'Agneya (South-East)', value: 'Agni (Fire) Energy Node', detail: 'Ideal for kitchen, electrical equipment, and enterprise servers', status: 'favorable' },
        { label: 'Nairutya (South-West)', value: 'Prithvi (Earth) / Stability', detail: 'Best for master bedroom or leadership office seating', status: 'active' },
        { label: 'Vayavya (North-West)', value: 'Vayu (Air) / Movement', detail: 'Suited for finished inventory, guest suites, and transition zones', status: 'active' },
      ],
      disclaimer: 'Spatial guidance is based on classical Vastu Shastra principles. Exact structural changes should be reviewed with certified civil engineers.',
    },
  },

  // =========================================================================
  // GURU 05 — ACHARYA VASUDEV (Premium Expert — Real Charts)
  // =========================================================================
  {
    id: 'acharya-vasudev',
    num: '05',
    name: 'Acharya Vasudev',
    title: 'Premium Expert — Real Charts',
    specialization: 'Premium expert-level astrological chart interpretation and detailed chart-based guidance.',
    shortDescription: 'Explore detailed astrological charts and receive a more comprehensive interpretation of your astrological questions.',
    route: '/chats/acharya-vasudev',
    backgroundKey: 'indigo_observatory',
    welcomeMessage: "Namaste. I'm Acharya Vasudev. Share your astrological question, and we'll explore the relevant chart information and its interpretation in detail.",
    quickActions: [
      'Detailed Chart Reading',
      'Birth Chart Interpretation',
      'Planetary Positions',
      'Explore Chart Combinations',
    ],
    badge: 'expert',
    badgeLabel: 'Expert Charts',
    category: 'astrology',
    accentColor: '#6366f1',
    secondaryColor: '#4338ca',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    symbol: '📜',
    avatarUrl: '/images/gurus/acharya-vasudev.jpg',
    avatarSeed: 'acharya-vasudev',
    experienceYears: 26,
    rating: 4.99,
    totalConsultations: 28900,
    ratePerMinute: 85,
    languages: ['Sanskrit', 'Hindi', 'English'],
    location: 'Kashi Jyotish Mahavidyalaya',
    bio: 'Renowned classical scholar specializing in divisional charts (D-9 Navamsha, D-10 Dashamsha), planetary dignity, and granular shadbala strength calculations.',
    structuredData: {
      type: 'chart',
      title: 'Detailed Astrological Chart Interpretation',
      subtitle: 'Divisional Charts (D-1 Rashi & D-9 Navamsha) Precision Analysis',
      badge: 'Shadbala Analysis',
      items: [
        { label: 'Lagna (Ascendant)', value: 'Libra (Tula) at 14°28’', detail: 'Ruled by Venus, seeks harmony, justice, and balanced enterprise', status: 'active' },
        { label: '10th House (Karma)', value: 'Cancer (Karka) with Guru aspect', detail: 'Executive career in tech & consultancy; Rajayoga activation', status: 'favorable' },
        { label: 'Navamsha D-9 Lagna', value: 'Sagittarius (Dhanu)', detail: 'Spiritual foundation strengthens professional longevity', status: 'favorable' },
        { label: 'Planetary Strength', value: 'Brihaspati Shadbala: 1.42 Rupas', detail: 'Strongest benefic planet in chart; protects fortune', status: 'favorable' },
      ],
      disclaimer: 'Based on authentic Vedic mathematical calculations. Detailed planetary degrees correspond to user-submitted birth coordinates.',
    },
  },

  // =========================================================================
  // GURU 06 — ACHARYA GURU (Flagship — Kundali Guru)
  // =========================================================================
  {
    id: 'acharya-guru',
    num: '06',
    name: 'Acharya Guru',
    title: 'Flagship — Kundali Guru',
    specialization: 'Flagship Kundali guidance, birth chart exploration, traditional astrological interpretation, and comprehensive astrological consultations.',
    shortDescription: 'Your central destination for comprehensive Kundali exploration and traditional astrological guidance.',
    route: '/chats/acharya-guru',
    backgroundKey: 'kundali_mandala',
    welcomeMessage: "Namaste. I'm Acharya Guru, your flagship Kundali Guru. Let's begin with your question and explore the astrological guidance most relevant to your situation.",
    quickActions: [
      'Explore My Kundali',
      'Birth Chart Guidance',
      'Kundali Compatibility',
      'Ask Acharya Guru',
    ],
    badge: 'flagship',
    badgeLabel: '✦ Flagship',
    category: 'flagship',
    accentColor: '#dfb76c',
    secondaryColor: '#b45309',
    glowColor: 'rgba(223, 183, 108, 0.55)',
    symbol: '👑',
    avatarUrl: '/images/gurus/acharya-guru.jpg',
    avatarSeed: 'acharya-guru',
    experienceYears: 30,
    rating: 4.99,
    totalConsultations: 42000,
    ratePerMinute: 90,
    languages: ['Hindi', 'English', 'Sanskrit'],
    location: 'Varanasi Central Peeth',
    bio: 'The central pillar of Kismatio Vedic Sanctum. Decodes birth charts, Graha yogas, dosha pariharas, and lifelong destiny patterns with sovereign Vedic mastery.',
    structuredData: {
      type: 'kundali',
      title: 'Flagship Janma Kundali & Dosha Summary',
      subtitle: 'Comprehensive Birth Chart Decoding with Agamic Vedic Precision',
      badge: 'Core Kundali',
      items: [
        { label: 'Janma Nakshatra', value: 'Uttara Bhadrapada (Pada 2)', detail: 'Ahirbudhnya deity; endowed with deep wisdom and resilience', status: 'active' },
        { label: 'Moon Sign (Rashi)', value: 'Pisces (Meena)', detail: 'Compassionate, visionary, spiritually perceptive temperament', status: 'active' },
        { label: 'Active Graha Dosha', value: 'Mild Rahu-Shani Drishti', detail: 'Mitigated by Guru 5th drishti and consecrated gemstone wear', status: 'caution' },
        { label: 'Rajayoga Status', value: 'Gajakesari & Amala Yoga present', detail: 'Guarantees sustainable wealth and enduring societal honor', status: 'favorable' },
      ],
      disclaimer: 'Flagship synthesis computed according to Parashari tradition with Chitra Paksha Lahiri Ayanamsha.',
    },
  },

  // =========================================================================
  // GURU 07 — KHOJI BABA (Find & Lost Guru)
  // =========================================================================
  {
    id: 'khoji-baba',
    num: '07',
    name: 'Khoji Baba',
    title: 'Find & Lost Guru',
    specialization: 'Lost-and-found inquiries, locating misplaced belongings, organizing search information, and helping users think through possible next steps.',
    shortDescription: 'Bring together the details, clues, and circumstances that may help you work through a lost-and-found situation.',
    route: '/chats/khoji-baba',
    backgroundKey: 'stormy_metallic',
    welcomeMessage: "Namaste. I'm Khoji Baba. Tell me what you're trying to find, where you last remember seeing it, and any details that might help us organize the search.",
    quickActions: [
      'Lost an Item',
      'Found an Item',
      'Organize Search Clues',
      'Review Last Known Location',
    ],
    badge: 'specialist',
    badgeLabel: 'Find & Lost',
    category: 'specialized',
    accentColor: '#38bdf8',
    secondaryColor: '#0284c7',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    symbol: '🧭',
    avatarUrl: '/images/gurus/khoji-baba.jpg',
    avatarSeed: 'khoji-baba',
    experienceYears: 21,
    rating: 4.91,
    totalConsultations: 11600,
    ratePerMinute: 55,
    languages: ['Hindi', 'English', 'Bhojpuri'],
    location: 'Prayagraj Peeth',
    bio: 'Combines Prashna Kundli (horary chart timing of lost articles) with disciplined deductive steps, helping retrace actions and organize search perimeters.',
    structuredData: {
      type: 'search_clues',
      title: 'Lost & Found Clue Organization Workspace',
      subtitle: 'Prashna Jyotish Horary Compass & Deductive Search Grid',
      badge: 'Prashna Compass',
      items: [
        { label: 'Search Subject', value: 'Misplaced documents / Valuable article', detail: 'Identify physical materials, color, and containers', status: 'active' },
        { label: 'Last Confirmed Sighting', value: 'Home study / Office desk zone', detail: 'Verify timeframe and recent visitors or movements', status: 'active' },
        { label: 'Prashna Lagna Direction', value: 'North-East quadrant (Ishanya)', detail: 'Check elevated shelves, sacred areas, or wooden drawers', status: 'favorable' },
        { label: 'Recommended Next Step', value: 'Systematic clockwise room search', detail: 'Do not panic-search; retrace moments before transit', status: 'favorable' },
      ],
      disclaimer: 'This guidance helps organize memories and deductive steps. It does not provide real-time GPS tracking or guarantee physical recovery.',
    },
  },

  // =========================================================================
  // GURU 08 — NYAYA GURU (Court Case & Legal Guidance)
  // =========================================================================
  {
    id: 'nyaya-guru',
    num: '08',
    name: 'Nyaya Guru',
    title: 'Court Case & Legal Guidance',
    specialization: 'Court-case guidance, legal information, document organization, understanding legal procedures, and preparing questions for qualified legal professionals.',
    shortDescription: 'Organize your case information, understand general legal concepts, and prepare for your next legal consultation.',
    route: '/chats/nyaya-guru',
    backgroundKey: 'judicial_architecture',
    welcomeMessage: "Namaste. I'm Nyaya Guru. Tell me about your legal concern, and I'll help you organize the facts, understand general legal information, and identify questions to discuss with a qualified lawyer.",
    quickActions: [
      'Understand a Legal Process',
      'Organize Case Details',
      'Review Important Dates',
      'Prepare Questions for a Lawyer',
    ],
    badge: 'specialist',
    badgeLabel: 'Court & Legal',
    category: 'specialized',
    accentColor: '#e2e8f0',
    secondaryColor: '#94a3b8',
    glowColor: 'rgba(226, 232, 240, 0.4)',
    symbol: '⚖️',
    avatarUrl: '/images/gurus/nyaya-guru.jpg',
    avatarSeed: 'nyaya-guru',
    experienceYears: 23,
    rating: 4.95,
    totalConsultations: 14700,
    ratePerMinute: 65,
    languages: ['English', 'Hindi'],
    location: 'New Delhi Peeth',
    bio: 'Provides structured procedural organization for civil, property, and dispute resolution questions, mapping key procedural stages and preparation for legal counsel.',
    structuredData: {
      type: 'legal_case',
      title: 'Legal Matter & Case Fact Organizer',
      subtitle: 'Procedural Roadmap & Advocate Consultation Preparation',
      badge: 'Case Organizer',
      items: [
        { label: 'Matter Category', value: 'Civil / Property / Commercial Agreement', detail: 'Structure facts chronologically before meeting counsel', status: 'active' },
        { label: 'Key Chronology', value: 'Agreement date, notice received, responses', detail: 'Maintain clean digital copies in chronological order', status: 'active' },
        { label: 'Procedural Stage', value: 'Pre-litigation / Notice Exchange', detail: 'Explore amicable mediation and statutory response windows', status: 'favorable' },
        { label: 'Advocate Checklist', value: 'Prepare 5 specific legal questions', detail: 'Focus on relief sought, limitation period, and evidentiary strength', status: 'favorable' },
      ],
      disclaimer: 'This service provides educational legal information and organization. It does NOT constitute legal advice or an attorney-client relationship. Always consult a licensed advocate for specific legal counsel.',
    },
  },
];

// Helper to find guru by ID or route
export function getGuruById(id: string): MaharajGuru | undefined {
  return MAHARAJ_GURUS.find((g) => g.id === id);
}

export function getGuruByRoute(route: string): MaharajGuru | undefined {
  const clean = route.replace(/\/$/, '');
  return MAHARAJ_GURUS.find((g) => g.route === clean || clean.endsWith(g.id));
}

// Convert MaharajGuru to existing Astrologer interface for seamless 100% compatibility
export function guruToAstrologer(guru: MaharajGuru): Astrologer {
  return {
    id: guru.id,
    name: guru.name,
    title: guru.title,
    lineage: guru.location,
    experienceYears: guru.experienceYears,
    rating: guru.rating,
    totalConsultations: guru.totalConsultations,
    ratePerMinute: guru.ratePerMinute,
    languages: guru.languages,
    specializations: [guru.specialization, ...guru.quickActions],
    bio: guru.bio,
    location: guru.location,
    avatarSeed: guru.avatarSeed || guru.id,
    avatarUrl: guru.avatarUrl,
    symbol: guru.symbol,
    accentColor: guru.accentColor,
  };
}
