import { useState, useRef, useCallback, useEffect } from 'react';
import { Astrologer, KundliData } from '../types/astrology';

export interface StreamWord {
  id: string;
  text: string;
  isNew: boolean;
}

export type LoaderPhase =
  | 'idle'
  | 'thinking'
  | 'celestial_stream'
  | 'transitioning'
  | 'streaming'
  | 'completing'
  | 'complete';

export type MorphStage = 'idle' | 'transitioning' | 'moment' | 'settling' | 'spark' | 'settled';

export interface CelestialObjectItem {
  symbol: string;
  label: string;
  type: 'diamond' | 'gem' | 'planet' | 'spiritual' | 'star' | 'rudraksha';
}

export interface CelestialSequence {
  id: string;
  name: string;
  objects: CelestialObjectItem[];
}

export const CELESTIAL_SEQUENCES: CelestialSequence[] = [
  {
    id: 'seq-a',
    name: 'Navratna & Rudraksha Alignment',
    objects: [
      { symbol: '📿', label: 'Sacred Rudraksha', type: 'rudraksha' },
      { symbol: '◆', label: 'Vajra Diamond', type: 'diamond' },
      { symbol: '💎', label: 'Ceylon Gem', type: 'gem' },
      { symbol: '✦', label: 'Graha Sparkle', type: 'star' },
      { symbol: '🪐', label: 'Brihaspati Planet', type: 'planet' },
    ],
  },
  {
    id: 'seq-b',
    name: 'Sacred Pranava & Jyoti',
    objects: [
      { symbol: '✦', label: 'Celestial Jyoti', type: 'spiritual' },
      { symbol: 'ॐ', label: 'Sacred Om', type: 'spiritual' },
      { symbol: '📿', label: 'Kashi Rudraksha', type: 'rudraksha' },
      { symbol: '◇', label: 'Chitra Diamond', type: 'diamond' },
      { symbol: '☾', label: 'Chandra Moon', type: 'planet' },
    ],
  },
  {
    id: 'seq-c',
    name: 'Chandra Ratna & Soma',
    objects: [
      { symbol: '💎', label: 'Pukhraj Sapphire', type: 'gem' },
      { symbol: '◆', label: 'Vajra Shimmer', type: 'diamond' },
      { symbol: '🌙', label: 'Soma Moon', type: 'planet' },
      { symbol: '📿', label: 'Panchamukhi Rudraksha', type: 'rudraksha' },
      { symbol: '✦', label: 'Nakshatra Star', type: 'star' },
    ],
  },
  {
    id: 'seq-d',
    name: 'Surya Graha & Ratna',
    objects: [
      { symbol: '🪐', label: 'Shani Saturn', type: 'planet' },
      { symbol: '✦', label: 'Surya Tejas', type: 'star' },
      { symbol: '💎', label: 'Marakata Emerald', type: 'gem' },
      { symbol: '📿', label: 'Shiva Rudraksha', type: 'rudraksha' },
      { symbol: '☼', label: 'Surya Sun', type: 'planet' },
    ],
  },
  {
    id: 'seq-e',
    name: 'Vedic Sanctum Sanctorum',
    objects: [
      { symbol: '◆', label: 'Diamond Light', type: 'diamond' },
      { symbol: 'ॐ', label: 'Pranav Om', type: 'spiritual' },
      { symbol: '💎', label: 'Manikya Ruby', type: 'gem' },
      { symbol: '📿', label: 'Deva Mala', type: 'rudraksha' },
      { symbol: '🪐', label: 'Guru Planet', type: 'planet' },
    ],
  },
  {
    id: 'seq-f',
    name: 'Agamic Jyotish Mandala',
    objects: [
      { symbol: '◇', label: 'Diamond Ray', type: 'diamond' },
      { symbol: '✦', label: 'Sankalpa Sparkle', type: 'spiritual' },
      { symbol: '🌙', label: 'Moon Crescent', type: 'planet' },
      { symbol: 'ॐ', label: 'Sacred Mantra', type: 'spiritual' },
      { symbol: '💎', label: 'Neelam Sapphire', type: 'gem' },
    ],
  },
];

