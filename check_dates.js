const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const match = content.match(/date:\s*"(.*?)"/);
  if (match) {
    const date = match[1];
    if (date >= '2026-09-24') {
      console.log(`${date} - ${file}`);
    }
  }
}