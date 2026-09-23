const fs = require('fs');

// 1. Update CheckoutModal.jsx
let checkout = fs.readFileSync('src/components/features/CheckoutModal.jsx', 'utf8');
checkout = checkout.replace(/"26\+27 Bundle Report"/g, '"26+27 VIP Masterplan"');
checkout = checkout.replace(/"2026 Q4 Finale Report"/g, '"2026 Q4 Finale"');
checkout = checkout.replace(/"2027 Full Year Report"/g, '"2027 Full Year"'); // if it exists
fs.writeFileSync('src/components/features/CheckoutModal.jsx', checkout, 'utf8');

// 2. Update route.js
let route = fs.readFileSync('src/app/api/checkout/route.js', 'utf8');
route = route.replace(/"26\+27 Bundle Report"/g, '"26+27 VIP Masterplan"');
route = route.replace(/"2026 Q4 Finale Report"/g, '"2026 Q4 Finale"');
fs.writeFileSync('src/app/api/checkout/route.js', route, 'utf8');
