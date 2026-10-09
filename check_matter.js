const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  try {
    const fileContent = fs.readFileSync(path.join(blogDir, file), 'utf8');
    matter(fileContent);
  } catch(e) {
    console.log(`Error in ${file}: ${e.message}`);
  }
}