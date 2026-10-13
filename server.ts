import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5173;

app.use(express.json());

// Initialize Gemini SDK dynamically with User-Agent header as required
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Build clean, alternating contents array for Gemini API (starts with 'user', strictly alternates)
function buildGeminiContents(
  rawHistory: Array<{ sender: string; text?: string }> | undefined,
  currentMessage: string
): Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> {
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  // Filter out invalid items
  const validHistory = (rawHistory || [])
    .filter((h) => h && h.text && h.text.trim().length > 0 && h.sender !== 'system')
    .map((h) => ({
      role: (h.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
      text: h.text!.trim(),
    }));

  const trimmedCurrent = (currentMessage || '').trim();

  // If the last item in validHistory is already identical to trimmedCurrent, remove it to avoid duplication
  if (
    validHistory.length > 0 &&
    validHistory[validHistory.length - 1].role === 'user' &&
    validHistory[validHistory.length - 1].text === trimmedCurrent
  ) {
    validHistory.pop();
  }

  // Gemini requires the first message to have role 'user'
  // Drop any leading model messages (e.g. welcome message)
  let startIndex = 0;
  while (startIndex < validHistory.length && validHistory[startIndex].role === 'model') {
    startIndex++;
  }
  const historySlice = validHistory.slice(startIndex).slice(-8);

  // Alternate turns: merge consecutive turns of the same role
  for (const item of historySlice) {
    if (contents.length > 0 && contents[contents.length - 1].role === item.role) {
      contents[contents.length - 1].parts[0].text += `\n\n${item.text}`;
    } else {
      contents.push({
        role: item.role,
        parts: [{ text: item.text }],
      });
    }
  }

  // Append current user message
  if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
    contents[contents.length - 1].parts[0].text += `\n\n${trimmedCurrent || 'Pranam Acharya ji. Please analyze my chart.'}`;
  } else {
    contents.push({
      role: 'user',
      parts: [{ text: trimmedCurrent || 'Pranam Acharya ji. Please analyze my chart.' }],
    });
  }

  return contents;
}

// Fallback generator for authentic Vedic Astrological answers
function getFallbackAstrologyResponse(prompt: string, astroName: string = 'Acharya Rajiv Shastri'): string {
  const p = prompt.toLowerCase();
  
  if (p.includes('career') || p.includes('promotion') || p.includes('deal') || p.includes('stalled') || p.includes('friction') || p.includes('work') || p.includes('business')) {
    return `Hari Om. Looking closely at your 10th bhava (Karma Sthana) in Cancer, your Lagna lord Venus is currently navigating a transit with Saturn in the 5th aspect.

Your Rahu Mahadasha with Shani Antardasha explains why deals pause right at the signature threshold—Rahu creates illusion and sudden hesitation in partners, while Saturn tests your endurance.

The auspicious planetary shift begins when the Sun enters Libra on the 17th. Once your consecrated Ceylon Yellow Sapphire is energized and placed on your index finger, Jupiter's 5th drishti will shield your venture from this friction, allowing stalled contracts to clear before Shukla Ekadashi.`;
  }

  if (p.includes('gemstone') || p.includes('sapphire') || p.includes('pukhraj') || p.includes('ratti') || p.includes('stone') || p.includes('ring')) {
    return `Subhamastu. For your Libra Lagna and Pisces Moon, Jupiter rules your 3rd and 6th houses, yet crucially aspects your 10th bhava of public authority and karma.

An unheated, untreated Ceylon Yellow Sapphire (5.25 Ratti) acts as a cosmic lens. It concentrates Jupiter's golden spectrum into your subtle Pranamaya kosha, neutralizing Rahu's erratic shadows.

When consecrated via the 108 Agamic recitations at the Kashi Vishwanath Sanctum and set in Sacred Panchdhatu, it creates an impenetrable Kavach against burnout and stagnation.`;
  }

  if (p.includes('love') || p.includes('marriage') || p.includes('relationship') || p.includes('partner') || p.includes('7th') || p.includes('compatibility')) {
    return `Ayushman Bhava. Your 7th bhava in Aries is ruled by Mars (Mangal), currently occupying an auspicious trine. 

While the previous 6 months brought miscommunications due to Mercury's retrograde cycle, Jupiter's upcoming direct transit in May will ignite harmony and clarity. 

If considering alliance proposals, the period between the upcoming Shukla Paksha and Kartik Purnima is exceptionally favorable. Ensure you conduct a peaceful Shiva-Parvati Archana on Mondays to dissolve lingering Manglik vibrations.`;
  }

  if (p.includes('finance') || p.includes('wealth') || p.includes('money') || p.includes('gain') || p.includes('2nd') || p.includes('11th') || p.includes('income')) {
    return `Kalyanam Astu. Your 2nd house of Dhana (accumulated wealth) in Scorpio and 11th house of Labha (gains) in Leo indicate tremendous inherent earning capacity, but high expenditure leakage.

Mars governing your 2nd house ensures steady inflow through technical innovation. However, Rahu in the 6th creates unexpected operational expenses. 

Wearing your consecrated Jupiter Kavach and offering pure sesame oil lamps under a Peepal tree on Saturdays will permanently seal this wealth leakage.`;
  }

  if (p.includes('muhurat') || p.includes('wearing') || p.includes('pooja') || p.includes('timing') || p.includes('ritual') || p.includes('time')) {
    return `The most auspicious Muhurat for your Jaipur coordinates is this upcoming Thursday between 06:18 AM and 07:44 AM during Amrit Choghadiya.

Protocol:
1. Bathe before dawn and wear clean yellow or off-white garments.
2. Immerse the consecrated ring in raw cow milk mixed with Gangajal for 15 minutes.
3. Light a pure cow ghee diya facing East.
4. Recite the Guru Beej Mantra 108 times: 'Om Graam Greem Graum Sah Guruve Namah'.
5. Slip the ring onto your right hand index (Tarjani) finger as the morning sun crests the horizon.`;
  }

  if (p.includes('panchdhatu') || p.includes('metal') || p.includes('gold') || p.includes('silver')) {
    return `Shastras praise Sacred Panchdhatu (Gold, Silver, Copper, Zinc, and Iron) because the alloy resonates with all five Mahabhutas (Pancha Tattva: Earth, Water, Fire, Air, Ether).

While 18k yellow gold focuses strictly on Solar-Jupiter energy, Panchdhatu provides grounding equilibrium, especially vital when soothing the dual tension of Rahu and Saturn. It ensures the stone's optical resonance transfers smoothly into your nervous system.`;
  }

  return `Hari Om, Devanand ji. I have examined your Janma Kundli coordinates. The cosmic wheel indicates a decisive turning point in your planetary cycle.

The heavy resistance you have experienced is the final purification phase of your Shani Antardasha. As Jupiter's benevolent rays align with your 10th bhava, the obstacles in your enterprise and mental peace will systematically dissolve.

Remain focused and centered. The sacred consecration underway in Kashi will anchor the divine grace necessary for your triumph.`;
}

