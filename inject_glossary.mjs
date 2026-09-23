import fs from 'fs';
import path from 'path';

const blogDir = 'src/content/blog';
const files = fs.readdirSync(blogDir);

const glossaryBlock = `
> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.
`;

let count = 0;
for (const file of files) {
    if (!file.endsWith('.md') || file === 'what-is-korean-saju-four-pillars-of-destiny.md') continue;
    
    let content = fs.readFileSync(path.join(blogDir, file), 'utf8');
    
    if (content.includes('New to Korean Astrology?')) continue;
    
    const tldrRegex = /(## TL;DR.*?)(?=\n|$)/;
    
    if (tldrRegex.test(content)) {
        content = content.replace(tldrRegex, `$1\n${glossaryBlock}`);
        fs.writeFileSync(path.join(blogDir, file), content, 'utf8');
        count++;
    } else {
        // Find end of frontmatter
        let endIdx = content.indexOf('---', 3);
        if (endIdx !== -1) {
            content = content.substring(0, endIdx + 3) + `\n${glossaryBlock}\n` + content.substring(endIdx + 3);
            fs.writeFileSync(path.join(blogDir, file), content, 'utf8');
            count++;
        }
    }
}
console.log(`Updated ${count} files.`);
