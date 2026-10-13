import React from 'react';
import { ShoppingProduct } from '../../data/shoppingProductsData';

interface ShoppingProductArtworkProps {
  product: ShoppingProduct;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ShoppingProductArtwork: React.FC<ShoppingProductArtworkProps> = ({
  product,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
    xl: 'w-44 h-44 sm:w-52 sm:h-52',
  };

  const { category, gemType, mukhiCount, subCategory } = product;

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} shrink-0 select-none ${className}`}>
      {/* Ambient planetary radial glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-50 animate-pulse pointer-events-none"
        style={{ backgroundColor: product.colorHex }}
      />

      {/* =================================================================== */}
      {/* 1. GEMSTONES ARTWORK                                                */}
      {/* =================================================================== */}
      {category === 'gemstones' && (
        <>
          {gemType === 'blue-sapphire' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(37,99,235,0.4)]">
              <defs>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="30%" stopColor="#3b82f6" />
                  <stop offset="70%" stopColor="#1d4ed8" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="50" rx="36" ry="42" fill="url(#blueGrad)" stroke="#60a5fa" strokeWidth="1.2" />
              <ellipse cx="50" cy="50" rx="22" ry="26" fill="#1e3a8a" stroke="#93c5fd" strokeWidth="0.8" opacity="0.9" />
              <line x1="50" y1="8" x2="50" y2="24" stroke="#bfdbfe" strokeWidth="0.75" />
              <line x1="50" y1="76" x2="50" y2="92" stroke="#bfdbfe" strokeWidth="0.75" />
              <line x1="14" y1="50" x2="28" y2="50" stroke="#bfdbfe" strokeWidth="0.75" />
              <line x1="72" y1="50" x2="86" y2="50" stroke="#bfdbfe" strokeWidth="0.75" />
              <circle cx="42" cy="38" r="2.5" fill="#ffffff" opacity="0.9" />
              <circle cx="58" cy="60" r="1.5" fill="#ffffff" opacity="0.7" />
            </svg>
          )}

          {gemType === 'yellow-sapphire' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(234,179,8,0.4)]">
              <defs>
                <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="35%" stopColor="#facc15" />
                  <stop offset="75%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#713f12" />
                </linearGradient>
              </defs>
              <rect x="16" y="16" width="68" height="68" rx="16" fill="url(#yellowGrad)" stroke="#fef08a" strokeWidth="1.2" />
              <rect x="30" y="30" width="40" height="40" rx="8" fill="#a16207" stroke="#fef9c3" strokeWidth="0.8" opacity="0.9" />
              <line x1="16" y1="16" x2="30" y2="30" stroke="#fef08a" strokeWidth="0.75" />
              <line x1="84" y1="16" x2="70" y2="30" stroke="#fef08a" strokeWidth="0.75" />
              <line x1="16" y1="84" x2="30" y2="70" stroke="#fef08a" strokeWidth="0.75" />
              <line x1="84" y1="84" x2="70" y2="70" stroke="#fef08a" strokeWidth="0.75" />
              <circle cx="40" cy="38" r="2.8" fill="#ffffff" opacity="0.95" />
              <circle cx="62" cy="58" r="1.5" fill="#ffffff" opacity="0.75" />
            </svg>
          )}

          {gemType === 'emerald' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(16,185,129,0.4)]">
              <defs>
                <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a7f3d0" />
                  <stop offset="30%" stopColor="#10b981" />
                  <stop offset="70%" stopColor="#047857" />
                  <stop offset="100%" stopColor="#064e3b" />
                </linearGradient>
              </defs>
              <polygon points="26,12 74,12 88,26 88,74 74,88 26,88 12,74 12,26" fill="url(#emeraldGrad)" stroke="#6ee7b7" strokeWidth="1.2" />
              <polygon points="34,24 66,24 76,34 76,66 66,76 34,76 24,66 24,34" fill="#065f46" stroke="#d1fae5" strokeWidth="0.75" opacity="0.85" />
              <circle cx="42" cy="36" r="2.4" fill="#ffffff" opacity="0.95" />
              <circle cx="60" cy="62" r="1.4" fill="#ffffff" opacity="0.7" />
            </svg>
          )}

          {gemType === 'ruby' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(225,29,72,0.4)]">
              <defs>
                <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fecdd3" />
                  <stop offset="30%" stopColor="#f43f5e" />
                  <stop offset="70%" stopColor="#be123c" />
                  <stop offset="100%" stopColor="#4c0519" />
                </linearGradient>
              </defs>
              <polygon points="50,12 86,38 72,86 28,86 14,38" fill="url(#rubyGrad)" stroke="#fda4af" strokeWidth="1.2" />
              <polygon points="50,26 72,42 62,74 38,74 28,42" fill="#881337" stroke="#ffe4e6" strokeWidth="0.75" opacity="0.9" />
              <circle cx="44" cy="38" r="2.5" fill="#ffffff" opacity="0.95" />
              <circle cx="56" cy="64" r="1.3" fill="#ffffff" opacity="0.7" />
            </svg>
          )}

          {gemType === 'pearl' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(241,245,249,0.5)]">
              <defs>
                <radialGradient id="pearlGrad" cx="38%" cy="32%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#f1f5f9" />
                  <stop offset="55%" stopColor="#e2e8f0" />
                  <stop offset="85%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="38" fill="url(#pearlGrad)" stroke="#e2e8f0" strokeWidth="1" />
              <ellipse cx="40" cy="35" rx="8" ry="5" fill="#ffffff" opacity="0.9" transform="rotate(-20 40 35)" />
              <circle cx="48" cy="30" r="3" fill="#ffffff" opacity="0.95" />
            </svg>
          )}

          {gemType === 'coral' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(234,88,12,0.4)]">
              <defs>
                <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fed7aa" />
                  <stop offset="35%" stopColor="#f97316" />
                  <stop offset="75%" stopColor="#c2410c" />
                  <stop offset="100%" stopColor="#7c2d12" />
                </linearGradient>
              </defs>
              <polygon points="50,14 84,78 16,78" fill="url(#coralGrad)" stroke="#fdba74" strokeWidth="1.2" />
              <polygon points="50,30 72,70 28,70" fill="#9a3412" stroke="#ffedd5" strokeWidth="0.8" opacity="0.85" />
              <circle cx="46" cy="44" r="2.2" fill="#ffffff" opacity="0.9" />
            </svg>
          )}

          {gemType === 'hessonite' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(217,119,6,0.4)]">
              <defs>
                <linearGradient id="hessoniteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde68a" />
                  <stop offset="30%" stopColor="#d97706" />
                  <stop offset="75%" stopColor="#92400e" />
                  <stop offset="100%" stopColor="#451a03" />
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="50" rx="38" ry="32" fill="url(#hessoniteGrad)" stroke="#fcd34d" strokeWidth="1.2" />
              <ellipse cx="50" cy="50" rx="26" ry="20" fill="#78350f" stroke="#fef3c7" strokeWidth="0.8" opacity="0.85" />
              <circle cx="40" cy="40" r="2.5" fill="#ffffff" opacity="0.9" />
            </svg>
          )}

          {gemType === 'cats-eye' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(132,204,22,0.4)]">
              <defs>
                <linearGradient id="catsEyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#bef264" />
                  <stop offset="30%" stopColor="#84cc16" />
                  <stop offset="70%" stopColor="#4d7c0f" />
                  <stop offset="100%" stopColor="#1a2e05" />
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="50" rx="38" ry="32" fill="url(#catsEyeGrad)" stroke="#d9f99d" strokeWidth="1.2" />
              {/* Vertical Luminous Slit */}
              <line x1="50" y1="20" x2="50" y2="80" stroke="#ffffff" strokeWidth="3" opacity="0.9" strokeLinecap="round" />
              <line x1="50" y1="26" x2="50" y2="74" stroke="#fef08a" strokeWidth="1" opacity="0.95" strokeLinecap="round" />
              <circle cx="42" cy="40" r="2" fill="#ffffff" opacity="0.8" />
            </svg>
          )}

          {gemType === 'diamond' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(226,232,240,0.6)]">
              <defs>
                <linearGradient id="diaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#e2e8f0" />
                  <stop offset="70%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>
              <polygon points="20,34 50,14 80,34 50,86" fill="url(#diaGrad)" stroke="#f8fafc" strokeWidth="1.2" />
              <polygon points="32,34 50,22 68,34 50,72" fill="#cbd5e1" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
              <line x1="20" y1="34" x2="80" y2="34" stroke="#ffffff" strokeWidth="1" />
              <circle cx="48" cy="30" r="2.5" fill="#ffffff" opacity="0.95" />
            </svg>
          )}
        </>
      )}

      {/* =================================================================== */}
      {/* 2. RUDRAKSHA BEADS ARTWORK (1 to 14 Mukhi)                          */}
      {/* =================================================================== */}
      {category === 'rudraksha' && (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(113,63,18,0.5)]">
            <defs>
              <radialGradient id="rudrakshaBody" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#a16207" />
                <stop offset="30%" stopColor="#854d0e" />
                <stop offset="70%" stopColor="#713f12" />
                <stop offset="100%" stopColor="#451a03" />
              </radialGradient>
              <linearGradient id="capSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>

            {/* Main organic bead body */}
            <circle cx="50" cy="50" r="36" fill="url(#rudrakshaBody)" stroke="#ca8a04" strokeWidth="0.75" />

            {/* Mukhi Cleft Ridges according to count */}
            {Array.from({ length: Math.min(mukhiCount || 5, 14) }).map((_, i) => {
              const count = Math.min(mukhiCount || 5, 14);
              const angle = (360 / count) * i;
              const rad = (angle * Math.PI) / 180;
              const x1 = 50 + 12 * Math.cos(rad);
              const y1 = 50 + 12 * Math.sin(rad);
              const x2 = 50 + 35 * Math.cos(rad);
              const y2 = 50 + 35 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#3b1d07"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              );
            })}

            {/* Organic texture studs */}
            <circle cx="42" cy="38" r="1.8" fill="#eab308" opacity="0.6" />
            <circle cx="58" cy="44" r="1.5" fill="#eab308" opacity="0.5" />
            <circle cx="48" cy="62" r="1.6" fill="#eab308" opacity="0.6" />
            <circle cx="36" cy="54" r="1.4" fill="#eab308" opacity="0.5" />

            {/* Top Silver Cap */}
            <ellipse cx="50" cy="14" rx="14" ry="5" fill="url(#capSilver)" stroke="#94a3b8" strokeWidth="0.75" />
            <circle cx="50" cy="12" r="2.5" fill="#f8fafc" />

            {/* Bottom Silver Cap */}
            <ellipse cx="50" cy="86" rx="14" ry="5" fill="url(#capSilver)" stroke="#94a3b8" strokeWidth="0.75" />

            {/* Center Mukhi Number Badge */}
            <circle cx="50" cy="50" r="11" fill="#1e140d" stroke="#ca8a04" strokeWidth="1" opacity="0.9" />
            <text
              x="50"
              y="53.5"
              textAnchor="middle"
              fill="#fef08a"
              fontSize="8.5"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              {mukhiCount || 5}M
            </text>
          </svg>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. JEWELLERY ARTWORK (Rings, Necklaces, Pendants, Bracelets)         */}
      {/* =================================================================== */}
      {category === 'jewellery' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {subCategory === 'rings' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(217,119,6,0.35)]">
              <defs>
                <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="40%" stopColor="#eab308" />
                  <stop offset="80%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>
              </defs>
              {/* Ring Band */}
              <ellipse cx="50" cy="62" rx="34" ry="24" fill="none" stroke="url(#ringGold)" strokeWidth="6" />
              <ellipse cx="50" cy="62" rx="31" ry="21" fill="none" stroke="#713f12" strokeWidth="1" opacity="0.4" />
              {/* Crown Bezel Setting */}
              <polygon points="34,36 66,36 60,48 40,48" fill="url(#ringGold)" stroke="#fef08a" strokeWidth="0.75" />
              {/* Mounted Gemstone */}
              <circle cx="50" cy="36" r="14" fill={product.colorHex} stroke="#fef9c3" strokeWidth="1.5" />
              <circle cx="46" cy="32" r="3" fill="#ffffff" opacity="0.9" />
            </svg>
          )}

          {subCategory === 'necklaces' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(113,63,18,0.4)]">
              <defs>
                <linearGradient id="necklaceSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
              </defs>
              {/* Garland Loop */}
              <path
                d="M 20,24 C 20,70 80,70 80,24"
                fill="none"
                stroke="url(#necklaceSilver)"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
              {/* Rosary beads on loop */}
              {[20, 26, 34, 42, 50, 58, 66, 74, 80].map((x, i) => {
                const y = 24 + Math.sin((i / 8) * Math.PI) * 44;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4.2"
                    fill="#78350f"
                    stroke="#eab308"
                    strokeWidth="0.8"
                  />
                );
              })}
              {/* Sumeru Guru Pendant / Tassel */}
              <circle cx="50" cy="69" r="6.5" fill="#ca8a04" stroke="#fef08a" strokeWidth="1" />
              <path d="M 50,75 L 47,88 L 53,88 Z" fill="#b91c1c" />
            </svg>
          )}

          {subCategory === 'pendants' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(180,83,9,0.4)]">
              <defs>
                <linearGradient id="pendantMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>
              {/* Bale / Top ring */}
              <circle cx="50" cy="16" r="6" fill="none" stroke="url(#pendantMetal)" strokeWidth="3" />
              {/* Trishul Prongs */}
              <line x1="50" y1="22" x2="50" y2="82" stroke="url(#pendantMetal)" strokeWidth="4" strokeLinecap="round" />
              <path d="M 32,32 C 32,54 50,54 50,54 C 50,54 68,54 68,32" fill="none" stroke="url(#pendantMetal)" strokeWidth="3.5" strokeLinecap="round" />
              {/* Central Bead */}
              <circle cx="50" cy="54" r="10" fill="#713f12" stroke="#ca8a04" strokeWidth="1.2" />
              <circle cx="48" cy="51" r="2.2" fill="#ffffff" opacity="0.85" />
            </svg>
          )}

          {subCategory === 'bracelets' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(99,102,241,0.4)]">
              <defs>
                <linearGradient id="braceletSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="50" rx="38" ry="24" fill="none" stroke="url(#braceletSilver)" strokeWidth="3.5" />
              {/* Linked beads along perimeter */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const bx = 50 + 38 * Math.cos(rad);
                const by = 50 + 24 * Math.sin(rad);
                const colors = ['#eab308', '#2563eb', '#10b981', '#e11d48', '#f8fafc', '#ea580c', '#d97706', '#84cc16'];
                return (
                  <circle
                    key={i}
                    cx={bx}
                    cy={by}
                    r="5"
                    fill={colors[i % colors.length]}
                    stroke="#ffffff"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
          )}
        </div>
      )}
    </div>
  );
};
