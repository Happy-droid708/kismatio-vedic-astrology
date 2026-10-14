import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, Square, RotateCcw } from 'lucide-react';
import { ChatState } from '../types/astrology';
import { CelestialSendButton } from './ui/CelestialSendButton';
import { CelestialPill } from './ui/CelestialPill';

interface ChatInputProps {
  onSendMessage: (text: string, isVoice?: boolean) => void;
  currentState: ChatState;
  disabled?: boolean;
  disabledPlaceholder?: string;
  isStreaming?: boolean;
  isPillsReady?: boolean;
  onStopStreaming?: () => void;
  onRegenerate?: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  currentState,
  disabled = false,
  disabledPlaceholder,
  isStreaming = false,
  isPillsReady = true,
  onStopStreaming,
  onRegenerate,
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const getContextualSuggestions = (): { label: string; text: string; icon?: string }[] => {
    switch (currentState) {
      case 'IDLE':
      case 'STREAMING':
      case 'TYPING':
        return [
          { label: '❤️ Love', text: 'Acharya ji, when does my 7th house dasha favor marriage?' },
          { label: '💼 Career', text: 'What remedies can resolve my stalled promotion and career friction?' },
          { label: '💎 Gemstone', text: 'Which primary gemstone aligns with my Lagna and 10th bhava?' },
          { label: '🌙 Future', text: 'Can you outline my major planetary transits over the next 6 months?' },
          { label: '💰 Finance', text: 'Acharya ji, what does my 2nd and 11th house reveal about wealth and gains?' },
        ];
      case 'MESSAGE_COMPLETE':
      case 'RECOMMENDATION':
        return [
          { label: '💎 Which stone is best?', text: 'Which gemstone is best suited for my Lagna and current Mahadasha?' },
          { label: '🌙 When should I wear it?', text: 'What is the most auspicious Muhurat and sunrise hour to wear it?' },
          { label: '🧘 How should I purify it?', text: 'How should I purify and consecrate the gemstone with Vedic mantras?' },
          { label: '📦 Buy this gemstone', text: 'How do I proceed to acquire this consecrated gemstone?' },
          { label: '💼 Career timing', text: 'What is the planetary timing for career breakthroughs in my 10th house?' },
          { label: '💰 Finance', text: 'Acharya ji, what does my 2nd and 11th bhava show regarding wealth gains?' },
          { label: '🌙 Next 6 months', text: 'Can you outline my major planetary transits over the next 6 months?' },
          { label: '✦ More details', text: 'Please explain the deeper Vedic astrological reasoning behind this guidance.' },
        ];
      case 'PRODUCT_VIEW':
      case 'CHECKOUT':
        return [
          { label: '📜 IGI Certificate', text: 'Is the lab certificate verified by Govt-recognized IGI?' },
          { label: '🙏 Kashyapa Sankalp', text: 'Can I verify my Gotra recital for the Kashi Peeth ritual?' },
          { label: '🚚 Delivery Timeline', text: 'How many days does consecrated armored delivery take?' },
        ];
      case 'ORDER_CONFIRMED':
      case 'CONVERSATION_CONTINUES':
        return [
          { label: '🥗 Dietary Rules', text: 'Acharya ji, what food or habits should I avoid after wearing Pukhraj?' },
          { label: '💑 Partner Compatibility', text: 'Can you also examine my partner’s chart compatibility?' },
          { label: '⚡ Manifestation Period', text: 'How soon will the positive planetary resonance manifest?' },
        ];
      case 'LOW_TIME':
      case 'RECHARGE':
        return [
          { label: '⏱️ +15 Min Extension', text: 'I want to recharge 15 minutes to continue our discussion' },
          { label: '⏱️ +30 Min Full Session', text: 'Please extend our session by 30 minutes' },
        ];
      default:
        return [
          { label: '💼 Career Karma', text: 'Explain the Vedic Graha alignment in my 10th house' },
          { label: '⭐ Auspicious Days', text: 'What are the auspicious hours for this week?' },
        ];
    }
  };

  // Quick reply pills (Section 7)
  const getQuickReplies = (): { label: string; text: string }[] => {
    switch (currentState) {
      case 'RECOMMENDATION':
      case 'MESSAGE_COMPLETE':
        return [
          { label: 'Tell me more', text: 'Please tell me more about how this gemstone works.' },
          { label: 'Explain this', text: 'Could you explain the planetary transit impact in detail?' },
          { label: 'Continue', text: 'Yes, please continue with the remedy recommendation.' },
        ];
      case 'PRODUCT_VIEW':
        return [
          { label: 'Yes, proceed', text: 'Yes, let us proceed to the next step for consecrated delivery.' },
          { label: 'Explain Muhurat', text: 'Can you explain the wearing muhurat and puja vidhi?' },
        ];
      default:
        return [];
    }
  };

