const fs = require('fs');
const path = require('path');

const glossaryBlock = "> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.";

const dir = 'src/content/blog/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'what-is-korean-saju-four-pillars-of-destiny.md');

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Nuke existing Glossary just in case
    content = content.replace(/> 🔮 \*\*New to Korean Astrology\?\*\*.*?(?=\n\n|\n##|\n---)/gis, '');
    
    // Split by `\n## `
    let parts = content.split(/\n## /);
    if (parts.length > 2) {
        // parts[1] is the first section (e.g. TL;DR) without the leading "\n## "
        parts[1] = parts[1].trimEnd() + `\n\n${glossaryBlock}\n\n`;
        content = parts.join("\n## ");
    } else {
        content = content.replace(/(##\s*The Cosmic Blueprint|##\s*Day Master)/i, `${glossaryBlock}\n\n$1`);
    }

    content = content.replace(/\n{3,}/g, '\n\n');
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
}

console.log("Glossary inserted reliably!");
