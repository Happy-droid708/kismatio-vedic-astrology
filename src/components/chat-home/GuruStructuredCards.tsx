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
        return <Clock className="w-4 h-4 text-[#06b6d4]" />;
      case 'vastu':
        return <Compass className="w-4 h-4 text-[#10b981]" />;
      case 'chart':
        return <FileText className="w-4 h-4 text-[#818cf8]" />;
      case 'kundali':
        return <Sparkles className="w-4 h-4 text-[#dfb76c]" />;
      case 'search_clues':
        return <Search className="w-4 h-4 text-[#38bdf8]" />;
      case 'legal_case':
        return <Scale className="w-4 h-4 text-[#e2e8f0]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#dfb76c]" />;
    }
  };

  return (
    <div className="w-full mb-3 rounded-2xl bg-[#111422]/95 border border-[#dfb76c]/30 shadow-2xl p-4 sm:p-5 relative overflow-hidden backdrop-blur-md animate-in fade-in duration-200">
      {/* Background Soft Aura */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: guru.accentColor }}
      />

      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 relative z-10 border-b border-[#252b42] pb-3 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#171b2d] border border-[#2e3754]">
            {renderIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#dfb76c]/15 text-[#dfb76c] border border-[#dfb76c]/25 font-bold">
                {structuredData.badge}
              </span>
              <span className="text-xs text-[#8e8779] font-mono">
                {guru.name} Consultation Workspace
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-serif-luxury font-bold text-[#f5eedf] mt-0.5">
              {structuredData.title}
            </h4>
            <p className="text-[11px] text-[#9f988b]">
              {structuredData.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#8a8374] hover:text-[#ede8dc] hover:bg-[#1a1f33] transition-colors cursor-pointer"
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
              ? 'border-emerald-500/30 bg-emerald-950/20'
              : item.status === 'caution'
              ? 'border-amber-500/30 bg-amber-950/20'
              : 'border-[#272f48] bg-[#141829]/80';

          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border ${statusBg} flex flex-col justify-between transition-all`}
            >
              <div>
                <span className="text-[10px] font-mono text-[#8a8374] uppercase tracking-wide">
                  {item.label}
                </span>
                <div className="text-xs sm:text-sm font-semibold text-[#ede8dc] mt-0.5 flex items-center gap-1.5">
                  {item.status === 'favorable' && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  )}
                  {item.status === 'caution' && (
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                  <span>{item.value}</span>
                </div>
              </div>
              {item.detail && (
                <p className="text-[11px] text-[#a49d8f] mt-1.5 leading-snug">
                  {item.detail}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Disclaimer / Regulatory Note */}
      {structuredData.disclaimer && (
        <div className="p-2.5 rounded-xl bg-[#0e101b] border border-[#23293e] text-[10px] text-[#857f72] leading-relaxed relative z-10 mb-3">
          <span className="font-semibold text-[#a8a192]">Note: </span>
          {structuredData.disclaimer}
        </div>
      )}

      {/* Quick Action Buttons Row */}
      {onSendQuickAction && (
        <div className="flex flex-wrap items-center gap-2 relative z-10 pt-2 border-t border-[#23293e]">
          <span className="text-[10px] text-[#7d7768] font-mono">Suggested Questions:</span>
          {guru.quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => onSendQuickAction(`Can you guide me on ${action.toLowerCase()}?`)}
              className="px-2.5 py-1 rounded-lg bg-[#181d30] hover:bg-[#252c48] border border-[#2e3752] hover:border-[#dfb76c]/40 text-[11px] text-[#cdc7ba] hover:text-[#ede8dc] transition-all cursor-pointer"
            >
              ✦ {action}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
