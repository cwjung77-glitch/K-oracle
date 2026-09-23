import fs from 'fs';
import { execSync } from 'child_process';

const schedule = [
  // Add future posts here
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateAndPost(idol) {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(.+)/);
  if (!apiKeyMatch) { console.error("No API key found"); return; }
  const apiKeys = apiKeyMatch[1].split(',').map(k => k.trim());
  const fallbackModels = ['gemini-2.5-flash', 'gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-3.8-flash', 'gemini-flash-latest'];
  
  const today = new Date().toISOString().split('T')[0];
  const prompt = `You are an elite, highly opinionated Gen-Z Korean Saju master and K-Pop expert.
Write a 1200-word SEO-optimized blog post analyzing the Saju (Four Pillars of Destiny / Korean Astrology) of ${idol}.

CRITICAL INSTRUCTIONS:
1. OUTPUT ONLY EXACT MARKDOWN. Do NOT wrap in backtick markdown fences. Start exactly with "---" for the frontmatter.
2. DO NOT USE ANY CODE BLOCKS IN THE BODY TEXT. Just use normal markdown.
3. Frontmatter format:
---
title: "Decoding [Idol Name]'s Saju: Cosmic Secrets Behind the K-Pop Star"
slug: "[group-member-saju-analysis]"
date: "${today}"
excerpt: "A 2-sentence engaging teaser."
author: "K-Oracle"
tags: ["[Group Name]", "[Member Name]", "Saju Analysis", "K-Pop Astrology"]
---
4. Body must include: ## TL;DR, ## Cosmic Blueprint, ## Day Master, ## Love Career Destiny, ## FAQ (3 Q&As), ## Key Takeaways (3 bullets - NO "Conclusion" section)
5. TERMINOLOGY: You MUST use Korean Saju terms, NOT Chinese BaZi pinyin. 
   - Heavenly Stems: Gap, Eul, Byeong, Jeong, Mu, Gi, Gyeong, Sin, Im, Gye (e.g., "Gi Earth" NOT "Ji Earth", "Byeong Fire" NOT "Bing Fire").
   - Earthly Branches: Ja, Chuk, In, Myo, Jin, Sa, O, Mi, Sin, Yu, Sul, Hae (e.g., "Myo Wood" NOT "Mao Wood", "Sin Metal" NOT "Shen Metal").
6. VERY IMPORTANT: You MUST insert this EXACT block of text (word for word, character for character) immediately after the text of the TL;DR section:
> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.
7. TONE: Gen-Z, blunt, mystical, ZERO AI scent. No "In conclusion", no "Embrace", no "cosmic energy brings".
8. End with exactly this disclaimer:
*Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.*`;

  let success = false;
  while(!success) {
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
          if (!response.ok) { continue; }
          const data = await response.json();
          let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (!text.trim().startsWith('---')) {
            const mdStart = text.indexOf('---');
            if (mdStart !== -1) text = text.slice(mdStart);
            else { continue; }
          }
          const slugMatch = text.match(/slug:\s*["']?([^"'\n]+)["']?/);
          if (!slugMatch) { continue; }
          let slug = slugMatch[1].trim().replace(/^["']|["']$/g,'').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
          const filePath = `src/content/blog/${slug}.md`;
          fs.writeFileSync(filePath, text, 'utf8');
          execSync(`git add "${filePath}"`, { cwd: process.cwd() });
          execSync(`git commit -m "Add blog post for ${idol} (AutoBlogger)"`, { cwd: process.cwd() });
          execSync(`git push`, { cwd: process.cwd() });
          console.log(`[AutoBlogger] Success! Pushed ${idol}`);
          success = true;
        } catch(err) {
          console.log(`[${model}] Request failed: ${err.message}`);
        }
      }
    }
    if (!success) { await sleep(60000); }
  }
}

async function main() {
  for (const item of schedule) {
    const delay = new Date(item.target).getTime() - Date.now();
    if (delay > 0) { await sleep(delay); }
    await generateAndPost(item.idol);
  }
  console.log('[AutoBlogger] All scheduled posts completed!');
}

main();
