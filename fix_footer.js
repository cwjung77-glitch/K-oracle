const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/page.js');
let pageHtml = fs.readFileSync(pagePath, 'utf8');

// Replace the specific block of text
const oldFooterRegex = /<p className="text-zinc-500 text-sm mt-2">© \{new Date\(\)\.getFullYear\(\)\} K-Oracle\. All rights reserved\.<\/p>/;
const newFooter = `
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-4 mb-2 text-zinc-400 text-sm font-semibold">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </div>
              <p className="text-zinc-500 text-sm mt-2">&copy; {new Date().getFullYear()} K-Oracle. All rights reserved.</p>`;

pageHtml = pageHtml.replace(oldFooterRegex, newFooter.trim());
fs.writeFileSync(pagePath, pageHtml, 'utf8');

// Update email in contact and privacy
const updateEmail = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/support@k-oracle\.com/g, 'support@thekoracle.com');
  fs.writeFileSync(filePath, content, 'utf8');
};

updateEmail(path.join(__dirname, 'src/app/privacy/page.js'));
updateEmail(path.join(__dirname, 'src/app/contact/page.js'));

console.log('Fixed footer and emails.');