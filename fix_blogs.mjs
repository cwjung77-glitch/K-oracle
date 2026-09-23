import fs from 'fs';
import path from 'path';

const glossaryBlock = "> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.";

const disclaimerBlock = "*Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.*";

const termsMapping = {
    "Ji Earth": "Gi Earth",
    "Mao Wood": "Myo Wood",
    "Xin Metal": "Sin Metal",
    "Ren Water": "Im Water",
    "Gui Water": "Gye Water",
    "Bing Fire": "Byeong Fire",
    "Ding Fire": "Jeong Fire",
    "Wu Earth": "Mu Earth",
    "Yi Wood": "Eul Wood",
    "Jia Wood": "Gap Wood",
    "Geng Metal": "Gyeong Metal",
    "Chou Earth": "Chuk Earth",
    "Yin Wood": "In Wood",
    "Chen Earth": "Jin Earth",
    "Si Fire": "Sa Fire",
    "Wu Fire": "O Fire",
    "Wei Earth": "Mi Earth",
    "Shen Metal": "Sin Metal",
    "You Metal": "Yu Metal",
    "Xu Earth": "Sul Earth",
    "Hai Water": "Hae Water",
    "Zi Water": "Ja Water"
};

const dir = 'src/content/blog/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'what-is-korean-saju-four-pillars-of-destiny.md');

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // 1. Conclusion to Key Takeaways
    content = content.replace(/^##\s*Conclusion\s*$/gm, '## Key Takeaways');
    
    // 2. Glossary Block normalization
    // Remove existing
    content = content.replace(/>\s*🔮\s*\*\*New to Korean Astrology\?\*\*.*?(?=\n\n|\n---)/gis, '');
    content = content.replace(/>\s*.*?New to Korean Astrology\?.*?before diving into the analysis\.*"?/gis, '');
    content = content.replace(/>\s*\?\?\s*\*\*New to Korean Astrology\?\*\*.*?(?=\n\n|\n---)/gis, '');
    content = content.replace(/>\s*\?\?.*New to Korean Astrology\?.*?(?=\n\n|\n---)/gis, '');
    
    // Replace multiple newlines
    content = content.replace(/\n{3,}/g, '\n\n');
    
    // Insert new glossary block right before next heading after TLDR/Quick Answer
    content = content.replace(/(##\s*(TL;DR|Quick Answer).*?\n\n)(##)/is, `$1${glossaryBlock}\n\n$3`);
    
    // Fallback if no TLDR
    if (!content.includes(glossaryBlock)) {
        content = content.replace(/(##\s*The Cosmic Blueprint)/is, `${glossaryBlock}\n\n$1`);
    }

    // 3. Disclaimer normalization
    content = content.replace(/\*Disclaimer: This analysis is based on publicly available birth data.*/is, '');
    content = content.trimEnd() + `\n\n---\n\n${disclaimerBlock}\n`;
    
    // 4. Terminology translation
    for (const [ch, kr] of Object.entries(termsMapping)) {
        const regex = new RegExp(ch, 'g');
        content = content.replace(regex, kr);
    }
    
    // 5. Backdate Natty/Mimi to 21st, Yooa to 22nd
    if (file === 'kiss-of-life-natty-saju-analysis.md' || file === 'oh-my-girl-mimi-saju-analysis.md') {
        content = content.replace(/date:\s*["'].*?["']/, 'date: "2026-09-21"');
    } else if (file === 'oh-my-girl-yooa-saju-analysis.md') {
        content = content.replace(/date:\s*["'].*?["']/, 'date: "2026-09-22"');
    }

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
}

console.log("Fixed all blogs natively via Node!");
