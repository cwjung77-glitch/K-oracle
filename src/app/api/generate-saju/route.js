export const maxDuration = 60;
import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

export async function POST(req) {
  try {
    const body = await req.json();
    const { birthData, gender, lang, plan, userName, idolName: bodyIdolName, dailyVibe } = body;

    const { getKoreanSaju } = require('../../../utils/sajuCalculator');
    let exactSajuInfo = '';
    // e.g. "1995-10-13" or "1995-10-13 14:00"
    const dateMatch = birthData.match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(?:\s+(\d{1,2}):(\d{1,2}))?/);
    if (dateMatch) {
      const saju = getKoreanSaju(dateMatch[1], dateMatch[2], dateMatch[3], dateMatch[4], dateMatch[5]);
      if (saju) {
        exactSajuInfo = `\n\nCRITICAL INSTRUCTION: Here is the user's mathematically calculated exact Saju Chart. You MUST use this exact chart for your interpretation and DO NOT calculate it yourself:\n- Year Pillar: ${saju.yearPillar}\n- Month Pillar: ${saju.monthPillar}\n- Day Pillar: ${saju.dayPillar}\n- Hour Pillar: ${saju.hourPillar}\n- Day Master: ${saju.dayMaster}\n`;
      }
    }
    
const langMap = {
  en: 'English',
  es: 'Spanish',
  th: 'Thai',
  id: 'Indonesian',
  ja: 'Japanese',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  pl: 'Polish',
  ru: 'Russian',
  vi: 'Vietnamese',
  fr: 'French',
  ko: 'Korean'
};
const targetLanguage = langMap[lang] || 'English';


    const apiKeys = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.split(',').map(k => k.trim()) : [];

    if (apiKeys.length === 0 || !apiKeys[0]) {
      console.warn("No Gemini API key found, falling back to mock.");
      return NextResponse.json({ 
        success: true, 
        reportText: "API keys are missing. This is fallback text.",
        karmaText: "API keys are missing. This is fallback karma text.",
        pdfUrl: ""
      });
    }

    // CACHE CHECK
    const cacheKey = `saju:${userName}:${birthData}:${gender}:${lang}:${plan}`;
    if (redis) {
      try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
          console.log(`[Cache Hit] Returning cached saju report for ${cacheKey}`);
          return NextResponse.json({ success: true, ...JSON.parse(cachedData) });
        }
      } catch(e) {
        console.error("Redis Cache Error:", e);
      }
    }

    // Pseudo-deterministic choice for missing idol name
    let idolName = bodyIdolName;
    if (!idolName) {
      const idols = ["Jungkook (BTS)", "Lisa (BLACKPINK)", "Felix (Stray Kids)", "Karina (aespa)", "Eunwoo (ASTRO)", "Wonyoung (IVE)"];
      const hashStr = birthData + userName + gender;
      let hash = 0;
      for (let i = 0; i < hashStr.length; i++) {
        hash = hashStr.charCodeAt(i) + ((hash << 5) - hash);
      }
      hash = Math.abs(hash);
      idolName = idols[hash % idols.length];
    }

    let systemPrompt = "";
    if (plan === 'compatibility') {
      systemPrompt = `You are an elite, highly authoritative, and mystical Korean Saju Master.
User: ${userName}, gender: ${gender}, born: ${birthData}.
Target Idol: ${idolName}.

TONE: Elite, mystical, deeply philosophical, and authoritative. Do NOT use casual slang.
  LEGAL & LIABILITY RULE: You must NEVER give definitive financial, legal, or medical advice. Use probabilistic and suggestive language (e.g., "The energy favors career exploration", NOT "Quit your job"). Absolutely avoid explicit investment commands. Keep all guidance spiritual and psychological to maintain zero legal liability.
  HUMAN-LIKE WRITING RULE: You must write in a highly engaging, natural, and passionate tone as if a real human expert is speaking directly to the user. You MUST completely avoid typical AI transition phrases and filler words (such as "In conclusion", "Moreover", "Let us dive into", "Ultimately", "It is important to remember"). Use varied sentence lengths and a dynamic, conversational pacing to bypass all AI text detectors. 
Use authentic Korean Saju terms (Gap, Eul, Byeong, Jeong, Mu, Gi, Gyeong, Sin, Im, Gye).

Output exactly TWO sections separated by '|||': CRITICAL: You must complete your response fully. Write an exhaustively detailed, $100-level premium consultation. Each section MUST be rich with specific cosmic timelines (e.g., "Between March and May 2027") and profound insights, expanding to at least 600-800 words per section. Ensure the ||| separator is always present.
Section 1: "Deep Chemistry & Compatibility Report" (Markdown). Break down how your Day Master interacts with ${idolName}'s perceived energy. Give a % match score.
|||
Section 2: "Karmic Destiny Matrix" (Markdown). Focus on past-life connections, hidden friction points, and red flags.

Language: ${targetLanguage}.`;
    } else {
      systemPrompt = `You are a highly sought-after, authoritative, and mystical Korean Saju Master.
User: ${userName}, gender: ${gender}, born: ${birthData}.
Daily Vibe Context (if any): ${dailyVibe || 'None'}

TONE: Elite, mystical, deeply philosophical, and authoritative. Do NOT use casual slang.
  LEGAL & LIABILITY RULE: You must NEVER give definitive financial, legal, or medical advice. Use probabilistic and suggestive language (e.g., "The energy favors career exploration", NOT "Quit your job"). Absolutely avoid explicit investment commands. Keep all guidance spiritual and psychological to maintain zero legal liability.
  HUMAN-LIKE WRITING RULE: You must write in a highly engaging, natural, and passionate tone as if a real human expert is speaking directly to the user. You MUST completely avoid typical AI transition phrases and filler words (such as "In conclusion", "Moreover", "Let us dive into", "Ultimately", "It is important to remember"). Use varied sentence lengths and a dynamic, conversational pacing to bypass all AI text detectors. 
Use authentic Korean Saju terms (Gap, Eul, Byeong, Jeong, Mu, Gi, Gyeong, Sin, Im, Gye). No pinyin.

Output exactly TWO sections separated by '|||': CRITICAL: You must complete your response fully. Write an exhaustively detailed, $100-level premium consultation. Each section MUST be rich with specific cosmic timelines (e.g., "Between March and May 2027") and profound insights, expanding to at least 600-800 words per section. Ensure the ||| separator is always present.

Section 1 MUST begin with the following exact data markers before the markdown text:
[ARCHETYPE: A poetic English title for their Day Master, e.g., The Roaring Fire, The Silent Mountain, The Fertile Valley]
[POETIC_HOOK: 2 sentences of highly evocative, emotional, and poetic blessing/warning based on their chart]
[ELEMENTS: Wood XX%, Fire XX%, Earth XX%, Metal XX%, Water XX%] (Must exactly sum to 100%)

Section 1: "26+27 VIP Masterplan" (Markdown). Break down their Day Master. Give specific month-by-month predictions for Q4 2026 and early 2027.
|||
Section 2: "Hidden Karma & Love Matrix" (Markdown). Reveal dark truths about their wealth potential and romantic red flags.

Language: ${targetLanguage}.`;
    }

    const requestBody = {
      contents: [{
        parts: [{ text: systemPrompt }]
      }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 8192
      }
    };

    const fallbackModels = ['gemini-flash-lite-latest', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];
    let lastError = null;
    let data = null;
    let response = null;

    for (const currentKey of apiKeys) {
      if (response && response.ok) break;
      for (const currentModel of fallbackModels) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${currentKey}`;
          response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
          });
          data = await response.json();
          
          if (response.ok) {
            lastError = null;
            break; 
          } else {
            lastError = data;
          }
        } catch (err) {
          lastError = err;
        }
      }
    }

    if (!response || !response.ok) {
        throw new Error(`Gemini API error after retries: ${JSON.stringify(lastError)}`);
    }

    const textOutput = data.candidates[0].content.parts[0].text;
    const parts = textOutput.split('|||');
    let reportText = parts[0] ? parts[0].trim() : "Unable to generate report.";
    const karmaText = parts[1] ? parts[1].trim() : "";
    
    // Parse structured data from reportText
    let parsedArchetype = "The Hidden Star";
    let parsedPoeticHook = "Your destiny is still unfolding. Trust the timing of the universe.";
    let parsedElements = { Wood: 20, Fire: 20, Earth: 20, Metal: 20, Water: 20 };

    const archetypeMatch = reportText.match(/\[ARCHETYPE:\s*([^\]]+)\]/i);
    if (archetypeMatch) {
       parsedArchetype = archetypeMatch[1].trim();
       reportText = reportText.replace(archetypeMatch[0], '');
    }

    const hookMatch = reportText.match(/\[POETIC_HOOK:\s*([^\]]+)\]/i);
    if (hookMatch) {
       parsedPoeticHook = hookMatch[1].trim();
       reportText = reportText.replace(hookMatch[0], '');
    }

    const elementsMatch = reportText.match(/\[ELEMENTS:\s*(.+?)\]/i);
    if (elementsMatch) {
       const elStr = elementsMatch[1];
       const getEl = (name) => {
          const m = elStr.match(new RegExp(`${name}\\s*(\\d+)%`, 'i'));
          return m ? parseInt(m[1]) : 0;
       };
       parsedElements = {
         Wood: getEl('Wood'),
         Fire: getEl('Fire'),
         Earth: getEl('Earth'),
         Metal: getEl('Metal'),
         Water: getEl('Water')
       };
       reportText = reportText.replace(elementsMatch[0], '');
    }

    reportText = reportText.trim();
    
    // Default mock PDF logic
    const pdfUrl = "https://k-oracle-saju.s3.amazonaws.com/mock-report.pdf";

    const finalData = {
      reportText,
      karmaText,
      pdfUrl,
      archetype: parsedArchetype,
      poeticHook: parsedPoeticHook,
      elementalBalance: parsedElements
    };

    // CACHE SET: Save the result to Redis (ttl 30 days for big reports)
    if (redis) {
      try {
        await redis.set(cacheKey, JSON.stringify(finalData), 'EX', 2592000); // 30 days
      } catch(e) {
        console.error("Redis Cache Set Error:", e);
      }
    }

    return NextResponse.json({ success: true, ...finalData });
    
  } catch (error) {
    console.error("Saju API Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
