const fs = require('fs');
const log = fs.readFileSync('C:/Users/chan/.gemini/antigravity/brain/fbbe2575-2787-43ce-a6c4-5d70ca3e00b8/.system_generated/logs/transcript_full.jsonl', 'utf8');
const lines = log.split('\n');
for (let line of lines) {
  if (line.includes('팔레트') || line.includes('palette') || line.includes('Palette')) {
    let parsed = JSON.parse(line);
    if (parsed.content) {
      console.log('---');
      console.log(parsed.content.substring(0, 500));
    }
  }
}
