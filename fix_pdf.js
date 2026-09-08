const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8');
const regex = /const sections = isEs \? \[(.|\n)*?\}\s*\} else \{/m;
c = c.replace(regex, '} else {');
fs.writeFileSync('src/app/api/download-pdf/route.js', c);
