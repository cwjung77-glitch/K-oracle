const fs = require('fs');
let c = fs.readFileSync('src/components/features/CheckoutModal.jsx', 'utf8');

if (!c.includes('AI Chemistry & Compatibility Report')) {
  c = c.replace(
    /\} else if \(selectedPlan === 'fullyear'\) \{/,
    `} else if (selectedPlan === 'compatibility') {
      productName = "AI Chemistry & Compatibility Report";
      price = "$2.99";
    } else if (selectedPlan === 'fullyear') {`
  );

  fs.writeFileSync('src/components/features/CheckoutModal.jsx', c);
}
