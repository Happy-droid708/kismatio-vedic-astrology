import React from 'react';
import { MaharajGuru } from '../../data/maharajGurusData';
import { Sparkles, X, Compass, Clock, ShieldAlert, CheckCircle2, FileText, Search, Scale } from 'lucide-react';

interface GuruStructuredCardsProps {
  guru: MaharajGuru;
  isOpen: boolean;
  onClose: () => void;
  onSendQuickAction?: (text: string) => void;
}

export const GuruStructuredCards: React.FC<GuruStructuredCardsProps> = ({
  guru,
  isOpen,
  onClose,
  onSendQuickAction,
}) => {
  if (!isOpen) return null;

  const { structuredData } = guru;

  const renderIcon = () => {
    switch (structuredData.type) {
      case 'timeline':
        return <Clock className="w-4 h-4 text-[#FFD76A]" />;
      case 'vastu':
        return <Compass className="w-4 h-4 text-[#00D6A0]" />;
      case 'chart':
        return <FileText className="w-4 h-4 text-[#FFD76A]" />;
      case 'kundali':
        return <Sparkles className="w-4 h-4 text-[#E7B743]" />;
      case 'search_clues':
        return <Search className="w-4 h-4 text-[#C5B8D9]" />;
      case 'legal_case':
        return <Scale className="w-4 h-4 text-[#F7F0FF]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#E7B743]" />;
    }
  };

  return (
    <div className="w-full mb-3 rounded-2xl bg-[#24133B] border border-transparent shadow-[0_12px_36px_rgba(18,9,31,0.7),inset_0_1px_1px_rgba(247,240,255,0.06),inset_0_-1px_2px_rgba(18,9,31,0.5)] p-4 sm:p-5 relative overflow-hidden backdrop-blur-md animate-in fade-in duration-200">
      {/* Background Soft Aura */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: guru.accentColor }}
      />

      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 relative z-10 border-b border-[#453052]/30 pb-3 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#2B173C] border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.08),inset_0_-1px_2px_rgba(18,9,31,0.5)]">
            {renderIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#E7B743]/15 text-[#FFD76A] border border-transparent font-bold">
                {structuredData.badge}
              </span>
              <span className="text-xs text-[#9685AE] font-mono">
                {guru.name} Consultation Workspace
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-serif-luxury font-bold text-[#F7F0FF] mt-0.5">
              {structuredData.title}
            </h4>
            <p className="text-[11px] text-[#C5B8D9]">
              {structuredData.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#9685AE] hover:text-[#F7F0FF] hover:bg-[#352044] border border-transparent hover:border-[#A87B2A]/40 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
          title="Close workspace preview"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Structured Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 relative z-10 mb-3.5">
        {structuredData.items.map((item, idx) => {
          const statusBg =
            item.status === 'favorable'
              ? 'border-[#00D6A0]/25 bg-[#00D6A0]/10 shadow-[inset_0_1px_1px_rgba(0,214,160,0.1)]'
              : item.status === 'caution'
              ? 'border-[#E7B743]/25 bg-[#E7B743]/10 shadow-[inset_0_1px_1px_rgba(231,183,67,0.1)]'
              : 'border-transparent bg-[#2B173C] shadow-[0_4px_12px_rgba(18,9,31,0.4),inset_0_1px_1px_rgba(247,240,255,0.04),inset_0_-1px_2px_rgba(18,9,31,0.4)]';

          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border ${statusBg} flex flex-col justify-between transition-all`}
            >
              <div>
                <span className="text-[10px] font-mono text-[#9685AE] uppercase tracking-wide">
                  {item.label}
                </span>
                <div className="text-xs sm:text-sm font-semibold text-[#F7F0FF] mt-0.5 flex items-center gap-1.5">
                  {item.status === 'favorable' && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00D6A0] shrink-0" />
                  )}
                  {item.status === 'caution' && (
                    <ShieldAlert className="w-3.5 h-3.5 text-[#FFD76A] shrink-0" />
                  )}
                  <span>{item.value}</span>
                </div>
              </div>
              {item.detail && (
                <p className="text-[11px] text-[#C5B8D9] mt-1.5 leading-snug">
                  {item.detail}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Disclaimer / Regulatory Note */}
      {structuredData.disclaimer && (
        <div className="p-2.5 rounded-xl bg-[#12091F] border border-transparent shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] text-[10px] text-[#9685AE] leading-relaxed relative z-10 mb-3">
          <span className="font-semibold text-[#FFD76A]">Note: </span>
          {structuredData.disclaimer}
        </div>
      )}

      {/* Quick Action Buttons Row */}
      {onSendQuickAction && (
        <div className="flex flex-wrap items-center gap-2 relative z-10 pt-2 border-t border-[#453052]/30">
          <span className="text-[10px] text-[#9685AE] font-mono">Suggested Questions:</span>
          {guru.quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => onSendQuickAction(`Can you guide me on ${action.toLowerCase()}?`)}
              className="px-2.5 py-1 rounded-lg bg-[#2B173C] hover:bg-[#352044] border border-transparent hover:border-[#A87B2A]/40 text-[11px] text-[#C5B8D9] hover:text-[#F7F0FF] shadow-[0_2px_8px_rgba(18,9,31,0.4),inset_0_1px_1px_rgba(247,240,255,0.05)] active:scale-[0.98] transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743]"
            >
              ✦ {action}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
