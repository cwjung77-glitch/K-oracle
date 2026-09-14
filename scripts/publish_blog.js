const { execSync } = require('child_process');
const path = require('path');

async function main() {
  const promptTopic = process.argv[2];
  
  if (!promptTopic) {
    console.error("❌ 오류: 주제를 입력해주세요!");
    console.error("사용법: node scripts/publish_blog.js \"원하는 주제\"");
    console.error("예시: node scripts/publish_blog.js \"NewJeans Minji Saju\"");
    process.exit(1);
  }

  console.log(`\n🚀 [1/3] AI에게 블로그 글 작성을 지시하는 중입니다: "${promptTopic}"...`);
  try {
    // 1. Generate the blog post
    execSync(`node scripts/generate_blog.js "${promptTopic}"`, { stdio: 'inherit' });
    
    console.log(`\n📦 [2/3] 작성된 글을 서버에 업로드할 준비를 합니다...`);
    // 2. Git Add
    execSync(`git add .`, { stdio: 'inherit' });
    
    // 3. Git Commit
    // Using simple quotes to avoid escaping issues across OS
    const commitMsg = `blog: auto-publish ${promptTopic.replace(/[^a-zA-Z0-9가-힣 ]/g, '')}`;
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
    
    console.log(`\n🌐 [3/3] 웹사이트 실서버(Vercel)로 전송 중입니다...`);
    // 4. Git Push
    execSync(`git push origin main`, { stdio: 'inherit' });
    
    console.log(`\n✅ 성공! 모든 작업이 끝났습니다.`);
    console.log(`약 1~2분 뒤에 K-Oracle 웹사이트에 접속하시면 새 블로그 글이 올라와 있을 것입니다! 🎉\n`);

  } catch (error) {
    console.error(`\n❌ 작업 중 오류가 발생했습니다. (Git 변경사항이 없거나 인터넷 연결 문제일 수 있습니다.)`);
    console.error(error.message);
  }
}

main();
