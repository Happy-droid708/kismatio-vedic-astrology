import React, { useMemo } from 'react';

interface CelestialRainBackgroundProps {
  isEmpty?: boolean;
}

interface RainDropConfig {
  id: number;
  leftPercent: number;
  width: number;
  height: number;
  durationSeconds: number;
  delaySeconds: number;
  opacity: number;
  colorType: 'gold' | 'champagne' | 'amethyst' | 'amber' | 'cosmic';
}

export const CelestialRainBackground: React.FC<CelestialRainBackgroundProps> = ({
  isEmpty = false,
}) => {
  // Generate deterministic array of celestial rain streaks with staggered properties
  const rainDrops: RainDropConfig[] = useMemo(() => {
    // 28 curated celestial rain streams covering width
    const positions = [
      2.5, 6.0, 10.5, 14.2, 18.0, 22.5, 26.8, 31.0, 35.5, 39.8,
      44.2, 48.5, 52.0, 56.5, 60.2, 64.8, 69.0, 73.2, 77.5, 81.0,
      85.2, 89.0, 92.8, 96.5, 8.0, 42.0, 67.0, 88.0,
    ];

    const colorTypes: ('gold' | 'champagne' | 'amethyst' | 'amber' | 'cosmic')[] = [
      'gold', 'champagne', 'gold', 'amethyst', 'amber', 'champagne', 'gold', 'cosmic',
      'gold', 'amber', 'amethyst', 'gold', 'champagne', 'gold', 'amber', 'champagne',
      'cosmic', 'gold', 'champagne', 'amethyst', 'gold', 'amber', 'gold', 'champagne',
      'gold', 'amethyst', 'champagne', 'amber',
    ];

    return positions.map((pos, idx) => {
      // Slow, meditative falling durations between 11s and 22s
      const durations = [14, 18, 12, 21, 16, 13, 20, 15, 22, 11, 17, 19, 15, 21, 13, 16, 20, 12, 18, 14, 22, 15, 19, 13, 17, 14, 20, 16];
      // Staggered negative delays for seamless continuous loop from load time
      const delays = [-2.4, -7.1, -11.5, -4.2, -9.8, -13.6, -1.8, -8.3, -14.9, -3.7, -10.2, -6.5, -12.1, -5.4, -15.2, -2.9, -8.7, -11.1, -4.8, -13.3, -1.2, -7.6, -10.8, -3.3, -9.1, -14.2, -6.0, -12.7];
      const heights = [70, 110, 85, 130, 95, 75, 120, 90, 140, 80, 105, 125, 85, 115, 70, 100, 135, 80, 110, 95, 125, 85, 105, 75, 115, 90, 120, 100];
      const opacities = [0.22, 0.35, 0.18, 0.28, 0.32, 0.15, 0.25, 0.3, 0.2, 0.35, 0.26, 0.18, 0.32, 0.22, 0.16, 0.28, 0.24, 0.34, 0.19, 0.27, 0.21, 0.33, 0.25, 0.17, 0.3, 0.22, 0.28, 0.31];

      return {
        id: idx,
        leftPercent: pos,
        width: idx % 5 === 0 ? 1.5 : 1,
        height: heights[idx % heights.length],
        durationSeconds: durations[idx % durations.length],
        delaySeconds: delays[idx % delays.length],
        opacity: opacities[idx % opacities.length],
        colorType: colorTypes[idx % colorTypes.length],
      };
    });
  }, []);

  const getGradientForColorType = (type: RainDropConfig['colorType']) => {
    switch (type) {
      case 'gold':
        return 'linear-gradient(to bottom, rgba(223, 183, 108, 0) 0%, rgba(223, 183, 108, 0.15) 60%, rgba(245, 214, 145, 0.5) 96%, rgba(254, 240, 190, 0.85) 100%)';
      case 'champagne':
        return 'linear-gradient(to bottom, rgba(245, 238, 223, 0) 0%, rgba(237, 225, 203, 0.12) 65%, rgba(245, 238, 223, 0.45) 95%, rgba(255, 255, 255, 0.8) 100%)';
      case 'amethyst':
        return 'linear-gradient(to bottom, rgba(139, 92, 246, 0) 0%, rgba(167, 139, 250, 0.1) 60%, rgba(192, 132, 252, 0.38) 95%, rgba(233, 213, 255, 0.75) 100%)';
      case 'amber':
        return 'linear-gradient(to bottom, rgba(217, 119, 6, 0) 0%, rgba(245, 158, 11, 0.15) 60%, rgba(251, 191, 36, 0.45) 95%, rgba(254, 243, 199, 0.8) 100%)';
      case 'cosmic':
        return 'linear-gradient(to bottom, rgba(99, 102, 241, 0) 0%, rgba(129, 140, 248, 0.12) 60%, rgba(165, 180, 252, 0.4) 95%, rgba(224, 231, 255, 0.75) 100%)';
    }
  };

  const getTipGlowForColorType = (type: RainDropConfig['colorType']) => {
    switch (type) {
      case 'gold':
        return 'rgba(223, 183, 108, 0.6)';
      case 'champagne':
        return 'rgba(245, 238, 223, 0.6)';
      case 'amethyst':
        return 'rgba(192, 132, 252, 0.55)';
      case 'amber':
        return 'rgba(245, 158, 11, 0.55)';
      case 'cosmic':
        return 'rgba(165, 180, 252, 0.55)';
    }
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
    >
      {/* 1. Deep Midnight & Warm-Black Base Canvas */}
      <div className="absolute inset-0 bg-[#0c0d15] celestial-rain-canvas" />

      {/* 2. Soft Ambient Cosmic & Champagne Gold Radial Auras */}
      <div
        className="celestial-aura-animated absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full opacity-25 filter blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(223, 183, 108, 0.18) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 75%)',
          animation: 'celestialAuraPulse 18s ease-in-out infinite',
        }}
      />
      <div
        className="celestial-aura-animated absolute bottom-[-15%] right-[15%] w-[550px] h-[550px] rounded-full opacity-20 filter blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.14) 0%, rgba(79, 70, 229, 0.06) 55%, transparent 80%)',
          animation: 'celestialAuraPulse 24s ease-in-out infinite reverse',
        }}
      />

      {/* 3. Subtle Vedic Constellation Grid / Starlight Vignette */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(rgba(223,183,108,0.35)_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* 4. Animated Celestial Rain Streamers Layer */}
      <div className="absolute inset-0 overflow-hidden">
        {rainDrops.map((drop) => {
          const bgGradient = getGradientForColorType(drop.colorType);
          const tipGlow = getTipGlowForColorType(drop.colorType);

          return (
            <div
              key={drop.id}
              className="celestial-drop"
              style={{
                left: `${drop.leftPercent}%`,
                width: `${drop.width}px`,
                height: `${drop.height}px`,
                background: bgGradient,
                opacity: isEmpty ? drop.opacity * 1.35 : drop.opacity,
                animationDuration: `${drop.durationSeconds}s`,
                animationDelay: `${drop.delaySeconds}s`,
              }}
            >
              {/* Luminous Droplet Tip / Starlight Bead */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  width: `${drop.width + 1.2}px`,
                  height: `${drop.width + 1.2}px`,
                  backgroundColor: '#ffffff',
                  boxShadow: `0 0 6px 1px ${tipGlow}`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 5. Readability Overlay Layer (Section: MESSAGE READABILITY) */}
      {/* Translucent warm/dark veil ensuring 100% crisp message contrast */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 celestial-rain-overlay ${
          isEmpty
            ? 'bg-gradient-to-b from-[#0c0d15]/55 via-[#0c0d15]/40 to-[#0c0d15]/65'
            : 'bg-gradient-to-b from-[#0c0d15]/85 via-[#0c0d15]/75 to-[#0c0d15]/90 backdrop-blur-[0.3px]'
        }`}
      />

      {/* 6. Edge Dissolves (Ensures seamless boundary under header & above input) */}
      <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#0c0d15] to-transparent pointer-events-none celestial-rain-edge-top" />
      <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#0c0d15] to-transparent pointer-events-none celestial-rain-edge-bottom" />
    </div>
  );
};