export interface UseChatStreamOptions {
  onFinish?: (fullText: string) => void;
  onError?: (err: Error) => void;
}

export const useChatStream = (options?: UseChatStreamOptions) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [loaderPhase, setLoaderPhase] = useState<LoaderPhase>('idle');
  const [morphStage, setMorphStage] = useState<MorphStage>('idle');
  const [isPillsReady, setIsPillsReady] = useState(false);
  const [thinkingStatus, setThinkingStatus] = useState<string>('✦ Reading your chart...');
  const [streamedText, setStreamedText] = useState<string>('');
  const [words, setWords] = useState<StreamWord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [activeSequence, setActiveSequence] = useState<CelestialSequence>(CELESTIAL_SEQUENCES[0]);

  const abortControllerRef = useRef<AbortController | null>(null);
  const incomingBufferRef = useRef<string>('');
  const displayedTextRef = useRef<string>('');
  const networkDoneRef = useRef<boolean>(false);
  const finalFullTextRef = useRef<string>('');
  const wordCounterRef = useRef<number>(0);

  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const streamingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const morphTimersRef = useRef<NodeJS.Timeout[]>([]);

  const lastParamsRef = useRef<{
    message: string;
    astrologer?: Astrologer;
    kundli?: KundliData;
    history?: Array<{ sender: string; text?: string }>;
  } | null>(null);

  const clearAllTimers = useCallback(() => {
    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current);
      phaseTimerRef.current = null;
    }
    if (streamingTimerRef.current) {
      clearTimeout(streamingTimerRef.current);
      streamingTimerRef.current = null;
    }
    morphTimersRef.current.forEach((t) => clearTimeout(t));
    morphTimersRef.current = [];
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [clearAllTimers]);

  // Orchestrate the Completion Morph (Section 14 & 15)
  const triggerCompletionMorph = useCallback(
    (finalText: string) => {
      setIsStreaming(false);
      setIsThinking(false);
      setLoaderPhase('completing');
      setIsCompleted(true);
      clearAllTimers();

      // Step 1: Micro settle (180ms)
      setMorphStage('moment');

      const t1 = setTimeout(() => {
        // Step 2: Settle container
        setMorphStage('settling');

        const t2 = setTimeout(() => {
          // Step 3: Subtle spark
          setMorphStage('spark');

          const t3 = setTimeout(() => {
            // Step 4: Final permanent transition
            setMorphStage('settled');
            setLoaderPhase('complete');
            setIsPillsReady(true);

            if (options?.onFinish) {
              options.onFinish(finalText);
            }
          }, 240); // 240ms final settle

          morphTimersRef.current.push(t3);
        }, 160); // 160ms settle

        morphTimersRef.current.push(t2);
      }, 180); // 180ms moment

      morphTimersRef.current.push(t1);
    },
    [clearAllTimers, options]
  );

  // Progressive Paced Character/Chunk Streaming Engine (Sections 1, 5, 6, 10, 11, 12)
  // Target: 30–60 characters per second with natural punctuation & paragraph pauses
  const scheduleNextVisualChunk = useCallback(() => {
    if (streamingTimerRef.current) {
      clearTimeout(streamingTimerRef.current);
      streamingTimerRef.current = null;
    }

    const currentLength = displayedTextRef.current.length;
    const availableLength = incomingBufferRef.current.length;

    // Check if finished
    if (currentLength >= availableLength) {
      if (networkDoneRef.current) {
        // Done streaming everything
        const finalText = finalFullTextRef.current || displayedTextRef.current;
        triggerCompletionMorph(finalText);
        return;
      }
      // Network still generating, wait briefly for new tokens
      streamingTimerRef.current = setTimeout(scheduleNextVisualChunk, 70);
      return;
    }

    // Determine chunk size (2–8 characters, hybrid approach)
    const remaining = incomingBufferRef.current.slice(currentLength);
    const totalLength = incomingBufferRef.current.length;

    // Dynamic pacing: shorter messages slightly faster (~45-55 chars/sec), longer steady (~35-45 chars/sec)
    const isShortMessage = totalLength < 140;

    let chunkSize = 3;
    if (isShortMessage) {
      chunkSize = Math.floor(Math.random() * 3) + 3; // 3–5 chars
    } else {
      chunkSize = Math.floor(Math.random() * 4) + 2; // 2–5 chars
    }

    // Look ahead to keep words somewhat coherent (avoid awkward single orphan letters before space)
    const nextSpaceIdx = remaining.indexOf(' ');
    if (nextSpaceIdx > 0 && nextSpaceIdx <= chunkSize + 2) {
      chunkSize = nextSpaceIdx + 1;
    } else {
      chunkSize = Math.min(chunkSize, remaining.length);
    }

    const nextChunk = remaining.slice(0, chunkSize);
    const updatedText = displayedTextRef.current + nextChunk;
    displayedTextRef.current = updatedText;

    // Update state
    setStreamedText(updatedText);

    // Keep words state updated for word-level animations
    const rawWords = updatedText.split(/(\s+)/).filter(Boolean);
    const wordItems: StreamWord[] = rawWords.map((w, idx) => ({
      id: `w-${idx}`,
      text: w,
      isNew: idx === rawWords.length - 1,
    }));
    setWords(wordItems);

    // Base delay per step (30–60 chars/second -> ~18–33ms per character)
    // 3 chars at 40 chars/sec = ~75ms; 4 chars at 45 chars/sec = ~88ms
    // Subtle speed variation: Fast 40ms, Normal 55ms, Slow 75ms, Occasionally 90ms (Section 10)
    const speedRoll = Math.random();
    let stepDelay = 55;
    if (speedRoll < 0.25) {
      stepDelay = 40; // Fast
    } else if (speedRoll < 0.7) {
      stepDelay = 55; // Normal
    } else if (speedRoll < 0.9) {
      stepDelay = 75; // Slow
    } else {
      stepDelay = 90; // Subtle hesitation
    }

    // Adjust proportionally to chunk size
    stepDelay = Math.round((stepDelay * (chunkSize / 3)));

    // Sentence-level pause: 100–250ms at . ? ! : (Section 11)
    const endsWithSentencePunctuation = /[.?!:][ \n\t]/.test(nextChunk) || /[.?!:]$/.test(nextChunk);
    if (endsWithSentencePunctuation) {
      const sentencePause = 120 + Math.floor(Math.random() * 100); // 120–220ms
      stepDelay += sentencePause;
    }

    // Paragraph transition pause: 200–400ms when moving to a new paragraph (Section 12)
    const isParagraphBreak = nextChunk.includes('\n\n') || nextChunk.includes('\n');
    if (isParagraphBreak) {
      const paragraphPause = 220 + Math.floor(Math.random() * 120); // 220–340ms
      stepDelay += paragraphPause;
    }

    streamingTimerRef.current = setTimeout(scheduleNextVisualChunk, Math.max(35, stepDelay));
  }, [triggerCompletionMorph]);

  const startStream = useCallback(
    async (params: {
      message: string;
      astrologer?: Astrologer;
      kundli?: KundliData;
      history?: Array<{ sender: string; text?: string }>;
    }) => {
      lastParamsRef.current = params;

      // Abort any ongoing stream & clear timers
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      clearAllTimers();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      // Pick a randomized celestial sequence
      const randomSeq = CELESTIAL_SEQUENCES[Math.floor(Math.random() * CELESTIAL_SEQUENCES.length)];
      setActiveSequence(randomSeq);

      // Reset states
      setIsStreaming(true);
      setIsThinking(true);
      setLoaderPhase('thinking');
      setMorphStage('idle');
      setIsCompleted(false);
      setIsPillsReady(false);
      setStreamedText('');
      setWords([]);
      setError(null);

      incomingBufferRef.current = '';
      displayedTextRef.current = '';
      networkDoneRef.current = false;
      finalFullTextRef.current = '';
      wordCounterRef.current = 0;

      const astroName = params.astrologer?.name || 'Acharya Rajiv Shastri';
      setThinkingStatus(`✦ ${astroName} is consulting your Janma Kundli...`);

      // Thinking State Duration (Section 2): 4–7 seconds with variable duration
      // e.g. 3.8s, 4.8s, 5.6s, 6.4s
      const thinkingDurationMs = 3800 + Math.floor(Math.random() * 2600); // 3.8s – 6.4s

      // Transition to celestial stream loader after ~1.8s
      phaseTimerRef.current = setTimeout(() => {
        setLoaderPhase('celestial_stream');
        setThinkingStatus(`✦ ${astroName} is channeling planetary transits & celestial alignment...`);
      }, 1800);

      // Setup completion of thinking phase -> smooth 300-500ms transition -> start visual streaming
      const thinkingTransitionTimer = setTimeout(() => {
        // Section 4: Transition from Thinking → Streaming
        // 1. Thinking container gently slows down and fades
        // 2. Transition duration: ~380ms
        setLoaderPhase('transitioning');
        setMorphStage('transitioning');

        const beginStreamingTimer = setTimeout(() => {
          setIsThinking(false);
          setLoaderPhase('streaming');
          setMorphStage('idle');
          // Launch the progressive visual streaming ticker!
          scheduleNextVisualChunk();
        }, 380); // 380ms smooth fade + slight scale + upward movement

        morphTimersRef.current.push(beginStreamingTimer);
      }, thinkingDurationMs);

      morphTimersRef.current.push(thinkingTransitionTimer);

      // Launch background network fetch immediately
      try {
        const sanitizedHistory = params.history
          ?.filter((h) => h.sender !== 'system' && Boolean(h.text))
          .map((h) => ({
            sender: h.sender === 'user' ? 'user' : 'astrologer',
            text: h.text || '',
          }));

        const response = await fetch('/api/chat/stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: params.message,
            astrologer: params.astrologer
              ? {
                  name: params.astrologer.name,
                  title: params.astrologer.title,
                  lineage: params.astrologer.lineage,
                  specializations: params.astrologer.specializations,
                }
              : undefined,
            kundli: params.kundli,
            history: sanitizedHistory,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Streaming failed with status ${response.status}`);
        }

        if (!response.body) {
          throw new Error('Response body is missing');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data: ')) continue;

            const jsonStr = trimmed.slice(6);
            try {
              const data = JSON.parse(jsonStr);

              if (data.type === 'status' && data.message) {
                // Keep status updated if still in thinking mode
                setThinkingStatus(data.message);
              } else if (data.type === 'chunk' && data.text) {
                // Buffer incoming chunks silently; visual ticker consumes at 30–60 chars/s
                incomingBufferRef.current += data.text;
              } else if (data.type === 'done') {
                networkDoneRef.current = true;
                finalFullTextRef.current = data.fullText || incomingBufferRef.current;
              }
            } catch {
              // Ignore partial JSON chunks
            }
          }
        }

        networkDoneRef.current = true;
        if (!finalFullTextRef.current) {
          finalFullTextRef.current = incomingBufferRef.current;
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          return;
        }
        console.error('Streaming error:', err);
        setError(err.message || 'Stream disconnected');
        setIsStreaming(false);
        setIsThinking(false);
        setLoaderPhase('idle');
        setMorphStage('idle');
        setIsPillsReady(false);
        clearAllTimers();
        if (options?.onError) {
          options.onError(err);
        }
      }
    },
    [clearAllTimers, scheduleNextVisualChunk, options]
  );

  const stopStream = useCallback(() => {
    clearAllTimers();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    const finalSoFar = displayedTextRef.current || incomingBufferRef.current;
    setIsStreaming(false);
    setIsThinking(false);
    setLoaderPhase('complete');
    setMorphStage('settled');
    setIsCompleted(true);
    setIsPillsReady(true);

    if (finalSoFar && options?.onFinish) {
      options.onFinish(finalSoFar);
    }
  }, [clearAllTimers, options]);

  const retryLastStream = useCallback(() => {
    if (lastParamsRef.current) {
      startStream(lastParamsRef.current);
    }
  }, [startStream]);

  return {
    isStreaming,
    isThinking,
    loaderPhase,
    morphStage,
    isPillsReady,
    thinkingStatus,
    activeSequence,
    streamedText,
    words,
    error,
    isCompleted,
    startStream,
    stopStream,
    retryLastStream,
  };
};
