import fs from 'fs';

const navHeader = `
        {/* Simple Global Nav */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center max-w-5xl mx-auto right-0 z-50">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:text-yellow-500 transition-colors">
            K-<span className="text-yellow-500">Oracle</span>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Home</Link>
            <Link href="/blog" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
`;

// Patch idols/page.js
let listPage = fs.readFileSync('src/app/idols/page.js', 'utf8');
listPage = listPage.replace('<main className="max-w-5xl mx-auto px-6">', navHeader + '\n      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-8">');
fs.writeFileSync('src/app/idols/page.js', listPage);

// Patch idols/[slug]/page.js
let detailPage = fs.readFileSync('src/app/idols/[slug]/page.js', 'utf8');
detailPage = detailPage.replace('<main className="max-w-3xl mx-auto px-6">', navHeader.replace('max-w-5xl', 'max-w-3xl') + '\n      <main className="max-w-3xl mx-auto px-6 relative z-10 pt-8">');
fs.writeFileSync('src/app/idols/[slug]/page.js', detailPage);

