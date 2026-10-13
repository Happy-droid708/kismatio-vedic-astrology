import React from 'react';
import { MaharajGuru } from '../../data/maharajGurusData';
import { MessageSquare, Sparkles } from 'lucide-react';

interface GuruEmptyStateProps {
  guru: MaharajGuru;
  onSendSuggestedPrompt: (text: string) => void;
  onOpenWorkspace?: () => void;
}

export const GuruEmptyState: React.FC<GuruEmptyStateProps> = ({
  guru,
  onSendSuggestedPrompt,
  onOpenWorkspace,
}) => {
  const isFlagship = guru.badge === 'flagship';

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-6 sm:py-10 px-4 text-center select-none relative z-10 my-auto animate-in fade-in duration-300">
      {/* Central Guru Emblem with Personalized Radial Glow */}
      <div className="relative mb-4 sm:mb-6">
        <div
          className="w-20 h-20 sm:w-26 sm:h-26 rounded-3xl p-1 shadow-2xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${guru.accentColor}, #dfb76c, #0c0d15)`,
          }}
        >
          <div className="w-full h-full rounded-[22px] bg-[#0e101a] flex items-center justify-center relative overflow-hidden backdrop-blur-md">
            <span className="text-4xl sm:text-5xl select-none animate-pulse">
              {guru.symbol}
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Small subtle badge */}
        <div className="absolute -bottom-2 inset-x-0 flex justify-center">
          <span
            className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm backdrop-blur-md"
            style={{
              backgroundColor: '#121524',
              borderColor: guru.accentColor,
              color: guru.accentColor,
            }}
          >
            {isFlagship ? '✦ FLAGSHIP KUNDALI' : `GURU ${guru.num} · ${guru.name}`}
          </span>
        </div>
      </div>

      {/* Guru Welcome Message (exact required text per Guru) */}
      <h2 className="text-lg sm:text-2xl font-serif-luxury font-bold text-[#f5eedf] max-w-lg leading-snug mt-2">
        "{guru.welcomeMessage}"
      </h2>

      {/* Specialization Description */}
      <p className="text-xs sm:text-sm text-[#a8a192] mt-2 max-w-md leading-relaxed">
        {guru.shortDescription}
      </p>

      {/* Suggested Quick Action Prompts */}
      <div className="mt-6 w-full max-w-lg flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] text-[#8e8779] font-medium uppercase tracking-wider font-mono">
            Suggested Consultations:
          </span>
          {onOpenWorkspace && (
            <button
              onClick={onOpenWorkspace}
              className="text-[11px] text-[#dfb76c] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Open Tools</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {guru.quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => onSendSuggestedPrompt(`Pranam ${guru.name}. I would like guidance regarding ${action.toLowerCase()}.`)}
              className="px-3.5 py-2.5 rounded-xl bg-[#141829]/90 hover:bg-[#1f2640] border border-[#262e46] hover:border-[#dfb76c]/50 text-left text-xs text-[#cdc7ba] hover:text-[#ede8dc] transition-all cursor-pointer shadow-md flex items-center gap-2.5 group"
            >
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-xs"
                style={{ backgroundColor: `${guru.accentColor}20`, color: guru.accentColor }}
              >
                ✦
              </div>
              <span className="truncate font-medium">{action}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
