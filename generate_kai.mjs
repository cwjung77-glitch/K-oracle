import fs from 'fs';
import { execSync } from 'child_process';

const idol = "EXO Kai";
const date = "2026-09-22";

async function generateAndPost() {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(.+)/);
  if (!apiKeyMatch) { console.error("No API key found"); return; }
  const apiKeys = apiKeyMatch[1].split(',').map(k => k.trim());
  const fallbackModels = ['gemini-2.5-flash', 'gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-3.8-flash'];
  
  const prompt = `You are an elite, highly opinionated Gen-Z Korean Saju master and K-Pop expert.
Write a 1200-word SEO-optimized blog post analyzing the Saju (Four Pillars of Destiny / Korean Astrology) of ${idol}.

CRITICAL INSTRUCTIONS:
1. OUTPUT ONLY EXACT MARKDOWN. Do NOT wrap in backtick markdown fences. Start exactly with "---" for the frontmatter.
2. DO NOT USE ANY CODE BLOCKS OR HORIZONTAL RULES (---) IN THE BODY TEXT. Just use normal markdown.
3. Frontmatter format:
---
title: "Decoding EXO Kai's Saju: Cosmic Secrets Behind the K-Pop Star"
slug: "exo-kai-saju-analysis"
date: "${date}"
excerpt: "A 2-sentence engaging teaser about EXO Kai's chart."
author: "K-Oracle"
tags: ["EXO", "Kai", "Saju Analysis", "K-Pop Astrology"]
---
4. Structure: The VERY FIRST LINE of the body MUST BE "## TL;DR". DO NOT write any intro paragraphs. 
After TL;DR, you must include: ## Cosmic Blueprint, ## Day Master, ## Love Career Destiny, ## FAQ (3 Q&As), ## Key Takeaways (3 bullets - NO "Conclusion" section)
5. TERMINOLOGY: You MUST use Korean Saju terms, NOT Chinese BaZi pinyin. 
   - Heavenly Stems: Gap, Eul, Byeong, Jeong, Mu, Gi, Gyeong, Sin, Im, Gye.
   - Earthly Branches: Ja, Chuk, In, Myo, Jin, Sa, O, Mi, Sin, Yu, Sul, Hae.
6. VERY IMPORTANT: You MUST insert this EXACT block of text immediately after the text of the TL;DR section:
> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.
7. TONE: Gen-Z, blunt, mystical, ZERO AI scent. No "In conclusion", no "Embrace", no "cosmic energy brings".
8. End with exactly this disclaimer:
*Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.*`;

  let success = false;
  for (const GEMINI_API_KEY of apiKeys) {
    if(success) break;
    for (const model of fallbackModels) {
      if(success) break;
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.9, maxOutputTokens: 8192 }
          })
        });
        if (!response.ok) continue;
        const data = await response.json();
        let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (!text.trim().startsWith('---')) {
          const mdStart = text.indexOf('---');
          if (mdStart !== -1) text = text.slice(mdStart);
          else continue;
        }
        
        // POST-PROCESSING TO GUARANTEE 100% UNIFORMITY
        // 1. Remove markdown fences if model ignored instruction
        text = text.replace(/^```markdown\n/i, '').replace(/\n```$/i, '');
        
        // 2. Enforce ## TL;DR as first body element
        let frontmatterMatch = text.match(/^(---[\s\S]+?---)/);
        if (frontmatterMatch) {
            let fm = frontmatterMatch[1];
            let body = text.slice(fm.length);
            
            let tldrMatch = body.match(/##\s*TL;?DR/i);
            if (tldrMatch) {
                body = body.slice(tldrMatch.index);
            }
            body = body.replace(/^##\s*TL;?DR.*$/im, '## TL;DR');
            
            // Remove any --- from body
            body = body.replace(/^\s*---\s*$/gm, '');
            
            text = fm + '\n\n' + body.trim();
        }

        const filePath = `src/content/blog/exo-kai-saju-analysis.md`;
        fs.writeFileSync(filePath, text, 'utf8');
        console.log(`[AutoBlogger] Success! Generated ${idol}`);
        success = true;
      } catch(err) {
        console.error(`[${model}] Failed: ${err.message}`);
      }
    }
  }
}

generateAndPost();
