const fs = require('fs');
const path = require('path');

async function main() {
  const promptTopic = process.argv[2];
  if (!promptTopic) {
    console.error("Please provide a topic. Example: node generate_blog.js '釉붾옓?묓겕 ?쒕땲 ?ъ＜'");
    process.exit(1);
  }

  // Read API Key from .env.local
  let apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    try {
      const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
      const match = envFile.match(/GEMINI_API_KEY=(.+)/);
      if (match) apiKey = match[1].trim();
    } catch(e) {
      // ignore
    }
  }

  if (!apiKey) {
    console.error("GEMINI_API_KEY not found in .env.local or environment variables.");
    process.exit(1);
  }

  console.log(`Generating SEO blog post for topic: "${promptTopic}"...`);

  const systemPrompt = `You are an expert SEO content writer and Korean Saju (Four Pillars of Destiny) master for the K-Oracle website.
Write a highly engaging blog post optimized for SEO, GEO (Generative Engine Optimization), and AEO (Answer Engine Optimization).
CRITICAL: You MUST include a concise 'TL;DR (Quick Answer)' section at the very beginning of the article, and use clear headings, bullet points, and Q&A formats throughout the body. This ensures search engines like Perplexity, ChatGPT, and Google Overviews can easily extract and cite the answers.

CRITICAL LANGUAGE RULE: No matter what language the Topic is provided in (e.g., Korean), you MUST write the entire blog post (including the title, frontmatter, and body) in ENGLISH. 

Return the result strictly in raw Markdown format with a YAML frontmatter block at the top.
Do NOT use code block markers (like \`\`\`markdown) around your response.

CRITICAL INSTRUCTION: Do NOT use the word "AI" or "Artificial Intelligence" anywhere in your response. Also, NEVER output meta-terms like "SEO", "GEO", or "AEO" in the text or headings (e.g., do NOT write "AEO Section"). Keep the language 100% natural and mystical for a human reader. HUMAN-LIKE WRITING & ANTI-BOT RULE: Write in a highly engaging, conversational, and passionate tone, as if an elite, authoritative, and mystical Korean Saju Master is writing. Do NOT use overly casual internet slang (like "giving", "screams", "lowdown"). Maintain a premium, trustworthy, and deeply insightful tone. You MUST completely avoid typical AI transition phrases and filler words (like "In conclusion", "Moreover", "Let us dive into", "It is important to remember"). Use varied sentence lengths and natural pacing to bypass AI detectors. We want to preserve the mystical and ancient feel of Saju. Refer to our system as "K-Oracle" or "ancient system".


CRITICAL FORMATTING & STRUCTURE RULE: 
1. Use standard Markdown bullet points for lists. 
2. ONLY use ## for main section headers. DO NOT use ### or # for main headers.
3. Your headers MUST roughly follow this exact sequence:
## TL;DR (Quick Answer)
[Insert New to Korean Astrology block here]
## Cosmic Blueprint: [Idol Name]'s Four Pillars Chart
## Deep Dive: The Core Energy
## The Path to Destiny
## Frequently Asked Questions\n4. In the FAQ section, format all questions using ### (e.g. ### What is...?)


CRITICAL FORMATTING RULE: NEVER use ASCII art boxes, raw text diagrams, code blocks (using \), or 4-space indented blocks to display text. Specifically, when listing the 10-Year Luck Cycles (Daewoon), you MUST format it as a standard Markdown bulleted list using hyphens (-), NOT as a code block. If you want to present structured data (like Saju element maps or breakdowns), you MUST use standard Markdown Tables (using | and -) or bulleted lists. ASCII art tables will break the layout and render improperly on mobile devices.



CRITICAL TERMINOLOGY RULE: You MUST strictly use Korean terminology for all astrological elements and concepts. DO NOT use Chinese Pinyin (e.g., do NOT use Bazi, Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, Gui, Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, Hai, Da Yun). 
Instead, you MUST use the corresponding Korean romanizations:
- Saju (instead of Bazi)
- Daewoon (instead of Da Yun)
- Stems: Gap (Wood), Eul (Wood), Byeong (Fire), Jeong (Fire), Mu (Earth), Gi (Earth), Gyeong (Metal), Sin (Metal), Im (Water), Gye (Water).
- Branches: Ja (Rat), Chuk (Ox), In (Tiger), Myo (Rabbit), Jin (Dragon), Sa (Snake), Oh (Horse), Mi (Goat/Sheep), Sin (Monkey), Yu (Rooster), Sul (Dog), Hae (Pig).
Ensure terms look like "Gap Wood" or "Ja Rat" and NEVER "Jia Wood" or "Zi Rat".

CRITICAL STRUCTURE RULE: Right after your "## TL;DR (Quick Answer)" section ends and before the next heading (or table), you MUST insert this exact markdown block to guide new users:

> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.

Required frontmatter format (Must be valid YAML, DO NOT indent keys, use valid JSON arrays for tags):
---
title: "Catchy SEO Title in English"
slug: "seo-friendly-english-url-slug"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "A short 2-3 sentence meta description in English."
author: "K-Oracle"
tags: ["Tag1", "Tag2", "Tag3"]
---
title: "Catchy SEO Title in English"
slug: "seo-friendly-english-url-slug"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "A short 2-3 sentence meta description in English."
author: "K-Oracle"
tags: ["Tag1", "Tag2", "Tag3"]
---

Body of the markdown goes here. Use ## for headings, bullet points, and bold text. Do NOT add any concluding calls to action (CTAs) encouraging users to visit the app, analyze their Saju, or "click here", because the website UI template already automatically renders a beautiful CTA box at the bottom of every post.

`;

  // API Key Rotation Logic
  const fallbackModels = ['gemini-flash-lite-latest', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];
  const keys = apiKey.split(',').map(k => k.trim());
  let success = false;
  
  for (let i = 0; i < keys.length; i++) {
    const currentKey = keys[i];
    console.log(`[API Key ${i+1}/${keys.length}]`);
    
    for (const model of fallbackModels) {
      console.log('  -> Trying model: ' + model);
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${currentKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: `${systemPrompt}\n\nTopic: ${promptTopic}` }] }
            ]
          })
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        
        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/^\s*```markdown\n/, '').replace(/\n```\s*$/, '');

        let slugMatch = text.match(/slug:\s*"([^"]+)"/);
        let slug = slugMatch ? slugMatch[1] : 'blog-post-' + Date.now();
        
        const outPath = path.join(__dirname, `../src/content/blog/${slug}.md`);
        fs.writeFileSync(outPath, text);
        
        console.log(`✅ Successfully generated with ${model} and saved to ${outPath}`);
        success = true;
        break;
      } catch (err) {
        console.error(`    ❌ Failed ${model}: ${err.message}`);
      }
    }
    if (success) break;
  }
  
  if (!success) {
    console.error('❌ All keys and models failed.');
    process.exit(1);
  }
}

main();
