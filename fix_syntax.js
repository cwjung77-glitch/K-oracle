const fs = require('fs');

let c = fs.readFileSync('scripts/generate_color_blog.js', 'utf8');

c = c.replace(/\\\`/g, '\`');
c = c.replace(/\\\$/g, '$');
c = c.replace(/gemini-1.5-flash/g, 'gemini-flash-lite-latest');

fs.writeFileSync('scripts/generate_color_blog.js', c);
console.log("Fixed syntax!");