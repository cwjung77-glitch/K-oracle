const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog/';

fs.readdirSync(dir).forEach(file => {
  if (file.includes('vernon')) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    content = content.replace(/date: ".*?"/, 'date: "2026-10-08"');
    fs.writeFileSync(path.join(dir, file), content);
  }
});
console.log('Fixed Vernon dates');
