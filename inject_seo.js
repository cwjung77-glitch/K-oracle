const fs = require('fs');
const path = require('path');

const layoutPath = path.join(__dirname, 'src/app/layout.js');
let layoutCode = fs.readFileSync(layoutPath, 'utf8');

const jsonLd = `
export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://thekoracle.com/#website',
      'url': 'https://thekoracle.com/',
      'name': 'K-Oracle & K-Beauty',
      'description': 'Premium Korean Saju Astrology and Personal Color Analysis.',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://thekoracle.com/#software',
      'name': 'K-Oracle Personal Color AI',
      'url': 'https://thekoracle.com/',
      'applicationCategory': 'LifestyleApplication',
      'applicationSubCategory': 'Beauty',
      'operatingSystem': 'Web',
      'description': 'AI Korean 12-season personal color analysis from a selfie. Find your perfect makeup and K-Pop celebrity twin.',
      'offers': {
        '@type': 'Offer',
        'price': '4.99',
        'priceCurrency': 'USD'
      }
    }
  ]
};
`;

if (!layoutCode.includes('SoftwareApplication')) {
  layoutCode = layoutCode.replace(
    'export default function RootLayout({ children }) {',
    jsonLd + '\nexport default function RootLayout({ children }) {'
  );
  layoutCode = layoutCode.replace(
    '<html lang="en">',
    '<html lang="en">\n      <head>\n        <script\n          type="application/ld+json"\n          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}\n        />\n      </head>'
  );
  fs.writeFileSync(layoutPath, layoutCode, 'utf8');
}