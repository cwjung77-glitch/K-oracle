import fs from 'fs';
let content = fs.readFileSync('scheduler_blogger.mjs', 'utf8');

const oldPrompt = `   - ## Conclusion
5. TONE:`;

const newPrompt = `   - ## Conclusion
5. GLOSSARY LINK: Always include this exact quote block right after the TL;DR section:
> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.
6. TONE:`;

content = content.replace(oldPrompt, newPrompt);
content = content.replace(`6. MANDATORY DISCLAIMER`, `7. MANDATORY DISCLAIMER`);
fs.writeFileSync('scheduler_blogger.mjs', content);