// Safely send SSE message and flush buffer immediately
function sendSSE(res: express.Response, data: any) {
  if (res.writableEnded) return;
  res.write(`data: ${JSON.stringify(data)}\n\n`);
  if (typeof (res as any).flush === 'function') {
    (res as any).flush();
  }
}

// Stream tokenized fallback response smoothly via SSE
function streamFallbackResponse(
  res: express.Response,
  message: string,
  astroName: string,
  checkDisconnected: () => boolean,
  initialDelayMs: number = 0
) {
  const fullText = getFallbackAstrologyResponse(message || '', astroName);
  const words = fullText.split(' ');
  let wordIndex = 0;

  const startStreaming = () => {
    if (checkDisconnected() || res.writableEnded) return;

    const interval = setInterval(() => {
      if (checkDisconnected() || res.writableEnded) {
        clearInterval(interval);
        return;
      }

      if (wordIndex < words.length) {
        const takeCount = Math.min(words.length - wordIndex, Math.random() > 0.6 ? 2 : 1);
        const chunkWords = words.slice(wordIndex, wordIndex + takeCount);
        const prefix = wordIndex === 0 ? '' : ' ';
        const text = prefix + chunkWords.join(' ');
        wordIndex += takeCount;

        sendSSE(res, { type: 'chunk', text });
      } else {
        clearInterval(interval);
        sendSSE(res, { type: 'done', fullText });
        res.end();
      }
    }, 38);
  };

  if (initialDelayMs > 0) {
    setTimeout(startStreaming, initialDelayMs);
  } else {
    startStreaming();
  }
}

