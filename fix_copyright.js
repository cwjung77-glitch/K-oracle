const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8').replace(/\r\n/g, '\n');

c = c.replace(
  /\` \$\{new Date\(\)\.getFullYear\(\)\}/g,
  `\`Copyright \${new Date().getFullYear()}`
);
c = c.replace(
  /\`© \$\{new Date\(\)\.getFullYear\(\)\}/g,
  `\`Copyright \${new Date().getFullYear()}`
);

fs.writeFileSync('src/app/api/download-pdf/route.js', c);
