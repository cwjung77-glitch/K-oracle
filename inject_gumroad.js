const fs = require('fs');
let content = fs.readFileSync('src/app/layout.js', 'utf8');

// Check if Script is imported
if (!content.includes('next/script')) {
  content = content.replace("import './globals.css';", "import './globals.css';\nimport Script from 'next/script';");
}

// Inject Gumroad script before </body> if not already there
if (!content.includes('gumroad.js')) {
  // Find the closing </body> tag or inject inside the body
  content = content.replace('</body>', '  <Script src="https://gumroad.com/js/gumroad.js" strategy="lazyOnload" />\n      </body>');
  fs.writeFileSync('src/app/layout.js', content, 'utf8');
  console.log("Gumroad script injected successfully.");
} else {
  console.log("Gumroad script already exists.");
}
