const fs = require('fs');
const path = require('path');

const disclaimer = "\n\n*Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.*\n";

const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('Disclaimer: This analysis is based')) {
    content = content.trimEnd() + disclaimer;
    fs.writeFileSync(filePath, content);
    console.log(`Re-added disclaimer to ${file}`);
  }
}
