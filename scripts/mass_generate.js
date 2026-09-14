const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const idols = [
  "NewJeans Minji", "NewJeans Hanni", "NewJeans Danielle", "NewJeans Haerin", "NewJeans Hyein",
  "Aespa Karina", "Aespa Winter", "Aespa Giselle", "Aespa Ningning",
  "IVE Wonyoung", "IVE Yujin", "IVE Gaeul", "IVE Rei", "IVE Liz", "IVE Leeseo",
  "Le Sserafim Chaewon", "Le Sserafim Sakura", "Le Sserafim Yunjin", "Le Sserafim Kazuha", "Le Sserafim Eunchae",
  "Stray Kids Hyunjin", "Stray Kids Felix", "Stray Kids Bang Chan", "Stray Kids Lee Know",
  "Seventeen Mingyu", "Seventeen Jeonghan", "Seventeen Wonwoo", "Seventeen Hoshi",
  "TXT Yeonjun", "TXT Soobin", "TXT Beomgyu", "TXT Taehyun", "TXT Hueningkai",
  "TWICE Nayeon", "TWICE Sana", "TWICE Momo", "TWICE Tzuyu",
  "Blackpink Jisoo", "Blackpink Rose", "Blackpink Lisa"
];

const blogDir = path.join(__dirname, '../src/content/blog');
const existingFiles = fs.readdirSync(blogDir).join(' ');

console.log(`🚀 K-Pop 아이돌 40명 대량 사주 블로그 공장 가동을 이어서 시작합니다...`);

async function generateAll() {
  for (let i = 0; i < idols.length; i++) {
    const idol = idols[i];
    
    // Check if already generated
    const simpleSlug = idol.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (existingFiles.includes(simpleSlug)) {
      console.log(`\n[${i + 1}/${idols.length}] ⏭️ ${idol} 이미 작성됨. 건너뜁니다.`);
      continue;
    }

    console.log(`\n[${i + 1}/${idols.length}] 📝 ${idol} 사주 작성 중...`);
    
    let success = false;
    while (!success) {
      try {
        const out = execSync(`node scripts/generate_blog.js "${idol} Saju Analysis"`, { encoding: 'utf8' });
        console.log(out);
        if (out.includes('Error generating post')) {
          console.error(`❌ 구글 API 속도 제한(Rate Limit) 초과! 60초간 딥 슬립에 들어갑니다... 💤`);
          await new Promise(resolve => setTimeout(resolve, 60000));
        } else {
          success = true;
        }
      } catch (err) {
        console.error(`❌ ${idol} 작성 중 에러:`, err.message);
        console.error(`60초 대기 후 재시도...`);
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    }
    
    // API 속도 제한을 피하기 위해 6초 대기
    if (i < idols.length - 1) {
      console.log(`⏳ API 과부하 방지를 위해 6초간 휴식...`);
      await new Promise(resolve => setTimeout(resolve, 6000));
    }
  }

  console.log(`\n✅ 40명 작성 완전 완료! 이제 날짜를 분산시킵니다...`);
  execSync(`npm run fix-dates`, { stdio: 'inherit' });

  console.log(`\n🌐 실서버(Vercel)로 40개의 글을 동시 업로드합니다...`);
  execSync(`git add .`, { stdio: 'inherit' });
  execSync(`git commit -m "content: auto-generate remaining idol saju blogs with smart backdating"`, { stdio: 'inherit' });
  execSync(`git push origin main`, { stdio: 'inherit' });
  
  console.log(`\n🎉 모든 작업이 끝났습니다!`);
}

generateAll();
