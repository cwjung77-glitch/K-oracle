const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');

const newPrompt1 = `const prompt1 = \`\${basePrompt}
TASK 1: Generate a highly personalized "2027 K-Astrology (Saju) Masterplan" (800 words).
1. Analyze their 5 Elements (Wood, Fire, Earth, Metal, Water) based on birth date.
2. Break it down into: Career/Wealth (specific months), Relationships, and Secret Remedy.
IMPORTANT FORMATTING RULE: You MUST use the exact string "[CATEGORY: Category Name]" to create headings for different sections.
Example:
[CATEGORY: The Wealth Matrix]
(your text here)
[CATEGORY: The Crimson String]
(your text here)
[CATEGORY: The Secret Remedy]
(your text here)

IMPORTANT LEGAL RULE: Never give direct financial, medical, or legal commands. Frame as "energetic tendencies".\`;`;

const newPrompt2 = `const prompt2 = \`\${basePrompt}
TASK 2: Generate a highly personalized "Past Life Karma & Debts" analysis (800 words).
1. Analyze their past life incarnation based on the birth date. Create a vivid, cinematic description of their past life.
2. Explain what specific Karmic Debt they carried over into this current life (2027). Why are they facing their current struggles?
3. Provide a spiritual method (Bi-bang) to sever or repay this karmic debt in 2027.
IMPORTANT FORMATTING RULE: You MUST use the exact string "[CATEGORY: Category Name]" to create headings for different sections.
Example:
[CATEGORY: Past Life Incarnation]
(your text here)
[CATEGORY: The Karmic Debt]
(your text here)
[CATEGORY: The Spiritual Solution]
(your text here)\`;`;

c = c.replace(/const prompt1 = `[\s\S]*?energetic tendencies"\.`;/, newPrompt1);
c = c.replace(/const prompt2 = `[\s\S]*?in 2027\.`;/, newPrompt2);

fs.writeFileSync('src/app/api/generate-saju/route.js', c);
