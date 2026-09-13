const fs = require('fs');
let c = fs.readFileSync('src/components/features/CheckoutModal.jsx', 'utf8');

c = c.replace(
  /const handlePay = async \(e\) => \{\n\s*e\.preventDefault\(\);\n\s*setIsProcessing\(true\);\n\s*try \{/g,
  `const handlePay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    if (typeof window !== 'undefined') localStorage.setItem('purchasedProduct', activeTab);
    try {`
);

fs.writeFileSync('src/components/features/CheckoutModal.jsx', c);
