const fs = require('fs');
const path = require('path');

async function main() {
  const promptTopic = process.argv[2];
  if (!promptTopic) {
    console.error("Please provide a topic. Example: node generate_color_blog.js '장원영 퍼스널컬러 여름 쿨톤'");
    process.exit(1);
  }

  let apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    try {
      const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
      const match = envFile.match(/GEMINI_API_KEY=(.+)/);
      if (match) apiKey = match[1].trim();
    } catch(e) {}
  }

  if (!apiKey) {
    console.error("GEMINI_API_KEY not found in .env.local or environment variables.");
    process.exit(1);
  }

  console.log(`Generating SEO beauty blog post for topic: "${promptTopic}"...`);

  const systemPrompt = `You are an expert K-Beauty consultant and Personal Color analyst for the K-Oracle website.
Your task is to write a highly engaging, SEO-optimized English blog post about a Korean celebrity's personal color.

CRITICAL FORMATTING & STRUCTURE RULE: 
1. Use standard Markdown bullet points for lists. 
2. ONLY use ## for main section headers. DO NOT use ### or # for main headers.
3. You MUST use Markdown tables for makeup recommendations.
4. Your headers MUST roughly follow this exact sequence:
## TL;DR (Quick Answer)
## Visual Proof: Best vs Worst Styling
## Makeup & Hair Recipe (Must use a Markdown table)
## Frequently Asked Questions

CRITICAL INSTRUCTION: Do NOT use the word "AI" or "Artificial Intelligence". Keep the tone highly engaging, conversational, and trendy, like a fashion magazine editor. NEVER output meta-terms like "SEO" in the text. 

Required frontmatter format (Must be valid YAML, DO NOT indent keys, use valid JSON arrays for tags):
---
title: "Catchy SEO Title in English"
slug: "seo-friendly-english-url-slug"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "A short 2-3 sentence meta description in English."
author: "K-Oracle"
tags: ["Personal Color", "K-Beauty", "Makeup", "Celebrity Name"]
---

Body of the markdown goes here. Use ## for headings, bullet points, and bold text. Do NOT add any concluding calls to action (CTAs) encouraging users to visit the app or "click here", because the website UI template already automatically renders a beautiful CTA box at the bottom of every post.`;

  const keys = apiKey.split(',').map(k => k.trim());
  let success = false;

  for (let i = 0; i < keys.length; i++) {
    const currentKey = keys[i];
    console.log(`[🔑 Key ${i+1}/${keys.length}] 시도 중...`);
    
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${currentKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nTopic: ${promptTopic}` }] }
          ],
          generationConfig: {
            maxOutputTokens: 8192
          }
        })
      });

      const data = await res.json();
      if (data.error) {
        console.error(`❌ Key ${i+1} 실패:`, data.error.message);
        continue; 
      }

      const text = data.candidates[0].content.parts[0].text;
      
      const slugMatch = text.match(/^slug:\s*"?([^"\n]+)"?/m);
      let slug = slugMatch ? slugMatch[1] : 'beauty-post-' + Date.now();
      
      const outPath = path.join(__dirname, `../src/content/blog/${slug}.md`);
      fs.writeFileSync(outPath, text);
      
      console.log(`✅ Successfully generated and saved to ${outPath}`);
      success = true;
      break; 
      
    } catch (err) {
      console.error(`❌ Key ${i+1} 에러:`, err.message);
    }
  }

  if (!success) {
    console.error("❌ 모든 API 키가 실패했습니다.");
    process.exit(1);
  }
}

main();
