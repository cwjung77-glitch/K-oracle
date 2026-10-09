const fs = require('fs');
const path = require('path');

const beautyRoute = path.join(__dirname, 'src/app/api/generate-beauty/route.js');
let content = fs.readFileSync(beautyRoute, 'utf8');

const newPrompt = `Create a bespoke styling report. Use markdown styling (headers, bolding, lists) heavily.
Structure the report exactly like this:

[MOOD_SCORES: 80,40,90,60,50] 
(Output exactly 5 numbers representing your rating (0-100) of this tone's: Lovely, Chic, Elegant, Natural, Glamorous vibe)

[CATEGORY: Cheongdam Celebrity Match]
Which K-Pop idols or actresses share this exact skin tone and aesthetic? Give 3 examples and explain their signature styling secrets.

[CATEGORY: Signature Color Palette]
List Top 3 must-wear colors and Top 3 worst colors.
IMPORTANT: Next to every color name, you MUST provide its exact hex code in this format: [HEX: #FFB6C1]. Example: - Best 1: [HEX: #E6E6FA] Lavender.

[CATEGORY: Makeup Blueprint]
- **Base:** Dewy or matte? Which foundation shade?
- **Eye:** Eyeshadow palette recommendations (name 2 real K-beauty products).
- **Lip:** 2 real lip tint shades to buy immediately.

[CATEGORY: Accessory & Hair]
Silver, gold, or rose gold? Best hair dye color?

Language: \${isEs ? 'Spanish' : 'English'}.
CRITICAL: Limit each section to 250 words so it fits perfectly on the PDF pages. Make it sound expensive and extremely actionable.`;

content = content.replace(/Create a bespoke styling report[\s\S]*Make it sound expensive and extremely actionable.`/m, newPrompt + "`");
fs.writeFileSync(beautyRoute, content, 'utf8');
console.log('Patched generate-beauty/route.js');