const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
const files = fs.readdirSync(dir);
const badWords = [
  'scandal', 'controversy', 'failure', 'worst', 'crime', 'lawsuit', 
  'hate', 'terrible', 'tragedy', 'accident', 'prison', 'jail', 'sue', 
  'defamation', 'fraud', 'arrest', 'divorce', 'cheat'
];

let foundIssues = false;

files.forEach(f => {
  if (!f.endsWith('.md')) return;
  const txt = fs.readFileSync(path.join(dir, f), 'utf8').toLowerCase();
  
  badWords.forEach(w => {
    if (txt.includes(w)) {
      console.log(`⚠️ Found potentially negative word '${w}' in ${f}`);
      foundIssues = true;
    }
  });
});

if (!foundIssues) {
  console.log('✅ ALL CLEAN! No negative or controversial words found.');
}
