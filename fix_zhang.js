const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/content/blog/zerobaseone-zhang-hao-saju-analysis.md');
let content = fs.readFileSync(file, 'utf8');

content = content.trim();
if (content.endsWith('Yin Water & Earth')) {
  content += ' | Yang Earth & Water | *Time Unknown* |\n\n## Deep Dive: The Core Energy\n\nZhang Hao is guided by an immense core energy that blends profound emotional depth with sturdy leadership. He is naturally charismatic and excels in bringing harmony to complex environments.\n\n## Frequently Asked Questions\n\n### Why is Zhang Hao a born center?\nHis Earth-Water balance allows him to remain completely unbothered and grounded while radiating deep talent.\n\n### What elements balance him?\nHe benefits from Wood energy to continue growing his global influence.';
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed Zhang Hao');
}
