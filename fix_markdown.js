const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find code blocks containing "Age "
  const codeBlockRegex = /```[\s\S]*?(Age \d+[\s\S]*?)```/g;
  
  let modified = false;
  content = content.replace(codeBlockRegex, (match, p1) => {
    // If it's the Daewoon list inside a code block
    if (p1.includes('Age')) {
      modified = true;
      const lines = p1.trim().split(/\r?\n/).map(line => {
        line = line.trim();
        if (line.startsWith('Age')) {
          const colonIndex = line.indexOf(':');
          if (colonIndex !== -1) {
            return '- **' + line.substring(0, colonIndex + 1) + '**' + line.substring(colonIndex + 1);
          }
        }
        return line ? '- ' + line : '';
      });
      return lines.join('\n');
    }
    return match; // return original if not matched
  });

  // Also check for 4-space indented blocks that Markdown treats as code
  const indentRegex = /(\n\n)((?: {4}Age \d+.*\r?\n)+)/g;
  content = content.replace(indentRegex, (match, p1, p2) => {
      modified = true;
      const lines = p2.trim().split(/\r?\n/).map(line => {
        line = line.trim();
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
          return '- **' + line.substring(0, colonIndex + 1) + '**' + line.substring(colonIndex + 1);
        }
        return '- ' + line;
      });
      return p1 + lines.join('\n') + '\n\n';
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
  }
});

console.log('Fixed ' + fixedCount + ' files.');
