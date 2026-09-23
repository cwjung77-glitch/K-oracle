const fs = require('fs');
let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');

// 1. Replace VS with &
const vsRegex = /<span className="text-xl md:text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-orange-400">VS<\/span>/g;
content = content.replace(vsRegex, `<span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-orange-400">&amp;</span>`);

// 2. Add getGroupColors function just before the `return (` of SajuCompatibility component
// Search for `return (` and inject it before.
// We know there's `const handleAnalyze = async () => { ... }` or similar. Let's find `return (\n    <div className="` or `  return (\n`
const returnRegex = /  return \(\s*<div/g;

const helperFunc = `
  const getGroupColors = (group) => {
    if(!group) return { bg: 'from-pink-500/20 to-orange-500/20', border: 'border-pink-500/30', text: 'text-pink-400' };
    const g = group.toUpperCase();
    if(g.includes('BTS')) return { bg: 'from-purple-500/20 to-fuchsia-500/20', border: 'border-purple-500/30', text: 'text-purple-400' };
    if(g.includes('BLACKPINK')) return { bg: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-500/30', text: 'text-pink-400' };
    if(g.includes('TWICE')) return { bg: 'from-orange-400/20 to-pink-400/20', border: 'border-orange-400/30', text: 'text-orange-400' };
    if(g.includes('STRAY KIDS')) return { bg: 'from-red-500/20 to-rose-500/20', border: 'border-red-500/30', text: 'text-red-400' };
    if(g.includes('SEVENTEEN')) return { bg: 'from-rose-400/20 to-blue-400/20', border: 'border-rose-400/30', text: 'text-rose-400' };
    if(g.includes('AESPA')) return { bg: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/30', text: 'text-indigo-400' };
    if(g.includes('NEWJEANS')) return { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', text: 'text-blue-400' };
    if(g.includes('ENHYPEN')) return { bg: 'from-red-600/20 to-orange-600/20', border: 'border-red-600/30', text: 'text-red-500' };
    if(g.includes('TXT') || g.includes('TOMORROW X TOGETHER')) return { bg: 'from-cyan-400/20 to-blue-400/20', border: 'border-cyan-400/30', text: 'text-cyan-400' };
    if(g.includes('NCT')) return { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', text: 'text-green-400' };
    return { bg: 'from-pink-500/20 to-orange-500/20', border: 'border-pink-500/30', text: 'text-pink-400' };
  };
`;
// Let's inject it right before `if (step === 2 && result)` or just find `  return (\n    <div`
const newContent = content.replace('  return (\n    <div className=', helperFunc + '\n  return (\n    <div className=');

// 3. Apply the dynamic colors to the Idol card
const idolCardTarget = `<div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 border border-pink-500/30 flex items-center justify-center mb-3">
                              <Star size={24} className="text-pink-400" />
                            </div>
                            <div className="text-xl font-black text-white">{selectedIdol.name}</div>
                            <div className="text-sm font-bold text-pink-400">{selectedIdol.group}</div>
                          </div>`;

const idolCardReplacement = `<div className="text-center">
                            <div className={\`w-16 h-16 mx-auto rounded-full bg-gradient-to-br \${getGroupColors(selectedIdol.group).bg} border \${getGroupColors(selectedIdol.group).border} flex items-center justify-center mb-3 transition-colors duration-500\`}>
                              <Star size={24} className={\`\${getGroupColors(selectedIdol.group).text} transition-colors duration-500\`} />
                            </div>
                            <div className="text-xl font-black text-white">{selectedIdol.name}</div>
                            <div className={\`text-sm font-bold \${getGroupColors(selectedIdol.group).text} transition-colors duration-500\`}>{selectedIdol.group}</div>
                          </div>`;

content = newContent.replace(idolCardTarget, idolCardReplacement);

fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content, 'utf8');
console.log("Saju UI patched!");