  const suggestions = getContextualSuggestions();
  const quickReplies = getQuickReplies();

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || disabled || isStreaming) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleSelectSuggestion = (text: string) => {
    onSendMessage(text);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      // Finish recording and send voice note
      setIsRecording(false);
      onSendMessage(
        '[Voice Note] Acharya ji, please guide me through the morning Pooja protocol for the gemstone.',
        true
      );
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="w-full bg-[#180D2B]/95 border-t border-[#453052] px-3 sm:px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md z-30 select-none">
      {/* Quick Reply Pills & Regenerate (Section 15, 16, 19, Requirement 9: only after morph settles) */}
      {(quickReplies.length > 0 || (onRegenerate && !isStreaming && currentState === 'MESSAGE_COMPLETE')) &&
        !disabled &&
        isPillsReady && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none -mx-1 px-1 mb-1 animate-in fade-in duration-300">
          <span className="text-[10px] text-[#E7B743] font-semibold shrink-0 pl-1 flex items-center gap-1">
            <span>✦</span>
            <span>Quick:</span>
          </span>

          {/* Regenerate Action Pill (Section 19) */}
          {onRegenerate && !isStreaming && currentState === 'MESSAGE_COMPLETE' && (
            <button
              type="button"
              onClick={onRegenerate}
              className="text-[11px] py-1 px-2.5 min-h-[30px] rounded-full border border-[#A87B2A]/50 text-[#E7B743] hover:bg-[#352044] hover:border-[#E7B743] active:scale-95 transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
              title="Regenerate last response"
            >
              <RotateCcw className="w-3 h-3 stroke-[2.2]" />
              <span>Regenerate</span>
            </button>
          )}

          {/* Contextual Pills with 50ms stagger animation (Section 16) */}
          {quickReplies.map((qr, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 50}ms` }}
              className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both"
            >
              <CelestialPill
                variant="quick-reply"
                onSelectAction={() => handleSelectSuggestion(qr.text)}
                disabled={disabled || isStreaming}
                className="text-[11px] py-1 px-3 min-h-[30px] border-[#453052] text-[#F7F0FF] bg-[#2B173C] hover:bg-[#352044]"
              >
                {qr.label}
              </CelestialPill>
            </div>
          ))}
        </div>
      )}

      {/* Celestial Chat Prompt Pills (Section 15, 16, Requirement 9: only after morph settles) */}
      {isPillsReady && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1 animate-in fade-in duration-300">
          <span className="text-[10px] text-[#9685AE] flex items-center gap-1 shrink-0 font-medium pl-1">
            <Sparkles className="w-3 h-3 text-[#E7B743]" />
            <span className="hidden sm:inline">Prompts:</span>
          </span>
          {suggestions.map((sug, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 50}ms` }}
              className="animate-in fade-in slide-in-from-bottom-1 fill-mode-both"
            >
              <CelestialPill
                variant="prompt"
                onSelectAction={() => handleSelectSuggestion(sug.text)}
                disabled={disabled || isStreaming}
                className="text-[11px] py-1 px-3 min-h-[32px]"
              >
                {sug.label}
              </CelestialPill>
            </div>
          ))}
        </div>
      )}

      {/* Input Bar or Active Voice Recording Bar */}
      {isRecording ? (
        <div className="flex items-center justify-between gap-3 p-2 rounded-2xl bg-[#2B173C] border border-[#453052] text-xs text-[#F7F0FF] animate-in fade-in">
          <div className="flex items-center gap-2 pl-2">
            <span className="w-3 h-3 rounded-full bg-[#E7B743] animate-ping" />
            <span className="font-semibold text-[#E7B743]">Recording Voice Note...</span>
            <span className="font-mono text-[#F7F0FF] font-bold ml-1">
              0:0{recordSeconds}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRecording(false)}
              className="text-xs text-[#9685AE] hover:text-[#F7F0FF] px-2 py-1 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleToggleRecording}
              className="px-3 py-1.5 rounded-xl bg-[#E7B743] hover:bg-[#FFD76A] text-[#180D2B] font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>Send Voice</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={disabled || isStreaming}
              placeholder={
                disabled && disabledPlaceholder
                  ? disabledPlaceholder
                  : isStreaming
                  ? 'Transmitting live revelation...'
                  : disabled
                  ? 'Acharya meditating on query...'
                  : 'Ask your astrologer anything...'
              }
              className="w-full pl-4 pr-12 py-2.5 sm:py-3 rounded-2xl bg-[#12091F] border border-[#453052] text-xs sm:text-sm text-[#F7F0FF] placeholder-[#9685AE] focus:outline-none focus:border-[#E7B743] transition-colors disabled:opacity-60 min-h-[44px]"
            />

            {/* Voice recording button inside input */}
            <button
              type="button"
              onClick={handleToggleRecording}
              disabled={disabled || isStreaming}
              className="absolute right-1.5 p-2 rounded-xl text-[#9685AE] hover:text-[#E7B743] hover:bg-[#352044] transition-all cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center disabled:opacity-40"
              title="Record voice note for Acharya"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Stop Button when streaming (Section 18) OR Celestial Send Button */}
          {isStreaming ? (
            <button
              type="button"
              onClick={onStopStreaming}
              className="h-10 sm:h-11 px-3 sm:px-4 rounded-2xl bg-[#2B173C] hover:bg-[#352044] border border-[#A87B2A]/60 text-[#F7F0FF] text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-lg shadow-black/40 cursor-pointer active:scale-95 transition-all shrink-0 animate-in fade-in"
              title="Stop generating"
            >
              <Square className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#E7B743] text-[#E7B743]" />
              <span>Stop</span>
            </button>
          ) : (
            <CelestialSendButton
              onClick={() => handleSend()}
              disabled={!inputText.trim() || disabled}
              title={disabled ? 'Transmitting insights...' : 'Send message to Acharya'}
            />
          )}
        </form>
      )}
    </div>
  );
};
