const fs = require('fs');
let c = fs.readFileSync('src/app/api/download-pdf/route.js', 'utf8');

if (!c.includes("import path from 'path';")) {
  c = c.replace(/import \{ NextResponse \} from 'next\/server';/, "import { NextResponse } from 'next/server';\nimport path from 'path';");
}

c = c.replace(
  /const fontSerif = 'Times-Roman';\n\s*const fontSerifBold = 'Times-Bold';\n\s*const fontSerifItalic = 'Times-Italic';\n\s*const fontSans = 'Helvetica';\n\s*const fontSansBold = 'Helvetica-Bold';/g,
  `const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSansKR-Regular.otf');
    try {
      doc.registerFont('NotoSansKR', fontPath);
    } catch(e) {
      console.error('Font registration failed:', e);
    }
    const fontSerif = 'NotoSansKR';
    const fontSerifBold = 'NotoSansKR';
    const fontSerifItalic = 'NotoSansKR';
    const fontSans = 'NotoSansKR';
    const fontSansBold = 'NotoSansKR';`
);

fs.writeFileSync('src/app/api/download-pdf/route.js', c);
