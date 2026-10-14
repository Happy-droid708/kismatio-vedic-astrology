import React from 'react';
import { MAHARAJ_GURUS, MaharajGuru } from '../../data/maharajGurusData';

interface GuruSelectorProps {
  activeGuru: MaharajGuru | null;
  onSelectGuru: (guru: MaharajGuru) => void;
  onOpenProfile?: (guru: MaharajGuru) => void;
  isCollapsed?: boolean;
}

export const GuruSelector: React.FC<GuruSelectorProps> = ({
  activeGuru,
  onSelectGuru,
  onOpenProfile,
  isCollapsed = false,
}) => {
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-2 py-2 w-full">
        {MAHARAJ_GURUS.map((guru) => {
          const isSelected = activeGuru?.id === guru.id;
          return (
            <div key={guru.id} className="relative group">
              <button
                onClick={() => onSelectGuru(guru)}
                className={`relative p-0.5 rounded-full transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] ${
                  isSelected
                    ? 'ring-2 ring-[#E7B743] shadow-[0_0_12px_rgba(231,183,67,0.4)]'
                    : 'hover:ring-1 hover:ring-[#E7B743]/50 opacity-80 hover:opacity-100'
                }`}
                title={`${guru.name} — ${guru.title}`}
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#24133B] flex items-center justify-center">
                  {guru.avatarUrl ? (
                    <img
                      src={guru.avatarUrl}
                      alt={guru.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-xs text-[#E7B743] font-bold">{guru.symbol}</span>
                  )}
                </div>
                {isSelected && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00D6A0] border-2 border-[#180D2B]" />
                )}
              </button>

              {onOpenProfile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProfile(guru);
                  }}
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#180D2B] border border-[#E7B743]/60 text-[#E7B743] flex items-center justify-center text-[8px] font-bold shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title={`View ${guru.name}'s Profile`}
                >
                  i
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex items-center justify-between px-3 pt-1">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#9685AE] font-semibold">
          The Eight Maharajs
        </span>
        <span className="text-[10px] font-mono text-[#E7B743] bg-[#24133B] px-1.5 py-0.5 rounded-full border border-transparent shadow-[inset_0_1px_1px_rgba(247,240,255,0.04)]">
          8 Gurus
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1.5 px-2 py-1">
        {MAHARAJ_GURUS.map((guru) => {
          const isSelected = activeGuru?.id === guru.id;
          return (
            <div key={guru.id} className="relative group flex flex-col items-center">
              <button
                onClick={() => onSelectGuru(guru)}
                className={`guru-selector-item w-full flex flex-col items-center p-1.5 rounded-xl border border-transparent transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#E7B743] ${
                  isSelected
                    ? 'guru-selector-selected bg-[#2B173C] shadow-[0_4px_12px_rgba(18,9,31,0.5),inset_0_1px_1px_rgba(255,215,106,0.3)] ring-1 ring-[#E7B743]'
                    : 'hover:bg-[#352044] hover:border-[#A87B2A]/30 opacity-80 hover:opacity-100'
                }`}
                title={`${guru.name} · ${guru.title}`}
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#24133B] p-0.5 shadow-xs mb-1">
                  <div
                    className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${
                      isSelected ? 'ring-1 ring-[#E7B743]' : ''
                    }`}
                  >
                    {guru.avatarUrl ? (
                      <img
                        src={guru.avatarUrl}
                        alt={guru.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-xs text-[#E7B743]">{guru.symbol}</span>
                    )}
                  </div>
                  {isSelected && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00D6A0] border-2 border-[#24133B]" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-serif-luxury font-bold truncate max-w-full leading-tight ${
                    isSelected ? 'text-[#FFD76A]' : 'text-[#C5B8D9] group-hover:text-[#F7F0FF]'
                  }`}
                >
                  {guru.name}
                </span>
              </button>

              {onOpenProfile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProfile(guru);
                  }}
                  className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#180D2B] border border-[#E7B743]/60 text-[#E7B743] hover:text-[#FFD76A] hover:bg-[#352044] flex items-center justify-center text-[9px] font-bold shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title={`View ${guru.name}'s Profile`}
                  aria-label={`View ${guru.name}'s Profile`}
                >
                  i
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
