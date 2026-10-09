const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find code blocks containing "Age "
  const codeBlockRegex = /\\\\r?\n(Age \d+.*?)\r?\n\\\/gs;
  
  if (codeBlockRegex.test(content)) {
    content = content.replace(codeBlockRegex, (match, p1) => {
      // Split lines and format as list
      const lines = p1.split(/\r?\n/).map(line => {
        if (line.trim().startsWith('Age')) {
          return '- **' + line.substring(0, line.indexOf(':') + 1) + '**' + line.substring(line.indexOf(':') + 1);
        }
        return line;
      });
      return lines.join('\n');
    });
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
  }
});

console.log('Fixed ' + fixedCount + ' files.');