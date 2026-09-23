import fs from 'fs';
let content = fs.readFileSync('scheduler_blogger.mjs', 'utf8');

const regex = /   - ## Conclusion/;
const replacement = `   - ## Frequently Asked Questions About [Idol Name]'s Saju (Include 3 Q&As)
   - ## Key Takeaways of [Idol Name]'s Cosmic Destiny (3 bullet points)`;

content = content.replace(regex, replacement);
fs.writeFileSync('scheduler_blogger.mjs', content);
