const fs = require('fs');
let c = fs.readFileSync('src/app/blog/[slug]/page.js', 'utf8');

const target = `<div className="mt-12 pt-8 border-t border-white/10 text-sm text-zinc-500 italic">
          Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.
        </div>`;

const replacement = `{(data.tags && (data.tags.some(t => t.includes('Beauty') || t.includes('Color')) || (data.title && (data.title.includes('Color') || data.title.includes('Beauty'))))) ? (
          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-zinc-500 italic">
            Disclaimer: This style analysis is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.
          </div>
        ) : (
          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-zinc-500 italic">
            Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. It is not affiliated with, or endorsed by, the individuals mentioned.
          </div>
        )}`;

if (c.includes(target)) {
  c = c.replace(target, replacement);
  fs.writeFileSync('src/app/blog/[slug]/page.js', c);
  console.log('Successfully patched blog template');
} else {
  console.log('Target not found in the file.');
}