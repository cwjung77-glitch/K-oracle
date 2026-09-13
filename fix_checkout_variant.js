const fs = require('fs');
let c = fs.readFileSync('src/app/api/checkout/route.js', 'utf8');

if (!c.includes("productId === 'compatibility'")) {
  c = c.replace(
    /else if \(productId === 'fullyear'\) variantId = \"2103670\";/,
    `else if (productId === 'fullyear') variantId = "2103670";
      else if (productId === 'compatibility') variantId = "2103661"; // Mapping to $2.99 tier for MVP`
  );
  fs.writeFileSync('src/app/api/checkout/route.js', c);
}
