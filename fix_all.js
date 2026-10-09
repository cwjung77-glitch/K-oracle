const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let fixedFiles = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmMatch) {
    let fm = fmMatch[1];
    if (/^[ \t]+[a-z]+:/m.test(fm)) {
      const newFm = fm.split(/\r?\n/).map(line => line.trimStart()).join('\n');
      content = content.replace(fm, newFm);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed indentation in ${file}`);
      fixedFiles++;
    }
  }
}

console.log(`Fixed ${fixedFiles} files total.`);