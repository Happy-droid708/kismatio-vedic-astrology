import React, { useMemo } from 'react';
import { GuruBackgroundKey } from '../../data/maharajGurusData';

interface GuruBackgroundProps {
  backgroundKey: GuruBackgroundKey;
  isEmpty?: boolean;
}

export const GuruBackground: React.FC<GuruBackgroundProps> = ({
  backgroundKey,
  isEmpty = false,
}) => {
  // Deterministic particle set for consistent rendering without SSR hydration discrepancies
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.3 + 7) % 94}%`,
      top: `${(i * 7.1 + 11) % 90}%`,
      size: (i % 3) + 1.5,
      delay: `${(i * 0.7) % 5}s`,
      duration: `${10 + (i % 8) * 2}s`,
      opacity: 0.2 + (i % 4) * 0.12,
    }));
  }, []);

  // Theme-specific color gradients and glows
  const themeStyles = useMemo(() => {
    switch (backgroundKey) {
      case 'romantic_celestial': // GURU 01: ADIT
        return {
          baseBg: 'bg-[#180D2B]',
          auraPrimary: 'radial-gradient(circle, rgba(231, 183, 67, 0.18) 0%, rgba(53, 32, 68, 0.25) 45%, transparent 75%)',
          auraSecondary: 'radial-gradient(circle, rgba(168, 123, 42, 0.16) 0%, rgba(36, 19, 59, 0.25) 50%, transparent 80%)',
          accentColor: '#E7B743',
          particleColor: '#FFD76A',
          gridColor: 'rgba(231, 183, 67, 0.12)',
        };

      case 'cosmic_timeline': // GURU 02: GURU NUPUR
        return {
          baseBg: 'bg-[#180D2B]',
          auraPrimary: 'radial-gradient(circle, rgba(231, 183, 67, 0.15) 0%, rgba(43, 23, 60, 0.3) 48%, transparent 75%)',
          auraSecondary: 'radial-gradient(circle, rgba(0, 214, 160, 0.12) 0%, rgba(24, 13, 43, 0.2) 55%, transparent 80%)',
          accentColor: '#E7B743',
          particleColor: '#00D6A0',
          gridColor: 'rgba(231, 183, 67, 0.12)',
        };

      case 'neural_cosmos': // GURU 03: DR. ADITI
        return {
          baseBg: 'bg-[#180D2B]',
          auraPrimary: 'radial-gradient(circle, rgba(197, 184, 217, 0.16) 0%, rgba(53, 32, 68, 0.28) 48%, transparent 75%)',
          auraSecondary: 'radial-gradient(circle, rgba(231, 183, 67, 0.14) 0%, rgba(36, 19, 59, 0.22) 55%, transparent 80%)',
          accentColor: '#C5B8D9',
          particleColor: '#E7B743',
          gridColor: 'rgba(197, 184, 217, 0.12)',
        };

      case 'vastu_architecture': // GURU 04: KAVYA
        return {
          baseBg: 'bg-[#180D2B]',
          auraPrimary: 'radial-gradient(circle, rgba(0, 214, 160, 0.15) 0%, rgba(43, 23, 60, 0.25) 48%, transparent 75%)',
          auraSecondary: 'radial-gradient(circle, rgba(231, 183, 67, 0.16) 0%, rgba(36, 19, 59, 0.22) 55%, transparent 80%)',
          accentColor: '#00D6A0',
          particleColor: '#E7B743',
          gridColor: 'rgba(0, 214, 160, 0.12)',
        };

      case 'indigo_observatory': // GURU 05: ACHARYA VASUDEV
        return {
          baseBg: 'bg-[#180D2B]',
          auraPrimary: 'radial-gradient(circle, rgba(231, 183, 67, 0.2) 0%, rgba(53, 32, 68, 0.3) 48%, transparent 75%)',
          auraSecondary: 'radial-gradient(circle, rgba(168, 123, 42, 0.18) 0%, rgba(36, 19, 59, 0.25) 55%, transparent 80%)',
          accentColor: '#E7B743',
          particleColor: '#FFD76A',
          gridColor: 'rgba(231, 183, 67, 0.12)',
        };

      case 'kundali_mandala': // GURU 06: ACHARYA GURU (Flagship)
        return {
          baseBg: 'bg-[#180D2B]',
          auraPrimary: 'radial-gradient(circle, rgba(231, 183, 67, 0.24) 0%, rgba(53, 32, 68, 0.32) 45%, transparent 75%)',
          auraSecondary: 'radial-gradient(circle, rgba(255, 215, 106, 0.16) 0%, rgba(36, 19, 59, 0.25) 55%, transparent 80%)',
          accentColor: '#E7B743',
          particleColor: '#FFD76A',
          gridColor: 'rgba(231, 183, 67, 0.15)',
        };

      case 'stormy_metallic': // GURU 07: KHOJI BABA
        return {
          baseBg: 'bg-[#180D2B]',
          auraPrimary: 'radial-gradient(circle, rgba(197, 184, 217, 0.18) 0%, rgba(43, 23, 60, 0.3) 50%, transparent 75%)',
          auraSecondary: 'radial-gradient(circle, rgba(231, 183, 67, 0.14) 0%, rgba(24, 13, 43, 0.25) 55%, transparent 80%)',
          accentColor: '#C5B8D9',
          particleColor: '#FFD76A',
          gridColor: 'rgba(197, 184, 217, 0.12)',
        };

      case 'judicial_architecture': // GURU 08: NYAYA GURU
        return {
          baseBg: 'bg-[#180D2B]',
          auraPrimary: 'radial-gradient(circle, rgba(231, 183, 67, 0.16) 0%, rgba(53, 32, 68, 0.26) 50%, transparent 75%)',
          auraSecondary: 'radial-gradient(circle, rgba(168, 123, 42, 0.14) 0%, rgba(36, 19, 59, 0.22) 55%, transparent 80%)',
          accentColor: '#E7B743',
          particleColor: '#A87B2A',
          gridColor: 'rgba(231, 183, 67, 0.12)',
        };
    }
  }, [backgroundKey]);

  // Thematic SVG Vector Artwork strictly according to Guru direction
  const renderThematicVector = () => {
    switch (backgroundKey) {
      case 'romantic_celestial': // Adit: Romantic celestial stars & rose-gold orbits
        return (
          <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000" fill="none">
            <circle cx="500" cy="500" r="320" stroke="url(#roseGrad)" strokeWidth="1" strokeDasharray="6 8" />
            <circle cx="500" cy="500" r="210" stroke="#f43f5e" strokeWidth="0.8" opacity="0.6" />
            <path d="M500 180 L500 820 M180 500 L820 500" stroke="#fb7185" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.4" />
            <g transform="translate(500, 500) rotate(45)">
              <rect x="-110" y="-110" width="220" height="220" stroke="#dfb76c" strokeWidth="0.8" opacity="0.4" />
            </g>
            <defs>
              <linearGradient id="roseGrad" x1="0" y1="0" x2="1000" y2="1000" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f43f5e" />
                <stop offset="0.5" stopColor="#dfb76c" />
                <stop offset="1" stopColor="#be185d" />
              </linearGradient>
            </defs>
          </svg>
        );

      case 'cosmic_timeline': // Guru Nupur: Real-time planetary orbits and timeline lines
        return (
          <svg className="w-full h-full opacity-22" viewBox="0 0 1000 1000" fill="none">
            <ellipse cx="500" cy="500" rx="420" ry="240" stroke="#06b6d4" strokeWidth="1" transform="rotate(-18 500 500)" strokeDasharray="4 6" />
            <ellipse cx="500" cy="500" rx="340" ry="180" stroke="#22d3ee" strokeWidth="0.8" transform="rotate(22 500 500)" />
            <circle cx="500" cy="500" r="160" stroke="#0891b2" strokeWidth="1.2" />
            {/* Timeline ticks */}
            {Array.from({ length: 24 }).map((_, idx) => {
              const angle = (idx * 15 * Math.PI) / 180;
              const x1 = 500 + Math.cos(angle) * 160;
              const y1 = 500 + Math.sin(angle) * 160;
              const x2 = 500 + Math.cos(angle) * 175;
              const y2 = 500 + Math.sin(angle) * 175;
              return <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#67e8f9" strokeWidth="1.2" opacity="0.6" />;
            })}
            <circle cx="320" cy="410" r="8" fill="#22d3ee" opacity="0.7" />
            <circle cx="680" cy="590" r="6" fill="#06b6d4" opacity="0.7" />
          </svg>
        );

      case 'neural_cosmos': // Dr. Aditi: Neural constellation network & reflective geometry
        return (
          <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000" fill="none">
            {/* Connected neural nodes */}
            <line x1="500" y1="360" x2="380" y2="460" stroke="#a855f7" strokeWidth="1" opacity="0.6" />
            <line x1="500" y1="360" x2="620" y2="460" stroke="#a855f7" strokeWidth="1" opacity="0.6" />
            <line x1="380" y1="460" x2="440" y2="600" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
            <line x1="620" y1="460" x2="560" y2="600" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
            <line x1="440" y1="600" x2="560" y2="600" stroke="#7c3aed" strokeWidth="1" opacity="0.6" />
            <line x1="500" y1="360" x2="500" y2="520" stroke="#c084fc" strokeWidth="0.8" strokeDasharray="3 4" />
            {/* Concentric subtle mind spheres */}
            <circle cx="500" cy="500" r="260" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="6 8" />
            <circle cx="500" cy="500" r="140" stroke="#c084fc" strokeWidth="1" opacity="0.5" />
            {/* Glowing nodes */}
            <circle cx="500" cy="360" r="6" fill="#e9d5ff" />
            <circle cx="380" cy="460" r="5" fill="#c084fc" />
            <circle cx="620" cy="460" r="5" fill="#c084fc" />
            <circle cx="440" cy="600" r="5.5" fill="#a855f7" />
            <circle cx="560" cy="600" r="5.5" fill="#a855f7" />
          </svg>
        );

      case 'vastu_architecture': // Kavya: Vastu mandala cardinal grid & temple sacred geometry
        return (
          <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000" fill="none">
            {/* 3x3 Ashta Dik Vastu Grid */}
            <rect x="280" y="280" width="440" height="440" stroke="#10b981" strokeWidth="1.2" />
            <line x1="426" y1="280" x2="426" y2="720" stroke="#10b981" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="573" y1="280" x2="573" y2="720" stroke="#10b981" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="280" y1="426" x2="720" y2="426" stroke="#10b981" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="280" y1="573" x2="720" y2="573" stroke="#10b981" strokeWidth="0.8" strokeDasharray="4 4" />
            {/* Central Brahmasthan circle */}
            <circle cx="500" cy="500" r="85" stroke="#dfb76c" strokeWidth="1.2" />
            {/* Cardinal Temple Axis Rays */}
            <line x1="500" y1="180" x2="500" y2="820" stroke="#dfb76c" strokeWidth="0.8" opacity="0.6" />
            <line x1="180" y1="500" x2="820" y2="500" stroke="#dfb76c" strokeWidth="0.8" opacity="0.6" />
            {/* Directional lotus petals */}
            <g transform="translate(500, 500) rotate(45)">
              <rect x="-60" y="-60" width="120" height="120" stroke="#059669" strokeWidth="0.8" />
            </g>
          </svg>
        );

      case 'indigo_observatory': // Acharya Vasudev: Classical astrological observatory astrolabe
        return (
          <svg className="w-full h-full opacity-22" viewBox="0 0 1000 1000" fill="none">
            <circle cx="500" cy="500" r="380" stroke="#6366f1" strokeWidth="1.2" />
            <circle cx="500" cy="500" r="300" stroke="#dfb76c" strokeWidth="0.9" strokeDasharray="4 6" />
            <circle cx="500" cy="500" r="220" stroke="#818cf8" strokeWidth="1" />
            {/* Astrolabe degree markings */}
            {Array.from({ length: 36 }).map((_, idx) => {
              const angle = (idx * 10 * Math.PI) / 180;
              const x1 = 500 + Math.cos(angle) * 360;
              const y1 = 500 + Math.sin(angle) * 360;
              const x2 = 500 + Math.cos(angle) * 380;
              const y2 = 500 + Math.sin(angle) * 380;
              return <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#dfb76c" strokeWidth="1" opacity="0.5" />;
            })}
            <path d="M260 260 L740 740 M260 740 L740 260" stroke="#6366f1" strokeWidth="0.7" opacity="0.5" />
          </svg>
        );

      case 'kundali_mandala': // Acharya Guru: Flagship iconic 12-Bhava Vedic Kundali Mandala
        return (
          <svg className="w-full h-full opacity-28" viewBox="0 0 1000 1000" fill="none">
            {/* Outer Sanctum Ring */}
            <circle cx="500" cy="500" r="410" stroke="#dfb76c" strokeWidth="1.2" />
            <circle cx="500" cy="500" r="380" stroke="#fef08a" strokeWidth="0.6" strokeDasharray="3 5" opacity="0.6" />
            {/* Vedic Diamond Kundali Chart Frame */}
            <g transform="translate(500, 500) rotate(45)">
              <rect x="-240" y="-240" width="480" height="480" stroke="#dfb76c" strokeWidth="1.6" />
              <line x1="-240" y1="0" x2="240" y2="0" stroke="#dfb76c" strokeWidth="1" />
              <line x1="0" y1="-240" x2="0" y2="240" stroke="#dfb76c" strokeWidth="1" />
            </g>
            <rect x="330" y="330" width="340" height="340" stroke="#b45309" strokeWidth="1" opacity="0.7" />
            {/* Radiant Central Bindu */}
            <circle cx="500" cy="500" r="24" fill="#dfb76c" opacity="0.75" />
            <circle cx="500" cy="500" r="60" stroke="#fef08a" strokeWidth="1" opacity="0.6" />
          </svg>
        );

      case 'stormy_metallic': // Khoji Baba: Stormy ocean waves and search compass coordinates
        return (
          <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000" fill="none">
            {/* Search Compass Rose */}
            <circle cx="500" cy="500" r="330" stroke="#38bdf8" strokeWidth="1" strokeDasharray="5 7" />
            <circle cx="500" cy="500" r="230" stroke="#94a3b8" strokeWidth="0.8" />
            <path d="M500 140 L520 480 L500 500 L480 480 Z" fill="#38bdf8" opacity="0.6" />
            <path d="M500 860 L520 520 L500 500 L480 520 Z" fill="#94a3b8" opacity="0.5" />
            <path d="M860 500 L520 520 L500 500 L520 480 Z" fill="#64748b" opacity="0.5" />
            <path d="M140 500 L480 520 L500 500 L480 480 Z" fill="#64748b" opacity="0.5" />
            {/* Wave ripples */}
            <path d="M200 680 Q 350 640 500 680 T 800 680" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
            <path d="M150 740 Q 325 700 500 740 T 850 740" stroke="#94a3b8" strokeWidth="0.8" opacity="0.3" />
          </svg>
        );

      case 'judicial_architecture': // Nyaya Guru: Judicial pillars, architectural arches, balance scales
        return (
          <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000" fill="none">
            {/* Archway symmetry */}
            <path d="M260 780 L260 420 Q 500 240 740 420 L740 780" stroke="#dfb76c" strokeWidth="1.2" />
            <line x1="220" y1="780" x2="780" y2="780" stroke="#e2e8f0" strokeWidth="1.6" />
            <line x1="240" y1="420" x2="760" y2="420" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
            {/* Classical Stone Pillars */}
            <rect x="290" y="440" width="36" height="340" stroke="#e2e8f0" strokeWidth="0.8" opacity="0.5" />
            <rect x="674" y="440" width="36" height="340" stroke="#e2e8f0" strokeWidth="0.8" opacity="0.5" />
            {/* Balanced Scales of Justice Symbol */}
            <line x1="420" y1="490" x2="580" y2="490" stroke="#dfb76c" strokeWidth="1.4" />
            <line x1="500" y1="450" x2="500" y2="580" stroke="#dfb76c" strokeWidth="1.4" />
            {/* Left Pan */}
            <line x1="420" y1="490" x2="390" y2="540" stroke="#cbd5e1" strokeWidth="0.8" />
            <line x1="420" y1="490" x2="450" y2="540" stroke="#cbd5e1" strokeWidth="0.8" />
            <path d="M380 540 Q 420 565 460 540 Z" stroke="#dfb76c" strokeWidth="1" fill="none" />
            {/* Right Pan */}
            <line x1="580" y1="490" x2="550" y2="540" stroke="#cbd5e1" strokeWidth="0.8" />
            <line x1="580" y1="490" x2="610" y2="540" stroke="#cbd5e1" strokeWidth="0.8" />
            <path d="M540 540 Q 580 565 620 540 Z" stroke="#dfb76c" strokeWidth="1" fill="none" />
          </svg>
        );
    }
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
    >
      {/* 1. Base Canvas color */}
      <div className={`absolute inset-0 ${themeStyles.baseBg} transition-colors duration-500`} />

      {/* 2. Primary & Secondary Ambient Glowing Auras */}
      <div
        className="absolute top-[-12%] left-[15%] w-[680px] h-[680px] rounded-full filter blur-[110px] pointer-events-none transition-all duration-700 opacity-60"
        style={{
          background: themeStyles.auraPrimary,
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[10%] w-[620px] h-[620px] rounded-full filter blur-[120px] pointer-events-none transition-all duration-700 opacity-50"
        style={{
          background: themeStyles.auraSecondary,
        }}
      />

      {/* 3. Subtle Constellation / Geometric Background Grid */}
      <div
        className="absolute inset-0 opacity-12 transition-opacity duration-500"
        style={{
          backgroundImage: `radial-gradient(${themeStyles.gridColor} 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* 4. Thematic Vector Art */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700">
        {renderThematicVector()}
      </div>

      {/* 5. Floating Celestial Particles Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full transition-opacity"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: themeStyles.particleColor,
              opacity: isEmpty ? p.opacity * 1.4 : p.opacity,
              boxShadow: `0 0 6px 1px ${themeStyles.particleColor}`,
            }}
          />
        ))}
      </div>

      {/* 6. Message Readability Overlay (Strictly ensures AAA contrast) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isEmpty
            ? 'bg-gradient-to-b from-[#12091F]/55 via-[#180D2B]/40 to-[#12091F]/65'
            : 'bg-gradient-to-b from-[#12091F]/85 via-[#180D2B]/78 to-[#12091F]/90 backdrop-blur-[0.5px]'
        }`}
      />

      {/* 7. Edge Dissolves under Header and above Input */}
      <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-[#12091F] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#12091F] to-transparent pointer-events-none" />
    </div>
  );
};
