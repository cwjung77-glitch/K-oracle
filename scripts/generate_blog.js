const fs = require('fs');
const path = require('path');

async function main() {
  const promptTopic = process.argv[2];
  if (!promptTopic) {
    console.error("Please provide a topic. Example: node generate_blog.js '블랙핑크 제니 사주'");
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

CRITICAL INSTRUCTION: Do NOT use the word "AI" or "Artificial Intelligence" anywhere in your response. We want to preserve the mystical and ancient feel of Saju. Refer to our system as "K-Oracle" or "ancient system".

Required frontmatter format:
---
title: "Catchy SEO Title in English"
slug: "seo-friendly-english-url-slug"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "A short 2-3 sentence meta description in English."
author: "K-Oracle"
tags: ["Tag1", "Tag2", "Tag3"]
---

Body of the markdown goes here. Use ## for headings, bullet points, and bold text. End the article by encouraging users to visit the K-Oracle app to check their own Saju.`;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
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
    
    // Remove markdown codeblock wrappers if Gemini accidentally includes them
    text = text.replace(/^\s*\`\`\`markdown\n/, '').replace(/\n\`\`\`\s*$/, '');

    // Extract slug from the YAML frontmatter
    let slugMatch = text.match(/slug:\s*"([^"]+)"/);
    let slug = slugMatch ? slugMatch[1] : 'blog-post-' + Date.now();
    
    const outPath = path.join(__dirname, `../src/content/blog/${slug}.md`);
    fs.writeFileSync(outPath, text);
    
    console.log(`✅ Successfully generated and saved to ${outPath}`);
  } catch (err) {
    console.error("Error generating post:", err);
  }
}

main();