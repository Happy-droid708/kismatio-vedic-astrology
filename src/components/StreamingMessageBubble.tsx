import React from 'react';
import { Astrologer } from '../types/astrology';
import { StreamWord, LoaderPhase, MorphStage, CelestialSequence } from '../hooks/useChatStream';
import { Square, AlertCircle, RotateCcw } from 'lucide-react';

interface StreamingMessageBubbleProps {
  astrologer: Astrologer;
  isThinking: boolean;
  loaderPhase?: LoaderPhase;
  morphStage?: MorphStage;
  thinkingStatus: string;
  activeSequence?: CelestialSequence;
  words?: StreamWord[];
  streamedText: string;
  error?: string | null;
  isCompleted?: boolean;
  onStop?: () => void;
  onRetry?: () => void;
}

export const StreamingMessageBubble: React.FC<StreamingMessageBubbleProps> = ({
  astrologer,
  isThinking,
  loaderPhase = 'thinking',
  morphStage = 'idle',
  thinkingStatus,
  activeSequence,
  words = [],
  streamedText = '',
  error,
  isCompleted = false,
  onStop,
  onRetry,
}) => {
  // Progressive Markdown & Rich Content Renderer (Section 13)
  // Formats text naturally as the stream reaches headings, bold tags, bullet points & paragraphs
  const renderProgressiveMarkdown = (raw: string) => {
    if (!raw) return null;

    const paragraphs = raw.split(/\n\n+/);
    const isCurrentlyActiveStream = !error && !isCompleted && loaderPhase === 'streaming';

    return (
      <div className="font-sans leading-relaxed space-y-2.5 relative">
        {paragraphs.map((para, pIdx) => {
          const isLastParagraph = pIdx === paragraphs.length - 1;
          const trimmed = para.trim();

          // Check if this paragraph is a heading (###)
          if (trimmed.startsWith('###')) {
            const headingText = trimmed.replace(/^###\s*/, '');
            return (
              <h4
                key={pIdx}
                className="font-display font-semibold text-[#fcedc5] text-sm sm:text-[15px] tracking-wide flex items-center gap-1.5 pt-1 text-gold-glow"
              >
                <span className="text-xs text-[#dfb76c]">✦</span>
                <span>{renderInlineFormatting(headingText)}</span>
                {isLastParagraph && isCurrentlyActiveStream && renderTrailingCursor()}
              </h4>
            );
          }

          // Check if line is bullet list
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
            const bulletItems = para.split('\n').filter(Boolean);
            return (
              <ul key={pIdx} className="space-y-1.5 pl-1 my-1">
                {bulletItems.map((item, bIdx) => {
                  const cleanItem = item.replace(/^[-*•]\s*/, '');
                  const isLastBullet = isLastParagraph && bIdx === bulletItems.length - 1;
                  return (
                    <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-[14px] text-[#f5eedf]">
                      <span className="text-[#dfb76c] text-[10px] mt-1 shrink-0">◇</span>
                      <span>
                        {renderInlineFormatting(cleanItem)}
                        {isLastBullet && isCurrentlyActiveStream && renderTrailingCursor()}
                      </span>
                    </li>
                  );
                })}
              </ul>
            );
          }

          // Standard conversational paragraph
          return (
            <p key={pIdx} className="text-xs sm:text-[14.5px] text-[#f5eedf] leading-relaxed">
              {renderInlineFormatting(para)}
              {isLastParagraph && isCurrentlyActiveStream && renderTrailingCursor()}
            </p>
          );
        })}

        {/* Final Completion Spark (Section 14) */}
        {morphStage === 'spark' && (
          <span
            className="animate-final-spark ml-1.5 text-[#fef08a] font-bold text-sm select-none inline-block align-middle"
            title="Vedic revelation complete"
          >
            ✦
          </span>
        )}
      </div>
    );
  };

  // Safe inline formatter for **bold** text during progressive generation
  const renderInlineFormatting = (text: string) => {
    // If double asterisks are present, split and toggle bold
    if (!text.includes('**')) return text;

    const parts = text.split('**');
    return parts.map((part, index) => {
      // Odd indices are between ** **
      if (index % 2 === 1) {
        return (
          <strong key={index} className="font-semibold text-[#fcedc5] text-gold-glow">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  // Subtle pulsing active cursor + gemstone accent (Sections 7 & 8)
  const renderTrailingCursor = () => {
    return (
      <span className="inline-flex items-center align-baseline select-none ml-0.5">
        <span
          className="animate-soft-cursor text-[#dfb76c] font-bold text-xs sm:text-sm"
          title="Streaming celestial response"
        >
          ▌
        </span>
        <span
          className="animate-gemstone-shimmer-subtle text-[#dfb76c]/70 text-[10px] sm:text-xs ml-1"
          title="Planetary resonance"
        >
          ✦
        </span>
      </span>
    );
  };

  // Render Kismatio Celestial Stream Loader Objects (Sections 3 & 8)
  // Calm, slow, mystical floating gemstones, diamonds, rudraksha, Om symbol, planetary orbit
  const renderCelestialStreamLoader = () => {
    const objects = activeSequence?.objects || [
      { symbol: '📿', label: 'Sacred Rudraksha', type: 'rudraksha' },
      { symbol: '◆', label: 'Vajra Diamond', type: 'diamond' },
      { symbol: '💎', label: 'Ceylon Gem', type: 'gem' },
      { symbol: 'ॐ', label: 'Pranav Om', type: 'spiritual' },
      { symbol: '🪐', label: 'Brihaspati Planet', type: 'planet' },
    ];

    return (
      <div className="flex flex-col gap-2.5 py-1.5 animate-in fade-in duration-500">
        {/* Stream of moving celestial objects */}
        <div className="flex items-center gap-3.5 sm:gap-4.5 px-1 py-1">
          {objects.map((obj, idx) => {
            const delayMs = idx * 280;

            if (obj.type === 'rudraksha') {
              return (
                <div
                  key={idx}
                  style={{ animationDelay: `${delayMs}ms` }}
                  className="animate-rudraksha-float text-amber-500 text-sm sm:text-base select-none"
                  title={obj.label}
                >
                  📿
                </div>
              );
            }

            if (obj.type === 'diamond') {
              return (
                <div
                  key={idx}
                  style={{ animationDelay: `${delayMs}ms` }}
                  className="animate-diamond-stream text-[#dfb76c] text-sm sm:text-base select-none"
                  title={obj.label}
                >
                  {obj.symbol}
                </div>
              );
            }

            if (obj.symbol === 'ॐ') {
              return (
                <div
                  key={idx}
                  style={{ animationDelay: `${delayMs}ms` }}
                  className="animate-om-sacred text-[#fcedc5] text-base sm:text-lg select-none"
                  title={obj.label}
                >
                  ॐ
                </div>
              );
            }

            if (obj.type === 'planet') {
              return (
                <div
                  key={idx}
                  style={{ animationDelay: `${delayMs}ms` }}
                  className="animate-planet-orbit text-[#d8b4fe] text-sm sm:text-base select-none"
                  title={obj.label}
                >
                  {obj.symbol}
                </div>
              );
            }

            return (
              <div
                key={idx}
                style={{ animationDelay: `${delayMs}ms` }}
                className="animate-celestial-obj text-[#dfb76c] text-sm sm:text-base select-none"
                title={obj.label}
              >
                {obj.symbol}
              </div>
            );
          })}
        </div>

        {/* Gemstone letter streaming simulation effect & status caption */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#dfb76c]/90 font-serif-luxury italic">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-pulse" />
          <span>{thinkingStatus || '✦ Channeling planetary transits & Vedic guidance...'}</span>
        </div>
      </div>
    );
  };

  const isInitialThinking = isThinking && loaderPhase === 'thinking' && !streamedText;
  const isCelestialLoading = isThinking && loaderPhase === 'celestial_stream' && !streamedText;
  const isTransitioning = loaderPhase === 'transitioning';
  const hasStreamedContent = Boolean(streamedText && streamedText.length > 0);

  // Dissolving symbols around the message container during completion moment
  const renderDissolvingSymbols = () => {
    if (morphStage !== 'moment' && morphStage !== 'settling') return null;

    const objects = activeSequence?.objects || [
      { symbol: '◆', label: 'Vajra Diamond', type: 'diamond' },
      { symbol: '💎', label: 'Ceylon Gem', type: 'gem' },
      { symbol: '✦', label: 'Graha Sparkle', type: 'star' },
    ];

    const offsets = [
      { dx: '10px', dy: '-8px', top: '-8px', right: '14px' },
      { dx: '-8px', dy: '-6px', top: '-6px', left: '20px' },
      { dx: '10px', dy: '6px', bottom: '-6px', right: '30px' },
      { dx: '-6px', dy: '8px', bottom: '-8px', left: '40px' },
    ];

    return (
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {objects.slice(0, 4).map((obj, i) => {
          const pos = offsets[i % offsets.length];
          return (
            <span
              key={i}
              style={
                {
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                  '--dx': pos.dx,
                  '--dy': pos.dy,
                } as React.CSSProperties
              }
              className="animate-symbol-dissolve text-[#dfb76c] text-xs select-none"
            >
              {obj.symbol}
            </span>
          );
        })}
      </div>
    );
  };

  // Determine container styling based on morph stage & transition
  const getContainerClasses = () => {
    const base =
      'p-3.5 sm:p-4 rounded-2xl text-xs sm:text-[14.5px] leading-relaxed whitespace-pre-line break-words [overflow-wrap:anywhere] rounded-tl-xs shadow-xl shadow-black/30 min-h-[58px] celestial-morph-transition relative overflow-visible';

    if (isTransitioning) {
      return `${base} bg-[#121420]/96 border border-[#dfb76c]/40 text-[#f5eedf] animate-thinking-exit`;
    }

    if (morphStage === 'moment') {
      return `${base} bg-[#141726]/96 border border-[#dfb76c]/60 text-[#fff9eb] animate-celestial-moment`;
    }
    if (morphStage === 'settling') {
      return `${base} bg-[#121420]/96 border border-[#dfb76c]/35 text-[#f5eedf] animate-bubble-settle`;
    }
    if (morphStage === 'spark' || morphStage === 'settled') {
      return `${base} bg-[#121420]/96 border border-[#dfb76c]/30 text-[#f5eedf]`;
    }

    if (hasStreamedContent) {
      return `${base} bg-[#121420]/96 border border-[#dfb76c]/35 text-[#f5eedf] animate-streaming-appear`;
    }

    return `${base} bg-[#121420]/96 border border-[#dfb76c]/40 text-[#f5eedf]`;
  };

  return (
    <div className="flex w-full mb-3.5 justify-start select-text transition-all duration-300">
      <div className="flex gap-2 w-full max-w-[92%] sm:max-w-[640px] flex-row">
        {/* Astrologer Avatar with live aura */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#996e28] to-[#dfb76c] p-0.5 shrink-0 mt-0.5 shadow-sm">
          <div className="w-full h-full rounded-full bg-[#161824] flex items-center justify-center font-display text-[11px] font-bold text-[#dfb76c]">
            {astrologer.name.charAt(0)}
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          {/* Astrologer Name & Transmitting/Verified Status Header */}
          <div className="flex items-center justify-between gap-1.5 mb-1 text-[10px] text-[#8e8779]">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#cdc7ba]">{astrologer.name}</span>
              <span aria-hidden="true">·</span>
              {!error ? (
                <span
                  className={`font-medium flex items-center gap-1 transition-colors duration-300 ${
                    morphStage === 'settled' || morphStage === 'spark'
                      ? 'text-[#dfb76c]'
                      : 'text-[#dfb76c]'
                  }`}
                >
                  {morphStage === 'settled' || morphStage === 'spark' ? (
                    <>
                      <span className="text-xs">✦</span>
                      <span>Vedic Reading Verified</span>
                    </>
                  ) : morphStage === 'moment' || morphStage === 'settling' ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                      <span>Completing revelation...</span>
                    </>
                  ) : hasStreamedContent ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Transmitting live revelation...</span>
                    </>
                  ) : isTransitioning ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] animate-pulse" />
                      <span>Awakening celestial revelation...</span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
                      <span>
                        {isCelestialLoading
                          ? 'Synthesizing Graha alignment...'
                          : 'Consulting Janma Kundli...'}
                      </span>
                    </>
                  )}
                </span>
              ) : (
                <span className="text-amber-400 font-medium flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5 text-amber-400" />
                  <span>Response interrupted</span>
                </span>
              )}
            </div>

            {/* In-bubble Stop action (Section 9 & 18) */}
            {onStop && !error && !isCompleted && loaderPhase === 'streaming' && (
              <button
                type="button"
                onClick={onStop}
                className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#241a1a] hover:bg-[#382020] text-red-300 hover:text-red-200 border border-red-500/30 text-[10px] cursor-pointer transition-colors active:scale-95"
                title="Stop streaming"
              >
                <Square className="w-2.5 h-2.5 fill-current" />
                <span>Stop</span>
              </button>
            )}
          </div>

          {/* Main Streaming Bubble Container */}
          <div className={getContainerClasses()}>
            {/* Celestial Symbol Dissolve Particles around the message */}
            {renderDissolvingSymbols()}

            {/* 1. Initial Thinking State with calm celestial breathing animation (Section 2 & 3) */}
            {isInitialThinking && !error && (
              <div className="flex items-center gap-2.5 text-[#dfb76c]/90 py-1 font-serif-luxury italic animate-celestial-thinking">
                <span className="text-sm font-bold text-[#dfb76c]">✦</span>
                <span className="text-xs sm:text-sm">{thinkingStatus || '✦ Consulting your Janma Kundli...'}</span>
              </div>
            )}

            {/* 2. Celestial Stream Loader with slow, mystical astrology objects (Section 3 & 8) */}
            {isCelestialLoading && !error && renderCelestialStreamLoader()}

            {/* 3. Transitioning state placeholder */}
            {isTransitioning && !hasStreamedContent && (
              <div className="flex items-center gap-2 text-[#dfb76c]/80 py-1 font-serif-luxury italic text-xs">
                <span className="text-xs">✦</span>
                <span>Synthesizing Vedic wisdom...</span>
              </div>
            )}

            {/* 4. Progressive Streaming Markdown Content (Sections 1, 5, 6, 7, 8, 13) */}
            {hasStreamedContent && renderProgressiveMarkdown(streamedText)}

            {/* 5. Error Interruption State */}
            {error && (
              <div className="mt-3 pt-2.5 border-t border-amber-500/20 text-xs animate-in fade-in">
                <div className="flex items-center gap-1.5 text-amber-300 font-medium mb-2">
                  <span>✦</span>
                  <span>Something interrupted the reading.</span>
                </div>
                {onRetry && (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#dfb76c] hover:bg-[#fcedc5] text-[#0e1017] font-semibold text-xs transition-transform active:scale-95 shadow-md cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 stroke-[2.5]" />
                    <span>Try Again</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
