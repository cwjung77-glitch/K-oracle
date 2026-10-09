const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';

const files = fs.readdirSync(dir).filter(f => f.startsWith('bong-joon-ho-saju'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // The questions in the translated files will end with '?'
  // We want to replace any line that ends with '?' and doesn't start with '#' or '-' into '### ' + line
  // BUT we only want to do this in the FAQ section.
  
  // Let's split by FAQ section
  const faqRegex = /(##\s+(?:Frequently Asked Questions|Preguntas frecuentes|คำถามที่พบบ่อย|Pertanyaan yang Sering Diajukan|よくある質問|Häufig gestellte Fragen|Domande frequenti|Perguntas Frequentes|Często zadawane pytania|Часто задаваемые вопросы|Câu hỏi thường gặp|Foire aux questions))([\s\S]*)/i;
  
  const match = content.match(faqRegex);
  if (match) {
    const faqHeading = match[1];
    let faqBody = match[2];
    
    // Replace lines ending with ? that aren't already headers or list items
    faqBody = faqBody.split('\n').map(line => {
      // If the line is a plain question (ends with ?, doesn't start with space, #, *, -)
      if (line.trim().endsWith('?') && /^[A-Z¿]/.test(line.trim())) {
        return '### ' + line.trim();
      }
      return line;
    }).join('\n');
    
    content = content.replace(faqRegex, faqHeading + faqBody);
    fs.writeFileSync(path.join(dir, file), content);
    console.log(`Fixed FAQ in ${file}`);
  }
});
