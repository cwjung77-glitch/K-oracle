const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'scripts/generate_blog.js');
let content = fs.readFileSync(scriptPath, 'utf8');

const newRule = `

CRITICAL TERMINOLOGY RULE: You MUST strictly use Korean terminology for all astrological elements and concepts. DO NOT use Chinese Pinyin (e.g., do NOT use Bazi, Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, Gui, Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, Hai, Da Yun). 
Instead, you MUST use the corresponding Korean romanizations:
- Saju (instead of Bazi)
- Daewoon (instead of Da Yun)
- Stems: Gap (Wood), Eul (Wood), Byeong (Fire), Jeong (Fire), Mu (Earth), Gi (Earth), Gyeong (Metal), Sin (Metal), Im (Water), Gye (Water).
- Branches: Ja (Rat), Chuk (Ox), In (Tiger), Myo (Rabbit), Jin (Dragon), Sa (Snake), Oh (Horse), Mi (Goat/Sheep), Sin (Monkey), Yu (Rooster), Sul (Dog), Hae (Pig).
Ensure terms look like "Gap Wood" or "Ja Rat" and NEVER "Jia Wood" or "Zi Rat".

CRITICAL STRUCTURE RULE: Right after your "## TL;DR (Quick Answer)" section ends and before the next heading (or table), you MUST insert this exact markdown block to guide new users:

> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.
`;

if (!content.includes('CRITICAL TERMINOLOGY RULE')) {
  content = content.replace(/Required frontmatter format:/, newRule + '\nRequired frontmatter format:');
  
  const fmFix = `Required frontmatter format (Must be valid YAML, DO NOT indent keys, use valid JSON arrays for tags):
---
title: "Catchy SEO Title in English"
slug: "seo-friendly-english-url-slug"
date: "\${new Date().toISOString().split('T')[0]}"
excerpt: "A short 2-3 sentence meta description in English."
author: "K-Oracle"
tags: ["Tag1", "Tag2", "Tag3"]
---`;

  content = content.replace(/Required frontmatter format:[\s\S]*?---/, fmFix);
  
  fs.writeFileSync(scriptPath, content, 'utf8');
  console.log('Successfully updated generate_blog.js');
} else {
  console.log('Rules already added.');
}