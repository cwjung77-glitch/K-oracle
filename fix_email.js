const fs = require('fs');
let c = fs.readFileSync('src/components/features/CheckoutModal.jsx', 'utf8');

c = c.replace(/const email = e\.target && e\.target\[0\] \? e\.target\[0\]\.value : 'user@example\.com';/, "const email = e.target && e.target.email ? e.target.email.value : 'cwjung77@gmail.com';");
c = c.replace(/<input type="email"/, '<input type="email" id="email" name="email"');

fs.writeFileSync('src/components/features/CheckoutModal.jsx', c);
