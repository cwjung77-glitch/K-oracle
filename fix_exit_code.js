const fs = require('fs');

let c = fs.readFileSync('scripts/generate_blog.js', 'utf8');
c = c.replace('console.error("Error generating post:", err);', 'console.error("Error generating post:", err);\n    process.exit(1);');
fs.writeFileSync('scripts/generate_blog.js', c);
