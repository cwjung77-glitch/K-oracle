const fs = require('fs');
let c = fs.readFileSync('src/app/page.js', 'utf8').replace(/\r\n/g, '\n');

// 1. Remove the bad handleLogoClick
const badHandleLogoClick = `  const handleLogoClick = () => {
    if (hasPaid) {
      if (window.confirm(lang === 'ko' ? "PDF 마스터플랜을 다운로드하셨나요? 지금 메인으로 돌아가면 분석 결과가 영구적으로 삭제됩니다." : "Did you download your PDF Masterplan? Leaving now will permanently erase your results.")) {
        localStorage.removeItem("hasPaid");
        setHasPaid(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setLogoClicks(p => p + 1);
    if (logoClicks + 1 >= 5) setShowKo(true);
  };\n`;

c = c.replace(badHandleLogoClick, '');

// 2. Insert it AFTER the state declarations
const statesRegex = /const \[lang, setLang\] = useState\('en'\); const \[logoClicks, setLogoClicks\] = useState\(0\); const \[showKo, setShowKo\] = useState\(false\);\n/;
const goodHandleLogoClick = `const [lang, setLang] = useState('en'); const [logoClicks, setLogoClicks] = useState(0); const [showKo, setShowKo] = useState(false);\n\n  const handleLogoClick = () => {
    if (hasPaid) {
      if (window.confirm(lang === 'ko' ? "PDF 마스터플랜을 다운로드하셨나요? 지금 메인으로 돌아가면 분석 결과가 영구적으로 삭제됩니다." : "Did you download your PDF Masterplan? Leaving now will permanently erase your results.")) {
        localStorage.removeItem("hasPaid");
        setHasPaid(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setLogoClicks(p => p + 1);
    if (logoClicks + 1 >= 5) setShowKo(true);
  };\n`;

c = c.replace(statesRegex, goodHandleLogoClick);

fs.writeFileSync('src/app/page.js', c);
