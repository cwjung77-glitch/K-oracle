import fs from 'fs';
import { execSync } from 'child_process';

const idols = [
  "BABYMONSTER Ahyeon",
  "RIIZE Wonbin",
  "ILLIT Wonhee",
  "KISS OF LIFE Natty",
  "NCT Mark",
  "(G)I-DLE Soyeon",
  "ITZY Ryujin",
  "EXO Baekhyun"
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(.+)/);
  if (!apiKeyMatch) {
    console.error("No API key found in .env.local");
    return;
  }
  const apiKeys = apiKeyMatch[1].split(',').map(k => k.trim());
  const fallbackModels = ['gemini-3.7-flash', 'gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-flash-latest', 'gemini-1.5-pro', 'gemini-1.5-flash'];
  
  for (let i = 0; i < idols.length; i++) {
    const idol = idols[i];
    console.log(`[AutoBlogger] Starting blog post for ${idol} at ${new Date().toISOString()}`);

    const prompt = `You are an elite, highly opinionated Gen-Z Korean Saju master and K-Pop expert.
Write a 1200-word SEO-optimized blog post analyzing the Saju (Four Pillars of Destiny / Korean Astrology) of ${idol}.

CRITICAL INSTRUCTIONS:
1. OUTPUT ONLY EXACT MARKDOWN. Do NOT wrap in \`\`\`markdown or \`\`\`. Start exactly with "---" for the frontmatter.
2. Frontmatter must strictly follow this exact format:
---
title: "Decoding [Idol Name]'s Saju: Cosmic Secrets Behind the K-Pop Star"
slug: "[group-member-saju-analysis]" (e.g. babymonster-ahyeon-saju-analysis - must be lowercase, hyphenated)
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "A 2-sentence engaging teaser."
author: "K-Oracle"
tags: ["[Group Name]", "[Member Name]", "Saju Analysis", "K-Pop Astrology"]
---
3. Body structure MUST include:
   - ## TL;DR (Quick Answer)
   - ## The Cosmic Blueprint of ${idol}: An Overview
   - ## The Day Master: [Insert their Day Master]
   - ## Love, Career, and Destiny
   - ## Conclusion
4. TONE: Speak directly to fans. Be blunt, trendy, fiercely confident, and slightly mystical. ZERO AI SCENT (never use words like "In conclusion", "It is important to remember"). Use Gen-Z phrasing but maintain deep Saju authenticity.`;

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
                  generationConfig: { temperature: 0.7 }
                })
              });

              const data = await response.json();
              if(!data.candidates) {
                console.error(`[${model}] Error:`, data.error?.message);
                continue; // try next model
              }
              let text = data.candidates[0].content.parts[0].text;
              
              text = text.replace(/^```markdown\n?/m, '').replace(/```\n?$/m, '');
              text = text.trim();
              
              const slugMatch = text.match(/slug:\s*"([^"]+)"/);
              if (!slugMatch) {
                console.error("Could not find slug in response for " + idol);
                continue;
              }
              
              const slug = slugMatch[1];
              const filePath = `src/content/blog/${slug}.md`;
              
              fs.writeFileSync(filePath, text, 'utf8');
              console.log(`[AutoBlogger] Generated and saved ${filePath} using ${model}`);
              
              execSync(`git add src/content/blog/${slug}.md`);
              execSync(`git commit -m "Add blog post for ${idol} (AutoBlogger)"`);
              execSync(`git push`);
              console.log(`[AutoBlogger] Pushed to GitHub.`);
              success = true;
            } catch (e) {
              console.error(`[AutoBlogger] Request failed: ${e.message}`);
            }
        }
    }
    
    if(!success) {
        console.error(`[AutoBlogger] Completely failed for ${idol}`);
    }

    if (i < idols.length - 1) {
      console.log(`[AutoBlogger] Sleeping for 30 minutes...`);
      await sleep(30 * 60 * 1000); 
    }
  }
  console.log(`[AutoBlogger] All done!`);
}

main();
