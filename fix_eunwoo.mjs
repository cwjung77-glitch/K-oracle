import fs from 'fs';

let content = fs.readFileSync('src/content/blog/cha-eunwoo-saju-four-pillars-cosmic-aura.md', 'utf8');

const badAscii = `  +-------------------------------------------------------+
  |              CHA EUNWOO'S DAY MASTER                  |
  |                Geng Metal (庚金)                       |
  |    Symbol: The Refined Sword / The Celestial Jewel    |
  +-------------------------------------------------------+`;

const replacement = `> **CHA EUNWOO'S DAY MASTER**
> **Geng Metal (庚金)**
> *Symbol: The Refined Sword / The Celestial Jewel*`;

content = content.replace(badAscii, replacement);
fs.writeFileSync('src/content/blog/cha-eunwoo-saju-four-pillars-cosmic-aura.md', content);
