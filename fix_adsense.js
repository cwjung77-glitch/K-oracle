const fs = require('fs');
const path = require('path');

const makePage = (route, title, contentHtml) => {
  const dir = path.join(__dirname, 'src/app', route);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const code = `import React from 'react';
import Link from 'next/link';

export const metadata = { title: '${title}' };

export default function ${title.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans p-8 md:p-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">&larr; Back to Home</Link>
        <h1 className="text-4xl font-black text-white mb-8">${title}</h1>
        <div className="prose prose-invert prose-zinc max-w-none">
          ${contentHtml}
        </div>
      </div>
    </div>
  );
}`;
  fs.writeFileSync(path.join(dir, 'page.js'), code, 'utf8');
};

const privacyContent = `
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Introduction</h2>
  <p className="mb-4">Welcome to K-Oracle. We are committed to protecting your personal information and your right to privacy.</p>
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Information We Collect</h2>
  <p className="mb-4">We do not collect any personal information unless you voluntarily provide it to us (e.g., when making a purchase or filling out a form). For payments, we use Gumroad, a secure third-party payment processor.</p>
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Third-Party Advertising (Google AdSense)</h2>
  <p className="mb-4">We use Google AdSense to display ads on our site. Google, as a third-party vendor, uses cookies to serve ads on our site based on prior visits. Users may opt-out of personalized advertising by visiting Google's Ads Settings.</p>
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Contact Us</h2>
  <p className="mb-4">If you have questions about this policy, you can contact us at support@k-oracle.com.</p>
`;

const termsContent = `
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
  <p className="mb-4">By accessing K-Oracle, you agree to be bound by these Terms of Service.</p>
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Disclaimer</h2>
  <p className="mb-4">All fortune-telling, astrology (Saju), and beauty readings are for entertainment purposes only. They do not constitute medical, legal, or financial advice.</p>
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Intellectual Property</h2>
  <p className="mb-4">All content on this website is the property of K-Oracle and protected by copyright laws.</p>
`;

const contactContent = `
  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Get in Touch</h2>
  <p className="mb-4">If you have any questions, business inquiries, or feedback regarding your premium reports, please contact our support team.</p>
  <p className="mb-4"><strong>Email:</strong> support@k-oracle.com</p>
  <p className="mb-4">We aim to respond to all inquiries within 24-48 hours.</p>
`;

makePage('privacy', 'Privacy Policy', privacyContent);
makePage('terms', 'Terms of Service', termsContent);
makePage('contact', 'Contact Us', contactContent);

// Update footer in src/app/page.js
const pagePath = path.join(__dirname, 'src/app/page.js');
let pageHtml = fs.readFileSync(pagePath, 'utf8');
const footerLinks = `
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-zinc-500">
            <div className="flex gap-4 mb-2">
              <Link href="/privacy" className="hover:text-zinc-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-zinc-300">Terms of Service</Link>
              <Link href="/contact" className="hover:text-zinc-300">Contact Us</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} K-ORACLE. All rights reserved.</p>
`;

if (!pageHtml.includes('href="/privacy"')) {
  pageHtml = pageHtml.replace(
    /<p>&copy; \{new Date\(\)\.getFullYear\(\)\} K-ORACLE\. All rights reserved\.<\/p>/,
    footerLinks
  );
  fs.writeFileSync(pagePath, pageHtml, 'utf8');
  console.log('Added footer links to page.js');
}

console.log('Pages created successfully.');