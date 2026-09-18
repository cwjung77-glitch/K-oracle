const fs = require('fs');
const path = require('path');

async function main() {
  const blogDir = path.join(__dirname, '../src/content/blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  
  let apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    try {
      const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
      const match = envFile.match(/GEMINI_API_KEY=(.+)/);
      if (match) apiKey = match[1].trim();
    } catch(e) {}
  }

  if (!apiKey) {
    console.error("No API key");
    process.exit(1);
  }
  
  const keys = apiKey.split(',').map(k => k.trim());

  console.log(`Rewriting ${files.length} posts sequentially to remove AI scent...`);

  let count = 0;
  for (const name of files) {
    const filePath = path.join(blogDir, name);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Separate frontmatter from body
    const parts = content.split('---');
    if (parts.length < 3) continue;
    
    const frontmatter = parts[1];
    const body = parts.slice(2).join('---');
    
    // If it's already very short, skip it (unlikely)
    if (body.length < 100) continue;

    const prompt = `Rewrite the following blog post to remove ALL "AI-sounding" transition phrases (like "In conclusion", "Moreover", "Let's dive into"). 
Make it sound like a highly engaging, passionate human K-Pop and Saju expert wrote it. 
Use varied sentence lengths and a conversational tone. 
Keep the exact same facts, headings, and overall SEO structure (including TL;DR). Do NOT add your own Markdown code block formatting (\`\`\`). Just return the raw rewritten text.

Original text:
${body}`;

    let success = false;
    let retries = 3;
    
    while (!success && retries > 0) {
      try {
        console.log(`Processing ${name} (${++count}/${files.length})...`);
        const currentKey = keys[Math.floor(Math.random() * keys.length)];
        
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${currentKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
          })
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        
        let newBody = data.candidates[0].content.parts[0].text;
        newBody = newBody.replace(/^\s*\`\`\`markdown\n/, '').replace(/\n\`\`\`\s*$/, '');

        const newContent = `---${frontmatter}---` + newBody;
        fs.writeFileSync(filePath, newContent);
        console.log(`[OK] Rewrote ${name}`);
        success = true;
      } catch (e) {
        console.error(`[Error] Failed to rewrite ${name}: ${e.message}`);
        retries--;
        if (retries > 0) {
          console.log(`Retrying in 5 seconds... (${retries} retries left)`);
          await new Promise(r => setTimeout(r, 5000));
        } else {
            console.log(`Skipping ${name} after 3 failed attempts.`);
        }
      }
    }
    
    // Base sleep to prevent rapid rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log("All finished!");
}

main();
