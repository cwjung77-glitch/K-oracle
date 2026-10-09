const fs = require('fs');
let code = fs.readFileSync('scripts/generate_color_blog.js', 'utf8');

// I will wrap the generation logic in a loop.
// Actually, this is too complex for string replace. I will rewrite the script file.
// Let's first read it to see the structure.
