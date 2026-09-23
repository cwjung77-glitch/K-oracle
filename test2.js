const fs = require('fs');
const dir = 'src/content/blog/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
for(const f of files) {
  const content = fs.readFileSync(dir + f, 'utf8');
  if (content.length < 2000) {
     console.log(f + ": " + content.length);
  }
}
