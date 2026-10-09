const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'scripts/generate_blog.js');
let content = fs.readFileSync(scriptPath, 'utf8');

content = content.replace(
  'CRITICAL FORMATTING RULE: NEVER use ASCII art boxes, raw text diagrams, or preformatted text blocks (like +---+ or |...|) to draw tables or diagrams.',
  'CRITICAL FORMATTING RULE: NEVER use ASCII art boxes, raw text diagrams, code blocks (using \\\), or 4-space indented blocks to display text. Specifically, when listing the 10-Year Luck Cycles (Daewoon), you MUST format it as a standard Markdown bulleted list using hyphens (-), NOT as a code block.'
);

fs.writeFileSync(scriptPath, content, 'utf8');
console.log('Updated prompt rules.');