const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let changedCount = 0;

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Regex to match the disclaimer paragraph. It might be italicized with *, might have varying whitespace.
  // We match Disclaimer: up to "individuals mentioned." (and any trailing asterisks/newlines)
  const regex = /\n*\*?Disclaimer:.*?individuals mentioned\.\*?\n*/gi;
  
  content = content.replace(regex, '\n\n');
  
  // Clean up any triple or double trailing newlines that might be left
  content = content.trim() + '\n';

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    changedCount++;
  }
});

console.log('Stripped AI disclaimers from ' + changedCount + ' files.');
