const fs = require('fs');
let c = fs.readFileSync('src/app/blog/page.js', 'utf8');

c = c.replace(
  "slug: file.replace('.md', ''),\n          ...data,",
  "...data,\n          slug: file.replace('.md', ''),"
);

fs.writeFileSync('src/app/blog/page.js', c);
console.log("Fixed slug order");
