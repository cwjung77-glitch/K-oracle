const fs = require('fs');

// Patch index
let c1 = fs.readFileSync('src/app/blog/page.js', 'utf8');
c1 = c1.replace(
  "import BlogFilter from '@/components/features/BlogFilter';",
  "import BlogFilter from '@/components/features/BlogFilter';\nimport BlogNavbar from '@/components/features/BlogNavbar';"
);
c1 = c1.replace(/<nav className="fixed w-full[\s\S]*?<\/nav>/, '<BlogNavbar />');
fs.writeFileSync('src/app/blog/page.js', c1);

// Patch slug page
let c2 = fs.readFileSync('src/app/blog/[slug]/page.js', 'utf8');
c2 = c2.replace(
  "import BlogEngagement from '@/components/features/BlogEngagement';",
  "import BlogEngagement from '@/components/features/BlogEngagement';\nimport BlogNavbar from '@/components/features/BlogNavbar';"
);
c2 = c2.replace(/<nav className="fixed w-full[\s\S]*?<\/nav>/, '<BlogNavbar />');
fs.writeFileSync('src/app/blog/[slug]/page.js', c2);

console.log('Patched both pages!');
