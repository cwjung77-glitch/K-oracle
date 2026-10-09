const fs = require('fs');
const path = require('path');

const routePath = path.join(__dirname, 'src/app/api/generate-saju/route.js');
let code = fs.readFileSync(routePath, 'utf8');

const oldPersonalPrompt = \Output exactly TWO sections separated by '|||': CRITICAL: You must complete your response fully. Limit each section to around 300-400 words so it does not get cut off mid-sentence. DO NOT exceed this length. Ensure the ||| separator is always present.
Section 1: "26+27 VIP Masterplan" (Markdown). Break down their Day Master. Give specific month-by-month predictions for Q4 2026 and early 2027.
|||
Section 2: "Hidden Karma & Love Matrix" (Markdown). Reveal dark truths about their wealth potential and romantic red flags.\;

const newPersonalPrompt = \Output exactly TWO sections separated by '|||': CRITICAL: You must complete your response fully. Limit each section to around 300-400 words so it does not get cut off mid-sentence. DO NOT exceed this length. Ensure the ||| separator is always present.

Section 1 MUST begin with the following exact data markers before the markdown text:
[ARCHETYPE: A poetic English title for their Day Master, e.g., The Roaring Fire, The Silent Mountain, The Fertile Valley]
[POETIC_HOOK: 2 sentences of highly evocative, emotional, and poetic blessing/warning based on their chart]
[ELEMENTS: Wood XX%, Fire XX%, Earth XX%, Metal XX%, Water XX%] (Must exactly sum to 100%)

Section 1: "26+27 VIP Masterplan" (Markdown). Break down their Day Master. Give specific month-by-month predictions for Q4 2026 and early 2027.
|||
Section 2: "Hidden Karma & Love Matrix" (Markdown). Reveal dark truths about their wealth potential and romantic red flags.\;

if (code.includes(oldPersonalPrompt)) {
  code = code.replace(oldPersonalPrompt, newPersonalPrompt);
  fs.writeFileSync(routePath, code, 'utf8');
  console.log('Updated generate-saju prompt.');
} else {
  console.log('Could not find prompt to replace.');
}