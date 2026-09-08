const fs = require('fs');
let c = fs.readFileSync('src/components/features/CheckoutModal.jsx', 'utf8');

c = c.replace(/alert\("Payment gateway error. Please try again."\);/, 'alert("Payment Error: " + err.message);');

fs.writeFileSync('src/components/features/CheckoutModal.jsx', c);
