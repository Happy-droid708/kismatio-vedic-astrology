import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export type CelestialPillVariant =
  | 'default'
  | 'filter'
  | 'prompt'
  | 'quick-reply'
  | 'category'
  | 'gemstone'
  | 'recharge'
  | 'order-status'
  | 'language';

interface PillParticle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
  delayMs: number;
}

export interface CelestialPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CelestialPillVariant;
  isSelected?: boolean;
  activeStatus?: 'upcoming' | 'in_progress' | 'completed';
  count?: number;
  icon?: React.ReactNode;
  rechargeAmount?: string; // e.g. "+10 min" or "+10 min · ₹99"
  rechargeAddedText?: string; // e.g. "✓ Added"
  onSelectAction?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const CelestialPill: React.FC<CelestialPillProps> = ({
  variant = 'default',
  isSelected = false,
  activeStatus,
  count,
  icon,
  rechargeAmount,
  rechargeAddedText = '✓ Added',
  onSelectAction,
  className = '',
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [sparkActive, setSparkActive] = useState(false);
  const [particles, setParticles] = useState<PillParticle[]>([]);
  const [isMorphing, setIsMorphing] = useState(false);
  const [hasOrbitRotated, setHasOrbitRotated] = useState(false);
  const [rechargeStep, setRechargeStep] = useState<'normal' | 'spark' | 'added'>('normal');

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  // When selected status changes to true for category pills, trigger one-rotation orbit ring
  useEffect(() => {
    if (variant === 'category' && isSelected) {
      setHasOrbitRotated(true);
      const timer = setTimeout(() => {
        setHasOrbitRotated(false);
      }, 800);
      timersRef.current.push(timer);
    }
  }, [isSelected, variant]);

  const triggerSparkParticles = () => {
    // 2 to 5 tiny particles in warm gold / soft white tones
    const particleCount = 3 + Math.floor(Math.random() * 3); // 3 to 5
    const colors = ['#E7B743', '#FFD76A', '#A87B2A', '#F7F0FF'];

    const newParticles: PillParticle[] = Array.from({ length: particleCount }).map((_, idx) => ({
      id: Date.now() + idx,
      angle: (360 / particleCount) * idx + (Math.random() * 20 - 10),
      distance: 14 + Math.random() * 12, // 14px to 26px
      size: 2 + Math.random() * 1.8, // 2px to 3.8px
      color: colors[idx % colors.length],
      delayMs: Math.random() * 20,
    }));

    setParticles(newParticles);
    setSparkActive(true);

    const sparkTimer = setTimeout(() => {
      setSparkActive(false);
    }, 450);
    timersRef.current.push(sparkTimer);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    clearTimers();

    // 1. Fast physical compression: 1.03 -> 0.94 -> 1.0
    setIsPressed(true);
    const pressTimer = setTimeout(() => setIsPressed(false), 140);
    timersRef.current.push(pressTimer);

    // 2. Celestial Spark
    triggerSparkParticles();

    // 3. Variant-specific motion branches:
    if (variant === 'prompt' || variant === 'quick-reply') {
      // Prompt/Quick-reply: Pill -> Compress -> Spark -> Move toward input -> Become user message
      setIsMorphing(true);
      const morphTimer = setTimeout(() => {
        setIsMorphing(false);
        if (onSelectAction) onSelectAction();
        if (onClick) onClick(e);
      }, 340);
      timersRef.current.push(morphTimer);
      return;
    }

    if (variant === 'recharge') {
      // Recharge pill sequence: "+10 min" -> "✦ +10 min" -> "✓ Added"
      setRechargeStep('spark');
      const step1 = setTimeout(() => setRechargeStep('added'), 280);
      const step2 = setTimeout(() => {
        setRechargeStep('normal');
        if (onSelectAction) onSelectAction();
        if (onClick) onClick(e);
      }, 1050);
      timersRef.current.push(step1, step2);
      return;
    }

    if (variant === 'gemstone') {
      // Gemstone: brief shimmer intensifies + slight expansion
      const gemTimer = setTimeout(() => {
        if (onSelectAction) onSelectAction();
        if (onClick) onClick(e);
      }, 200);
      timersRef.current.push(gemTimer);
      return;
    }

    if (onSelectAction) {
      onSelectAction();
    }
    if (onClick) {
      onClick(e);
    }
  };

  // Base styling per variant
  let currentTheme = 'dark';
  try {
    const themeCtx = useTheme();
    if (themeCtx?.theme) currentTheme = themeCtx.theme;
  } catch {
    currentTheme = 'dark';
  }

  const getVariantStyles = () => {
    const isCompleted = activeStatus === 'completed';
    const isInProgress = activeStatus === 'in_progress';
    const isLight = currentTheme === 'light';

    if (variant === 'filter') {
      if (isSelected) {
        return {
          bg: isLight
            ? 'linear-gradient(135deg, rgba(223, 183, 108, 0.95) 0%, rgba(196, 151, 70, 0.95) 100%)'
            : '#E7B743',
          border: isLight ? '1px solid rgba(180, 135, 50, 0.6)' : '1px solid #E7B743',
          text: 'text-[#180D2B] font-bold',
          glow: '0 0 12px rgba(231, 183, 67, 0.3)',
        };
      }
      return {
        bg: isLight
          ? isHovered ? 'rgba(245, 238, 225, 0.98)' : 'rgba(255, 255, 255, 0.92)'
          : isHovered ? '#352044' : '#2B173C',
        border: isLight
          ? isHovered ? '1px solid rgba(180, 135, 50, 0.45)' : '1px solid rgba(180, 135, 50, 0.22)'
          : isHovered ? '1px solid #A87B2A' : '1px solid #453052',
        text: isLight
          ? isHovered ? 'text-[#1f1b16]' : 'text-[#6b5f4f]'
          : isHovered ? 'text-[#F7F0FF]' : 'text-[#C5B8D9]',
        glow: isHovered ? '0 0 8px rgba(168, 123, 42, 0.2)' : 'none',
      };
    }

    if (variant === 'category') {
      if (isSelected) {
        return {
          bg: isLight
            ? 'linear-gradient(135deg, rgba(235, 215, 175, 0.9) 0%, rgba(225, 200, 150, 0.8) 100%)'
            : '#E7B743',
          border: isLight ? '1px solid rgba(180, 135, 50, 0.7)' : '1px solid #E7B743',
          text: 'text-[#180D2B] font-bold',
          glow: '0 0 14px rgba(231, 183, 67, 0.35)',
        };
      }
      return {
        bg: isLight
          ? isHovered ? 'rgba(245, 238, 225, 0.98)' : 'rgba(255, 255, 255, 0.92)'
          : isHovered ? '#352044' : '#2B173C',
        border: isLight
          ? isHovered ? '1px solid rgba(180, 135, 50, 0.4)' : '1px solid rgba(180, 135, 50, 0.22)'
          : isHovered ? '1px solid #A87B2A' : '1px solid #453052',
        text: isLight
          ? isHovered ? 'text-[#1f1b16]' : 'text-[#6b5f4f]'
          : isHovered ? 'text-[#F7F0FF]' : 'text-[#C5B8D9]',
        glow: isHovered ? '0 0 8px rgba(168, 123, 42, 0.15)' : 'none',
      };
    }

    if (variant === 'gemstone') {
      return {
        bg: isHovered ? '#352044' : '#2B173C',
        border: isHovered ? '1px solid #A87B2A' : '1px solid #453052',
        text: isHovered ? 'text-[#F7F0FF]' : 'text-[#C5B8D9]',
        glow: isHovered ? '0 0 12px rgba(168, 123, 42, 0.2)' : 'none',
      };
    }

    if (variant === 'order-status') {
      if (isCompleted) {
        return {
          bg: 'rgba(0, 214, 160, 0.12)',
          border: '1px solid #00D6A0',
          text: 'text-[#00D6A0] font-semibold',
          glow: '0 0 8px rgba(0, 214, 160, 0.2)',
        };
      }
      if (isInProgress) {
        return {
          bg: 'rgba(231, 183, 67, 0.15)',
          border: '1px solid #E7B743',
          text: 'text-[#E7B743] font-bold',
          glow: '0 0 12px rgba(231, 183, 67, 0.3)',
        };
      }
      return {
        bg: '#2B173C',
        border: '1px solid #453052',
        text: 'text-[#9685AE]',
        glow: 'none',
      };
    }

    if (variant === 'recharge') {
      if (rechargeStep === 'added') {
        return {
          bg: '#00D6A0',
          border: '1px solid #00D6A0',
          text: 'text-[#180D2B] font-bold',
          glow: '0 0 16px rgba(0, 214, 160, 0.4)',
        };
      }
      if (rechargeStep === 'spark') {
        return {
          bg: '#FFD76A',
          border: '1px solid #E7B743',
          text: 'text-[#180D2B] font-bold',
          glow: '0 0 18px rgba(255, 215, 106, 0.5)',
        };
      }
      return {
        bg: isHovered ? '#352044' : '#2B173C',
        border: isHovered ? '1px solid #A87B2A' : '1px solid #453052',
        text: isHovered ? 'text-[#F7F0FF]' : 'text-[#C5B8D9]',
        glow: isHovered ? '0 0 10px rgba(168, 123, 42, 0.2)' : 'none',
      };
    }

    // Default / Prompt / Quick-reply / Language
    if (isSelected) {
      return {
        bg: '#E7B743',
        border: '1px solid #E7B743',
        text: 'text-[#180D2B] font-bold',
        glow: '0 0 12px rgba(231, 183, 67, 0.3)',
      };
    }

    return {
      bg: isHovered ? '#352044' : '#2B173C',
      border: isHovered ? '1px solid #A87B2A' : '1px solid #453052',
      text: isHovered ? 'text-[#F7F0FF]' : 'text-[#C5B8D9]',
      glow: isHovered ? '0 0 8px rgba(168, 123, 42, 0.2)' : 'none',
    };
  };

  const currentStyles = getVariantStyles();

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${isMorphing ? 'animate-celestial-morph' : ''}`}>
      {/* Expanding Celestial Burst Shockwave Ring */}
      {sparkActive && (
        <span
          className="absolute inset-0 rounded-full pointer-events-none z-0 border border-[#dfb76c]/60 animate-celestial-burst-ring"
          aria-hidden="true"
        />
      )}

      {/* Tiny Celestial Particles Outward Burst (2–5 micro particles) */}
      {sparkActive &&
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
                  boxShadow: `0 0 5px ${p.color}`,
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

      {/* The Main Interactive Capsule Pill */}
      <button
        {...props}
        onClick={handleClick}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        disabled={disabled}
        className={`group relative rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 outline-none focus:ring-2 focus:ring-[#dfb76c]/40 disabled:cursor-not-allowed disabled:opacity-40 overflow-hidden whitespace-nowrap shrink-0 min-h-[34px] px-3.5 py-1.5 text-xs ${
          isPressed
            ? 'scale-[0.94] duration-75'
            : isHovered && !disabled
            ? 'scale-[1.03] -translate-y-[1px] duration-200 ease-out'
            : 'scale-100 translate-y-0 duration-200'
        } ${currentStyles.text} ${className}`}
        style={{
          background: currentStyles.bg,
          border: currentStyles.border,
          boxShadow: currentStyles.glow,
        }}
      >
        {/* Subtle Light Sweep moving across on Desktop Hover */}
        {isHovered && !disabled && (
          <span
            className="absolute inset-0 w-1/2 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent animate-celestial-sweep"
            aria-hidden="true"
          />
        )}

        {/* Gemstone Shimmer overlay for gemstone pills */}
        {variant === 'gemstone' && (
          <span
            className={`absolute inset-0 w-3/4 pointer-events-none bg-gradient-to-r from-transparent via-[#fcedc5]/25 to-transparent ${
              isHovered ? 'animate-gemstone-shimmer opacity-80' : 'opacity-20'
            }`}
            aria-hidden="true"
          />
        )}

        {/* Category Pill: Thin Animated Orbit Ring completing 1 rotation upon selection */}
        {variant === 'category' && hasOrbitRotated && (
          <svg
            className="absolute inset-[-1.5px] w-[calc(100%+3px)] h-[calc(100%+3px)] rounded-full pointer-events-none animate-celestial-orbit-single"
            viewBox="0 0 100 36"
            fill="none"
            preserveAspectRatio="none"
          >
            <rect
              x="1.5"
              y="1.5"
              width="97"
              height="33"
              rx="16.5"
              stroke="#dfb76c"
              strokeWidth="1.2"
              strokeDasharray="24 80"
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* Content Container */}
        <span className="relative z-10 flex items-center gap-1.5">
          {/* Active selection star indicator */}
          {isSelected && variant !== 'filter' && (
            <span className="text-[#dfb76c] font-bold text-[11px] leading-none animate-in zoom-in-75 duration-150">
              ✦
            </span>
          )}

          {/* Icon if provided */}
          {icon && <span className="shrink-0">{icon}</span>}

          {/* Recharge dynamic sequential label */}
          {variant === 'recharge' ? (
            rechargeStep === 'added' ? (
              <span className="flex items-center gap-1 font-bold animate-in zoom-in-90 duration-150">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{rechargeAddedText}</span>
              </span>
            ) : rechargeStep === 'spark' ? (
              <span className="flex items-center gap-1 font-bold">
                <Sparkles className="w-3 h-3 text-[#dfb76c] animate-spin" />
                <span>{rechargeAmount || children}</span>
              </span>
            ) : (
              <span>{rechargeAmount || children}</span>
            )
          ) : (
            <span>{children}</span>
          )}

          {/* Count badge for filters */}
          {count !== undefined && count > 0 && (
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold leading-tight ${
                isSelected
                  ? 'bg-[#0c0d13]/30 text-[#0c0d13]'
                  : 'bg-[#22273a] text-[#dfb76c]'
              }`}
            >
              {count}
            </span>
          )}

          {/* Order status checkmark */}
          {variant === 'order-status' && activeStatus === 'completed' && (
            <Check className="w-3 h-3 text-emerald-400 stroke-[2.5] ml-0.5" />
          )}

          {/* Order status in progress dot */}
          {variant === 'order-status' && activeStatus === 'in_progress' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-ping ml-0.5" />
          )}
        </span>
      </button>
    </div>
  );
};
