import fs from 'fs';
let content = fs.readFileSync('src/app/idols/[slug]/page.js', 'utf8');

const disclaimer = `
        {/* Legal Disclaimer */}
        <div className="mt-12 mb-8 pt-8 border-t border-zinc-900 text-center">
          <p className="text-xs text-zinc-600 max-w-2xl mx-auto">
            Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. 
            K-Oracle is not affiliated with, sponsored, or endorsed by {member} or their agency.
          </p>
        </div>
      </main>
`;

content = content.replace("</main>", disclaimer);
fs.writeFileSync('src/app/idols/[slug]/page.js', content);
