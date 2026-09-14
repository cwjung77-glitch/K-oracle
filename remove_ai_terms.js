const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (const [search, replace] of replacements) {
    content = content.replace(search, replace);
  }
  
  if (original !== content) {
    fs.writeFileSync(filePath, content);
    console.log('Updated', filePath);
  }
}

// 1. Markdown files
const mdFiles = [
  'src/content/blog/what-is-korean-saju.md',
  'src/content/blog/bts-jungkook-saju.md'
];

mdFiles.forEach(f => {
  replaceInFile(path.join(__dirname, f), [
    [/K-Oracle AI/g, 'K-Oracle'],
    [/The Ancient AI/g, 'The Ancient System'],
    [/AI Chemistry & Compatibility/g, 'Deep Chemistry & Compatibility']
  ]);
});

// 2. Components
const components = [
  'src/components/features/CheckoutModal.jsx',
  'src/components/features/SajuCompatibility.jsx',
  'src/components/features/BeautyDeepDiveReport.jsx',
  'src/components/features/DeepDiveReport.jsx'
];

components.forEach(f => {
  replaceInFile(path.join(__dirname, f), [
    [/AI Chemistry & Compatibility/g, 'Deep Chemistry & Compatibility'],
    [/Unlock Deep AI Chemistry/g, 'Unlock Deep Chemistry'],
    [/Oracle AI/g, 'K-Oracle'],
    [/AI Generation failed/g, 'Report generation failed'],
    [/\(AI Text\)/g, '(Text)'],
    [/\(Dynamic AI Fetch\)/g, '(Dynamic Fetch)']
  ]);
});

// 3. Pages & Scripts
const otherFiles = [
  'src/app/blog/page.js',
  'src/app/blog/[slug]/page.js',
  'scripts/generate_blog.js'
];

otherFiles.forEach(f => {
  replaceInFile(path.join(__dirname, f), [
    [/K-Oracle AI/g, 'K-Oracle'],
    [/Ancient AI/g, 'Ancient System']
  ]);
});

// 4. API Routes (just in case they return errors or text to UI)
const apiRoutes = [
  'src/app/api/generate-saju/route.js',
  'src/app/api/generate-beauty/route.js',
  'src/app/api/download-pdf/route.js'
];
apiRoutes.forEach(f => {
  replaceInFile(path.join(__dirname, f), [
    [/\[AI Engine\]/g, '[K-Oracle Engine]'],
    [/\[AI Generation Error\]/g, '[Report Generation Error]'],
    [/AI STYLING/g, 'PREMIUM STYLING']
  ]);
});

console.log("Done replacing AI terminology.");
