const fs = require('fs');
let content = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf-8');
content = content.replace(
  "localStorage.setItem('userDob', dob);\n      localStorage.setItem('userTime', timeUnknown ? 'Unknown' : time);\n      localStorage.setItem('userGender', gender);\n      localStorage.setItem('userName', userName || \"You\");",
  "try {\n        localStorage.setItem('userDob', dob);\n        localStorage.setItem('userTime', timeUnknown ? 'Unknown' : time);\n        localStorage.setItem('userGender', gender);\n        localStorage.setItem('userName', userName || \"You\");\n      } catch(e) {}"
);
fs.writeFileSync('src/components/features/SajuCompatibility.jsx', content, 'utf-8');