const fs = require('fs');
const path = require('path');

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'th', name: 'Thai' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pl', name: 'Polish' },
  { code: 'ru', name: 'Russian' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'fr', name: 'French' }
];

async function main() {
  const promptTopic = process.argv[2];
  if (!promptTopic) {
    console.error("Please provide a topic. Example: node generate_color_blog.js 'aespa karina'");
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

  console.log(`Generating SEO beauty blog post for topic: "${promptTopic}" in 12 languages...`);

  const keys = apiKey.split(',').map(k => k.trim());
  let currentKeyIndex = 0;

  for (const lang of languages) {
    console.log(`\n--- Generating for ${lang.name} (${lang.code}) ---`);
    
    const systemPrompt = `You are an expert K-Beauty consultant and Personal Color analyst for the K-Oracle website.
Your task is to write a highly engaging, SEO-optimized blog post about a Korean celebrity's personal color.

CRITICAL LANGUAGE RULE: The entire blog post (including title, excerpt, and body) MUST be written perfectly in ${lang.name}. Only keep the YAML keys in English (e.g. title:, slug:, excerpt:).

CRITICAL FORMATTING & STRUCTURE RULE: 
1. Use standard Markdown bullet points for lists. 
2. ONLY use ## for main section headers. DO NOT use ### or # for main headers.
3. You MUST use Markdown tables for makeup recommendations.
4. Your headers MUST roughly follow this exact sequence (translate these concepts to ${lang.name}):
## TL;DR (Quick Answer)
## Visual Proof: Best vs Worst Styling
## Makeup & Hair Recipe (Must use a Markdown table)
## Frequently Asked Questions

CRITICAL INSTRUCTION: Do NOT use the word "AI" or "Artificial Intelligence". Keep the tone highly engaging, conversational, and trendy, like a fashion magazine editor. NEVER output meta-terms like "SEO" in the text. 

Required frontmatter format (Must be valid YAML, DO NOT indent keys, use valid JSON arrays for tags):
---
title: "Catchy SEO Title in ${lang.name}"
slug: "seo-friendly-english-url-slug"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "A short 2-3 sentence meta description in ${lang.name}."
author: "K-Oracle"
tags: ["Personal Color", "K-Beauty", "Makeup", "Celebrity Name"]
---

Body of the markdown goes here. Use ## for headings, bullet points, and bold text. Do NOT add any concluding calls to action (CTAs) encouraging users to visit the app or "click here", because the website UI template already automatically renders a beautiful CTA box at the bottom of every post.`;

    let success = false;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[(currentKeyIndex + i) % keys.length];
      
      try {
        const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${key}\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: \`\${systemPrompt}\\n\\nTopic: \${promptTopic}\` }] }
            ],
            generationConfig: {
              maxOutputTokens: 8192
            }
          })
        });

        const data = await res.json();
        if (data.error) {
          console.error(\`Key error for \${lang.code}:\`, data.error.message);
          continue; 
        }

        const text = data.candidates[0].content.parts[0].text;
        
        // Extract slug
        const slugMatch = text.match(/^slug:\\s*"?([^"\\n]+)"?/m);
        let baseSlug = slugMatch ? slugMatch[1].replace(/-(en|es|th|id|ja|de|it|pt|pl|ru|vi|fr)$/, '') : 'beauty-post-' + Date.now();
        
        // Append language suffix
        const finalSlug = \`\${baseSlug}-\${lang.code}\`;
        
        // Replace the slug inside the markdown text so the file matches
        const finalMarkdown = text.replace(/^slug:\\s*"?([^"\\n]+)"?/m, \`slug: "\${finalSlug}"\`);
        
        const outPath = path.join(__dirname, \`../src/content/blog/\${finalSlug}.md\`);
        fs.writeFileSync(outPath, finalMarkdown);
        
        console.log(\`✅ Successfully generated \${lang.name} and saved to \${outPath}\`);
        success = true;
        currentKeyIndex = (currentKeyIndex + i + 1) % keys.length; // rotate key
        break; 
        
      } catch (err) {
        console.error(\`Fetch error for \${lang.code}:\`, err.message);
      }
    }

    if (!success) {
      console.error(\`❌ Failed to generate for \${lang.name}. Skipping.\`);
    }
  }
  
  console.log("Multilingual generation complete!");
}

main();
