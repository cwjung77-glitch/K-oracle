const fs = require('fs');
let c = fs.readFileSync('src/components/features/CheckoutModal.jsx', 'utf8');

c = c.replace(
  /const email = e\.target && e\.target\.email \? e\.target\.email\.value : 'cwjung77@gmail\.com';/,
  `const email = e.target && e.target.email ? e.target.email.value : 'cwjung77@gmail.com';\n      localStorage.setItem('purchasedProduct', activeTab);\n      localStorage.setItem('purchasedPlan', selectedPlan);`
);

fs.writeFileSync('src/components/features/CheckoutModal.jsx', c);
