const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const idols = [
  "NCT Taeyong", "NCT Jaehyun", "NCT Haechan", "NCT Doyoung",
  "Red Velvet Irene", "Red Velvet Seulgi", "Red Velvet Wendy", "Red Velvet Joy",
  "ITZY Yeji", "ITZY Yuna", "ITZY Chaeryeong",
  "Ateez Hongjoong", "Ateez Seonghwa",
  "ENHYPEN Heeseung", "ENHYPEN Ni-ki",
  "ZEROBASEONE Sung Hanbin", "ZEROBASEONE Zhang Hao", "RIIZE Anton"
];

const targetDates = [
  "2026-09-25", "2026-09-25",
  "2026-09-26", "2026-09-26",
  "2026-09-27", "2026-09-27",
  "2026-09-28", "2026-09-28",
  "2026-09-29", "2026-09-29",
  "2026-09-30", "2026-09-30",
  "2026-10-01", "2026-10-01",
  "2026-10-02", "2026-10-02",
  "2026-10-03", "2026-10-03"
];

const blogDir = path.join(__dirname, 'src/content/blog');

async function generateMissingBlogs() {
  for (let i = 0; i < idols.length; i++) {
    const idol = idols[i];
    const targetDate = targetDates[i];
    console.log(`[${i+1}/${idols.length}] Generating for ${idol} (Target Date: ${targetDate})...`);
    
    let success = false;
    let attempts = 0;
    while (!success && attempts < 3) {
      try {
        attempts++;
        const out = execSync(`node scripts/generate_blog.js "${idol} Saju Analysis"`, { encoding: 'utf8' });
        console.log("Success. Processing the date...");
        
        const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
        for (const file of files) {
          const filePath = path.join(blogDir, file);
          let content = fs.readFileSync(filePath, 'utf8');
          const simpleIdol = idol.toLowerCase().split(' ')[1]; // e.g. Taeyong
          if (file.includes(simpleIdol) || file.includes(idol.toLowerCase().replace(' ', '-'))) {
             const newContent = content.replace(/date: ".*?"/, `date: "${targetDate}"`);
             if (content !== newContent) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Updated date in ${file} to ${targetDate}`);
             }
          }
        }
        
        success = true;
      } catch (err) {
        console.error(`Attempt ${attempts} failed for ${idol}`);
        console.error(err.message);
        if (err.stdout) console.error(err.stdout.toString());
        console.log("Waiting 30s before retry...");
        await new Promise(r => setTimeout(r, 30000));
      }
    }
    
    if (i < idols.length - 1) {
      console.log("Waiting 5s to avoid rate limits...");
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  
  console.log("All done! Committing...");
  execSync(`git add src/content/blog`, { stdio: 'inherit' });
  execSync(`git commit -m "content: generate 18 idol blogs from 09/25 to 10/03"`, { stdio: 'inherit' });
  execSync(`git push origin main`, { stdio: 'inherit' });
}

generateMissingBlogs();