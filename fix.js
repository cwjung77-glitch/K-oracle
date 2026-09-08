const fs = require('fs');
let c = fs.readFileSync('src/components/features/DeepDiveReport.jsx', 'utf8');
c = c.replace(/\{\s*m:\s*'Jan',\s*s:\s*40\s*\}(.|\n)*\{\s*m:\s*'Dec',\s*s:\s*55\s*\}/m, "...(() => { let hash = 0; const dob = (typeof window !== 'undefined' ? localStorage.getItem('userDob') : null) || '1995-10-15'; for (let i=0; i<dob.length; i++) hash = dob.charCodeAt(i) + ((hash << 5) - hash); const seed = Math.abs(hash); const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return months.map((m, i) => ({ m, s: (((seed >> i) % 70) + 30) })); })()");
fs.writeFileSync('src/components/features/DeepDiveReport.jsx', c);
