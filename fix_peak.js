const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8');
c = c.replace("'August to September marks your peak season. Prepare for a major event.'", "`\\${months[scores.indexOf(Math.max(...scores))]} marks your absolute peak season. Prepare for a major cosmic event.`");
c = c.replace("'Agosto a Septiembre marca tu temporada cumbre. Preparate.'", "`\\${months[scores.indexOf(Math.max(...scores))]} marca tu temporada cumbre. Prepárate.`");
fs.writeFileSync('src/app/api/download-pdf/route.js', c);
