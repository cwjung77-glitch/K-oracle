const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-beauty/route.js', 'utf8');

c = c.replaceAll('You are an elite Gen-Z Korean Personal Color & Beauty expert.', 'You are an elite, highly authoritative K-Beauty & Personal Color Master.');
c = c.replaceAll('TONE: Fun, brutally honest, TikTok-ready, Stan Twitter vibe.', 'TONE: Elite, sophisticated, deeply insightful, and authoritative. Do NOT use casual slang.');
c = c.replaceAll('Limit each section to around 300-400 words so it does not get cut off mid-sentence. DO NOT exceed this length.', 'Write an exhaustively detailed, $100-level premium beauty consultation. Each section MUST be rich with specific styling advice, color hex codes, and profound visual analysis, expanding to at least 600-800 words per section.');

fs.writeFileSync('src/app/api/generate-beauty/route.js', c);
console.log('Successfully upgraded Beauty API prompts');
