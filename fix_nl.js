const fs = require('fs');
let c = fs.readFileSync('src/locales/i18n.js', 'utf8');

// Replace literal string "\n" with actual newline character
c = c.split('\\n').join('\n');

fs.writeFileSync('src/locales/i18n.js', c);
console.log('Fixed literal newlines');
