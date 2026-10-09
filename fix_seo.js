const fs = require('fs');
['src/app/robots.js', 'src/app/sitemap.js'].forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/k-oracle-omega\.vercel\.app/g, 'thekoracle.com');
  fs.writeFileSync(file, content, 'utf-8');
});