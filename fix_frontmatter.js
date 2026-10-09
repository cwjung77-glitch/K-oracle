const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let fixedCount = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.match(/^---\n\s+title:/) || content.match(/^---\r\n\s+title:/)) {
    const frontmatterEnd = content.indexOf('\n---', 3);
    if (frontmatterEnd !== -1) {
      let frontmatter = content.substring(0, frontmatterEnd);
      frontmatter = frontmatter.split('\n').map(line => line.trimStart()).join('\n');
      content = frontmatter + content.substring(frontmatterEnd);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed indentation in ${file}`);
      fixedCount++;
    }
  }
}

console.log(`Fixed ${fixedCount} files.`);