const fs = require('fs');
let content = fs.readFileSync('blog.mjs', 'utf8');
content = content.replace("const today = new Date().toISOString().split('T')[0];", 
"const args = process.argv.slice(2);\nlet customDate = new Date().toISOString().split('T')[0];\nlet idolName = args.join(' ');\nif(args.length > 0 && args[args.length-1].match(/^\\d{4}-\\d{2}-\\d{2}$/)) {\n  customDate = args.pop();\n  idolName = args.join(' ').trim();\n}\nconst today = customDate;\n");
content = content.replace("const idol = process.argv.slice(2).join(' ').trim();", "const idol = idolName;");
fs.writeFileSync('blog.mjs', content, 'utf8');