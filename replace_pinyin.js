const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

const replacements = [
  { from: /\bBazi\b/gi, to: 'Saju' },
  { from: /\bDa Yun\b/gi, to: 'Daewoon' },
  
  // Stems
  { from: /\bJia(?=\s*(Wood|Pillar|Stem|\/|-|\())/g, to: 'Gap' },
  { from: /\bYi(?=\s*(Wood|Pillar|Stem|\/|-|\())/g, to: 'Eul' },
  { from: /\bBing(?=\s*(Fire|Pillar|Stem|\/|-|\())/g, to: 'Byeong' },
  { from: /\bDing(?=\s*(Fire|Pillar|Stem|\/|-|\())/g, to: 'Jeong' },
  { from: /\bWu(?=\s*(Earth|Pillar|Stem|\/|-|\())/g, to: 'Mu' },
  { from: /\bJi(?=\s*(Earth|Pillar|Stem|\/|-|\())/g, to: 'Gi' },
  { from: /\bGeng(?=\s*(Metal|Pillar|Stem|\/|-|\())/g, to: 'Gyeong' },
  { from: /\bXin(?=\s*(Metal|Pillar|Stem|\/|-|\())/g, to: 'Sin' },
  { from: /\bRen(?=\s*(Water|Pillar|Stem|\/|-|\())/g, to: 'Im' },
  { from: /\bGui(?=\s*(Water|Pillar|Stem|\/|-|\())/g, to: 'Gye' },
  
  // Branches
  { from: /\bZi(?=\s*(Rat|Pillar|Branch|\/|-|\())/g, to: 'Ja' },
  { from: /\bChou(?=\s*(Ox|Pillar|Branch|\/|-|\())/g, to: 'Chuk' },
  { from: /\bYin(?=\s*(Tiger|Pillar|Branch|\/|-|\())/g, to: 'In' },
  { from: /\bMao(?=\s*(Rabbit|Pillar|Branch|\/|-|\())/g, to: 'Myo' },
  { from: /\bChen(?=\s*(Dragon|Pillar|Branch|\/|-|\())/g, to: 'Jin' },
  { from: /\bSi(?=\s*(Snake|Pillar|Branch|\/|-|\())/g, to: 'Sa' },
  { from: /\bWu(?=\s*(Horse|Pillar|Branch|\/|-|\())/g, to: 'Oh' },
  { from: /\bWei(?=\s*(Goat|Sheep|Pillar|Branch|\/|-|\())/g, to: 'Mi' },
  { from: /\bShen(?=\s*(Monkey|Pillar|Branch|\/|-|\())/g, to: 'Sin' },
  { from: /\bYou(?=\s*(Rooster|Pillar|Branch|\/|-|\())/g, to: 'Yu' },
  { from: /\bXu(?=\s*(Dog|Pillar|Branch|\/|-|\())/g, to: 'Sul' },
  { from: /\bHai(?=\s*(Pig|Pillar|Branch|\/|-|\())/g, to: 'Hae' },

  // Special combinations often used
  { from: /Bing-Zi/g, to: 'Byeong-Ja' },
  { from: /Geng-Zi/g, to: 'Gyeong-Ja' },
  { from: /Ding-Hai/g, to: 'Jeong-Hae' },
  { from: /Ji-Mao/g, to: 'Gi-Myo' },
  { from: /Geng-Wu/g, to: 'Gyeong-Oh' },
  { from: /Tian Yi Gui Ren/gi, to: 'Cheon Eul Gwi In' },
  
  // Specific capitalized forms that might have been missed
  { from: /\b(Jia|Yi|Bing|Ding|Wu|Ji|Geng|Xin|Ren|Gui)\b\s+(Wood|Fire|Earth|Metal|Water)/g, to: (match, p1, p2) => {
      const map = { Jia: 'Gap', Yi: 'Eul', Bing: 'Byeong', Ding: 'Jeong', Wu: 'Mu', Ji: 'Gi', Geng: 'Gyeong', Xin: 'Sin', Ren: 'Im', Gui: 'Gye' };
      return (map[p1] || p1) + ' ' + p2;
  }},
  { from: /\b(Zi|Chou|Yin|Mao|Chen|Si|Wu|Wei|Shen|You|Xu|Hai)\b\s+(Rat|Ox|Tiger|Rabbit|Dragon|Snake|Horse|Goat|Sheep|Monkey|Rooster|Dog|Pig)/g, to: (match, p1, p2) => {
      const map = { Zi: 'Ja', Chou: 'Chuk', Yin: 'In', Mao: 'Myo', Chen: 'Jin', Si: 'Sa', Wu: 'Oh', Wei: 'Mi', Shen: 'Sin', You: 'Yu', Xu: 'Sul', Hai: 'Hae' };
      return (map[p1] || p1) + ' ' + p2;
  }}
];

let totalChanges = 0;

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  replacements.forEach(r => {
    if (typeof r.to === 'function') {
      content = content.replace(r.from, r.to);
    } else {
      content = content.replace(r.from, r.to);
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanges++;
    console.log(`Updated: ${file}`);
  }
});

console.log(`Total files updated: ${totalChanges}`);
