const fs = require('fs');
let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

// 1. Revert to original just to be safe
const { execSync } = require('child_process');
execSync('git checkout -- src/components/features/SajuCompatibility.jsx');

content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

// Replace VS with &
const vsRegex = /<span className="text-xl md:text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-orange-400">VS<\/span>/g;
content = content.replace(vsRegex, `<span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-orange-400">&amp;</span>`);

// Insert the helper vars
const helperVars = `
  const selectedGroup = selectedIdol?.name ? (selectedIdol.name.match(/\\((.*?)\\)/)?.[1] || '') : '';
  const selectedIdolName = selectedIdol?.name ? selectedIdol.name.split(' (')[0] : '';
  const groupColors = getGroupColors(selectedGroup);
  
  return (
`;
content = content.replace('  return (\n', helperVars);

const idolTargetRegex = /<div className="text-center">[\s\S]*?<Star size=\{24\} className="text-pink-400" \/>[\s\S]*?<\/div>\s*<div className="text-xl font-black text-white">\{selectedIdol\.name\}<\/div>\s*<div className="text-sm font-bold text-pink-400">\{selectedIdol\.group\}<\/div>\s*<\/div>/;

const idolReplacement = `<div className="text-center">
                            <div className={\`w-16 h-16 mx-auto rounded-full bg-gradient-to-br \${groupColors.bg} border \${groupColors.border} flex items-center justify-center mb-3 transition-colors duration-500\`}>
                              <Star size={24} className={\`\${groupColors.text} transition-colors duration-500\`} />
                            </div>
                            <div className="text-xl font-black text-white mb-1">{selectedIdolName}</div>
                            <div className={\`text-sm font-bold \${groupColors.text} transition-colors duration-500\`}>{selectedGroup}</div>
                          </div>`;

content = content.replace(idolTargetRegex, idolReplacement);

// Fix layout
content = content.replace(/className="flex-1 bg-black\/40 border border-white\/10 p-6 rounded-2xl relative overflow-hidden group"/g, 
  'className="flex-1 flex flex-col bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group"');
content = content.replace(/className="space-y-4 h-full flex flex-col"/g, 'className="space-y-4 flex-1 flex flex-col"');

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content, 'utf8');
console.log("Safe patch applied.");
