const fs = require('fs');

const languageMap = `
const langMap = {
  en: 'English',
  es: 'Spanish',
  th: 'Thai',
  id: 'Indonesian',
  ja: 'Japanese',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  pl: 'Polish',
  ru: 'Russian',
  vi: 'Vietnamese',
  fr: 'French',
  ko: 'Korean'
};
const targetLanguage = langMap[lang] || 'English';
`;

function patchApi(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  
  // Replace `const isEs = lang === 'es';` with our map
  code = code.replace(/const isEs = lang === 'es';/g, languageMap);
  
  // Replace `${isEs ? 'Spanish' : 'English'}` with `${targetLanguage}`
  code = code.replace(/\$\{isEs \? 'Spanish' : 'English'\}/g, '${targetLanguage}');
  
  fs.writeFileSync(filePath, code);
  console.log('Patched API:', filePath);
}

patchApi('src/app/api/generate-beauty/route.js');
patchApi('src/app/api/generate-saju/route.js');
patchApi('src/app/api/generate-daily/route.js');
