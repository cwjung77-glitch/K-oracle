const fs = require('fs');
const path = require('path');

const updateEmail = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace personal email with the new brand support email
  content = content.replace(/cwjung77@gmail\.com/g, 'koraclesupport@gmail.com');
  // Just in case there are leftovers of thekoracle.com
  content = content.replace(/support@thekoracle\.com/g, 'koraclesupport@gmail.com');
  fs.writeFileSync(filePath, content, 'utf8');
};

updateEmail(path.join(__dirname, 'src/app/page.js'));
updateEmail(path.join(__dirname, 'src/app/privacy/page.js'));
updateEmail(path.join(__dirname, 'src/app/contact/page.js'));

console.log('Successfully updated emails to koraclesupport@gmail.com');
