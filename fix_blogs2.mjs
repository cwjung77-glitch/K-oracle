import fs from 'fs';
import path from 'path';

const glossaryBlock = "> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.";

const dir = 'src/content/blog/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'what-is-korean-saju-four-pillars-of-destiny.md');

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Nuke ANY blockquote that mentions New to Korean Astrology
    content = content.replace(/^>\s*.*?New to Korean Astrology.*$/gim, '');
    
    // Replace multiple newlines
    content = content.replace(/\n{3,}/g, '\n\n');
    
    // Re-insert new glossary block right before next heading after TLDR/Quick Answer
    // First, remove the one we just inserted if any
    content = content.replace(glossaryBlock, '');
    content = content.replace(/\n{3,}/g, '\n\n');

    content = content.replace(/(##\s*(TL;DR|Quick Answer).*?\n\n)(##)/is, `$1${glossaryBlock}\n\n$3`);
    
    if (!content.includes(glossaryBlock)) {
        content = content.replace(/(##\s*The Cosmic Blueprint)/is, `${glossaryBlock}\n\n$1`);
    }

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
}

console.log("Glossary fixed!");