// POST /api/chat/stream: SSE Real-Time Streaming Endpoint
app.post('/api/chat/stream', async (req, res) => {
  const { message, astrologer, kundli, history } = req.body;

  // Set real Server-Sent Events headers
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  if (typeof res.flushHeaders === 'function') {
    res.flushHeaders();
  }

  const astroName = astrologer?.name || 'Acharya Rajiv Shastri';
  const userName = kundli?.name || 'Devanand';

  let clientDisconnected = false;
  // Listen to res.on('close') for actual client disconnect, NOT req.on('close')
  res.on('close', () => {
    if (!res.writableEnded) {
      clientDisconnected = true;
    }
  });

  // 1. Send initial thinking status event
  sendSSE(res, {
    type: 'status',
    status: 'thinking',
    message: `${astroName} is consulting your Janma Kundli and planetary transits...`
  });

  // Try real Gemini streaming if API key is present
  const ai = getGeminiClient();
  if (ai) {
    let celestialTimer: NodeJS.Timeout | null = null;
    try {
      const astroTitle = astrologer?.title || 'Vedic Jyotish Acharya';
      const astroLineage = astrologer?.lineage || 'Varanasi Peeth Sampradaya';
      const systemInstruction = `You are ${astroName} (${astroTitle}, ${astroLineage}), a revered, authentic Indian Vedic Astrologer consulting for ${userName} on Kismatio.
Client Chart Details:
- Name: ${userName}
- Lagna: ${kundli?.lagna || 'Libra (Tula)'}
- Moon Sign: ${kundli?.moonSign || 'Pisces (Meena)'}
- Nakshatra: ${kundli?.nakshatra || 'Uttara Bhadrapada'} (Pada ${kundli?.pada || 2})
- Current Mahadasha: ${kundli?.currentMahadasha || 'Rahu'} Mahadasha
- Current Antardasha: ${kundli?.currentAntardasha || 'Saturn (Shani)'} Antardasha
- 10th House (Karma Sthana): Cancer ruled by Moon, currently experiencing Saturn's 5th aspect.
- 2nd House (Dhana): Scorpio ruled by Mars.
- 7th House (Partnership/Marriage): Aries ruled by Mars.
- Primary Remedy: Consecrated untreated Ceylon Yellow Sapphire (Pukhraj, 5.25 Ratti) energized with 108 Vedic Agamic recitations at Kashi Vishwanath Sanctum, set in Sacred Panchdhatu.

Guidelines:
1. Speak with genuine Vedic authority, spiritual warmth, and deep compassion.
2. Use respectful Sanskrit honorifics naturally ("Hari Om", "${userName} ji", "Subhamastu", "Kalyanam Astu", "Ayushman Bhava").
3. Provide precise astrological reasoning (referencing bhavas, grahas, dasha transits, nakshatras, and Agamic remedies).
4. Keep the output fluid, readable, and structured in 2 to 3 natural paragraphs.
5. Do NOT use markdown code blocks or overly academic jargon without explaining its real-life meaning.
6. Never break character, never mention AI or system guidelines. Speak purely as the revered Vedic Astrologer from your sanctum.`;

      const contents = buildGeminiContents(history, message || 'Please analyze my chart and remedies.');

      // Send celestial stream transition at midpoint (~1.2s) while Gemini prepares response
      celestialTimer = setTimeout(() => {
        if (clientDisconnected || res.writableEnded) return;
        sendSSE(res, {
          type: 'status',
          status: 'celestial_stream',
          message: `${astroName} is channeling planetary transits & celestial alignment...`
        });
      }, 1200);

      // Use gemini-3.1-flash-lite with a resilient 3.5s timeout race
      const streamPromise = ai.models.generateContentStream({
        model: 'gemini-3.1-flash-lite',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini timeout')), 3500)
      );

      const responseStream = await Promise.race([streamPromise, timeoutPromise]);

      let fullGeminiText = '';

      // Stream incoming chunks directly to the client as SSE events
      for await (const chunk of responseStream) {
        if (clientDisconnected || res.writableEnded) break;
        const text = chunk.text;
        if (text) {
          if (celestialTimer) {
            clearTimeout(celestialTimer);
            celestialTimer = null;
          }
          fullGeminiText += text;
          sendSSE(res, { type: 'chunk', text });
        }
      }

      if (celestialTimer) {
        clearTimeout(celestialTimer);
      }

      if (!clientDisconnected && !res.writableEnded && fullGeminiText.trim().length > 0) {
        sendSSE(res, { type: 'done', fullText: fullGeminiText });
        res.end();
        return;
      }
    } catch {
      if (celestialTimer) {
        clearTimeout(celestialTimer);
      }
      // Seamlessly fall back to Vedic engine
    }
  }

  // Authentic Vedic Fallback Streaming Engine: immediately stream tokens so the user never stalls
  if (!clientDisconnected && !res.writableEnded) {
    sendSSE(res, {
      type: 'status',
      status: 'celestial_stream',
      message: `${astroName} is channeling planetary transits & celestial alignment...`
    });

    // Stream tokens smoothly right away
    streamFallbackResponse(res, message || '', astroName, () => clientDisconnected, 400);
  }
});

// Configure Vite integration for dev and static for prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✦ Kismatio Sanctum server running on http://0.0.0.0:${PORT}`);
});
