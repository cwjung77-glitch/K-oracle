import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { tone, lang } = body;

    // Simulate LLM Processing time (3 seconds)
    console.log(`[AI Engine] Generating Premium Beauty Report for tone: ${tone}, lang: ${lang} using 'Cheongdam Stylist' Persona...`);
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock LLM Response for MVP (Structured JSON because the UI needs lists and fields)
    let aiData = {};

    if (lang === 'es') {
      aiData = {
        wardrobe: {
          dos: [
            "Usa bloques de color de alto contraste para tu atuendo principal.",
            "Materiales como seda, satén y cuero maximizan tu aura natural.",
            "Opta por blanco puro o negro azabache para camisetas básicas."
          ],
          donts: [
            "Evita tonos tierra opacos (caqui, oliva) cerca de tu rostro.",
            "Lino áspero o telas muy desgastadas pueden hacerte lucir cansada.",
            "Evita patrones florales pequeños y complejos."
          ]
        },
        hair: {
          targetShade: "Azul Ceniza Negro / Ciruela Profundo",
          bleachLevel: "Nivel 6-7 (Sin amarillo)",
          tonerFormula: "Base violeta para cancelar tonos cobrizos"
        }
      };
    } else {
      aiData = {
        wardrobe: {
          dos: [
            "Use high-contrast color blocking for your main outfit.",
            "Silk, satin, and leather materials maximize your natural aura.",
            "Opt for pure white or pitch black for basic tees."
          ],
          donts: [
            "Avoid muddy, muted earth tones (khaki, olive) near your face.",
            "Rough linen or heavily distressed fabrics can make you look tired.",
            "Avoid small, complex floral patterns."
          ]
        },
        hair: {
          targetShade: "Ash Blue Black / Deep Plum",
          bleachLevel: "Level 6-7 (No yellow)",
          tonerFormula: "Violet base to cancel brass"
        }
      };
    }
    
    const mockPdfUrl = 'https://k-oracle-assets.s3.amazonaws.com/mock_premium_beauty_report.pdf';

    return NextResponse.json({ 
      success: true, 
      data: aiData,
      pdfUrl: mockPdfUrl
    });

  } catch (error) {
    console.error('[AI Generation Error]', error);
    return NextResponse.json({ success: false, error: 'Failed to generate beauty report.' }, { status: 500 });
  }
}
