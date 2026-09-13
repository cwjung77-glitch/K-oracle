const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');

c = c.replace(
  /\"1-2 sentences\"\}\}\`;\n\n    console\.log/,
  `"1-2 sentences"}}\`;\n    }\n\n    console.log`
);

fs.writeFileSync('src/app/api/generate-saju/route.js', c);
