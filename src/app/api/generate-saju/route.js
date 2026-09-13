import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { birthData, gender, lang } = body;
    const isEs = lang === 'es';

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("No Gemini API key found, falling back to mock.");
      return NextResponse.json({ 
        success: true, 
        reportText: "API keys are missing. This is fallback text.",
        karmaText: "API keys are missing. This is fallback karma text.",
        pdfUrl: ""
      });
    }

    const todayStr = new Date().toISOString().split('T')[0];

    const prompt = `You are a 40-year veteran Korean Shaman. Your tone is mystical, luxurious, and slightly direct ("Tough Love Grandmaster").
Client Details:
- Birth Data: ${birthData}
- Gender: ${gender}
- Today's Date: ${todayStr}
- Target Language: ${lang === 'ko' ? 'Korean (Native Korean Language)' : isEs ? 'Spanish' : 'English'}

WRITING STYLE: Use short, punchy sentences. Avoid long, boring academic text. Write like a high-end, fast-paced magazine column to maximize readability. Format with clear, short paragraphs and plenty of line breaks. Do not include markdown asterisks like **bold**. ABSOLUTELY NO GENERIC FLUFF. Every sentence must provide explosive value.

YOUR TASK: You must generate 4 separate pieces of content. You MUST separate them using exactly these delimiters: ---REPORT---, ---KARMA---, ---FORTUNE---, and ---MATRIX---. Do not add any extra text before or after the delimiters.

---REPORT---
Generate a highly personalized "2027 K-Astrology (Saju) Masterplan" (800 words).
1. Analyze their 5 Elements (Wood, Fire, Earth, Metal, Water) based on birth date.
2. Break it down into: Career/Wealth, Relationships, and Secret Remedy.
Use the exact string "[CATEGORY: Category Name]" to create headings.

---KARMA---
Generate a highly personalized "Past Life Karma & Debts" analysis (800 words).
1. Analyze their past life incarnation based on the birth date.
2. Explain their Karmic Debt and provide a spiritual method (Bi-bang) to sever it in 2027.
Use the exact string "[CATEGORY: Category Name]" to create headings.

---FORTUNE---
Generate "Today's Fortune" (Daily Horoscope) for today: ${todayStr}.
Keep it under 3-4 sentences. Highly actionable, specific to their Saju today. No headings.

---MATRIX---
Generate the Wealth and Romance Matrix data as pure JSON. MUST be exactly this format:
{"wealth":{"opportunity":"1-2 sentences","danger":"1-2 sentences"},"romance":{"opportunity":"1-2 sentences","danger":"1-2 sentences"}}`;

    console.log("[AI Engine] Sending consolidated single prompt to Google Gemini...");
    
    // We can use gemini-1.5-flash as it is much more stable and is the actual model name.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.1, topK: 1 } })
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("API_RATE_LIMIT");
      }
      throw new Error(`Gemini API Error: ${await response.text()}`);
    }

    const data = await response.json();
    const fullText = (data.candidates?.[0]?.content?.parts?.[0]?.text || "").replace(/\*\*/g, '');

    // Parse the sections using the delimiters
    const parts = fullText.split(/---(?:REPORT|KARMA|FORTUNE|MATRIX)---/).map(s => s.trim());
    
    // parts[0] is usually empty (before ---REPORT---)
    // parts[1] = REPORT
    // parts[2] = KARMA
    // parts[3] = FORTUNE
    // parts[4] = MATRIX
    
    let reportText = parts[1] || "Error generating report.";
    let karmaText = parts[2] || "Error generating karma.";
    let dailyFortune = parts[3] || "Error generating daily fortune.";
    let matrixResponse = parts[4] || "{}";

    let matrixData = null;
    try {
      matrixData = JSON.parse(matrixResponse.replace(/```json/g, '').replace(/```/g, '').trim());
    } catch(e) {
      console.error('Failed to parse matrix JSON:', e);
      matrixData = { 
        wealth: { opportunity: 'Matrix data failed to generate.', danger: 'Please check logs.' },
        romance: { opportunity: 'Matrix data failed to generate.', danger: 'Please check logs.' }
      };
    }

    return NextResponse.json({ 
      success: true, 
      reportText,
      karmaText,
      matrixData,
      dailyFortune,
      pdfUrl: ""
    });

  } catch (error) {
    console.error('[AI Generation Error]', error);
    const isRateLimit = error.message === "API_RATE_LIMIT" || (error.message && error.message.includes("429"));
    return NextResponse.json({ 
      success: false, 
      isRateLimit,
      error: error.message || 'Failed to generate destiny report.' 
    }, { status: isRateLimit ? 429 : 500 });
  }
}
