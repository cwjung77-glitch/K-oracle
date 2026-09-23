const fs = require('fs');
let file = 'src/content/blog/ateez-choi-san-saju-destiny-analysis.md';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/## The Dual Nature of ATEEZ[’']s Choi San/i, '## TL;DR');
fs.writeFileSync(file, content, 'utf8');
