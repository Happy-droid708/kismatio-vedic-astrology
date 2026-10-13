import React, { useState } from 'react';
import { GemstoneProduct } from '../../types/astrology';
import { GemstoneIllustration } from '../GemstoneIllustration';
import { Award, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { CelestialButton } from '../ui/CelestialButton';
import { CelestialPill } from '../ui/CelestialPill';

interface GemstoneRecommendationCardProps {
  gemstone: GemstoneProduct;
  onInspect: () => void;
}

const ALL_GEMSTONE_PILLS = [
  { id: 'yellow-sapphire', label: '💎 Pukhraj (Yellow Sapphire)', weight: '5.25 Ratti', rashi: 'Dhanu & Meena' },
  { id: 'ruby', label: '💎 Manik (Burmese Ruby)', weight: '4.80 Ratti', rashi: 'Simha (Sun)' },
  { id: 'emerald', label: '💎 Panna (Zambian Emerald)', weight: '5.50 Ratti', rashi: 'Mithuna & Kanya' },
  { id: 'pearl', label: '💎 Moti (Basra Pearl)', weight: '6.20 Ratti', rashi: 'Karka (Moon)' },
  { id: 'blue-sapphire', label: '💎 Neelam (Ceylon Sapphire)', weight: '4.50 Ratti', rashi: 'Makara & Kumbha' },
];

export const GemstoneRecommendationCard: React.FC<GemstoneRecommendationCardProps> = ({
  gemstone,
  onInspect,
}) => {
  const [selectedGemId, setSelectedGemId] = useState('yellow-sapphire');

  const handleGemSelect = (gemId: string) => {
    setSelectedGemId(gemId);
    // On tap: expands slightly, shimmer intensifies, product information opens
    setTimeout(() => {
      onInspect();
    }, 280);
  };

  return (
    <div className="my-2.5 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-b from-[#181b2a] via-[#141624] to-[#0f111c] border border-[#dfb76c]/40 shadow-xl relative overflow-hidden">
      {/* Top subtle golden aura line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dfb76c] to-transparent opacity-80" />

      {/* Header with remedy label and price */}
      <div className="flex items-start justify-between pb-2.5 border-b border-[#252a3d] gap-2">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-[#dfb76c] uppercase block">
            Prescribed Jyotish Remedy
          </span>
          <h3 className="text-sm sm:text-base font-serif-luxury font-bold text-[#fcedc5] leading-tight mt-0.5">
            {gemstone.sanskritName}
          </h3>
          <p className="text-[11px] text-[#9e9788]">{gemstone.name}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] text-[#8e8779] block">Consecrated Value</span>
          <span className="text-sm sm:text-base font-mono font-bold text-[#dfb76c] tabular-nums">
            ₹{gemstone.basePrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Section 9: Gemstone Pills Carousel with shimmer pass on hover & sparkle on tap */}
      <div className="my-2.5 pb-2 border-b border-[#1f2438] overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[10px] text-[#8e8779] font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#dfb76c]" />
            <span>Prescribed Stones:</span>
          </span>
          {ALL_GEMSTONE_PILLS.map((gem) => (
            <CelestialPill
              key={gem.id}
              variant="gemstone"
              isSelected={selectedGemId === gem.id}
              onClick={() => handleGemSelect(gem.id)}
              className="text-[11px] py-1 px-3 min-h-[32px]"
            >
              {gem.label}
            </CelestialPill>
          ))}
        </div>
      </div>

      {/* Responsive Body: Horizontal on Desktop (sm:), Stacked on Mobile */}
      <div className="my-3 flex flex-col sm:flex-row items-center sm:items-stretch gap-3">
        {/* Left: Gemstone Visual + Certification */}
        <div className="w-full sm:w-48 shrink-0 flex flex-col items-center justify-center p-3 rounded-xl bg-[#0b0c13] border border-[#202538] relative">
          <GemstoneIllustration type="yellow-sapphire" size="md" />
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-[#181c2c] border border-[#dfb76c]/30 text-[10px] text-[#dfb76c] font-medium">
            <Award className="w-3 h-3" />
            <span>IGI Certified</span>
          </div>
          <div className="text-[10px] font-mono text-[#8a8374] mt-2">
            #{gemstone.reportNumber}
          </div>
        </div>

        {/* Right: Specs Grid & Benefits */}
        <div className="flex-1 w-full flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-1.5 w-full text-xs">
            <div className="p-2 rounded-lg bg-[#11131e] border border-[#202538]">
              <span className="text-[10px] text-[#7e776a] block">Weight</span>
              <span className="font-semibold text-[#ede8dc] text-[11px]">{gemstone.weightRatti} Ratti ({gemstone.weightCarat}ct)</span>
            </div>
            <div className="p-2 rounded-lg bg-[#11131e] border border-[#202538]">
              <span className="text-[10px] text-[#7e776a] block">Origin</span>
              <span className="font-semibold text-[#ede8dc] text-[11px]">{gemstone.origin}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#11131e] border border-[#202538]">
              <span className="text-[10px] text-[#7e776a] block">Ruling Graha</span>
              <span className="font-semibold text-amber-200 text-[11px]">{gemstone.rulingPlanet}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#11131e] border border-[#202538]">
              <span className="text-[10px] text-[#7e776a] block">Treatment</span>
              <span className="font-semibold text-emerald-400 text-[11px]">100% Untreated Natural</span>
            </div>
          </div>

          <div className="space-y-1 mt-2 pt-2 border-t border-[#1e2336]">
            {gemstone.benefits.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#cfc8ba]">
                <CheckCircle className="w-3.5 h-3.5 text-[#dfb76c] shrink-0 mt-0.5" />
                <span className="leading-snug">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Button & Guarantee */}
      <div className="pt-2 border-t border-[#202538] flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-[10px] text-[#8e8779] text-center sm:text-left">
          Includes 108 Gayatri Japa + Gotra Sankalp at Kashi Peeth
        </span>
        <CelestialButton
          onClick={onInspect}
          variant="primary"
          size="md"
          className="w-full sm:w-auto text-xs font-bold"
        >
          <span>Inspect Gemstone & Sankalp</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </CelestialButton>
      </div>
    </div>
  );
};
