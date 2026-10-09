const fs = require('fs');
const path = require('path');

const antiBotRule = `\n  HUMAN-LIKE WRITING RULE: You must write in a highly engaging, natural, and passionate tone as if a real human expert is speaking directly to the user. You MUST completely avoid typical AI transition phrases and filler words (such as "In conclusion", "Moreover", "Let us dive into", "Ultimately", "It is important to remember"). Use varied sentence lengths and a dynamic, conversational pacing to bypass all AI text detectors.`;

function patchApiFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes("HUMAN-LIKE WRITING RULE:")) return;

  if (filePath.includes('generate-saju')) {
    content = content.replace(/TONE: Fun, brutally honest, TikTok-ready, Stan Twitter vibe./g, "TONE: Fun, brutally honest, TikTok-ready, Stan Twitter vibe." + antiBotRule);
    content = content.replace(/TONE: Intense, mystical, highly confident, TikTok-ready./g, "TONE: Intense, mystical, highly confident, TikTok-ready." + antiBotRule);
  }
  
  if (filePath.includes('generate-daily')) {
    content = content.replace(/TONE: Blunt, direct, Gen-Z. NO AI phrases like "cosmic energy brings" or "embrace"./g, 'TONE: Blunt, direct, Gen-Z. NO AI phrases like "cosmic energy brings" or "embrace".' + antiBotRule);
  }

  if (filePath.includes('generate-beauty')) {
    content = content.replace(/Your tone is chic, luxurious, and highly professional./g, "Your tone is chic, luxurious, and highly professional." + antiBotRule);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Patched ${path.basename(filePath)}`);
}

patchApiFile(path.join(__dirname, 'src/app/api/generate-saju/route.js'));
patchApiFile(path.join(__dirname, 'src/app/api/generate-daily/route.js'));
patchApiFile(path.join(__dirname, 'src/app/api/generate-beauty/route.js'));