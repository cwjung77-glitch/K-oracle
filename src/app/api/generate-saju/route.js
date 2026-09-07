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
Keep the total response under 300 words. Format with clear paragraphs. Do not include markdown asterisks like **bold**.`;

    console.log("[AI Engine] Sending prompt to Google Gemini 1.5 Flash...");
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
    return NextResponse.json({ success: false, error: 'Failed to generate destiny report.' }, { status: 500 });
  }
}
