const fs = require('fs');

let c = fs.readFileSync('src/app/blog/[slug]/page.js', 'utf8');

c = c.replace(/\\\`\\\$\\{slug\\}\\.md\\\`/g, '\`${slug}.md\`');
c = c.replace(/\\\`\\\$\\{data\\.title\\} \\| K-Oracle Blog\\\`/g, '\`${data.title} | K-Oracle Blog\`');
c = c.replace(/<span>\?\?\/span>/g, '<span>&bull;</span>');
c = c.replace(/<span>•<\/span>/g, '<span>&bull;</span>');

fs.writeFileSync('src/app/blog/[slug]/page.js', c);
