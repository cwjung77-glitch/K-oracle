const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');

if (!c.includes("plan === 'compatibility'")) {
  c = c.replace(
    /const prompt = \`You are a 40-year veteran Korean Shaman\./,
    `const idolName = body.idolName || "Your Partner";
    
    if (plan === 'compatibility') {
      const prompt = \`You are a 40-year veteran Korean Shaman. Your tone is mystical, luxurious, and direct.
Client Details:
- User Birth Data: \${birthData}
- User Gender: \${gender}
- Partner/Idol Name: \${idolName}
- Target Language: \${lang === 'ko' ? 'Korean' : isEs ? 'Spanish' : 'English'}

WRITING STYLE: High-end magazine column, short punchy sentences. No markdown asterisks.

YOUR TASK: Generate a 4-part Relationship Chemistry Report. Use EXACT delimiters: ---REPORT---, ---KARMA---, ---FORTUNE---, ---MATRIX---.

---REPORT---
Generate a highly personalized "Deep Cosmic Chemistry" analysis (800 words).
1. Analyze their elemental interaction.
2. Break it down into: The Spark, The Conflict, The Secret Synergy.
Use exact string "[CATEGORY: Category Name]" for headings.

---KARMA---
Generate "Past Life Connection" (800 words).
Were they lovers, enemies, or comrades in a past life?
Use exact string "[CATEGORY: Category Name]" for headings.

---FORTUNE---
Generate "Relationship Fortune for Today" (3 sentences).

---MATRIX---
{"wealth":{"opportunity":"1-2 sentences","danger":"1-2 sentences"},"romance":{"opportunity":"1-2 sentences","danger":"1-2 sentences"}}\`;

      console.log("[AI Engine] Sending Compatibility prompt to Google Gemini...");
      const response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=\${apiKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.2, topK: 1 } })
      });
      // ... Rest handled below by standard flow
    }
    
    const prompt = \`You are a 40-year veteran Korean Shaman.`
  );
  
  c = c.replace(
    /const response = await fetch\(`https:\/\/generativelanguage\.googleapis\.com\/v1beta\/models\/gemini-3\.8-flash:generateContent\?key=\$\{apiKey\}`/g,
    `let response;\n      if (plan !== 'compatibility') { response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=\${apiKey}\``
  );
  
  c = c.replace(
    /body: JSON\.stringify\(\{ contents: \[\{ parts: \[\{ text: prompt \}\] \}\], generationConfig: \{ temperature: 0\.1, topK: 1 \} \}\)\n\s*\}\);/,
    `body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.1, topK: 1 } })\n      }); }`
  );
  
  fs.writeFileSync('src/app/api/generate-saju/route.js', c);
}
