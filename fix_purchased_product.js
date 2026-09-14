const fs = require('fs');
let c = fs.readFileSync('src/app/page.js', 'utf8').replace(/\r\n/g, '\n');
c = c.replace(/setActiveTab\('saju'\);/g, "setActiveTab('saju'); localStorage.setItem('purchasedProduct', 'saju');");
c = c.replace(/setActiveTab\('beauty'\);/g, "setActiveTab('beauty'); localStorage.setItem('purchasedProduct', 'beauty');");
fs.writeFileSync('src/app/page.js', c);
