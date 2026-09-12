const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');

c = c.replace(
  /body: JSON\.stringify\(\{ contents: \[\{ parts: \[\{ text: promptText \}\] \}\] \}\)/g,
  'body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }], generationConfig: { temperature: 0.1, topK: 1 } })'
);

fs.writeFileSync('src/app/api/generate-saju/route.js', c);
