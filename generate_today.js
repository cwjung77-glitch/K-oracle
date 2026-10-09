const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const idols = [
  "Red Velvet Yeri", 
  "NMIXX Sullyoon"
];
const targetDate = "2026-10-04";

const blogDir = path.join(__dirname, 'src/content/blog');

async function generate() {
  for (const idol of idols) {
    console.log(`Generating blog for ${idol}...`);
    try {
      execSync(`node scripts/generate_blog.js "${idol} Saju Analysis"`, { stdio: 'inherit' });
      
      // Fix date
      const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
      for (const file of files) {
        const filePath = path.join(blogDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const simpleIdol = idol.toLowerCase().split(' ')[1];
        if (file.includes(simpleIdol) || file.includes(idol.toLowerCase().replace(' ', '-'))) {
           const newContent = content.replace(/date: ".*?"/, `date: "${targetDate}"`);
           if (content !== newContent) {
              fs.writeFileSync(filePath, newContent, 'utf8');
              console.log(`Updated date in ${file} to ${targetDate}`);
           }
        }
      }
    } catch (e) {
      console.error(`Failed to generate for ${idol}: ${e.message}`);
    }
  }
  
  console.log("Committing and pushing...");
  execSync(`git add src/content/blog`, { stdio: 'inherit' });
  execSync(`git commit -m "content: add ${targetDate} blog posts for ${idols.join(', ')}"`, { stdio: 'inherit' });
  execSync(`git push origin main`, { stdio: 'inherit' });
}

generate();
