import fs from 'fs';
let content = fs.readFileSync('src/content/blog/gidle-soyeon-saju-analysis.md', 'utf8');

// Remove all backticks
content = content.replace(/```/g, '');

// Un-indent lines that start with exactly 4 spaces (but not lists)
const lines = content.split('\n');
const fixedLines = lines.map(line => {
    if (line.startsWith('    ') && !line.startsWith('    *') && !line.startsWith('    -')) {
        return line.trim();
    }
    return line;
});

fs.writeFileSync('src/content/blog/gidle-soyeon-saju-analysis.md', fixedLines.join('\n'));
