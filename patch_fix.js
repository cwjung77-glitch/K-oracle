const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

const guideBlock = `\n> 🔮 **New to Korean Astrology?** If terms like *Day Master* or *Ten Gods* sound confusing, don't worry! Read our [Ultimate Guide to Korean Saju (Four Pillars of Destiny)](/blog/what-is-korean-saju-four-pillars-of-destiny) to quickly decode the cosmic language before diving into the analysis.\n\n`;

let patchedCount = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract date to only process the new ones (2026-09-25 or later, or actually all just in case)
  const dateMatch = content.match(/date:\s*"(.*?)"/);
  if (!dateMatch) continue;
  const date = dateMatch[1];
  
  // Actually, we can just apply the Chinese -> Korean fixes and Guide block to ALL posts to be safe
  // Or only from 2026-09-25? Let's do >= 2026-09-25 for safety, plus maybe others.
  // The user said "지금 막 포스팅된 글에는 이 부분이 빠져있으니... 중국식 표현이나 발음이 있는것들이 종종 발견되는데 중국식 표기나 발음은 전부 한국식으로 고쳐줘"
  // So we apply to all just in case.

  let newContent = content;

  // 1. Add Guide block if missing
  if (!newContent.includes('New to Korean Astrology?')) {
    // Find a good place to insert.
    // Let's insert it right after the first table ends, OR if no table, right before the second `## ` section.
    // Actually, inserting it at the end of TL;DR section is great.
    const tldrRegex = /(## TL;DR[^\n]*\n(?:.*?\n)+?)(?=\n## )/i;
    if (tldrRegex.test(newContent)) {
      newContent = newContent.replace(tldrRegex, `$1${guideBlock}`);
    } else {
      // Fallback: insert right before the first table
      if (newContent.includes('| Pillar |')) {
        newContent = newContent.replace(/(\n\| Pillar \|)/, `${guideBlock}$1`);
      } else {
        // Fallback: insert after the first `## ` section
        const firstH2 = /(## [^\n]+\n(?:.*?\n)+?)(?=\n## )/;
        newContent = newContent.replace(firstH2, `$1${guideBlock}`);
      }
    }
  }

  // 2. Replace Chinese terms with Korean terms
  const replacements = {
    'Jia Wood': 'Gap Wood',
    'Yi Wood': 'Eul Wood',
    'Bing Fire': 'Byeong Fire',
    'Ding Fire': 'Jeong Fire',
    'Wu Earth': 'Mu Earth',
    'Ji Earth': 'Gi Earth',
    'Geng Metal': 'Gyeong Metal',
    'Xin Metal': 'Sin Metal',
    'Ren Water': 'Im Water',
    'Gui Water': 'Gye Water',
    
    'Zi Rat': 'Ja Rat',
    'Chou Ox': 'Chuk Ox',
    'Yin Tiger': 'In Tiger',
    'Mao Rabbit': 'Myo Rabbit',
    'Chen Dragon': 'Jin Dragon',
    'Si Snake': 'Sa Snake',
    'Wu Horse': 'Oh Horse',
    'Wei Goat': 'Mi Goat',
    'Wei Sheep': 'Mi Sheep',
    'Shen Monkey': 'Sin Monkey',
    'You Rooster': 'Yu Rooster',
    'Xu Dog': 'Sul Dog',
    'Hai Pig': 'Hae Pig',

    'Bazi': 'Saju',
    'BaZi': 'Saju',
    'bazi': 'saju',
    'Da Yun': 'Daewoon',
    'Dayun': 'Daewoon',
    
    // Also handling forms like Xin (辛) -> Sin (辛)
    'Jia \\(': 'Gap (',
    'Yi \\(': 'Eul (',
    'Bing \\(': 'Byeong (',
    'Ding \\(': 'Jeong (',
    'Wu \\(': 'Mu (',
    'Ji \\(': 'Gi (',
    'Geng \\(': 'Gyeong (',
    'Xin \\(': 'Sin (',
    'Ren \\(': 'Im (',
    'Gui \\(': 'Gye (',
    
    'Zi \\(': 'Ja (',
    'Chou \\(': 'Chuk (',
    'Yin \\(': 'In (',
    'Mao \\(': 'Myo (',
    'Chen \\(': 'Jin (',
    'Si \\(': 'Sa (',
    'Wu \\(': 'Oh (',
    'Wei \\(': 'Mi (',
    'Shen \\(': 'Sin (',
    'You \\(': 'Yu (',
    'Xu \\(': 'Sul (',
    'Hai \\(': 'Hae ('
  };

  for (const [ch, ko] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${ch}`, 'g');
    newContent = newContent.replace(regex, ko);
  }
  
  // Specific fix for "Xin (辛金)" where it doesn't have a space
  newContent = newContent.replace(/\bXin\(/g, 'Sin(');
  newContent = newContent.replace(/\bGeng\(/g, 'Gyeong(');
  newContent = newContent.replace(/\bRen\(/g, 'Im(');
  newContent = newContent.replace(/\bGui\(/g, 'Gye(');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Patched ${file}`);
    patchedCount++;
  }
}

console.log(`Successfully patched ${patchedCount} files.`);
