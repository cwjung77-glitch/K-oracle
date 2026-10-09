const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog/';

fs.readdirSync(dir).forEach(file => {
  if (file.startsWith('beauty-post-')) {
    const lang = file.split('-').pop();
    const newName = `gidle-shuhua-personal-color-${lang}`;
    const oldPath = path.join(dir, file);
    const newPath = path.join(dir, newName);
    
    let content = fs.readFileSync(oldPath, 'utf8');
    content = content.replace(/date: ".*?"/, 'date: "2026-10-08"');
    content = content.replace(/slug: ".*?"/, `slug: "gidle-shuhua-personal-color-${lang.replace('.md', '')}"`);
    
    fs.writeFileSync(newPath, content);
    fs.unlinkSync(oldPath);
  }
});
console.log('Renamed and patched Shuhua posts');
