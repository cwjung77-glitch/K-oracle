const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (file.includes('what-is-korean-saju')) {
    content = content.replace(/date:\s*".*?"/, 'date: "2026-09-12"');
  } else if (file.includes('jungkook')) {
    content = content.replace(/date:\s*".*?"/, 'date: "2026-09-13"');
  } else if (file.includes('jennie')) {
    content = content.replace(/date:\s*".*?"/, 'date: "2026-09-14"');
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated date in ${file}`);
}
