const fs = require('fs');

let c = fs.readFileSync('scripts/generate_blog.js', 'utf8');

// The original line in the file is:
// date: "YYYY-MM-DD"
// We want to replace it so that it always outputs the exact current date in the prompt.
// We can change the literal string to a template literal in the file

c = c.replace(/date: "YYYY-MM-DD"/g, 'date: "${new Date().toISOString().split(\'T\')[0]}"');

fs.writeFileSync('scripts/generate_blog.js', c);
