const fs = require('fs');
let c = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8').replace(/\r\n/g, '\n');

if (!c.includes('matchType')) {
  c = c.replace(
    /const \[requestStatus, setRequestStatus\] = useState\(''\);/,
    `const [requestStatus, setRequestStatus] = useState('');
  const [matchType, setMatchType] = useState('idol');
  const [customName, setCustomName] = useState('');
  const [customDob, setCustomDob] = useState('');
  const [customTime, setCustomTime] = useState('12:00');
  const [customGender, setCustomGender] = useState('male');`
  );
  fs.writeFileSync('src/components/features/SajuCompatibility.jsx', c);
}
