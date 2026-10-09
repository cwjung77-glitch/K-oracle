import fs from 'fs';
import { execSync } from 'child_process';

const args = process.argv.slice(2);
let customDate = new Date().toISOString().split('T')[0];
let idol = args.join(' ');
if(args.length > 0 && args[args.length-1].match(/^\d{4}-\d{2}-\d{2}$/)) {
  customDate = args.pop();
  idol = args.join(' ').trim();
}
const today = customDate;

if (!idol) {
  console.error('No idol name provided');
  process.exit(1);
}

console.log(`\nGenerating post for [${idol}] with date ${today}...`);

async function main() {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(.+)/);
  if (!apiKeyMatch) { 
    console.error('No API Key');
    process.exit(1); 
  }
  const apiKeys = apiKeyMatch[1].split(',').map(k => k.trim());
  
  const fallbackModels = [
    'gemini-2.5-flash',
    'gemini-3.6-flash',
    'gemini-3.7-flash',
    'gemini-3.8-flash',
    'gemini-flash-latest'
  ];
  
  const prompt = `You are an elite, highly opinionated Gen-Z Korean Saju master and K-Pop/K-Drama expert.
Write a 1200-word SEO-optimized blog post analyzing the Saju (Four Pillars of Destiny / Korean Astrology) of ${idol}.

CRITICAL INSTRUCTIONS:
1. OUTPUT ONLY EXACT MARKDOWN. Do NOT wrap in backtick markdown fences. Start exactly with "---" for the frontmatter.
2. DO NOT USE ANY CODE BLOCKS IN THE BODY TEXT. Just use normal markdown.
3. Frontmatter format:
---
title: "Decoding ${idol}'s Saju: Cosmic Secrets Behind the Star"
slug: "[group-member-saju-analysis]"
date: "${today}"
excerpt: "A 2-sentence engaging teaser."
author: "K-Oracle"
tags: ["[Group/Actor]", "${idol}", "Saju Analysis", "Korean Astrology"]
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
  
  for (const GEMINI_API_KEY of apiKeys) {
    if (success) break;
    for (const model of fallbackModels) {
      if (success) break;
      
      try {
        console.log(`- Requesting with ${model}...`);
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.9,
              maxOutputTokens: 8192
            }
          })
        });

        if (!response.ok) {
          continue;
        }

        const data = await response.json();
        let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        if (!text.trim().startsWith('---')) {
          const mdStart = text.indexOf('---');
          if (mdStart !== -1) {
            text = text.slice(mdStart);
          } else {
            console.log("No frontmatter found, skipping...");
            continue;
          }
        }
        
        const slugMatch = text.match(/slug:\s*["']?([^"'\n]+)["']?/);
        if (!slugMatch) {
          console.log("No slug found, skipping...");
          continue;
        }
        
        let slug = slugMatch[1].trim()
          .replace(/^["']|["']$/g, '')
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
          
        const filePath = `src/content/blog/${slug}.md`;
        
        fs.writeFileSync(filePath, text, 'utf8');
        
        console.log(`\nSuccessfully created ${filePath}`);
        
        // Auto-commit and push
        execSync(`git add "${filePath}"`, { cwd: process.cwd() });
        execSync(`git commit -m "feat: Add blog post for ${idol}"`, { cwd: process.cwd() });
        execSync(`git push`, { cwd: process.cwd() });
        
        console.log(`Pushed to GitHub!`);
        success = true;
        
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    }
  }
  
  if (!success) {
    console.error("All models failed.");
    process.exit(1);
  }
}

main();