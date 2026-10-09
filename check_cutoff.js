const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8').trim();
  const lastChar = content.slice(-1);
  
  // Exclude ending in punctuation or closing characters
  if (!['.', '!', '?', '>', ']', ')', '}', '*'].includes(lastChar)) {
    console.log('Possibly cut off: ' + file + ' | Last char: ' + lastChar);
  }
});