const fs = require('fs');
const path = require('path');

const updateEmail = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/support@thekoracle\.com/g, 'cwjung77@gmail.com');
  fs.writeFileSync(filePath, content, 'utf8');
};

updateEmail(path.join(__dirname, 'src/app/page.js'));
updateEmail(path.join(__dirname, 'src/app/privacy/page.js'));
updateEmail(path.join(__dirname, 'src/app/contact/page.js'));

console.log('Reverted emails to cwjung77@gmail.com.');