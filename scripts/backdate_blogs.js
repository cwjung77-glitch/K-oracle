const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/content/blog');
let files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

// 파일을 생성/수정 시간(mtime) 기준으로 오름차순 정렬 (오래된 글이 먼저 오도록)
files.sort((a, b) => {
  const statA = fs.statSync(path.join(blogDir, a));
  const statB = fs.statSync(path.join(blogDir, b));
  return statA.mtimeMs - statB.mtimeMs;
});

// 시작 날짜 설정: 2026년 8월 23일
let startDate = new Date('2026-08-23');

console.log(`\n📅 블로그 게시물 날짜 자동 분산 스크립트를 시작합니다 (하루 2포스팅, 과거 작성글 우선 배치)...`);

files.forEach((file, index) => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 2개의 글마다 하루씩 증가하도록 계산
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

console.log(`\n🎉 총 ${files.length}개의 블로그 글이 하루 2개씩 순차적으로 업로드된 것처럼 완벽하게 위장 완료되었습니다!`);
