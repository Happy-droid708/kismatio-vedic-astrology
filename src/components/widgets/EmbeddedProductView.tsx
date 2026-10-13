import React, { useState } from 'react';
import { GemstoneProduct } from '../../types/astrology';
import { GemstoneIllustration } from '../GemstoneIllustration';
import { Check, ShieldCheck, ChevronRight, FileText, Sparkles } from 'lucide-react';
import { CelestialButton } from '../ui/CelestialButton';

interface EmbeddedProductViewProps {
  gemstone: GemstoneProduct;
  initialName?: string;
  initialGotra?: string;
  onProceedToCheckout: (config: {
    selectedMetal: '18k_gold' | 'panchdhatu' | 'sterling_silver';
    ringSize: string;
    sankalpName: string;
    sankalpGotra: string;
    finalPrice: number;
  }) => void;
  onAskAcharya: (question: string) => void;
}

export const EmbeddedProductView: React.FC<EmbeddedProductViewProps> = ({
  gemstone,
  initialName = 'Devanand Sharma',
  initialGotra = 'Kashyapa',
  onProceedToCheckout,
  onAskAcharya,
}) => {
  const [selectedMetal, setSelectedMetal] = useState<'18k_gold' | 'panchdhatu' | 'sterling_silver'>('panchdhatu');
  const [ringSize, setRingSize] = useState('18 (Indian Standard)');
  const [sankalpName, setSankalpName] = useState(initialName);
  const [sankalpGotra, setSankalpGotra] = useState(initialGotra);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const metalOptions = [
    {
      id: 'panchdhatu' as const,
      label: 'Vedic Panchdhatu',
      sublabel: '5-Metal Guru Resonance',
      premium: 4800,
    },
    {
      id: '18k_gold' as const,
      label: '18K Yellow Gold',
      sublabel: 'BIS Hallmarked Solid',
      premium: 14500,
    },
    {
      id: 'sterling_silver' as const,
      label: '925 Pure Silver',
      sublabel: 'With Sacred Rhodium',
      premium: 2200,
    },
  ];

  const currentMetalObj = metalOptions.find((m) => m.id === selectedMetal)!;
  const totalPrice = gemstone.basePrice + currentMetalObj.premium;

  const handleCheckout = () => {
    onProceedToCheckout({
      selectedMetal,
      ringSize,
      sankalpName,
      sankalpGotra,
      finalPrice: totalPrice,
    });
  };

  return (
    <div className="my-2.5 p-3.5 sm:p-5 rounded-2xl bg-[#141624] border border-[#dfb76c]/40 shadow-2xl relative">
      {/* Sanctum Tag & Lab Report */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#252b3e]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#dfb76c]">
            Embedded Gemstone Sanctum
          </span>
        </div>
        <button
          onClick={() => setShowCertificateModal(!showCertificateModal)}
          className="flex items-center gap-1 text-[11px] text-[#a8a192] hover:text-[#dfb76c] active:text-[#dfb76c] transition-colors cursor-pointer"
        >
          <FileText className="w-3 h-3 text-[#dfb76c]" />
          <span>{showCertificateModal ? 'Hide Report' : 'IGI Lab Report'}</span>
        </button>
      </div>

      {/* Gemstone Visual Header for Mobile */}
      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0b0c13] border border-[#202538] text-center mb-3">
        <GemstoneIllustration type="yellow-sapphire" size="md" />
        <h4 className="mt-2 text-xs sm:text-sm font-serif-luxury font-bold text-[#f5eedf]">
          {gemstone.shape} · {gemstone.weightRatti} Ratti ({gemstone.weightCarat} Carats)
        </h4>
        <p className="text-[10px] text-[#9d9688] mt-0.5">{gemstone.origin}</p>

        <div className="w-full mt-2 pt-2 border-t border-[#1e2336] flex items-center justify-around text-[10px] text-[#b8b2a5]">
          <div>
            <span className="text-[#6d6657] block">Clarity</span>
            <span className="font-semibold text-[#ede8dc]">VVS1 Clean</span>
          </div>
          <div>
            <span className="text-[#6d6657] block">Hardness</span>
            <span className="font-semibold text-[#ede8dc]">9.0 Mohs</span>
          </div>
          <div>
            <span className="text-[#6d6657] block">Luster</span>
            <span className="font-semibold text-[#ede8dc]">Vitreous</span>
          </div>
        </div>
      </div>

      {/* Lab Report Drawer Preview (when clicked) */}
      {showCertificateModal && (
        <div className="mb-3 p-2.5 rounded-xl bg-[#0e1017] border border-[#dfb76c]/30 text-[11px] text-[#d5cebf] space-y-1 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#f5eedf]">IGI-GTL Govt Certified Report</span>
            <span className="font-mono text-[#dfb76c]">#{gemstone.reportNumber}</span>
          </div>
          <p className="text-[10px] text-[#9b9485]">
            Species: Natural Corundum. Optically isotropic yellow hue. Zero beryllium diffusion, unheated.
          </p>
        </div>
      )}

      {/* Customization Options */}
      <div className="space-y-3">
        {/* Metal Choice */}
        <div>
          <label className="block text-[11px] font-semibold text-[#cdc7ba] mb-1.5">
            1. Select Ring Metal Setting
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {metalOptions.map((opt) => {
              const isSelected = selectedMetal === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedMetal(opt.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between min-h-[44px] ${
                    isSelected
                      ? 'bg-[#222738] border-[#dfb76c] text-[#fbf6ea] shadow-sm ring-1 ring-[#dfb76c]/40'
                      : 'bg-[#10121c] border-[#222738] text-[#9a9385] active:border-[#383f59]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#dfb76c] bg-[#dfb76c]' : 'border-[#4e546e]'}`}>
                      {isSelected && <Check className="w-2.5 h-2.5 text-[#0e1017] stroke-[3]" />}
                    </div>
                    <div>
                      <span className="text-xs font-semibold block text-[#ede8dc]">{opt.label}</span>
                      <span className="text-[10px] text-[#8e8779] block leading-none">{opt.sublabel}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#dfb76c] tabular-nums">
                    +₹{opt.premium.toLocaleString('en-IN')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ring Size Selection */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-semibold text-[#cdc7ba] mb-1">
              2. Ring Size (Indian)
            </label>
            <select
              value={ringSize}
              onChange={(e) => setRingSize(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c] min-h-[40px]"
            >
              <option value="14 (Indian Standard)">Size 14 (Slim)</option>
              <option value="16 (Indian Standard)">Size 16 (Medium)</option>
              <option value="18 (Indian Standard)">Size 18 (Standard)</option>
              <option value="20 (Indian Standard)">Size 20 (Broad)</option>
              <option value="22 (Indian Standard)">Size 22 (Heavy)</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-[#cdc7ba] mb-1">
              Wearing Time
            </label>
            <div className="px-2.5 py-2 rounded-lg bg-[#0e1017] border border-[#272d42] text-[11px] text-amber-200 flex items-center min-h-[40px]">
              Thursday Sunrise
            </div>
          </div>
        </div>

        {/* Gotra & Sankalp Input */}
        <div className="p-2.5 rounded-xl bg-[#0e1017] border border-[#222739] space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#dfb76c]">
            <Sparkles className="w-3 h-3" />
            <span>Kashi Peeth Sankalp Recital Info</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] text-[#787163] block">Native Name</label>
              <input
                type="text"
                value={sankalpName}
                onChange={(e) => setSankalpName(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#161926] border border-[#2c3349] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c] min-h-[36px]"
              />
            </div>
            <div>
              <label className="text-[9px] text-[#787163] block">Gotra (Clan)</label>
              <input
                type="text"
                value={sankalpGotra}
                onChange={(e) => setSankalpGotra(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#161926] border border-[#2c3349] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c] min-h-[36px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Bar & Action */}
      <div className="mt-4 pt-3 border-t border-[#252a3d] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#8e8779]">Total Consecrated Ring</span>
          <div className="text-right">
            <span className="text-lg font-serif-luxury font-bold text-[#dfb76c] font-mono tabular-nums">
              ₹{totalPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <CelestialButton
            onClick={handleCheckout}
            variant="primary"
            size="lg"
            className="w-full text-xs font-bold"
          >
            <span>Proceed to In-Chat Checkout</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </CelestialButton>

          <button
            onClick={() => onAskAcharya('Acharya ji, why is Panchdhatu recommended for Jupiter over standard gold in my case?')}
            className="w-full py-2 rounded-lg border border-[#2b3145] text-[11px] text-[#a8a192] active:text-[#ede8dc] cursor-pointer text-center"
          >
            Ask Acharya a Question First
          </button>
        </div>
      </div>
    </div>
  );
};
