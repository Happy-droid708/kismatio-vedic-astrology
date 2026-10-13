import React from 'react';

interface GemstoneIllustrationProps {
  type: 'yellow-sapphire' | 'blue-sapphire' | 'emerald';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const GemstoneIllustration: React.FC<GemstoneIllustrationProps> = ({
  type,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    hero: 'w-56 h-56 md:w-64 md:h-64',
  };

  if (type === 'yellow-sapphire') {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
        {/* Subtle radial aura */}
        <div className="absolute inset-0 bg-amber-500/15 rounded-full blur-2xl animate-pulse" />
        
        {/* SVG Faceted Cushion Cut Yellow Sapphire */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_24px_rgba(245,158,11,0.25)]">
          <defs>
            <linearGradient id="cushionGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="25%" stopColor="#facc15" />
              <stop offset="60%" stopColor="#eab308" />
              <stop offset="85%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            <linearGradient id="facetHighlight" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#fef9c3" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="innerDepth" x1="50%" y1="10%" x2="50%" y2="90%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#ca8a04" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#713f12" />
            </linearGradient>

            <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#dfb76c" />
              <stop offset="100%" stopColor="#996e28" />
            </linearGradient>
          </defs>

          {/* Golden Ring Prongs Backdrop */}
          <circle cx="100" cy="100" r="88" fill="none" stroke="url(#ringGold)" strokeWidth="3" opacity="0.4" strokeDasharray="6 4" />
          <circle cx="100" cy="100" r="94" fill="none" stroke="url(#ringGold)" strokeWidth="1" opacity="0.2" />

          {/* Prongs */}
          <path d="M42 42 L52 52" stroke="url(#ringGold)" strokeWidth="6" strokeLinecap="round" />
          <path d="M158 42 L148 52" stroke="url(#ringGold)" strokeWidth="6" strokeLinecap="round" />
          <path d="M42 158 L52 148" stroke="url(#ringGold)" strokeWidth="6" strokeLinecap="round" />
          <path d="M158 158 L148 148" stroke="url(#ringGold)" strokeWidth="6" strokeLinecap="round" />

          {/* Cushion Gemstone Girdle Outer */}
          <path
            d="M60 30 Q100 24 140 30 Q176 66 170 100 Q176 134 140 170 Q100 176 60 170 Q24 134 30 100 Q24 66 60 30 Z"
            fill="url(#cushionGoldGrad)"
            stroke="#dfb76c"
            strokeWidth="1.5"
          />

          {/* Internal Table & Facets */}
          {/* Table (center flat octagon) */}
          <path
            d="M75 60 L125 60 L145 80 L145 120 L125 140 L75 140 L55 120 L55 80 Z"
            fill="url(#innerDepth)"
            stroke="#fef08a"
            strokeWidth="1.2"
            opacity="0.9"
          />

          {/* Crown Facet Triangles */}
          <polygon points="60,30 100,24 75,60" fill="#fde047" opacity="0.75" />
          <polygon points="100,24 140,30 125,60" fill="#facc15" opacity="0.65" />
          <polygon points="140,30 170,60 145,80" fill="#eab308" opacity="0.8" />
          <polygon points="170,60 170,100 145,80" fill="#ca8a04" opacity="0.7" />
          <polygon points="170,100 170,140 145,120" fill="#a16207" opacity="0.8" />
          <polygon points="170,140 140,170 125,140" fill="#ca8a04" opacity="0.85" />
          <polygon points="140,170 100,176 125,140" fill="#854d0e" opacity="0.8" />
          <polygon points="100,176 60,170 75,140" fill="#713f12" opacity="0.75" />
          <polygon points="60,170 30,140 55,120" fill="#854d0e" opacity="0.8" />
          <polygon points="30,140 30,100 55,120" fill="#ca8a04" opacity="0.75" />
          <polygon points="30,100 30,60 55,80" fill="#eab308" opacity="0.85" />
          <polygon points="30,60 60,30 75,60" fill="#fef08a" opacity="0.9" />

          {/* Star Facets Starburst */}
          <polygon points="100,60 115,75 100,90 85,75" fill="#ffffff" opacity="0.45" />
          <polygon points="100,110 115,125 100,140 85,125" fill="#fde047" opacity="0.35" />

          {/* Specular White Shimmer Glint */}
          <path
            d="M62 44 L95 38 L82 66 Z"
            fill="url(#facetHighlight)"
          />
          <circle cx="80" cy="52" r="3" fill="#ffffff" opacity="0.9" />
          <circle cx="132" cy="74" r="2" fill="#ffffff" opacity="0.7" />
        </svg>
      </div>
    );
  }

  // Blue Sapphire (Neelam)
  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-2xl animate-pulse" />
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_24px_rgba(37,99,235,0.3)]">
        <defs>
          <linearGradient id="blueDepth" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="35%" stopColor="#2563eb" />
            <stop offset="70%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="silverBand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#silverBand)" strokeWidth="2.5" opacity="0.3" strokeDasharray="4 4" />
        
        {/* Oval Girdle */}
        <ellipse cx="100" cy="100" rx="68" ry="80" fill="url(#blueDepth)" stroke="#60a5fa" strokeWidth="1.5" />
        
        {/* Table */}
        <ellipse cx="100" cy="100" rx="42" ry="50" fill="#1e3a8a" stroke="#93c5fd" strokeWidth="1.2" opacity="0.9" />

        {/* Facet Cuts */}
        <path d="M100 20 L100 50 M100 150 L100 180 M32 100 L58 100 M142 100 L168 100" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
        <path d="M52 44 L70 65 M148 44 L130 65 M52 156 L70 135 M148 156 L130 135" stroke="#bfdbfe" strokeWidth="1" opacity="0.7" />
        
        {/* Glint */}
        <circle cx="82" cy="72" r="3.5" fill="#ffffff" opacity="0.9" />
        <circle cx="120" cy="115" r="2" fill="#ffffff" opacity="0.6" />
      </svg>
    </div>
  );
};
