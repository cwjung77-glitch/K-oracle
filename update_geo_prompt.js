const fs = require('fs');

let c = fs.readFileSync('scripts/generate_blog.js', 'utf8');

const oldPrompt = "Write a highly engaging, SEO-optimized blog post about the given topic.";
const newPrompt = `Write a highly engaging blog post optimized for SEO, GEO (Generative Engine Optimization), and AEO (Answer Engine Optimization).
CRITICAL: You MUST include a concise 'TL;DR (Quick Answer)' section at the very beginning of the article, and use clear headings, bullet points, and Q&A formats throughout the body. This ensures search engines like Perplexity, ChatGPT, and Google Overviews can easily extract and cite the answers.`;

c = c.replace(oldPrompt, newPrompt);
fs.writeFileSync('scripts/generate_blog.js', c);
