const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/content/blog');

const fixes = {
  'red-velvet-irene-saju-analysis.md': '2026-09-27',
  'red-velvet-seulgi-saju-analysis.md': '2026-09-27',
  'red-velvet-wendy-saju-analysis.md': '2026-09-28',
  'red-velvet-joy-saju-analysis.md': '2026-09-28'
};

for (const [file, date] of Object.entries(fixes)) {
  const filePath = path.join(blogDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/date: ".*?"/, `date: "${date}"`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Restored ${file} to ${date}`);
  }
}
