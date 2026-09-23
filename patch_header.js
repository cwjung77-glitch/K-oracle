const fs = require('fs');

const files = [
    'src/app/page.js',
    'src/app/idols/page.js',
    'src/app/idols/[slug]/page.js'
];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // The current left side
    const searchLeft = `<div className="text-[17px] sm:text-[17px] sm:text-xl md:text-2xl font-black tracking-widest cursor-pointer whitespace-nowrap flex-shrink-0 flex-shrink-0" onClick={handleLogoClick}>`;
    
    // Actually the whole block might be slightly different in formatting.
    // Let's use regex to replace the header layout.
    // We want to turn:
    // <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-1 sm:gap-2">
    //   <div className="text-[17px]... onClick={handleLogoClick}>
    //     <span className="text-violet-400">K</span>-ORACLE
    //   </div>
    //   <div className="flex items-center gap-1.5 sm:gap-6 flex-shrink-0">
    //     <Link href="/idols" className="text-xs sm:text-xs sm:text-sm font-bold text-yellow-500 hover:text-yellow-400 transition-colors mr-2">Idols</Link>
    //       <Link href="/blog" className="text-xs sm:text-xs sm:text-sm font-bold text-zinc-400 hover:text-white transition-colors">Blog</Link>
    
    const searchRegex = /<div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-1 sm:gap-2">([\s\S]*?)<div className="flex items-center gap-1.5 sm:gap-6 flex-shrink-0">([\s\S]*?)<Link href="\/idols"([^>]*)>Idols<\/Link>\s*<Link href="\/blog"([^>]*)>Blog<\/Link>/m;

    const match = content.match(searchRegex);
    if (match) {
        const replaceString = `<div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
            <div className="flex items-center gap-4 sm:gap-8 flex-shrink-0">
              <div className="text-[17px] sm:text-xl md:text-2xl font-black tracking-widest cursor-pointer whitespace-nowrap" onClick={handleLogoClick}>
                <span className="text-violet-400">K</span>-ORACLE
              </div>
              <nav className="flex items-center gap-3 sm:gap-6">
                <Link href="/idols" className="text-xs sm:text-sm font-bold text-yellow-500 hover:text-yellow-400 transition-colors">Idols</Link>
                <Link href="/blog" className="text-xs sm:text-sm font-bold text-zinc-400 hover:text-white transition-colors">Blog</Link>
              </nav>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">`;
        
        content = content.replace(searchRegex, replaceString);
        fs.writeFileSync(file, content);
        console.log(`Replaced header in ${file}`);
    } else {
        console.log(`Failed to match in ${file}`);
    }
}
