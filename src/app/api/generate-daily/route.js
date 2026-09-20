export const maxDuration = 60;
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { birthData, gender, lang, userName } = body;
    const isEs = lang === 'es';

    const apiKeys = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.split(',').map(k => k.trim()) : [];
    if (apiKeys.length === 0 || !apiKeys[0]) {
      return NextResponse.json({ success: false, message: "No Gemini API key found" }, { status: 500 });
    }
    // Keys will be rotated below

    const todayStr = new Date().toISOString().split('T')[0];
    
    // Deterministic selection based on birthData + todayStr to build trust (no pure randomness)
    const idols = ["Jungkook (BTS)", "Lisa (BLACKPINK)", "Felix (Stray Kids)", "Karina (aespa)", "Eunwoo (ASTRO)", "Wonyoung (IVE)"];
    const cosmetics = ["Rom&nd", "Clio", "3CE", "Peripera", "ETUDE", "Unleashia"];
    
    const hashStr = birthData + todayStr;
    let hash = 0;
    for (let i = 0; i < hashStr.length; i++) {
      hash = hashStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    
    const randomIdol = idols[hash % idols.length];
    const randomBrand = cosmetics[(hash >> 2) % cosmetics.length];

    const systemPrompt = `You are an elite Gen-Z Korean Saju master and K-Beauty stylist.
    User: ${userName}, gender: ${gender}, born: ${birthData}, today: ${todayStr}.
    
    TONE: Blunt, direct, Gen-Z. NO AI phrases like "cosmic energy brings" or "embrace".
    LENGTH RULES - CRITICAL: Each field must be SHORT:
    - vibe: MAX 2 sentences, MAX 30 words total
    - luckyColor: MAX 3 words
    - luckyItem: MAX 8 words
    - idolMatch: MAX 15 words, end at a complete word before any apostrophe
    
    Output ONLY this JSON (no markdown, no extra text):
    {"score":<1-100>,"vibe":"<2 short sentences max>","luckyColor":"<color name>","luckyItem":"<${randomBrand} item>","idolMatch":"<1 short sentence about ${randomIdol}>"}
    Language: ${isEs ? 'Spanish' : 'English'}.`;

    const requestBody = {
      contents: [{
        parts: [{ text: systemPrompt }]
      }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 4096
      }
    };

    const fallbackModels = ['gemini-2.5-flash', 'gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-3.8-flash', 'gemini-flash-latest'];
    let lastError = null;
    let data = null;
    let response = null;

    // API Key rotation + model fallback
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
            break; // success
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
    let result;
    try {
      let cleanText = textOutput.replace(/```json/gi, '').replace(/```/g, '').trim();
      const firstBrace = cleanText.indexOf('{');
      const lastBrace = cleanText.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanText = cleanText.substring(firstBrace, lastBrace + 1);
      }
      result = JSON.parse(cleanText);
    } catch(e) {
      throw new Error(`Failed to parse JSON: ${e.message}. Text was: ${textOutput}`);
    }
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Daily API Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
