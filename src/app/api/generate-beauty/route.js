import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { tone, lang } = body;
    const isEs = lang === 'es';

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("No Gemini API key found, falling back to mock.");
      return NextResponse.json({ success: false, error: "API Key missing" }, { status: 500 });
    }

    console.log(`[AI Engine] Generating Premium Beauty Report for tone: ${tone}, lang: ${lang} using 'Cheongdam Stylist' Persona...`);
    
    const prompt = `You are an elite Cheongdam-dong celebrity stylist in Seoul. Your tone is chic, luxurious, and highly professional.
Client Details:
- Personal Color Tone: ${tone}
- Target Language: ${lang === 'ko' ? 'Korean (Native Korean Language)' : isEs ? 'Spanish' : 'English'}

Instructions:
Generate a highly detailed, 800-word "K-Beauty Styling Masterplan" for this specific personal color tone.
Break it down into: 1. Your Natural Aura (Vibe), 2. The Wardrobe Strategy (Best/Worst fabrics and colors), 3. Signature Makeup & Hair (Specific shades, bleach levels).

IMPORTANT FORMATTING RULE: You MUST use the exact string "[CATEGORY: Category Name]" to create headings for different sections.
Example:
[CATEGORY: Your Natural Aura]
(your text here)
[CATEGORY: The Wardrobe Strategy]
(your text here)
[CATEGORY: Signature Makeup & Hair]
(your text here)

WRITING STYLE: Use short, punchy sentences. Avoid long academic text. Write like a high-end fashion magazine column. ABSOLUTELY NO GENERIC FLUFF. Do not use markdown asterisks.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("API_RATE_LIMIT");
      }
      throw new Error(`Gemini API Error: ${await response.text()}`);
    }

    const aiResult = await response.json();
    const generatedText = (aiResult.candidates?.[0]?.content?.parts?.[0]?.text || "").replace(/\*\*/g, '');

    // Keep the structured mock data for the React UI to prevent breakage
    let aiData = {};
    if (lang === 'es') {
      aiData = {
        wardrobe: {
          dos: ["Usa bloques de color de alto contraste.", "Materiales como seda y satén.", "Blanco puro o negro azabache."],
          donts: ["Evita tonos tierra opacos.", "Lino áspero puede hacerte lucir cansada.", "Evita patrones florales pequeños."]
        },
        hair: { targetShade: "Azul Ceniza Negro", bleachLevel: "Nivel 6-7 (Sin amarillo)", tonerFormula: "Base violeta" }
      };
    } else {
      aiData = {
        wardrobe: {
          dos: ["Use high-contrast color blocking.", "Silk and satin materials.", "Pure white or pitch black."],
          donts: ["Avoid muddy, muted earth tones.", "Rough linen can make you look tired.", "Avoid small floral patterns."]
        },
        hair: { targetShade: "Ash Blue Black", bleachLevel: "Level 6-7 (No yellow)", tonerFormula: "Violet base to cancel brass" }
      };
    }
    
    // Inject the generated text into the data payload so the PDF route can use it
    aiData.reportText = generatedText;

    return NextResponse.json({ 
      success: true, 
      data: aiData,
      pdfUrl: ""
    });

  } catch (error) {
    console.error('[AI Generation Error]', error);
    return NextResponse.json({ success: false, error: 'Failed to generate beauty report.' }, { status: 500 });
  }
}
