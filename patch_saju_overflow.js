const fs = require('fs');
let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

// Fix 1: Extract Group Name
// I will replace `selectedIdol.group` with `(selectedIdol.name.match(/\((.*?)\)/)?.[1] || '')`
// We need to update the idolCardTarget and the getGroupColors call.
// Let's redefine getGroupColors to take `name` and extract it inside:

const helperFuncTarget = `const getGroupColors = (group) => {`;
const helperFuncReplacement = `const getGroupColors = (group) => {`;
// Wait, I already added getGroupColors. Let's just modify the idol card rendering!
const idolCardTargetRegex = /<div className="text-center">[\s\S]*?<div className="text-xl font-black text-white">\{selectedIdol\.name\}<\/div>[\s\S]*?<\/div>/;

const idolCardReplacement = `<div className="text-center">
                            <div className={\`w-16 h-16 mx-auto rounded-full bg-gradient-to-br \${getGroupColors(selectedIdol.name.match(/\\((.*?)\\)/)?.[1] || '').bg} border \${getGroupColors(selectedIdol.name.match(/\\((.*?)\\)/)?.[1] || '').border} flex items-center justify-center mb-3 transition-colors duration-500\`}>
                              <Star size={24} className={\`\${getGroupColors(selectedIdol.name.match(/\\((.*?)\\)/)?.[1] || '').text} transition-colors duration-500\`} />
                            </div>
                            <div className="text-xl font-black text-white">{selectedIdol.name.split(' (')[0]}</div>
                            <div className={\`text-sm font-bold \${getGroupColors(selectedIdol.name.match(/\\((.*?)\\)/)?.[1] || '').text} transition-colors duration-500\`}>{selectedIdol.name.match(/\\((.*?)\\)/)?.[1] || ''}</div>
                          </div>`;

content = content.replace(idolCardTargetRegex, idolCardReplacement);


// Fix 2: Layout overflow (the bottom box cut off)
// Find the left panel parent:
// `<div className="flex-1 bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">`
// Change it to `flex-1 flex flex-col bg-black/40...`
// There are TWO of these (one for My Profile, one for Match With).
content = content.replace(/className="flex-1 bg-black\/40 border border-white\/10 p-6 rounded-2xl relative overflow-hidden group"/g, 
  'className="flex-1 flex flex-col bg-black/40 border border-white/10 p-6 rounded-2xl relative overflow-hidden group"');

// Find the right panel inner wrapper:
// `<div className="space-y-4 h-full flex flex-col">`
// Change to `className="space-y-4 flex-1 flex flex-col"`
content = content.replace(/className="space-y-4 h-full flex flex-col"/g, 'className="space-y-4 flex-1 flex flex-col"');

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content, 'utf8');
console.log("Idol group extraction and layout overflow fixed!");
