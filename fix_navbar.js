const fs = require('fs');
let c = fs.readFileSync('src/app/page.js', 'utf8').replace(/\r\n/g, '\n');

// Add import Link
if (!c.includes("import Link")) {
  c = c.replace(/import \{ Sparkles/, "import Link from 'next/link';\nimport { Sparkles");
}

// Add the Blog link to the navbar
const oldNavbar = `<div className="flex items-center gap-4">
            {/* Language Toggle */}`;
const newNavbar = `<div className="flex items-center gap-6">
            <Link href="/blog" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Blog</Link>
            {/* Language Toggle */}`;

c = c.replace(oldNavbar, newNavbar);
fs.writeFileSync('src/app/page.js', c);
