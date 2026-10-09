const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const { data } = matter(content);
  if (!data.date || !data.title) {
    console.log(`Missing frontmatter in ${file}`);
  }
}