const fs = require('fs');
const path = require('path');

const dailyRoute = path.join(__dirname, 'src/app/api/generate-daily/route.js');
let apiContent = fs.readFileSync(dailyRoute, 'utf8');

apiContent = apiContent.replace(
  /const { birthData, gender, lang, userName } = body;/,
  "const { birthData, gender, lang, userName, todayStr: clientDate } = body;"
);
apiContent = apiContent.replace(
  /const todayStr = new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\];/,
  "const todayStr = clientDate || new Date().toISOString().split('T')[0];"
);
fs.writeFileSync(dailyRoute, apiContent, 'utf8');
console.log('Fixed api/generate-daily/route.js');

const componentRoute = path.join(__dirname, 'src/components/features/DailyFortune.jsx');
let compContent = fs.readFileSync(componentRoute, 'utf8');

// Replace new Date().toISOString().split('T')[0] with local date helper
const helper = "const getLocalDateStr = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); };";

if (!compContent.includes('getLocalDateStr')) {
  compContent = compContent.replace(
    /export default function DailyFortune.*?{/,
    "export default function DailyFortune({ lang, hasPaid, onGoToPremium }) {\\n  " + helper
  );
  
  compContent = compContent.replace(/const todayStr = new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\];/g, "const todayStr = getLocalDateStr();");
  
  compContent = compContent.replace(
    /body: JSON\.stringify\(\{ birthData: dob, gender, lang, userName: name \}\)/,
    "body: JSON.stringify({ birthData: dob, gender, lang, userName: name, todayStr })"
  );
  
  fs.writeFileSync(componentRoute, compContent, 'utf8');
  console.log('Fixed DailyFortune.jsx');
}