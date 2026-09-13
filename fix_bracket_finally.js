const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');
c = c.replace(
  /(\"1-2 sentences\"\}\}\`;)\s*console\.log/,
  "$1\n    }\n\n    console.log"
);
fs.writeFileSync('src/app/api/generate-saju/route.js', c);
