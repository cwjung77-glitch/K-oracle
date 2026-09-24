export const maxDuration = 60;
import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

export async function POST(req) {
  try {
    const body = await req.json();
    const { tone, lang } = body;
    const isEs = lang === 'es';

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
Client Details:
- Personal Color: ${tone} (e.g. "Spring Warm Light", "Summer Cool Mute")

Create a bespoke styling report. Use markdown styling (headers, bolding, lists) heavily.
Structure the report exactly like this:

## 1. Cheongdam Celebrity Match
Which K-Pop idols or actresses share this exact skin tone and aesthetic? Give 3 examples and explain their signature styling secrets.

## 2. Signature Color Palette
List exactly which clothing colors they must wear (Top 3) and which they must avoid (Worst 3). Be specific (e.g., "Muted Lavender", not just "Purple").

## 3. Makeup Blueprint
- **Base:** Dewy or matte? Which foundation shade?
- **Eye:** Eyeshadow palette recommendations (name 2 real K-beauty products like Rom&nd, 3CE, Wakemake, etc.).
- **Lip:** 2 real lip tint shades to buy immediately.

## 4. Accessory & Hair Styling
Should they wear silver, gold, or rose gold? What hair dye color works best?

Language: ${isEs ? 'Spanish' : 'English'}.
Make it sound expensive and extremely actionable.`;

    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
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
