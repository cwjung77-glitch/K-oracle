const fs = require('fs');

let c = fs.readFileSync('scripts/generate_blog.js', 'utf8');

const oldFetchLogic = `  try {
    const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${apiKey}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: \`\${systemPrompt}\\n\\nTopic: \${promptTopic}\` }] }
        ]
      })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    
    let text = data.candidates[0].content.parts[0].text;
    
    // Remove markdown codeblock wrappers if Gemini accidentally includes them
    text = text.replace(/^\\s*\\\`\\\`\\\`markdown\\n/, '').replace(/\\n\\\`\\\`\\\`\\s*$/, '');

    // Extract slug from the YAML frontmatter
    let slugMatch = text.match(/slug:\\s*"([^"]+)"/);
    let slug = slugMatch ? slugMatch[1] : 'blog-post-' + Date.now();
    
    const outPath = path.join(__dirname, \`../src/content/blog/\${slug}.md\`);
    fs.writeFileSync(outPath, text);
    
    console.log(\`✅ Successfully generated and saved to \${outPath}\`);
  } catch (err) {
    console.error("Error generating post:", err);
    process.exit(1);
  }`;

const newFetchLogic = `  // API Key Rotation Logic
  const keys = apiKey.split(',').map(k => k.trim());
  let success = false;
  
  for (let i = 0; i < keys.length; i++) {
    const currentKey = keys[i];
    console.log(\`[🔑 Key \${i+1}/\${keys.length}] 시도 중...\`);
    
    try {
      const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${currentKey}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: \`\${systemPrompt}\\n\\nTopic: \${promptTopic}\` }] }
          ]
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      
      let text = data.candidates[0].content.parts[0].text;
      text = text.replace(/^\\s*\\\`\\\`\\\`markdown\\n/, '').replace(/\\n\\\`\\\`\\\`\\s*$/, '');

      let slugMatch = text.match(/slug:\\s*"([^"]+)"/);
      let slug = slugMatch ? slugMatch[1] : 'blog-post-' + Date.now();
      
      const outPath = path.join(__dirname, \`../src/content/blog/\${slug}.md\`);
      fs.writeFileSync(outPath, text);
      
      console.log(\`✅ Successfully generated and saved to \${outPath}\`);
      success = true;
      break; // Stop looping if successful
    } catch (err) {
      console.error(\`⚠️ Key \${i+1} 실패: \${err.message}\`);
      if (i === keys.length - 1) {
        console.error("❌ 모든 API 키가 소진되었거나 에러가 발생했습니다.");
        process.exit(1);
      }
    }
  }`;

c = c.replace(oldFetchLogic, newFetchLogic);
fs.writeFileSync('scripts/generate_blog.js', c);
