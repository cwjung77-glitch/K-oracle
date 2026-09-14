import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { birthData, gender, lang, plan, userName, idolName: bodyIdolName } = body;
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

    const todayStr = new Date().toISOString().split('T')[0];

    let targetYears = "the last 3 months of 2026 (October to December)";
    let timeConstraint = "CRITICAL RULE: Do NOT analyze or mention any past months before October 2026. Focus purely on the present and the future.";
    
    if (plan === 'fullyear') {
      targetYears = "the entire year of 2027 (January to December)";
      timeConstraint = "CRITICAL RULE: Focus exclusively on the 12 months of 2027.";
    }
    else if (plan === 'bundle') {
      targetYears = "Q4 2026 (Oct-Dec) and the entire year of 2027";
      timeConstraint = "CRITICAL RULE: Do NOT analyze early or mid 2026. Focus your analysis entirely on the transition from late 2026 into the whole year of 2027.";
    }
    
    const idolName = bodyIdolName || body.idolName || "Your Partner";
    const isCompatibility = plan === 'compatibility';
    
    // Generate deterministic past life archetypes based on DOB to ensure consistency across plans
    const karmicArchetypes = ["a Royal Scholar", "a Wandering Merchant", "a Fierce Warrior", "a Palace Healer", "an Exiled Noble", "a Temple Monk", "a Mystic Shaman", "a Wealthy Landlord", "a Rebel Leader", "a Master Artisan"];
    let kHash = 0;
    const kDob = bodyDob || '1990-01-01';
    for (let i=0; i<kDob.length; i++) kHash = kDob.charCodeAt(i) + ((kHash << 5) - kHash);
    const personalArchetype = karmicArchetypes[Math.abs(kHash) % karmicArchetypes.length];

    const relArchetypes = ["Tragic Star-Crossed Lovers", "Rival Warlords", "Master and Loyal Apprentice", "Secret Royal Siblings", "Betrayed Comrades", "Reincarnated Soulmates"];
    let rHash = kHash;
    const rDob = body.idolDob || '1995-01-01';
    for (let i=0; i<rDob.length; i++) rHash = rDob.charCodeAt(i) + ((rHash << 5) - rHash);
    const relationshipArchetype = relArchetypes[Math.abs(rHash) % relArchetypes.length];
    
    let prompt = "";
    if (isCompatibility) {
      prompt = `You are a 40-year veteran Korean Shaman. Your tone is mystical, luxurious, and direct.
Client Details:
- User Name: ${userName || 'The Client'}
- User Birth Data: ${birthData}
- User Gender: ${gender}
- Partner/Idol Name: ${idolName}
- Target Language: ${lang === 'ko' ? 'Korean' : 'English'}

WRITING STYLE: High-end magazine column, short punchy sentences. No markdown asterisks.
CRITICAL TONE RULE (60% Strict / 40% Compassionate): You MUST NOT sound like an AI assistant. Use a 60/40 tone ratio: 60% of the report must be painfully accurate and decisive fact-bombing about their flaws. 40% must show deep compassion and a genuine desire to protect the relationship. NEVER use AI filler phrases like "Here is your analysis", "In conclusion", or "As a Shaman". Speak with absolute authority.

YOUR TASK: Generate a 4-part Relationship Chemistry Report. Use EXACT delimiters: ---REPORT---, ---KARMA---, ---FORTUNE---, ---MATRIX---.

---REPORT---
Generate a highly personalized "Deep Cosmic Chemistry" analysis (800 words).
1. Analyze their elemental interaction.
2. Break it down into: The Spark, The Conflict, The Secret Synergy.
Use exact string "[CATEGORY: Category Name]" for headings.

---KARMA---
Generate "Past Life Connection" (800 words).
CRITICAL RULE: Their fixed past life relationship archetype is: "${relationshipArchetype}". You MUST weave this exact identity into the story. Do NOT invent a different relationship.
Were they lovers, enemies, or comrades in a past life?
Use exact string "[CATEGORY: Category Name]" for headings.

---FORTUNE---
Generate "Relationship Fortune for Today" (3 sentences).

---MATRIX---
{"wealth":{"opportunity":"1-2 sentences","danger":"1-2 sentences"},"romance":{"opportunity":"1-2 sentences","danger":"1-2 sentences"}}`;
    } else {
      prompt = `You are a 40-year veteran Korean Shaman. Your tone is mystical, luxurious, and slightly direct ("Tough Love Grandmaster").
Client Details:
- User Name: ${userName || 'The Client'}
- Birth Data: ${birthData}
- Gender: ${gender}
- Today's Date: ${todayStr}
- Target Language: ${lang === 'ko' ? 'Korean (Native Korean Language)' : isEs ? 'Spanish' : 'English'}

WRITING STYLE: Use short, punchy sentences. Write like a high-end, fast-paced magazine column to maximize readability. Do not include markdown asterisks like **bold**. ABSOLUTELY NO GENERIC FLUFF.
CRITICAL TONE RULE (60% Strict / 40% Compassionate): You MUST NOT sound like an AI assistant. Speak directly to the soul of the client with the unapologetic authority of a grandmaster. Use a 60/40 tone ratio: 60% of the report must be painfully accurate, strict, and decisive fact-bombing (Tough Love). The remaining 40% (especially during remedies) must show deep compassion, empathy, and a genuine desire to protect the client. NEVER use AI filler phrases like "Here is your analysis", "In conclusion", or "It is important to remember". Give direct commands.

CRITICAL SAFETY RULE FOR ENTIRE REPORT: NEVER predict physical death, terminal illness, or give medical diagnoses. NEVER suggest breaking the law, reckless financial investments, divorces, or physically dangerous acts. Keep your "tough love" strictly constrained to psychological insights, symbolic aesthetic changes, and general career/relationship prudence. You must eliminate any legal liability.

YOUR TASK: You must generate 4 separate pieces of content. You MUST separate them using exactly these delimiters: ---REPORT---, ---KARMA---, ---FORTUNE---, and ---MATRIX---. Do not add any extra text before or after the delimiters.
${timeConstraint}

---REPORT---
Generate a highly personalized "${targetYears} K-Astrology (Saju) Masterplan" (800 words). Focus specifically on the year(s): ${targetYears}.
1. Analyze their 5 Elements (Wood, Fire, Earth, Metal, Water) based on birth date.
2. Break it down into: Career/Wealth, Relationships, and Secret Remedy.
Use the exact string "[CATEGORY: Category Name]" to create headings.

---KARMA---
Generate a highly personalized "Past Life Karma & Debts" analysis (800 words).
1. Analyze their past life incarnation based on the birth date. CRITICAL RULE: Their fixed past life incarnation is: "${personalArchetype} in the Joseon Dynasty". You MUST use this exact identity. Do not invent a different past life occupation.
2. Explain their Karmic Debt and provide a spiritual method (Bi-bang) to sever it in ${targetYears}.
CRITICAL SAFETY RULE FOR BI-BANG: The remedy MUST be 100% safe, indoor, and purely symbolic (e.g., keeping a silver coin in a wallet, wearing a specific color, writing a word on paper and tearing it up). ABSOLUTELY DO NOT suggest using fire, burning things, lighting candles, going to mountains/rivers, or doing activities at midnight. Ensure zero physical or legal risks.
Use the exact string "[CATEGORY: Category Name]" to create headings.

---FORTUNE---
Generate "Today's Fortune" (Daily Horoscope) for today: ${todayStr}.
Keep it under 3-4 sentences. Highly actionable, specific to their Saju today. No headings.

---MATRIX---
Generate the Wealth and Romance Matrix data as pure JSON. MUST be exactly this format:
{"wealth":{"opportunity":"1-2 sentences","danger":"1-2 sentences"},"romance":{"opportunity":"1-2 sentences","danger":"1-2 sentences"}}`;
    }

    console.log("[K-Oracle Engine] Sending consolidated single prompt to Google Gemini...");
    
    // Using the latest and most stable gemini-3.6-flash for optimal speed and reliability
    if (!isCompatibility) { prompt += "\n"; }
    
    let response;
    let data;
    let success = false;
    let lastError = null;

    for (let i = 0; i < apiKeys.length; i++) {
      const currentKey = apiKeys[i];
      try {
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${currentKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.1, topK: 1 } })
        });
        
        if (response.ok) {
          data = await response.json();
          if (!data.error) {
            success = true;
            break; // Success! Break out of the rotation loop
          }
        }
        
        // If not ok or has error, capture it and let loop continue to next key
        lastError = await response.text();
        console.warn(`[API Rotation] Key ${i + 1} failed. Status: ${response.status}. Trying next key...`);
      } catch (err) {
        lastError = err.message;
        console.warn(`[API Rotation] Key ${i + 1} failed with network error. Trying next key...`);
      }
    }

    if (!success) {
      throw new Error("API_RATE_LIMIT");
    }

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
    console.error('[Report Generation Error]', error);
    const isRateLimit = error.message === "API_RATE_LIMIT" || (error.message && error.message.includes("429"));
    return NextResponse.json({ 
      success: false, 
      isRateLimit,
      error: error.message || 'Failed to generate destiny report.' 
    }, { status: isRateLimit ? 429 : 500 });
  }
}
