const fs = require('fs');
let c = fs.readFileSync('src/content/blog/seventeen-vernon-saju-four-pillars-destiny.md', 'utf8');
c = c.replace(/date: "2026-10-\d\d"/, 'date: "2026-10-08"');
fs.writeFileSync('src/content/blog/seventeen-vernon-saju-four-pillars-destiny.md', c);
