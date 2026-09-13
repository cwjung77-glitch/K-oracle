const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8').replace(/\r\n/g, '\n');

c = c.replace(
  /'©© \$\{new Date\(\)\.getFullYear\(\)\} K-ORACLE\. STRICTLY CONFIDENTIAL\.'/,
  `\`© \${new Date().getFullYear()} K-ORACLE. STRICTLY CONFIDENTIAL.\``
);
c = c.replace(
  /'Reporte Maestro \$\{displayYear\} \(Edición VIP\)'/,
  `\`Reporte Maestro \${displayYear} (Edición VIP)\``
);
c = c.replace(
  /isEs \? 'Reporte Maestro \$\{displayYear\} \\(Edicion VIP\\)' :/,
  `isEs ? \`Reporte Maestro \${displayYear} (Edicion VIP)\` :`
);


fs.writeFileSync('src/app/api/download-pdf/route.js', c);
