import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { birthData, gender, lang } = body;
    const isEs = lang === 'es';

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("No Gemini API key found, falling back to mock.");
      // Fallback
      return NextResponse.json({ 
        success: true, 
        reportText: isEs ? "Faltan claves de API. Este es un texto de prueba." : "API keys are missing. This is fallback text.",
        pdfUrl: ""
      });
    }

    const prompt = `You are a 40-year veteran Korean Shaman. Your tone is mystical, luxurious, and slightly direct ("Tough Love Grandmaster").
You are generating a highly personalized "2027 K-Astrology (Saju) Masterplan" for a client.
Client Details:
- Birth Data: ${birthData}
- Gender: ${gender}
- Target Language: ${isEs ? 'Spanish' : 'English'}

Instructions:
1. Briefly analyze their 5 Elements (Wood, Fire, Earth, Metal, Water) based on their birth date (create a mystical interpretation).
2. Give a direct, "tough love" warning about a specific karma or danger in 2027.
3. Provide a warm, specific remedy (Bi-bang) involving a color, an action, or a lucky number.
Generate a highly detailed, 800-word analysis worthy of a $4.99 premium report. ABSOLUTELY NO GENERIC FLUFF or filler words. You must provide HYPER-SPECIFIC, actionable insights. Break it down into: 1. Career/Wealth (Specific months to exercise caution or seize opportunities, WITHOUT giving direct financial commands), 2. Relationships (Specific energetic dynamics to watch out for), 3. Secret Remedy (Exact daily habits or colors). IMPORTANT LEGAL RULE: Never give direct financial, medical, or legal commands (e.g., "cancel this contract"). Frame everything as "energetic tendencies" or "spiritual advice" to avoid legal liability. Every single sentence must provide explosive value to the user. Format with clear paragraphs. Do not include markdown asterisks like **bold**.`;

    console.log("[AI Engine] Sending prompt to Google Gemini 1.5 Flash...");
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Gemini API Error: ${errorData}`);
    }

    const data = await response.json();
    let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No text generated from Gemini");
    }

    // Clean up asterisks if Gemini adds them
    generatedText = generatedText.replace(/\*\*/g, '');

    return NextResponse.json({ 
      success: true, 
      reportText: generatedText,
      pdfUrl: ""
    });

  } catch (error) {
    console.error('[AI Generation Error]', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to generate destiny report.' }, { status: 500 });
  }
}







