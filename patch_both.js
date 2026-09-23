const fs = require('fs');
let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

// Fix 1: Idol card and group extraction
const idolTarget = `<div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 border border-pink-500/30 flex items-center justify-center mb-3">
                              <Star size={24} className="text-pink-400" />
                            </div>
                            <div className="text-xl font-black text-white">{selectedIdol.name}</div>
                            <div className="text-sm font-bold text-pink-400">{selectedIdol.group}</div>
                          </div>`;

const idolReplacement = `<div className="text-center">
                            <div className={\`w-16 h-16 mx-auto rounded-full bg-gradient-to-br \${getGroupColors(selectedIdol.name.match(/\\((.*?)\\)/)?.[1]).bg} border \${getGroupColors(selectedIdol.name.match(/\\((.*?)\\)/)?.[1]).border} flex items-center justify-center mb-3 transition-colors duration-500\`}>
                              <Star size={24} className={\`\${getGroupColors(selectedIdol.name.match(/\\((.*?)\\)/)?.[1]).text} transition-colors duration-500\`} />
                            </div>
                            <div className="text-xl font-black text-white mb-1">{selectedIdol.name.split(' (')[0]}</div>
                            <div className={\`text-sm font-bold \${getGroupColors(selectedIdol.name.match(/\\((.*?)\\)/)?.[1]).text} transition-colors duration-500\`}>{selectedIdol.name.match(/\\((.*?)\\)/)?.[1]}</div>
                          </div>`;

if(content.includes(idolTarget)) {
    content = content.replace(idolTarget, idolReplacement);
} else {
    // maybe whitespace difference? Let's use regex
    const regexIdol = /<div className="text-center">[\s\S]*?<div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500\/20 to-orange-500\/20 border border-pink-500\/30 flex items-center justify-center mb-3">[\s\S]*?<Star size=\{24\} className="text-pink-400" \/>[\s\S]*?<\/div>[\s\S]*?<div className="text-xl font-black text-white">\{selectedIdol\.name\}<\/div>[\s\S]*?<div className="text-sm font-bold text-pink-400">\{selectedIdol\.group\}<\/div>[\s\S]*?<\/div>/;
    content = content.replace(regexIdol, idolReplacement);
}

// Fix 2: Layout Fix (bottom cut off)
content = content.replace(/className="flex-1 bg-black\/40 border border-white\/10 p-6 rounded-2xl relative overflow-hidden group"/g, 
  'className="flex-1 flex flex-col bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group"');

content = content.replace(/className="space-y-4 h-full flex flex-col"/g, 'className="space-y-4 flex-1 flex flex-col"');

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content, 'utf8');
console.log("Fixed!");
