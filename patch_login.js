const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

// 1. Add User to lucide-react import
if (content.includes("from 'lucide-react';") && !content.includes("User")) {
    content = content.replace("from 'lucide-react';", "User } from 'lucide-react';").replace("{ Sparkles", "{ Sparkles,");
}

// 2. Replace the login button
const oldButton = `<button onClick={() => setShowLogin(true)}
                className="px-2 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold tracking-widest bg-white text-black rounded-full hover:bg-zinc-200 transition-colors uppercase whitespace-nowrap"
              >
                Log In
              </button>`;

const newButton = `<button onClick={() => setShowLogin(true)}
                className="w-7 h-7 sm:w-auto sm:h-auto sm:px-6 sm:py-2 flex items-center justify-center text-[10px] sm:text-xs font-bold tracking-widest bg-white text-black rounded-full hover:bg-zinc-200 transition-colors uppercase whitespace-nowrap"
              >
                <span className="hidden sm:inline">Log In</span>
                <User size={14} className="sm:hidden" />
              </button>`;

content = content.replace(oldButton, newButton);
fs.writeFileSync('src/app/page.js', content);
console.log("Login button patched!");
