const fs = require('fs');
let c = fs.readFileSync('src/content/blog/aespa-karina-personal-color-winter-cool-fr.md', 'utf8');
c = c.replace(/title: .*/, 'title: "[Français] Aespa Karina Personal Color"');
c = c.replace(/slug: .*/, 'slug: "aespa-karina-personal-color-winter-cool-fr"');
fs.writeFileSync('src/content/blog/aespa-karina-personal-color-winter-cool-fr.md', c);
console.log('Modified french post!');
