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
    const GEMINI_API_KEY = apiKeys[0]; // just use the first one

    const todayStr = new Date().toISOString().split('T')[0];
    
    // Pick random idol and cosmetic brand for variety
    const idols = ["Jungkook (BTS)", "Lisa (BLACKPINK)", "Felix (Stray Kids)", "Karina (aespa)", "Eunwoo (ASTRO)", "Wonyoung (IVE)"];
    const cosmetics = ["Rom&nd", "Clio", "3CE", "Peripera", "ETUDE", "Unleashia"];
    const randomIdol = idols[Math.floor(Math.random() * idols.length)];
    const randomBrand = cosmetics[Math.floor(Math.random() * cosmetics.length)];

    const systemPrompt = `You are an expert Korean Saju master and K-Beauty stylist.
    The user (${userName}, gender: ${gender}, born: ${birthData}) wants a quick daily fortune for today (${todayStr}).
    You MUST output valid JSON with exactly these keys:
    {
      "score": <integer from 1 to 100>,
      "vibe": "<2-3 engaging sentences describing today's cosmic energy for them>",
      "luckyColor": "<A specific color name, e.g., 'Rose Pink'>",
      "luckyItem": "<A specific makeup item from ${randomBrand} matching the luckyColor>",
      "idolMatch": "<Why they are energetically aligned with ${randomIdol} today in 1 sentence>"
    }
    Language: ${isEs ? 'Spanish' : 'English'}. Be mystical, trendy, and encouraging. Use valid JSON only, no markdown blocks.`;

    const requestBody = {
      contents: [{
        parts: [{ text: systemPrompt }]
      }],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500,
        responseMimeType: "application/json"
      }
    };

    const fallbackModels = ['gemini-3.7-flash', 'gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];
    let lastError = null;
    let data = null;
    let response = null;

    for (const currentModel of fallbackModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${GEMINI_API_KEY}`;
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

    if (!response || !response.ok) {
        throw new Error(`Gemini API error after retries: ${JSON.stringify(lastError)}`);
    }
    
    const textOutput = data.candidates[0].content.parts[0].text;
    let result;
    try {
      const cleanText = textOutput.replace(/```json/gi, '').replace(/```/g, '').trim();
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
