const fs = require('fs');
const path = require('path');

// 1. Update generate_blog.js
let c = fs.readFileSync('scripts/generate_blog.js', 'utf8');
c = c.replace(/End the article by encouraging users to visit the K-Oracle app to check their own Saju\./g, 
  'Do NOT add any concluding calls to action (CTAs) encouraging users to visit the app, analyze their Saju, or "click here", because the website UI template already automatically renders a beautiful CTA box at the bottom of every post.');
fs.writeFileSync('scripts/generate_blog.js', c);

// 2. Clean up existing posts
const blogDir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Cut everything from "## Unveil Your Own Cosmic Destiny with K-Oracle" onwards
  const marker = "## Unveil Your Own Cosmic Destiny";
  const markerIndex = content.indexOf(marker);
  
  if (markerIndex !== -1) {
    content = content.substring(0, markerIndex).trim();
    fs.writeFileSync(filePath, content + '\n');
    console.log(`Cleaned CTA from ${file}`);
  } else {
      // Sometimes the AI uses a different heading like "## Discover Your Own Saju"
      const marker2 = "Curious about your own";
      const markerIndex2 = content.indexOf(marker2);
      if (markerIndex2 !== -1) {
          // just try to remove the last section roughly
          const lastHeadingIndex = content.lastIndexOf("## ");
          if (lastHeadingIndex !== -1 && lastHeadingIndex > content.length - 1000) { // ensure it's near the end
             content = content.substring(0, lastHeadingIndex).trim();
             fs.writeFileSync(filePath, content + '\n');
             console.log(`Cleaned CTA from ${file}`);
          }
      }
  }
}
