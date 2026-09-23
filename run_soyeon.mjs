import fs from 'fs';
import { execSync } from 'child_process';
const idol = "(G)I-DLE Soyeon";
const envFile = fs.readFileSync('.env.local', 'utf8');
const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(.+)/);
const apiKeys = apiKeyMatch[1].split(',').map(k => k.trim());
const fallbackModels = ['gemini-3.7-flash', 'gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];

const prompt = `You are an elite, highly opinionated Gen-Z Korean Saju master and K-Pop expert.
Write a 1200-word SEO-optimized blog post analyzing the Saju (Four Pillars of Destiny / Korean Astrology) of ${idol}.

CRITICAL INSTRUCTIONS:
1. OUTPUT ONLY EXACT MARKDOWN. Do NOT wrap in \`\`\`markdown or \`\`\`. Start exactly with "---" for the frontmatter.
2. DO NOT USE ANY CODE BLOCKS (\`\`\`) IN THE BODY TEXT. Do not indent paragraphs with 4 spaces. Just use normal markdown text, headings (##), bold (**), and bullet lists (*).
3. Frontmatter must strictly follow this exact format:
---
title: "Decoding [Idol Name]'s Saju: Cosmic Secrets Behind the K-Pop Star"
slug: "gidle-soyeon-saju-analysis"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "A 2-sentence engaging teaser."
author: "K-Oracle"
tags: ["[Group Name]", "[Member Name]", "Saju Analysis", "K-Pop Astrology"]
---
4. Body structure MUST include:
   - ## TL;DR (Quick Answer)
   - ## The Cosmic Blueprint of ${idol}: An Overview
   - ## The Day Master: [Insert their Day Master]
   - ## Love, Career, and Destiny
   - ## Frequently Asked Questions About [Idol Name]'s Saju (Include 3 Q&As)
   - ## Key Takeaways of [Idol Name]'s Cosmic Destiny (3 bullet points)
5. GLOSSARY LINK: Always include this exact quote block right after the TL;DR section:
> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.
6. TONE: Speak directly to fans. Be blunt, trendy, fiercely confident, and slightly mystical. ZERO AI SCENT. Use Gen-Z phrasing but maintain deep Saju authenticity.
7. MANDATORY DISCLAIMER: You MUST add exactly this text at the very end of the post, in italics:
*Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.*`;

async function run() {
  let success = false;
  while(!success) {
      for(const GEMINI_API_KEY of apiKeys) {
          if(success) break;
          for(const model of fallbackModels) {
              if(success) break;
              try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.8 } })
                });
                const data = await response.json();
                if(!data.candidates) continue; 
                let text = data.candidates[0].content.parts[0].text;
                text = text.replace(/```[a-z]*\n/g, '').replace(/```/g, '').trim();
                
                fs.writeFileSync(`src/content/blog/gidle-soyeon-saju-analysis.md`, text, 'utf8');
                execSync(`git add src/content/blog/gidle-soyeon-saju-analysis.md`);
                execSync(`git commit -m "Regenerate Soyeon post with correct FAQ format"`);
                execSync(`git push`);
                console.log(`[Regenerate] Success!`);
                success = true;
              } catch(e) {}
          }
      }
      if(!success) await new Promise(r => setTimeout(r, 5000));
  }
}
run();
