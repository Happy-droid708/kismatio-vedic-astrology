import React, { useState } from 'react';
import { Astrologer, KundliData } from '../types/astrology';
import { CURATED_ASTROLOGERS, SAMPLE_USER_KUNDLI } from '../data/astrologyData';
import { Star, ShieldCheck, X, Check, Award, Compass, Sparkles } from 'lucide-react';

interface AstrologerDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAstrologer: Astrologer;
  onSelectAstrologer: (astrologer: Astrologer) => void;
  kundli: KundliData;
  onUpdateKundli: (updated: Partial<KundliData>) => void;
  onStartConsultation: () => void;
}

export const AstrologerDiscoveryModal: React.FC<AstrologerDiscoveryModalProps> = ({
  isOpen,
  onClose,
  selectedAstrologer,
  onSelectAstrologer,
  kundli,
  onUpdateKundli,
  onStartConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<'astrologers' | 'kundli'>('astrologers');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-3xl rounded-2xl bg-[#12141e] border border-[#dfb76c]/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#252b3e] flex items-center justify-between bg-[#151825]">
          <div>
            <span className="text-[11px] font-semibold text-[#dfb76c] uppercase tracking-wider block">
              Astrologer Discovery & Kundli Configuration
            </span>
            <h3 className="text-lg font-serif-luxury font-bold text-[#f5eedf]">
              Vedic Acharya Consultation Peeth
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8f887b] hover:text-[#ede8dc] hover:bg-[#202538] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#222739] bg-[#0f111a] px-4 pt-2">
          <button
            onClick={() => setActiveTab('astrologers')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'astrologers'
                ? 'border-[#dfb76c] text-[#dfb76c]'
                : 'border-transparent text-[#8e8779] hover:text-[#ede8dc]'
            }`}
          >
            Choose Astrologer ({CURATED_ASTROLOGERS.length})
          </button>
          <button
            onClick={() => setActiveTab('kundli')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'kundli'
                ? 'border-[#dfb76c] text-[#dfb76c]'
                : 'border-transparent text-[#8e8779] hover:text-[#ede8dc]'
            }`}
          >
            Your Birth Chart (Kundli)
          </button>
        </div>

        {/* Body content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {activeTab === 'astrologers' && (
            <div className="space-y-3">
              {CURATED_ASTROLOGERS.map((astro) => {
                const isSelected = astro.id === selectedAstrologer.id;
                return (
                  <div
                    key={astro.id}
                    onClick={() => onSelectAstrologer(astro)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1b1f2e] border-[#dfb76c] shadow-lg ring-1 ring-[#dfb76c]/40'
                        : 'bg-[#121520] border-[#222739] hover:border-[#38415c]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#2a2215] border border-[#dfb76c]/40 flex items-center justify-center font-display font-bold text-[#dfb76c] text-lg shrink-0">
                          {astro.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-serif-luxury font-bold text-[#f5eedf]">
                              {astro.name}
                            </h4>
                            {isSelected && (
                              <span className="flex items-center gap-1 text-[10px] text-[#dfb76c] font-semibold bg-[#dfb76c]/15 px-2 py-0.5 rounded">
                                <Check className="w-3 h-3" /> Selected
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#dfb76c]">{astro.title}</p>
                          <p className="text-xs text-[#9d9688] mt-0.5">{astro.lineage}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-[#dfb76c]">
                          ₹{astro.ratePerMinute}/min
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-[#ede8dc] mt-1 justify-end">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{astro.rating}</span>
                          <span className="text-[#787163]">({astro.totalConsultations})</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[#c4beaf] mt-3 leading-relaxed">
                      {astro.bio}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-[#202538] flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="text-[#787163]">Specializations:</span>
                      {astro.specializations.map((spec, i) => (
                        <span key={i} className="text-[#ede8dc]">
                          {spec}{i < astro.specializations.length - 1 ? ' ·' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'kundli' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-[#ded7ca]">
                <p>
                  Janma Kundli is calculated with Lahiri Ayanamsha (Chitra Paksha). Birth coordinates determine the exact Lagna and planetary degrees.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] text-[#8e8779] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={kundli.name}
                    onChange={(e) => onUpdateKundli({ name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#8e8779] block mb-1">Date of Birth</label>
                  <input
                    type="text"
                    value={kundli.dob}
                    onChange={(e) => onUpdateKundli({ dob: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#8e8779] block mb-1">Time of Birth</label>
                  <input
                    type="text"
                    value={kundli.timeOfBirth}
                    onChange={(e) => onUpdateKundli({ timeOfBirth: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#8e8779] block mb-1">Place of Birth</label>
                  <input
                    type="text"
                    value={kundli.placeOfBirth}
                    onChange={(e) => onUpdateKundli({ placeOfBirth: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#8e8779] block mb-1">Gotra</label>
                  <input
                    type="text"
                    value={kundli.gotra}
                    onChange={(e) => onUpdateKundli({ gotra: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-[#ede8dc] focus:outline-none focus:border-[#dfb76c]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#8e8779] block mb-1">Current Mahadasha</label>
                  <div className="px-3 py-2 rounded-lg bg-[#0e1017] border border-[#272d42] text-xs text-amber-200">
                    {kundli.currentMahadasha} - {kundli.currentAntardasha}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#252b3e] bg-[#151825] flex items-center justify-between">
          <div className="text-xs text-[#9d9688]">
            Consulting with: <span className="text-[#ede8dc] font-semibold">{selectedAstrologer.name}</span>
          </div>
          <button
            onClick={() => {
              onStartConsultation();
              onClose();
            }}
            className="px-6 py-2.5 rounded-lg bg-[#dfb76c] hover:bg-[#c49746] text-[#0e1017] text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer"
          >
            Confirm & Enter Conversation
          </button>
        </div>
      </div>
    </div>
  );
};
