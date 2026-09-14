const fs = require('fs');
let c = fs.readFileSync('src/app/globals.css', 'utf8');
c = c.replace('@import "tailwindcss";', '@import "tailwindcss";\n@plugin "@tailwindcss/typography";');
fs.writeFileSync('src/app/globals.css', c);
