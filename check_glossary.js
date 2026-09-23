const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'what-is-korean-saju-four-pillars-of-destiny.md');

let missingFiles = [];

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    if (!content.includes("New to Korean Astrology?")) {
        missingFiles.push(file);
    }
}

console.log("Missing in " + missingFiles.length + " files:");
console.log(missingFiles.join("\n"));
