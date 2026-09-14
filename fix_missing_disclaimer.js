const fs = require('fs');
const path = require('path');

let c = fs.readFileSync('scripts/generate_blog.js', 'utf8');
if (!c.includes('Disclaimer: This analysis is based on publicly available')) {
    c = c.replace('beautiful CTA box at the bottom of every post.`;', 
    'beautiful CTA box at the bottom of every post.\n\nCRITICAL INSTRUCTION 2: You MUST append the following exact disclaimer as italic text at the very bottom of the article:\n*Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.*`;');
    fs.writeFileSync('scripts/generate_blog.js', c);
    console.log("Fixed generate_blog.js");
}

const disclaimer = "\n\n*Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.*\n";
const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let fixedCount = 0;
for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('Disclaimer: This analysis is based on')) {
    content = content.trimEnd() + disclaimer;
    fs.writeFileSync(filePath, content);
    fixedCount++;
  }
}
console.log(`Fixed ${fixedCount} markdown files.`);
