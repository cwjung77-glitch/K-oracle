const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');

c = c.replace(
  /const prompt = \`You are a 40-year veteran Korean Shaman\. Your tone is mystical, luxurious, and slightly direct \(\"Tough Love Grandmaster\"\)\./,
  `const idolName = body.idolName || "Your Partner";
    const isCompatibility = plan === 'compatibility';
    
    let prompt = "";
    if (isCompatibility) {
      prompt = \`You are a 40-year veteran Korean Shaman. Your tone is mystical, luxurious, and direct.
Client Details:
- User Birth Data: \${birthData}
- User Gender: \${gender}
- Partner/Idol Name: \${idolName}
- Target Language: \${lang === 'ko' ? 'Korean' : 'English'}

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
    } else {
      prompt = \`You are a 40-year veteran Korean Shaman. Your tone is mystical, luxurious, and slightly direct ("Tough Love Grandmaster").`
);

c = c.replace(
  /const response = await fetch/,
  `if (!isCompatibility) { prompt += "\\n"; }
      const response = await fetch`
);

fs.writeFileSync('src/app/api/generate-saju/route.js', c);
