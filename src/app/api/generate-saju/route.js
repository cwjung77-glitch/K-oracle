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

    const basePrompt = `You are a 40-year veteran Korean Shaman. Your tone is mystical, luxurious, and slightly direct ("Tough Love Grandmaster").
Client Details:
- Birth Data: ${birthData}
- Gender: ${gender}
- Target Language: ${lang === 'ko' ? 'Korean (Native Korean Language)' : isEs ? 'Spanish' : 'English'}

WRITING STYLE: Use short, punchy sentences. Avoid long, boring academic text. Write like a high-end, fast-paced magazine column to maximize readability. Format with clear, short paragraphs and plenty of line breaks. Do not include markdown asterisks like **bold**. ABSOLUTELY NO GENERIC FLUFF. Every sentence must provide explosive value.`;

    const prompt1 = `${basePrompt}
TASK 1: Generate a highly personalized "2027 K-Astrology (Saju) Masterplan" (800 words).
1. Analyze their 5 Elements (Wood, Fire, Earth, Metal, Water) based on birth date.
2. Break it down into: Career/Wealth (specific months), Relationships, and Secret Remedy.
IMPORTANT FORMATTING RULE: You MUST use the exact string "[CATEGORY: Category Name]" to create headings for different sections.
Example:
[CATEGORY: The Wealth Matrix]
(your text here)
[CATEGORY: The Crimson String]
(your text here)
[CATEGORY: The Secret Remedy]
(your text here)

IMPORTANT LEGAL RULE: Never give direct financial, medical, or legal commands. Frame as "energetic tendencies".`;

    const prompt2 = `${basePrompt}
TASK 2: Generate a highly personalized "Past Life Karma & Debts" analysis (800 words).
1. Analyze their past life incarnation based on the birth date. Create a vivid, cinematic description of their past life.
2. Explain what specific Karmic Debt they carried over into this current life (2027). Why are they facing their current struggles?
3. Provide a spiritual method (Bi-bang) to sever or repay this karmic debt in 2027.
IMPORTANT FORMATTING RULE: You MUST use the exact string "[CATEGORY: Category Name]" to create headings for different sections.
Example:
[CATEGORY: Past Life Incarnation]
(your text here)
[CATEGORY: The Karmic Debt]
(your text here)
[CATEGORY: The Spiritual Solution]
(your text here)`;

        const prompt3 = `${basePrompt}
TASK 3: Generate the Wealth and Romance Matrix data as pure JSON.
You must return ONLY a JSON object exactly matching this structure, with no markdown code blocks around it:
{
  "wealth": { "opportunity": "[1-2 sentences]", "danger": "[1-2 sentences]" },
  "romance": { "opportunity": "[1-2 sentences]", "danger": "[1-2 sentences]" }
}
Do not write anything else. Write in ${lang === 'ko' ? 'Korean' : 'English'}.`;

    console.log("[AI Engine] Sending parallel prompts to Google Gemini 3.5 Flash...");
    
    const fetchGemini = async (promptText) => {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });
      if (!response.ok) throw new Error(`Gemini API Error: ${await response.text()}`);
      const data = await response.json();
      return (data.candidates?.[0]?.content?.parts?.[0]?.text || "").replace(/\*\*/g, '');
    };

    const [reportText, karmaText, matrixResponse] = await Promise.all([
      fetchGemini(prompt1),
      fetchGemini(prompt2),
      fetchGemini(prompt3)
    ]);
    
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

    if (!reportText || !karmaText) throw new Error("No text generated from Gemini");

    return NextResponse.json({ 
      success: true, 
      reportText: reportText,
      karmaText: karmaText,
      matrixData: matrixData,
      pdfUrl: ""
    });

  } catch (error) {
    console.error('[AI Generation Error]', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to generate destiny report.' }, { status: 500 });
  }
}
