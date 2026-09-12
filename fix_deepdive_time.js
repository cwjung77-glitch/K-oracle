const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');
c = c.replace(
  /body: JSON\.stringify\(\{ birthData: localStorage\.getItem\("userDob"\) \|\| "1995-10-15", gender: localStorage\.getItem\("userGender"\) \|\| "female", lang \}\)/g,
  'body: JSON.stringify({ birthData: (localStorage.getItem("userDob") || "1995-10-15") + " " + (localStorage.getItem("userTime") || "12:00"), gender: localStorage.getItem("userGender") || "female", lang })'
);
fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
