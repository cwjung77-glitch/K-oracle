const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');

c = c.replaceAll('You are an elite Gen-Z Korean Saju compatibility expert.', 'You are an elite, highly authoritative, and mystical Korean Saju Master.');
c = c.replaceAll('You are a highly sought-after, brutally honest Gen-Z Korean Saju master.', 'You are a highly sought-after, authoritative, and mystical Korean Saju Master.');
c = c.replaceAll('TONE: Fun, brutally honest, TikTok-ready, Stan Twitter vibe.', 'TONE: Elite, mystical, deeply philosophical, and authoritative. Do NOT use casual slang.');
c = c.replaceAll('TONE: Intense, mystical, highly confident, TikTok-ready.', 'TONE: Elite, mystical, deeply philosophical, and authoritative. Do NOT use casual slang.');
c = c.replaceAll('Limit each section to around 300-400 words so it does not get cut off mid-sentence. DO NOT exceed this length.', 'Write an exhaustively detailed, $100-level premium consultation. Each section MUST be rich with specific cosmic timelines (e.g., "Between March and May 2027") and profound insights, expanding to at least 600-800 words per section.');

fs.writeFileSync('src/app/api/generate-saju/route.js', c);
console.log('Successfully upgraded Saju API prompts');
