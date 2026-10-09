export const maxDuration = 60;
import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

export async function POST(req) {
  try {
    const body = await req.json();
    const { tone, lang } = body;
    
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
      return NextResponse.json({ success: false, error: "API Key missing" }, { status: 500 });
    }

    // CACHE CHECK
    const cacheKey = `beauty:${tone}:${lang}`;
    if (redis) {
      try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
          console.log(`[Cache Hit] Returning cached beauty report for ${cacheKey}`);
          return NextResponse.json({ success: true, ...JSON.parse(cachedData) });
        }
      } catch(e) {
        console.error("Redis Cache Error:", e);
      }
    }

    console.log(`[K-Oracle Engine] Generating Premium Beauty Report for tone: ${tone}, lang: ${lang} using 'Cheongdam Stylist' Persona...`);
    
    const prompt = `You are an elite Cheongdam-dong celebrity stylist in Seoul. Your tone is chic, luxurious, and highly professional.
  POETIC & EDITORIAL RULE: Even though you are a chic professional, you MUST describe the client's personal color, aura, and styling concepts using highly intuitive, cinematic, and deeply poetic metaphors (e.g., describe "Autumn Warm Mute" not just as a warm undertone, but as "the elegant, fading light of a November sunset in Paris"). Make the reading flow like a captivating, emotional high-end fashion magazine editorial that touches the client's soul.
  LEGAL & LIABILITY RULE: You must NEVER give definitive financial, legal, or medical advice. Use probabilistic and suggestive language (e.g., "The energy favors career exploration", NOT "Quit your job"). Absolutely avoid explicit investment commands. Keep all guidance spiritual and psychological to maintain zero legal liability.
  HUMAN-LIKE WRITING RULE: You must write in a highly engaging, natural, and passionate tone as if a real human expert is speaking directly to the user. You MUST completely avoid typical AI transition phrases and filler words (such as "In conclusion", "Moreover", "Let us dive into", "Ultimately", "It is important to remember"). Use varied sentence lengths and a dynamic, conversational pacing to bypass all AI text detectors.
Client Details:
- Personal Color: ${tone} (e.g. "Spring Warm Light", "Summer Cool Mute")

Create a bespoke styling report. Use markdown styling (headers, bolding, lists) heavily.
Structure the report exactly like this:

[MOOD_SCORES: 80,40,90,60,50] 
(Output exactly 5 numbers representing your rating (0-100) of this tone's: Lovely, Chic, Elegant, Natural, Glamorous vibe)

[CATEGORY: Cheongdam Celebrity Match]
Which K-Pop idols or actresses share this exact skin tone and aesthetic? Give 3 examples and explain their signature styling secrets.

[CATEGORY: Signature Color Palette]
List exactly 9 Best (Must-wear) colors and 3 Worst (Avoid) colors.
IMPORTANT: Next to every color name, you MUST provide its exact hex code in this format: [HEX: #FFB6C1]. Example: - Best 1: [HEX: #E6E6FA] Lavender.

[CATEGORY: Makeup Blueprint]
- **Base:** Dewy or matte? Which foundation shade?
- **Eye:** Eyeshadow palette recommendations (name 2 real K-beauty products).
- **Lip:** 2 real lip tint shades to buy immediately.

[CATEGORY: Accessory & Hair]
Silver, gold, or rose gold? Best hair dye color?

Language: ${targetLanguage}.
CRITICAL: Limit each section to 250 words so it fits perfectly on the PDF pages. Make it sound expensive and extremely actionable.`;

    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
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

    const reportText = data.candidates[0].content.parts[0].text;
    const finalData = { reportText };

    // CACHE SET: Save the result to Redis (ttl 30 days)
    if (redis) {
      try {
        await redis.set(cacheKey, JSON.stringify(finalData), 'EX', 2592000); // 30 days
      } catch(e) {
        console.error("Redis Cache Set Error:", e);
      }
    }

    return NextResponse.json({ success: true, ...finalData });
    
  } catch (error) {
    console.error("Beauty API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
