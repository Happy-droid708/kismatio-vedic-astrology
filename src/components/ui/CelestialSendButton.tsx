import React, { useState, useRef, useEffect } from 'react';
import { Send, Check, Sparkles } from 'lucide-react';

interface CelestialSendButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  className?: string;
}

interface Particle {
  id: number;
  angle: number; // degrees
  distance: number; // px
  size: number; // px
  color: string;
  delayMs: number;
}

export const CelestialSendButton: React.FC<CelestialSendButtonProps> = ({
  onClick,
  disabled = false,
  title = 'Send message',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [burstActive, setBurstActive] = useState(false);
  const [iconPhase, setIconPhase] = useState<'send' | 'spark' | 'star' | 'check'>('send');
  const [particles, setParticles] = useState<Particle[]>([]);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const triggerCelestialBurst = () => {
    if (disabled) return;

    clearAllTimers();

    // 1. Press compression: 1.04 -> 0.92 -> 1.00
    setIsPressed(true);
    const pressTimer = setTimeout(() => {
      setIsPressed(false);
    }, 120);
    timersRef.current.push(pressTimer);

    // 2. Generate 7 tiny celestial particles
    // Palette: Champagne gold, soft warm white, amber, subtle violet
    const colors = [
      '#fcedc5', // Champagne gold
      '#dfb76c', // Vedic gold
      '#ffffff', // Pure celestial white
      '#fcd34d', // Warm amber
      '#dfb76c', // Vedic gold
      '#f5eedf', // Warm soft white
      '#c4b5fd', // Very subtle violet-gold
    ];

    const baseAngles = [15, 68, 122, 178, 235, 290, 342];
    const newParticles: Particle[] = baseAngles.map((angle, idx) => ({
      id: Date.now() + idx,
      angle: angle + (Math.random() * 16 - 8),
      distance: 22 + Math.random() * 14, // 22px to 36px outward
      size: 2.5 + Math.random() * 2, // 2.5px to 4.5px
      color: colors[idx % colors.length],
      delayMs: Math.random() * 40,
    }));

    setParticles(newParticles);
    setBurstActive(true);

    // 3. Icon transition sequence:
    // 0ms: Send icon
    // 100ms: Celestial spark
    // 200ms: ✦ (celestial star)
    // 350ms: ✓ (sacred checkmark)
    // 550ms: Return to ➤ (Send)
    const tSpark = setTimeout(() => setIconPhase('spark'), 100);
    const tStar = setTimeout(() => setIconPhase('star'), 200);
    const tCheck = setTimeout(() => setIconPhase('check'), 350);
    const tReset = setTimeout(() => {
      setIconPhase('send');
      setBurstActive(false);
    }, 550);

    timersRef.current.push(tSpark, tStar, tCheck, tReset);

    // Trigger external send handler
    if (onClick) {
      onClick();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    triggerCelestialBurst();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      triggerCelestialBurst();
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center select-none">
      {/* Expanding Celestial Shockwave Ring on Burst */}
      {burstActive && (
        <span
          className="absolute inset-0 rounded-full pointer-events-none z-0 border border-[#dfb76c]/60 animate-celestial-burst-ring"
          aria-hidden="true"
        />
      )}

      {/* Tiny Celestial Particles Outward Burst (4–8 particles, 350–600ms) */}
      {burstActive &&
        particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * p.distance;
          const ty = Math.sin(rad) * p.distance;

          return (
            <span
              key={p.id}
              className="absolute rounded-full pointer-events-none z-30 animate-celestial-particle"
              style={
                {
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  boxShadow: `0 0 6px ${p.color}`,
                  transform: 'translate(0, 0) scale(1)',
                  '--tx': `${tx}px`,
                  '--ty': `${ty}px`,
                  animationDelay: `${p.delayMs}ms`,
                } as React.CSSProperties
              }
              aria-hidden="true"
            />
          );
        })}

      {/* Main Celestial Send Button */}
      <button
        type="submit"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        disabled={disabled}
        title={title}
        aria-label={title}
        className={`group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all outline-none focus:ring-2 focus:ring-[#dfb76c]/50 disabled:cursor-not-allowed disabled:opacity-40 shrink-0 ${
          isPressed
            ? 'scale-[0.92] duration-75'
            : isHovered && !disabled
            ? 'scale-[1.04] duration-250 ease-out'
            : 'scale-100 duration-200'
        } ${className}`}
        style={{
          // Premium dark/translucent surface with subtle border
          background: disabled
            ? 'rgba(21, 24, 37, 0.6)'
            : isHovered
            ? 'radial-gradient(circle at 40% 30%, #252b42 0%, #151826 80%, #0f111c 100%)'
            : 'radial-gradient(circle at 40% 30%, #1c2033 0%, #131522 80%, #0d0f17 100%)',
          borderColor: isHovered && !disabled ? 'rgba(223, 183, 108, 0.75)' : 'rgba(223, 183, 108, 0.32)',
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow:
            disabled
              ? 'none'
              : isHovered
              ? '0 0 20px rgba(223, 183, 108, 0.28), 0 0 35px rgba(139, 92, 246, 0.12), 0 4px 14px rgba(0, 0, 0, 0.6)'
              : '0 0 10px rgba(223, 183, 108, 0.08), 0 2px 8px rgba(0, 0, 0, 0.45)',
        }}
      >
        {/* Step 3: Thin Animated Celestial Ring moving around the border on Desktop Hover */}
        {isHovered && !disabled && (
          <svg
            className="absolute inset-[-1.5px] w-[calc(100%+3px)] h-[calc(100%+3px)] rounded-full pointer-events-none animate-spin"
            style={{ animationDuration: '3.6s' }}
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle
              cx="24"
              cy="24"
              r="23"
              stroke="url(#celestial-ring-gradient)"
              strokeWidth="1.2"
              strokeDasharray="28 120"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="celestial-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dfb76c" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#fcedc5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Step 5: Tiny Celestial Sparkle near the icon on hover */}
        {isHovered && !disabled && (
          <span
            className="absolute top-1.5 right-2 text-[#fcedc5] pointer-events-none animate-celestial-sparkle-float"
            aria-hidden="true"
          >
            <Sparkles className="w-2.5 h-2.5 drop-shadow-[0_0_4px_#dfb76c]" />
          </span>
        )}

        {/* Inner Celestial Core Shimmer */}
        <span
          className="absolute inset-1 rounded-full pointer-events-none opacity-40 transition-opacity duration-300"
          style={{
            background: isHovered && !disabled
              ? 'radial-gradient(circle at 50% 50%, rgba(223, 183, 108, 0.18) 0%, transparent 70%)'
              : 'radial-gradient(circle at 50% 50%, rgba(223, 183, 108, 0.06) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Icon Transition Sequence Container:
            0ms: ➤ (Send icon)
            100ms: Celestial Spark
            200ms: ✦
            350ms: ✓
            550ms: ➤
         */}
        <div
          className={`relative z-10 flex items-center justify-center transition-transform duration-250 ease-out ${
            isHovered && !disabled ? 'scale-[1.08]' : 'scale-100'
          }`}
        >
          {iconPhase === 'send' && (
            <Send
              className={`w-4 h-4 transition-colors duration-200 stroke-[2.2] translate-x-[-0.5px] ${
                disabled
                  ? 'text-[#726d63]'
                  : isHovered
                  ? 'text-[#fff6e0] drop-shadow-[0_0_8px_rgba(223,183,108,0.6)]'
                  : 'text-[#dfb76c]'
              }`}
            />
          )}

          {iconPhase === 'spark' && (
            <Sparkles className="w-4 h-4 text-[#fcedc5] animate-spin stroke-[2] drop-shadow-[0_0_8px_#dfb76c]" />
          )}

          {iconPhase === 'star' && (
            <span
              className="text-[#fcedc5] text-base font-serif font-black leading-none drop-shadow-[0_0_10px_#dfb76c] animate-in zoom-in-75 duration-100"
              aria-label="Celestial transmission"
            >
              ✦
            </span>
          )}

          {iconPhase === 'check' && (
            <Check className="w-4 h-4 text-[#7ee787] stroke-[3] drop-shadow-[0_0_8px_rgba(126,231,135,0.7)] animate-in zoom-in-90 duration-150" />
          )}
        </div>
      </button>
    </div>
  );
};
