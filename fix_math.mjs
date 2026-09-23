import fs from 'fs';
let content = fs.readFileSync('src/content/blog/what-is-korean-saju-four-pillars-of-destiny.md', 'utf8');
content = content.replace('$4 \\text{ Pillars} \\times 2 \\text{ Characters} = 8 \\text{ Cosmic Characters (Palja)}$', '**4 Pillars × 2 Characters = 8 Cosmic Characters (Palja)**');
fs.writeFileSync('src/content/blog/what-is-korean-saju-four-pillars-of-destiny.md', content);
