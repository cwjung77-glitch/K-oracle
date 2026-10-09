const fs = require('fs');
const path = require('path');
const dir = 'src/content/blog';

const files = fs.readdirSync(dir).filter(f => f.startsWith('bong-joon-ho-saju'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const faqRegex = /(##\s+(?:Frequently Asked Questions|Preguntas frecuentes|คำถามที่พบบ่อย|Pertanyaan yang Sering Diajukan|よくある質問|Häufig gestellte Fragen|Domande frequenti|Perguntas Frequentes|Często zadawane pytania|Часто задаваемые вопросы|Câu hỏi thường gặp|Foire aux questions))([\s\S]*)/i;
  
  const match = content.match(faqRegex);
  if (match) {
    const faqHeading = match[1];
    let faqBody = match[2];
    
    faqBody = faqBody.split('\n').map(line => {
      const t = line.trim();
      // Ends with ? or ？, and doesn't start with #, -, * or number
      if ((t.endsWith('?') || t.endsWith('？')) && !t.match(/^[#\-\*\d]/)) {
        return '### ' + t;
      }
      return line;
    }).join('\n');
    
    content = content.replace(faqRegex, faqHeading + faqBody);
    fs.writeFileSync(path.join(dir, file), content);
  }
});
