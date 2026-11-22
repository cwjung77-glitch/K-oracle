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
    let calculatedSaju = null;
    let userElement = 'Fire';

    const dateMatch = (birthData || '').match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(?:\s+(\d{1,2}):(\d{1,2}))?/);
    if (dateMatch) {
      calculatedSaju = getKoreanSaju(dateMatch[1], dateMatch[2], dateMatch[3], dateMatch[4], dateMatch[5]);
      if (calculatedSaju) {
        if (calculatedSaju.dayMaster?.includes('Wood')) userElement = 'Wood';
        else if (calculatedSaju.dayMaster?.includes('Fire')) userElement = 'Fire';
        else if (calculatedSaju.dayMaster?.includes('Earth')) userElement = 'Earth';
        else if (calculatedSaju.dayMaster?.includes('Metal')) userElement = 'Metal';
        else if (calculatedSaju.dayMaster?.includes('Water')) userElement = 'Water';

        exactSajuInfo = `\n\nCRITICAL MATHEMATICAL SAJU CHART (calculated via Korean Manseryeok): You MUST use this exact Four Pillars chart for your interpretation and NEVER contradict it:\n- Year Pillar (연주): ${calculatedSaju.yearPillar}\n- Month Pillar (월주): ${calculatedSaju.monthPillar}\n- Day Pillar (일주): ${calculatedSaju.dayPillar}\n- Hour Pillar (시주): ${calculatedSaju.hourPillar}\n- Day Master (일간): ${calculatedSaju.dayMaster} (Core Element: ${userElement})\n`;
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
      ko: 'Korean',
    };
    const targetLanguage = langMap[lang] || 'English';

    const apiKeys = process.env.GEMINI_API_KEY
      ? process.env.GEMINI_API_KEY.split(',').map((k) => k.trim())
      : [];

    if (apiKeys.length === 0 || !apiKeys[0]) {
      console.warn('No Gemini API key found, falling back to structured Saju report.');
      return NextResponse.json({
        success: true,
        reportText: `[CATEGORY: Day Master & Cosmic Identity]\nYour Day Master is ${calculatedSaju?.dayMaster || 'Byeong (Fire)'}. Your chart carries an extraordinary magnetic presence ready to expand across 2026-2027.`,
        karmaText: `[CATEGORY: Hidden Karma & Love Matrix]\nYour karmic blueprint reveals a deep attraction toward creative and independent souls.`,
        pdfUrl: '',
        userElement,
        sajuChart: calculatedSaju,
        archetype: `The Sovereign ${userElement} Star`,
        poeticHook: 'Your four pillars align like constellations over Seoul, turning past trials into unstoppable momentum.',
        elementalBalance: { Wood: 20, Fire: 25, Earth: 20, Metal: 15, Water: 20 },
      });
    }

    // CACHE CHECK
    const cacheKey = `saju:v2:${userName}:${birthData}:${gender}:${lang}:${plan}:${bodyIdolName || ''}`;
    if (redis) {
      try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
          return NextResponse.json({ success: true, ...JSON.parse(cachedData) });
        }
      } catch (e) {
        console.error('Redis Cache Error:', e);
      }
    }

    let idolName = bodyIdolName;
    if (!idolName) {
      const idols = ['Jungkook (BTS)', 'Lisa (BLACKPINK)', 'Felix (Stray Kids)', 'Karina (aespa)', 'Eunwoo (ASTRO)', 'Wonyoung (IVE)'];
      const hashStr = birthData + userName + gender;
      let hash = 0;
      for (let i = 0; i < hashStr.length; i++) {
        hash = hashStr.charCodeAt(i) + ((hash << 5) - hash);
      }
      hash = Math.abs(hash);
      idolName = idols[hash % idols.length];
    }

    let systemPrompt = '';
    if (plan === 'compatibility') {
      systemPrompt = `You are an elite, highly authoritative, and mystical Korean Saju Master.
User: ${userName}, gender: ${gender}, born: ${birthData}.
Target Idol / Partner: ${idolName}.${exactSajuInfo}

TONE: Elite, mystical, deeply philosophical, yet highly accessible. Do NOT use casual slang.
  GLOBAL ACCESSIBILITY RULE: Translate complex ancient Saju concepts into intuitive, cinematic, and relatable modern metaphors (e.g., explain "Gap Wood" as "a towering pine tree bursting through concrete").
  LEGAL & LIABILITY RULE: NEVER give definitive financial, legal, or medical advice. Keep all guidance spiritual and psychological.
  HUMAN-LIKE WRITING RULE: Write in a natural, passionate tone as a real human expert speaking directly to the user. Avoid AI transition clichés ("In conclusion", "Moreover", "Let us dive into", "Ultimately").
  CONTRADICTION EXCLUSION RULE: Cross-validate all assertions. Every prediction must logically align with the user's exact Day Master (${calculatedSaju?.dayMaster || userElement}).

Output exactly TWO sections separated by '|||':
Use [CATEGORY: Section Title] headers inside each section to structure topics clearly.
Section 1: "Deep Chemistry & Compatibility Report". Break down how ${userName}'s Day Master (${calculatedSaju?.dayMaster || userElement}) interacts with ${idolName}'s energy across 2026-2027. Include specific cosmic timelines.
|||
Section 2: "Karmic Destiny Matrix". Focus on past-life connections, magnetic attraction triggers, hidden friction points, and how to harmonize together.

Language: ${targetLanguage}.`;
    } else {
      systemPrompt = `You are a highly sought-after, authoritative, and mystical Korean Saju Master.
User: ${userName}, gender: ${gender}, born: ${birthData}.
Daily Vibe Context (if any): ${dailyVibe || 'None'}${exactSajuInfo}

TONE: Elite, mystical, deeply philosophical, yet highly accessible. Do NOT use casual slang.
  GLOBAL ACCESSIBILITY RULE: Translate complex ancient Saju concepts into intuitive, cinematic, and relatable modern metaphors.
  LEGAL & LIABILITY RULE: NEVER give definitive financial, legal, or medical advice.
  HUMAN-LIKE WRITING RULE: Write in a natural, passionate tone as a real human expert speaking directly to the user. Avoid AI transition clichés ("In conclusion", "Moreover", "Let us dive into").
  CONTRADICTION EXCLUSION RULE: Cross-validate all assertions. Every prediction must logically align with the user's exact Day Master (${calculatedSaju?.dayMaster || userElement}) and elemental transitions.

Output exactly TWO sections separated by '|||':
Section 1 MUST begin with the following exact data markers before the text:
[ARCHETYPE: A poetic English title for their ${calculatedSaju?.dayMaster || userElement} Day Master, e.g., The Roaring Fire, The Silent Mountain, The Fertile Valley]
[POETIC_HOOK: 2 sentences of highly evocative, emotional, and poetic blessing/insight based on their chart]
[ELEMENTS: Wood XX%, Fire XX%, Earth XX%, Metal XX%, Water XX%] (Must sum to 100%)

Use [CATEGORY: Section Title] markers for major sub-sections.
Section 1: "26+27 VIP Masterplan". Break down their exact Four Pillars and Day Master (${calculatedSaju?.dayMaster || userElement}). Give specific month-by-month predictions and turning points for Q4 2026 and 2027.
|||
Section 2: "Hidden Karma, Wealth & Love Matrix". Reveal deep truths about their past-life karmic gifts, wealth expansion windows, and romantic destiny.

Language: ${targetLanguage}.`;
    }

    const requestBody = {
      contents: [{ parts: [{ text: systemPrompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 8192,
      },
    };

    const fallbackModels = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-flash-lite-latest'];
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
            body: JSON.stringify(requestBody),
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
    let reportText = parts[0] ? parts[0].trim() : 'Unable to generate report.';
    const karmaText = parts[1] ? parts[1].trim() : '';

    let parsedArchetype = `The Sovereign ${userElement} Star`;
    let parsedPoeticHook = 'Your destiny is unfolding in alignment with the Four Pillars. Trust the timing of the cosmos.';
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
        return m ? parseInt(m[1], 10) : 20;
      };
      parsedElements = {
        Wood: getEl('Wood'),
        Fire: getEl('Fire'),
        Earth: getEl('Earth'),
        Metal: getEl('Metal'),
        Water: getEl('Water'),
      };
      reportText = reportText.replace(elementsMatch[0], '');
    }

    reportText = reportText.trim();

    const finalData = {
      reportText,
      karmaText,
      pdfUrl: '',
      userElement,
      sajuChart: calculatedSaju,
      archetype: parsedArchetype,
      poeticHook: parsedPoeticHook,
      elementalBalance: parsedElements,
    };

    if (redis) {
      try {
        await redis.set(cacheKey, JSON.stringify(finalData), 'EX', 2592000);
      } catch (e) {
        console.error('Redis Cache Set Error:', e);
      }
    }

    return NextResponse.json({ success: true, ...finalData });
  } catch (error) {
    console.error('Saju API Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
