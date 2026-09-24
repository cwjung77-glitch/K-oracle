export const maxDuration = 60;
import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

export async function POST(req) {
  try {
    const body = await req.json();
    const { birthData, gender, lang, plan, userName, idolName: bodyIdolName, dailyVibe } = body;
    const isEs = lang === 'es';

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
      systemPrompt = `You are an elite Gen-Z Korean Saju compatibility expert.
User: ${userName}, gender: ${gender}, born: ${birthData}.
Target Idol: ${idolName}.

TONE: Fun, brutally honest, TikTok-ready, Stan Twitter vibe. 
Use authentic Korean Saju terms (Gap, Eul, Byeong, Jeong, Mu, Gi, Gyeong, Sin, Im, Gye).

Output exactly TWO sections separated by '|||':
Section 1: "Deep Chemistry & Compatibility Report" (Markdown). Break down how your Day Master interacts with ${idolName}'s perceived energy. Give a % match score.
|||
Section 2: "Karmic Destiny Matrix" (Markdown). Focus on past-life connections, hidden friction points, and red flags.

Language: ${isEs ? 'Spanish' : 'English'}.`;
    } else {
      systemPrompt = `You are a highly sought-after, brutally honest Gen-Z Korean Saju master.
User: ${userName}, gender: ${gender}, born: ${birthData}.
Daily Vibe Context (if any): ${dailyVibe || 'None'}

TONE: Intense, mystical, highly confident, TikTok-ready. 
Use authentic Korean Saju terms (Gap, Eul, Byeong, Jeong, Mu, Gi, Gyeong, Sin, Im, Gye). No pinyin.

Output exactly TWO sections separated by '|||':
Section 1: "26+27 VIP Masterplan" (Markdown). Break down their Day Master. Give specific month-by-month predictions for Q4 2026 and early 2027.
|||
Section 2: "Hidden Karma & Love Matrix" (Markdown). Reveal dark truths about their wealth potential and romantic red flags.

Language: ${isEs ? 'Spanish' : 'English'}.`;
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

    const fallbackModels = ['gemini-2.5-flash', 'gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-3.8-flash', 'gemini-flash-latest'];
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
    const reportText = parts[0] ? parts[0].trim() : "Unable to generate report.";
    const karmaText = parts[1] ? parts[1].trim() : "";
    
    // Default mock PDF logic
    const pdfUrl = "https://k-oracle-saju.s3.amazonaws.com/mock-report.pdf";

    const finalData = {
      reportText,
      karmaText,
      pdfUrl
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
