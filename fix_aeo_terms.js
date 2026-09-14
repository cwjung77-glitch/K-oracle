const fs = require('fs');
const path = require('path');

// 1. Update the prompt in generate_blog.js
let c = fs.readFileSync('scripts/generate_blog.js', 'utf8');
c = c.replace(/Do NOT use the word "AI" or "Artificial Intelligence" anywhere in your response\./g, 
  'Do NOT use the word "AI" or "Artificial Intelligence" anywhere in your response. Also, NEVER output meta-terms like "SEO", "GEO", or "AEO" in the text or headings (e.g., do NOT write "AEO Section"). Keep the language 100% natural and mystical for a human reader.');
fs.writeFileSync('scripts/generate_blog.js', c);

// 2. Clean up existing markdown files
const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace things like (AEO Section), (SEO Section), etc.
  const newContent = content
    .replace(/\s*\(AEO Section\)/gi, '')
    .replace(/\s*\(GEO Section\)/gi, '')
    .replace(/\s*\(SEO Section\)/gi, '');
    
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Cleaned up meta-terms in ${file}`);
  }
}
