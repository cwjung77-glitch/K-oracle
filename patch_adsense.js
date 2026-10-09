const fs = require('fs');
let c = fs.readFileSync('src/app/layout.js', 'utf8');
if (!c.includes('adsbygoogle.js')) {
  c = c.replace('<head>', '<head>\n        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5395815436840186" crossorigin="anonymous"></script>');
  fs.writeFileSync('src/app/layout.js', c);
  console.log('patched');
} else {
  console.log('already has adsense');
}
