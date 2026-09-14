const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

// 시작 날짜 설정: 2026년 8월 31일
let startDate = new Date('2026-08-23');

console.log(`\n📅 블로그 게시물 날짜 자동 분산 스크립트를 시작합니다 (하루 2포스팅 기준)...`);

files.forEach((file, index) => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 2개의 글마다 하루씩 증가하도록 계산 (0, 1 -> 0일 추가 / 2, 3 -> 1일 추가)
  let postDate = new Date(startDate);
  const daysToAdd = Math.floor(index / 2);
  postDate.setDate(postDate.getDate() + daysToAdd);
  
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

console.log(`\n🎉 총 ${files.length}개의 블로그 글이 하루 2개씩 업로드된 것처럼 완벽하게 위장 완료되었습니다!`);
console.log(`터미널에 아래 명령어를 입력해서 실서버에 반영해 주세요:`);
console.log(`git add . && git commit -m "chore: redistribute blog dates (2 per day)" && git push origin main\n`);
