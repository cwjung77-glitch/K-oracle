const fs = require('fs');
let content = fs.readFileSync('src/components/features/PersonalColor.jsx', 'utf8');

const oldContainer = `className="inline-flex flex-wrap gap-1.5 md:gap-2 p-2 md:p-2.5 rounded-2xl bg-black/10 backdrop-blur-md shadow-inner border border-white/30"`;
const newContainer = `className="inline-flex flex-wrap gap-2 md:gap-3 p-3 md:p-4 rounded-2xl bg-zinc-900 shadow-xl border border-zinc-800"`;
content = content.replace(oldContainer, newContainer);

const oldCircle = `className="w-6 h-6 md:w-8 md:h-8 shrink-0 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-2 md:border-[2.5px] border-white/90 transform hover:scale-110 transition-transform cursor-default"`;
const newCircle = `className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.3)] border-2 border-white/20 transform hover:scale-110 transition-transform cursor-default"`;
content = content.replace(oldCircle, newCircle);

fs.writeFileSync('src/components/features/PersonalColor.jsx', content);
console.log("Aura Card container and circles updated to match 9-pan palette!");
