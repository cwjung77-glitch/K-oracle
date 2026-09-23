const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

const searchRegex = /<button onClick=\{\(\) => setShowLogin\(true\)\}\s+className="px-2 sm:px-6 py-1\.5 sm:py-2 text-\[10px\] sm:text-xs font-bold tracking-widest bg-white text-black rounded-full hover:bg-zinc-200 transition-colors uppercase whitespace-nowrap"\s*>\s*Log In\s*<\/button>/m;

const newButton = `<button onClick={() => setShowLogin(true)}
                className="w-8 h-8 sm:w-auto sm:h-auto sm:px-6 sm:py-2 flex items-center justify-center text-[10px] sm:text-xs font-bold tracking-widest bg-white text-black rounded-full hover:bg-zinc-200 transition-colors uppercase whitespace-nowrap"
              >
                <span className="hidden sm:inline">Log In</span>
                <User size={14} className="sm:hidden" />
              </button>`;

if (searchRegex.test(content)) {
    content = content.replace(searchRegex, newButton);
    fs.writeFileSync('src/app/page.js', content);
    console.log("Login button successfully patched via Regex!");
} else {
    console.log("Regex match failed!");
}
