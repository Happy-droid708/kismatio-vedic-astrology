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
    const colors = ['#dfb76c', '#fcedc5', '#ffffff', '#e8d5ff'];
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
      className="relative px-3 sm:px-4 py-2 border-b border-[#1f2334] bg-[#0c0d15] overflow-x-auto scrollbar-none select-none"
    >
      {/* Sliding Active Indicator Pill that smoothly travels between pills */}
      <span
        className="absolute top-2 h-[34px] rounded-full bg-gradient-to-r from-[#dfb76c] via-[#d4a853] to-[#c49746] shadow-md shadow-[#dfb76c]/20 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.opacity,
          boxShadow: '0 0 16px rgba(223, 183, 108, 0.35)',
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
                className={`group relative px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer flex items-center gap-1.5 min-h-[34px] transition-all duration-200 outline-none select-none ${
                  isSelected
                    ? 'scale-[1.03] text-[#0c0d13] font-bold'
                    : 'scale-[0.98] text-[#9a9385] hover:text-[#ede8dc] hover:scale-[1.01] active:scale-[0.94] bg-[#151825] border border-[#272d42] hover:border-[#dfb76c]/40'
                }`}
                style={{
                  background: isSelected ? 'transparent' : undefined,
                  borderColor: isSelected ? 'transparent' : undefined,
                }}
              >
                {/* Active star indicator */}
                {isSelected && (
                  <span className="text-[#0c0d13] font-bold text-[10px] leading-none animate-in zoom-in-75 duration-150">
                    ✦
                  </span>
                )}

                <span>{f.label}</span>

                {f.count !== undefined && f.count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold leading-tight ${
                      isSelected
                        ? 'bg-[#0c0d13]/20 text-[#0c0d13]'
                        : 'bg-[#22273a] text-[#dfb76c]'
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
