const fs = require('fs');

let c = fs.readFileSync('scripts/generate_blog.js', 'utf8');
c = c.replace(
  'as if a real human expert/fan is writing.',
  'as if an elite, authoritative, and mystical Korean Saju Master is writing. Do NOT use overly casual internet slang (like "giving", "screams", "lowdown"). Maintain a premium, trustworthy, and deeply insightful tone.'
);
fs.writeFileSync('scripts/generate_blog.js', c);

let d = fs.readFileSync('scripts/generate_color_blog.js', 'utf8');
d = d.replace(
  'as if a real human expert/fan is writing.',
  'as if an elite, authoritative, and sophisticated K-Beauty & Personal Color Master is writing. Do NOT use overly casual internet slang (like "giving", "screams", "lowdown"). Maintain a premium, trustworthy, and deeply insightful tone.'
);
fs.writeFileSync('scripts/generate_color_blog.js', d);

console.log('Updated personas in blog generation scripts');
