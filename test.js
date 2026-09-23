const fs = require('fs');
let content = fs.readFileSync('src/content/blog/babymonster-ahyeon-saju-analysis.md', 'utf8');
console.log(content.length);
