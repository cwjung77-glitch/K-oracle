const fs = require('fs');
const path = require('path');

const layoutPath = path.join(__dirname, 'src/app/layout.js');
let layoutCode = fs.readFileSync(layoutPath, 'utf8');

if (!layoutCode.includes('metadataBase')) {
  layoutCode = layoutCode.replace(
    'export const metadata = {',
    "export const metadata = {\n  metadataBase: new URL('https://thekoracle.com'),\n  alternates: {\n    canonical: '/',\n  },"
  );
  fs.writeFileSync(layoutPath, layoutCode, 'utf8');
  console.log('Added metadataBase to layout.js');
}