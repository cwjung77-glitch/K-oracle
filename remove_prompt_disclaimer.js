const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'scripts/generate_blog.js');
let code = fs.readFileSync(scriptPath, 'utf8');

code = code.replace(
  /CRITICAL INSTRUCTION 2: You MUST append the following exact disclaimer[\s\S]*?\.\*\`;/g,
  '`;'
);

fs.writeFileSync(scriptPath, code, 'utf8');
console.log('Removed disclaimer instruction.');