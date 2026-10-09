const fs = require('fs');
const path = require('path');

function fixPdf() {
  const filePath = path.join(__dirname, 'src/app/api/download-pdf/route.js');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix PDFKit CJK Justify bug which cuts off Korean text at the margins
  content = content.replace(/align: 'justify'/g, "align: 'left'");
  
  // Also fix the beauty text renderer just in case
  content = content.replace(/align: 'justify'/g, "align: 'left'");
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed download-pdf/route.js');
}

function fixSajuApi() {
  const filePath = path.join(__dirname, 'src/app/api/generate-saju/route.js');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add a strict length constraint so it doesn't timeout or get cut off
  const lengthRule = " CRITICAL: You must complete your response fully. Limit each section to around 300-400 words so it does not get cut off mid-sentence. DO NOT exceed this length. Ensure the ||| separator is always present.";
  
  if (!content.includes("Limit each section to around 300-400 words")) {
    content = content.replace(/Output exactly TWO sections separated by '\|\|\|':/g, "Output exactly TWO sections separated by '|||':" + lengthRule);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed generate-saju/route.js length limits');
  }
}

fixPdf();
fixSajuApi();