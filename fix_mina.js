const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.startsWith('beauty-post-'));

files.forEach(file => {
  const langMatch = file.match(/-([a-z]{2})\.md$/);
  if (!langMatch) return;
  const lang = langMatch[1];
  
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  let newSlug = 'twice-mina-personal-color-analysis-' + lang;
  
  const newContent = content.replace(/^slug:.*$/m, 'slug: "' + newSlug + '"');
  
  const newFileName = newSlug + '.md';
  fs.writeFileSync(path.join(dir, newFileName), newContent);
  fs.unlinkSync(path.join(dir, file));
  console.log(file + ' -> ' + newFileName);
});
