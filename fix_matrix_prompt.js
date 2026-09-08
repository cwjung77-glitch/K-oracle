const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');

const prompt3 = `    const prompt3 = \`\${basePrompt}
TASK 3: Generate the Wealth and Romance Matrix data as pure JSON.
You must return ONLY a JSON object exactly matching this structure, with no markdown code blocks around it:
{
  "wealth": { "opportunity": "[1-2 sentences]", "danger": "[1-2 sentences]" },
  "romance": { "opportunity": "[1-2 sentences]", "danger": "[1-2 sentences]" }
}
Do not write anything else. Write in \${lang === 'ko' ? 'Korean' : 'English'}.\`;`;

c = c.replace(/console\.log\("\[AI Engine\] Sending parallel prompts/, prompt3 + '\n\n    console.log("[AI Engine] Sending parallel prompts');

const promiseAll = `const [reportText, karmaText, matrixResponse] = await Promise.all([
      fetchGemini(prompt1),
      fetchGemini(prompt2),
      fetchGemini(prompt3)
    ]);
    
    let matrixData = null;
    try {
      matrixData = JSON.parse(matrixResponse.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim());
    } catch(e) {
      console.error('Failed to parse matrix JSON:', e);
      matrixData = { 
        wealth: { opportunity: 'Matrix data failed to generate.', danger: 'Please check logs.' },
        romance: { opportunity: 'Matrix data failed to generate.', danger: 'Please check logs.' }
      };
    }`;

c = c.replace(/const \[reportText, karmaText\] = await Promise\.all\(\[\n\s*fetchGemini\(prompt1\),\n\s*fetchGemini\(prompt2\)\n\s*\]\);/, promiseAll);

c = c.replace(/karmaText: karmaText,/, 'karmaText: karmaText,\n      matrixData: matrixData,');

fs.writeFileSync('src/app/api/generate-saju/route.js', c);
