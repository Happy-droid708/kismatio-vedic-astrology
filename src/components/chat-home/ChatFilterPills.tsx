import React, { useRef, useState, useEffect } from 'react';
import { ConversationFilter } from '../../types/astrology';

interface ChatFilterPillsProps {
  activeFilter: ConversationFilter;
  onSelectFilter: (filter: ConversationFilter) => void;
  counts: {
    all: number;
    unread: number;
    astrologers: number;
    active: number;
    orders: number;
    saved: number;
  };
}

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

export const ChatFilterPills: React.FC<ChatFilterPillsProps> = ({
  activeFilter,
  onSelectFilter,
  counts,
}) => {
  const filters: { id: ConversationFilter; label: string; count?: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'unread', label: 'Unread', count: counts.unread },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'orders', label: 'Orders', count: counts.orders },
    { id: 'astrologers', label: 'Astrologers' },
    { id: 'saved', label: 'Saved', count: counts.saved },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [particles, setParticles] = useState<Particle[]>([]);
  const [sparkPillId, setSparkPillId] = useState<string | null>(null);

  // Measure and slide the active indicator with resize and scroll resilience
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = pillRefs.current[activeFilter];
      const container = containerRef.current;
      if (activeEl && container) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        setIndicatorStyle({
          left: activeRect.left - containerRect.left + container.scrollLeft,
          width: activeRect.width,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateIndicator);
    }

    return () => {
      window.removeEventListener('resize', updateIndicator);
      if (container) {
        container.removeEventListener('scroll', updateIndicator);
      }
    };
  }, [activeFilter]);

  const handleSelect = (filterId: ConversationFilter) => {
    if (filterId === activeFilter) return;

    // Trigger tiny celestial spark on selection (2–5 micro particles)
    const particleCount = 4;
    const colors = ['#E7B743', '#FFD76A', '#A87B2A', '#F7F0FF'];
    const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => ({
      id: Date.now() + i,
      angle: (360 / particleCount) * i + (Math.random() * 20 - 10),
      distance: 14 + Math.random() * 10,
      size: 2 + Math.random() * 1.5,
      color: colors[i % colors.length],
    }));

    setSparkPillId(filterId);
    setParticles(newParticles);
    setTimeout(() => {
      setSparkPillId(null);
    }, 450);

    onSelectFilter(filterId);
  };

  return (
    <div
      ref={containerRef}
      className="relative px-3 sm:px-4 py-2 border-b border-[#453052]/20 bg-[#180D2B] overflow-x-auto scrollbar-none select-none"
    >
      {/* Sliding Active Indicator Pill that smoothly travels between pills */}
      <span
        className="absolute top-2 h-[34px] rounded-full bg-gradient-to-r from-[#FFD76A] via-[#E7B743] to-[#A87B2A] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 shadow-[0_4px_14px_rgba(231,183,67,0.35),inset_0_1px_1.5px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(168,123,42,0.5)]"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.opacity,
        }}
        aria-hidden="true"
      />

      <div className="flex items-center gap-1.5 min-w-max relative z-10">
        {filters.map((f) => {
          const isSelected = activeFilter === f.id;
          const isSparking = sparkPillId === f.id;

          return (
            <div key={f.id} className="relative inline-flex items-center justify-center">
              {/* Micro Celestial Particles on selection */}
              {isSparking &&
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
                          transform: 'translate(0, 0)',
                          '--tx': `${tx}px`,
                          '--ty': `${ty}px`,
                        } as React.CSSProperties
                      }
                      aria-hidden="true"
                    />
                  );
                })}

              <button
                ref={(el) => {
                  pillRefs.current[f.id] = el;
                }}
                onClick={() => handleSelect(f.id)}
                className={`group relative px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer flex items-center gap-1.5 min-h-[34px] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] select-none ${
                  isSelected
                    ? 'scale-[1.01] text-[#12091F] font-bold'
                    : 'text-[#C5B8D9] hover:text-[#F7F0FF] active:scale-[0.98] bg-[#24133B] border border-transparent hover:border-[#A87B2A]/35 hover:bg-[#352044] shadow-[0_2px_8px_-1px_rgba(18,9,31,0.35),inset_0_1px_1px_rgba(247,240,255,0.04)]'
                }`}
                style={{
                  background: isSelected ? 'transparent' : undefined,
                  borderColor: isSelected ? 'transparent' : undefined,
                }}
              >
                {/* Active star indicator */}
                {isSelected && (
                  <span className="text-[#12091F] font-bold text-[10px] leading-none animate-in zoom-in-75 duration-150">
                    ✦
                  </span>
                )}

                <span>{f.label}</span>

                {f.count !== undefined && f.count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold leading-tight ${
                      isSelected
                        ? 'bg-[#180D2B]/20 text-[#12091F]'
                        : 'bg-[#12091F] text-[#E7B743] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)]'
                    }`}
                  >
                    {f.count}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
