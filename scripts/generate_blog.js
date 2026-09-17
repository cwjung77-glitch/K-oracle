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

CRITICAL INSTRUCTION: Do NOT use the word "AI" or "Artificial Intelligence" anywhere in your response. Also, NEVER output meta-terms like "SEO", "GEO", or "AEO" in the text or headings (e.g., do NOT write "AEO Section"). Keep the language 100% natural and mystical for a human reader. HUMAN-LIKE WRITING & ANTI-BOT RULE: Write in a highly engaging, conversational, and passionate tone, as if a real human expert/fan is writing. You MUST completely avoid typical AI transition phrases and filler words (like "In conclusion", "Moreover", "Let us dive into", "It is important to remember"). Use varied sentence lengths and natural pacing to bypass AI detectors. We want to preserve the mystical and ancient feel of Saju. Refer to our system as "K-Oracle" or "ancient system".

CRITICAL FORMATTING RULE: NEVER use ASCII art boxes, raw text diagrams, or preformatted text blocks (like +---+ or |...|) to draw tables or diagrams. If you want to present structured data (like Saju element maps or breakdowns), you MUST use standard Markdown Tables (using | and -) or bulleted lists. ASCII art tables will break the layout and render improperly on mobile devices.

Required frontmatter format:
---
title: "Catchy SEO Title in English"
slug: "seo-friendly-english-url-slug"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "A short 2-3 sentence meta description in English."
author: "K-Oracle"
tags: ["Tag1", "Tag2", "Tag3"]
---

Body of the markdown goes here. Use ## for headings, bullet points, and bold text. Do NOT add any concluding calls to action (CTAs) encouraging users to visit the app, analyze their Saju, or "click here", because the website UI template already automatically renders a beautiful CTA box at the bottom of every post.

CRITICAL INSTRUCTION 2: You MUST append the following exact disclaimer as italic text at the very bottom of the article:
*Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.*`;

  // API Key Rotation Logic
  const keys = apiKey.split(',').map(k => k.trim());
  let success = false;
  
  for (let i = 0; i < keys.length; i++) {
    const currentKey = keys[i];
    console.log(`[?뵎 Key ${i+1}/${keys.length}] ?쒕룄 以?..`);
    
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${currentKey}`, {
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
      text = text.replace(/^\s*\`\`\`markdown\n/, '').replace(/\n\`\`\`\s*$/, '');

      let slugMatch = text.match(/slug:\s*"([^"]+)"/);
      let slug = slugMatch ? slugMatch[1] : 'blog-post-' + Date.now();
      
      const outPath = path.join(__dirname, `../src/content/blog/${slug}.md`);
      fs.writeFileSync(outPath, text);
      
      console.log(`??Successfully generated and saved to ${outPath}`);
      success = true;
      break; // Stop looping if successful
    } catch (err) {
      console.error(`?좑툘 Key ${i+1} ?ㅽ뙣: ${err.message}`);
      if (i === keys.length - 1) {
        console.error("??紐⑤뱺 API ?ㅺ? ?뚯쭊?섏뿀嫄곕굹 ?먮윭媛 諛쒖깮?덉뒿?덈떎.");
        process.exit(1);
      }
    }
  }
}

main();
