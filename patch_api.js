const fs = require('fs');

const path = 'src/app/api/generate-saju/route.js';
let content = fs.readFileSync(path, 'utf8');

const injection = `const { birthData, gender, lang, plan, userName, idolName: bodyIdolName, dailyVibe } = body;

    const { getKoreanSaju } = require('../../../utils/sajuCalculator');
    let exactSajuInfo = '';
    // e.g. "1995-10-13" or "1995-10-13 14:00"
    const dateMatch = birthData.match(/(\\d{4})[-/.](\\d{1,2})[-/.](\\d{1,2})(?:\\s+(\\d{1,2}):(\\d{1,2}))?/);
    if (dateMatch) {
      const saju = getKoreanSaju(dateMatch[1], dateMatch[2], dateMatch[3], dateMatch[4], dateMatch[5]);
      if (saju) {
        exactSajuInfo = \`\\n\\nCRITICAL INSTRUCTION: Here is the user's mathematically calculated exact Saju Chart. You MUST use this exact chart for your interpretation and DO NOT calculate it yourself:\\n- Year Pillar: \${saju.yearPillar}\\n- Month Pillar: \${saju.monthPillar}\\n- Day Pillar: \${saju.dayPillar}\\n- Hour Pillar: \${saju.hourPillar}\\n- Day Master: \${saju.dayMaster}\\n\`;
      }
    }`;

content = content.replace('const { birthData, gender, lang, plan, userName, idolName: bodyIdolName, dailyVibe } = body;', injection);

// Inject into the two prompt templates
content = content.replace('User: ${userName}, gender: ${gender}, born: ${birthData}.', 'User: ${userName}, gender: ${gender}, born: ${birthData}.${exactSajuInfo}');

fs.writeFileSync(path, content);
console.log('Patched API route');
