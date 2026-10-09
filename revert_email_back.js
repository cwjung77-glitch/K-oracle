const fs = require('fs');
const path = require('path');

const updateEmail = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/cwjung77@gmail\.com/g, 'support@thekoracle.com');
  fs.writeFileSync(filePath, content, 'utf8');
};

updateEmail(path.join(__dirname, 'src/app/page.js'));
updateEmail(path.join(__dirname, 'src/app/privacy/page.js'));
updateEmail(path.join(__dirname, 'src/app/contact/page.js'));

console.log('Changed emails back to support@thekoracle.com.');