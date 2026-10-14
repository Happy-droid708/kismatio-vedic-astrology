import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface CelestialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showSparkleOnHover?: boolean;
  withBurst?: boolean;
  children: React.ReactNode;
}

export const CelestialButton: React.FC<CelestialButtonProps> = ({
  variant = 'primary',
  size = 'md',
  showSparkleOnHover = true,
  withBurst = true,
  children,
  className = '',
  disabled = false,
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [burstActive, setBurstActive] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (withBurst) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 120);
      setBurstActive(true);
      setTimeout(() => setBurstActive(false), 500);
    }

    if (onClick) {
      onClick(e);
    }
  };

  // Base sizing
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs min-h-[36px] rounded-xl gap-1.5',
    md: 'px-4 py-2.5 text-xs sm:text-sm min-h-[42px] rounded-xl gap-2',
    lg: 'px-6 py-3 text-sm sm:text-base min-h-[48px] rounded-2xl gap-2.5',
  }[size];

  // Visual variants strictly adhering to borderless-first & claymorphism
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: isHovered
            ? 'linear-gradient(135deg, #FFD76A 0%, #E7B743 60%, #A87B2A 100%)'
            : 'linear-gradient(135deg, #FFD76A 0%, #E7B743 50%, #A87B2A 100%)',
          border: isHovered ? '1px solid rgba(255, 215, 106, 0.6)' : '1px solid transparent',
          text: 'text-[#12091F] font-bold',
          shadow: isHovered
            ? '0 6px 22px -1px rgba(255, 215, 106, 0.45), inset 0 1px 2px 0 rgba(255, 255, 255, 0.8), inset 0 -1.5px 2px 0 rgba(168, 123, 42, 0.7)'
            : '0 4px 16px -2px rgba(231, 183, 67, 0.35), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.6), inset 0 -1.5px 2px 0 rgba(168, 123, 42, 0.6)',
        };
      case 'secondary':
        return {
          bg: isHovered ? '#352044' : '#2B173C',
          border: isHovered ? '1px solid rgba(168, 123, 42, 0.4)' : '1px solid transparent',
          text: 'text-[#F7F0FF] font-semibold',
          shadow: isHovered
            ? '0 6px 18px -2px rgba(18, 9, 31, 0.55), inset 0 1px 1px 0 rgba(247, 240, 255, 0.08)'
            : '0 3px 12px -2px rgba(18, 9, 31, 0.45), inset 0 1px 1px 0 rgba(247, 240, 255, 0.05), inset 0 -1px 1.5px 0 rgba(18, 9, 31, 0.35)',
        };
      case 'outline':
        return {
          bg: isHovered ? '#352044' : 'transparent',
          border: isHovered ? '1px solid #E7B743' : '1px solid rgba(168, 123, 42, 0.35)',
          text: 'text-[#E7B743] font-semibold',
          shadow: isHovered ? '0 4px 14px -2px rgba(231, 183, 67, 0.25)' : 'none',
        };
      case 'ghost':
        return {
          bg: isHovered ? '#352044' : 'transparent',
          border: isHovered ? '1px solid rgba(168, 123, 42, 0.25)' : '1px solid transparent',
          text: isHovered ? 'text-[#F7F0FF]' : 'text-[#C5B8D9]',
          shadow: 'none',
        };
    }
  };

  const currentStyles = getVariantStyles();

  return (
    <button
      {...props}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      className={`relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] focus-visible:ring-offset-2 focus-visible:ring-offset-[#180D2B] disabled:cursor-not-allowed disabled:opacity-40 overflow-hidden ${
        sizeClasses
      } ${
        isPressed
          ? 'scale-[0.98] duration-75'
          : isHovered && !disabled
          ? 'scale-[1.01] duration-150 ease-out'
          : 'scale-100 duration-200'
      } ${currentStyles.text} ${className}`}
      style={{
        background: currentStyles.bg,
        border: currentStyles.border,
        boxShadow: currentStyles.shadow,
      }}
    >
      {/* Expanding Celestial Burst Shockwave */}
      {burstActive && (
        <span
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-0 border border-[#dfb76c]/60 animate-celestial-burst-ring"
          aria-hidden="true"
        />
      )}

      {/* Orbiting Border Glow on Desktop Hover */}
      {isHovered && !disabled && (
        <span
          className="absolute inset-0 rounded-[inherit] pointer-events-none border border-[#dfb76c]/80 opacity-60 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Tiny sparkle near text if enabled */}
      {showSparkleOnHover && isHovered && !disabled && (
        <Sparkles className="w-3 h-3 text-[#fcedc5] animate-celestial-sparkle-float shrink-0" />
      )}

      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </button>
  );
};
