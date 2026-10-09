const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'public', 'google0e9dedd286d33594.html');
fs.writeFileSync(file, 'google-site-verification: google0e9dedd286d33594.html', 'utf8');
console.log('Written in UTF-8');