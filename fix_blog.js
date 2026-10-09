const fs = require('fs');
let text = fs.readFileSync('blog.mjs', 'utf8');
const lines = text.split('\n');
const fixed = lines.filter(l => !l.includes('console.error') || l.includes('GEMINI_API_KEY') || l.includes('err.message')).join('\n');
fs.writeFileSync('blog.mjs', fixed, 'utf8');