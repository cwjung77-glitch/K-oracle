import fs from 'fs';
let content = fs.readFileSync('src/app/page.js', 'utf8');

const regex = /<Link href="\/blog"(.*?)>Blog<\/Link>/;
const replacement = `<Link href="/idols" className="text-xs sm:text-xs sm:text-sm font-bold text-yellow-500 hover:text-yellow-400 transition-colors mr-2">Idols</Link>
              <Link href="/blog"$1>Blog</Link>`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/app/page.js', content);
