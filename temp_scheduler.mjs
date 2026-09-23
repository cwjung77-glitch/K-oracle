import fs from 'fs';
import { execSync } from 'child_process';

const schedule = [
  { idol: "(G)I-DLE Soyeon", time: "now" },
  { idol: "BABYMONSTER Ahyeon", target: "2026-09-18T22:00:00+09:00" },
  { idol: "RIIZE Wonbin", target: "2026-09-19T09:00:00+09:00" }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateAndPost(idol) {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(.+)/);
  if (!apiKeyMatch) {
    console.error("No API key found"); return;
  }
  const apiKeys = apiKeyMatch[1].split(',').map(k => k.trim());
  const fallbackModels = ['gemini-3.7-flash', 'gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-flash-latest', 'gemini-1.5-pro', 'gemini-1.5-flash'];
  
  const prompt = `You are an elite, highly opinionated Gen-Z Korean Saju master and K-Pop expert.
Write a 1200-word SEO-optimized blog post analyzing the Saju (Four Pillars of Destiny / Korean Astrology) of ${idol}.

CRITICAL INSTRUCTIONS:
1. OUTPUT ONLY EXACT MARKDOWN. Do NOT wrap in \`\`\`markdown or \`\`\`. Start exactly with "---

> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis." for the frontmatter.
2. DO NOT USE ANY CODE BLOCKS (\`\`\`) IN THE BODY TEXT. Do not indent paragraphs with 4 spaces. Just use normal markdown text, headings (##), bold (**), and bullet lists (*).
3. Frontmatter must strictly follow this exact format:
---

> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.
title: "Decoding [Idol Name]'s Saju: Cosmic Secrets Behind the K-Pop Star"
slug: "[group-member-saju-analysis]" (e.g. babymonster-ahyeon-saju-analysis - must be lowercase, hyphenated)
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "A 2-sentence engaging teaser."
author: "K-Oracle"
tags: ["[Group Name]", "[Member Name]", "Saju Analysis", "K-Pop Astrology"]
---

> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.
4. Body structure MUST include:
   - ## TL;DR (Quick Answer)
   - ## The Cosmic Blueprint of ${idol}: An Overview
   - ## The Day Master: [Insert their Day Master]
   - ## Love, Career, and Destiny
   - ## Conclusion
5. TONE: Speak directly to fans. Be blunt, trendy, fiercely confident, and slightly mystical. ZERO AI SCENT. Use Gen-Z phrasing but maintain deep Saju authenticity.
6. MANDATORY DISCLAIMER: You MUST add exactly this text at the very end of the post, in italics:
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
                    generationConfig: { temperature: 0.8 }
                  })
                });

                const data = await response.json();
                if(!data.candidates) {
                  console.error(`[${model}] Error:`, data.error?.message);
                  continue; 
                }
                let text = data.candidates[0].content.parts[0].text;
                text = text.replace(/^```markdown\n?/m, '').replace(/```\n?$/m, '').trim();
                
                const slugMatch = text.match(/slug:\s*"([^"]+)"/);
                if (!slugMatch) continue;
                
                const slug = slugMatch[1];
                const filePath = `src/content/blog/${slug}.md`;
                fs.writeFileSync(filePath, text, 'utf8');
                
                execSync(`git add src/content/blog/${slug}.md`);
                execSync(`git commit -m "Add blog post for ${idol} (AutoBlogger)"`);
                execSync(`git push`);
                console.log(`[AutoBlogger] Success! Pushed ${idol} at ${new Date().toLocaleString()}`);
                success = true;
              } catch (e) {
                console.error(`Request failed: ${e.message}`);
              }
          }
      }
      if(!success) {
          console.log("All keys/models rate-limited. Retrying in 1 minute...");
          await sleep(60000); 
      }
  }
}

async function main() {
  for (const item of schedule) {
    if (item.time === "now") {
      console.log(`[AutoBlogger] Executing NOW: ${item.idol}`);
      await generateAndPost(item.idol);
    } else {
      let targetMs = Date.parse(item.target);
      const randomOffset = Math.floor(Math.random() * (17 - 3 + 1) + 3) * 60 * 1000;
      targetMs += randomOffset;
      
      const nowMs = Date.now();
      let waitMs = targetMs - nowMs;
      
      if (waitMs < 0) waitMs = 0; 
      
      const scheduledTime = new Date(targetMs).toLocaleString();
      console.log(`[AutoBlogger] Sleeping for ${Math.round(waitMs/1000/60)} minutes. Will post ${item.idol} at ~${scheduledTime}`);
      
      await sleep(waitMs);
      await generateAndPost(item.idol);
    }
  }
  console.log("[AutoBlogger] All scheduled posts completed!");
}

main();
