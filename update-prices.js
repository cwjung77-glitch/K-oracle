const fs = require('fs');

// 1. page.js
let page = fs.readFileSync('src/app/page.js', 'utf8');
// Original: 2026 Q4 Finale (.99), 2027 Full Year (.99), Bundle (.99)
page = page.replace('2026 Q4 Finale\n                  </div>\n                  <div className="text-3xl font-black mb-6">.99</div>', '2026 Q4 Finale\n                  </div>\n                  <div className="text-3xl font-black mb-6">.99</div>');
page = page.replace('2027 Full Year\n                  </div>\n                  <div className="text-3xl font-black mb-6">.99</div>', '2027 Full Year\n                  </div>\n                  <div className="text-3xl font-black mb-6">.99</div>');
page = page.replace('26+27 Bundle\n                  </div>\n                  <div className="text-4xl font-black mb-6">.99</div>', '26+27 Bundle\n                  </div>\n                  <div className="text-4xl font-black mb-6">.99</div>');

// Beauty pricing (was .99, let's make sure it's 9.99)
page = page.replace('Unlock Beauty Masterplan (.99)', 'Unlock Beauty Masterplan (.99)');

fs.writeFileSync('src/app/page.js', page);

// 2. CheckoutModal.jsx
let modal = fs.readFileSync('src/components/features/CheckoutModal.jsx', 'utf8');
modal = modal.replace('price = ".99";', 'price = ".99";'); // Q4
modal = modal.replace('price = ".99";', 'price = ".99";'); // 2027
modal = modal.replace('price = ".99";', 'price = ".99";'); // Bundle
modal = modal.replace('price = ".99";', 'price = ".99";'); // Compatibility
fs.writeFileSync('src/components/features/CheckoutModal.jsx', modal);

// 3. SajuCompatibility.jsx
let comp = fs.readFileSync('src/components/features/SajuCompatibility.jsx', 'utf8');
comp = comp.replace('Unlock Deep Chemistry Report (.99)', 'Unlock Deep Chemistry Report (.99)');
fs.writeFileSync('src/components/features/SajuCompatibility.jsx', comp);

console.log('Prices updated successfully in UI components.');
