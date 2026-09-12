const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');

c = c.replace(
  /const prompt3 = \`\$\{basePrompt\}/,
  `const todayStr = new Date().toISOString().split('T')[0];
    const prompt4 = \\\`\${basePrompt}
TASK 4: Generate "Today's Fortune" (Daily Horoscope) for today: \${todayStr}.
Keep it under 3-4 sentences. It must be highly actionable, slightly mystical, and specific to their Saju on this exact day.
Return ONLY the text of the fortune. No formatting, no headings. Write in \${lang === 'ko' ? 'Korean' : 'English'}.\\\`;

    const prompt3 = \\\`\${basePrompt}`
);

c = c.replace(
  /const \[reportText, karmaText, matrixResponse\] = await Promise\.all\(\[\n\s*fetchGemini\(prompt1\),\n\s*fetchGemini\(prompt2\),\n\s*fetchGemini\(prompt3\)\n\s*\]\);/,
  `const [reportText, karmaText, matrixResponse, dailyFortune] = await Promise.all([
      fetchGemini(prompt1),
      fetchGemini(prompt2),
      fetchGemini(prompt3),
      fetchGemini(prompt4)
    ]);`
);

c = c.replace(
  /matrixData: matrixData,\n\s*pdfUrl: ""/,
  `matrixData: matrixData,
      dailyFortune: dailyFortune,
      pdfUrl: ""`
);

fs.writeFileSync('src/app/api/generate-saju/route.js', c);
