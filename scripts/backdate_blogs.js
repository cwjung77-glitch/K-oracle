const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

// 시작 날짜 설정: 2026년 8월 31일
let startDate = new Date('2026-08-31');

console.log(`\n📅 블로그 게시물 날짜 자동 분산 스크립트를 시작합니다...`);

files.forEach((file, index) => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 날짜 계산 (하루씩 더하기, 단 오늘 날짜를 넘지 않도록 최대 오늘까지만)
  let postDate = new Date(startDate);
  postDate.setDate(postDate.getDate() + index);
  
  const today = new Date();
  if (postDate > today) {
      postDate = today; // 미래 날짜는 오늘로 고정
  }
  
  const formattedDate = postDate.toISOString().split('T')[0];
  
  // 정규식으로 frontmatter 안의 date 필드 교체
  content = content.replace(/date:\s*".*?"/, `date: "${formattedDate}"`);
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ [${formattedDate}]로 변경 완료: ${file}`);
});

console.log(`\n🎉 총 ${files.length}개의 블로그 글 날짜가 자연스럽게 분산 배치되었습니다!`);
console.log(`이제 터미널에 아래 명령어를 입력해서 실서버에 반영해 주세요:`);
console.log(`git add . && git commit -m "chore: redistribute blog dates" && git push origin main\n`);
