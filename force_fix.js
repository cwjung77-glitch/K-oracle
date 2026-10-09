const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/page.js');
let pageHtml = fs.readFileSync(pagePath, 'utf8');

const target = '<p className="text-zinc-500 text-sm mt-2">© {new Date().getFullYear()} K-Oracle. All rights reserved.</p>';
const replacement = `
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-4 mb-2 text-zinc-400 text-sm font-semibold">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </div>
              <p className="text-zinc-500 text-sm mt-2">&copy; {new Date().getFullYear()} K-Oracle. All rights reserved.</p>`;

if (pageHtml.includes(target)) {
  pageHtml = pageHtml.replace(target, replacement.trim());
  fs.writeFileSync(pagePath, pageHtml, 'utf8');
  console.log('Fixed page.js successfully.');
} else {
  console.log('Target not found in page.js');
}