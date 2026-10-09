const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog/';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
let fixCount = 0;

files.forEach(f => {
  let c = fs.readFileSync(path.join(dir, f), 'utf8');
  
  // Find empty TL;DRs (with or without spaces/newlines between)
  if (/## TL;DR\s*##/.test(c)) {
    // Extract excerpt
    const excerptMatch = c.match(/excerpt:\s*"(.*?)"/);
    if (excerptMatch) {
      let excerpt = excerptMatch[1];
      // Replace empty TL;DR with excerpt
      c = c.replace(/## TL;DR\s*##/, `## TL;DR (Quick Answer)\n\n${excerpt}\n\n##`);
      fs.writeFileSync(path.join(dir, f), c);
      fixCount++;
    }
  }
});

console.log('Fixed', fixCount, 'files with empty TL;DRs.');
