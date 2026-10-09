const fs = require('fs');

const fallbackArray = "['gemini-flash-lite-latest', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-flash-latest']";

// 1. API ROUTES
const apiRoutes = [
  'src/app/api/generate-beauty/route.js',
  'src/app/api/generate-saju/route.js',
  'src/app/api/generate-daily/route.js'
];

for (const route of apiRoutes) {
  let content = fs.readFileSync(route, 'utf8');
  content = content.replace(/const fallbackModels = \[.*?\];/g, `const fallbackModels = ${fallbackArray};`);
  fs.writeFileSync(route, content);
  console.log(`Patched API Route: ${route}`);
}

// 2. GENERATE BLOG SCRIPT
let blogScript = fs.readFileSync('scripts/generate_blog.js', 'utf8');
const blogInjection = `const fallbackModels = ${fallbackArray};
  const keys = apiKey.split(',').map(k => k.trim());
  let success = false;
  
  for (let i = 0; i < keys.length; i++) {
    const currentKey = keys[i];
    console.log(\`[API Key \${i+1}/\${keys.length}]\`);
    
    for (const model of fallbackModels) {
      console.log('  -> Trying model: ' + model);
      try {
        const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/\${model}:generateContent?key=\${currentKey}\`, {
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
        text = text.replace(/^\\s*\`\`\`markdown\\n/, '').replace(/\\n\`\`\`\\s*$/, '');

        let slugMatch = text.match(/slug:\\s*"([^"]+)"/);
        let slug = slugMatch ? slugMatch[1] : 'blog-post-' + Date.now();
        
        const outPath = path.join(__dirname, \`../src/content/blog/\${slug}.md\`);
        fs.writeFileSync(outPath, text);
        
        console.log(\`✅ Successfully generated with \${model} and saved to \${outPath}\`);
        success = true;
        break;
      } catch (err) {
        console.error(\`    ❌ Failed \${model}: \${err.message}\`);
      }
    }
    if (success) break;
  }
  
  if (!success) {
    console.error('❌ All keys and models failed.');
    process.exit(1);
  }
}

main();`;

// Replace from 'const keys =' to the end of the file
blogScript = blogScript.replace(/const keys = [^]+?main\(\);/m, blogInjection);
fs.writeFileSync('scripts/generate_blog.js', blogScript);
console.log(`Patched script: scripts/generate_blog.js`);

// 3. GENERATE COLOR BLOG SCRIPT
let colorBlogScript = fs.readFileSync('scripts/generate_color_blog.js', 'utf8');
const colorInjection = `const fallbackModels = ${fallbackArray};
  const keys = apiKey.split(',').map(k => k.trim());
  let success = false;
  
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    console.log(\`[API Key \${i+1}/\${keys.length}]\`);
    
    for (const model of fallbackModels) {
      console.log('  -> Trying model: ' + model);
      try {
        const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/\${model}:generateContent?key=\${key}\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: \`\${systemPrompt}\\n\\nIdol Name: \${promptIdol}\` }] }
            ]
          })
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        
        let text = data.candidates[0].content.parts[0].text;
        text = text.replace(/^\\s*\`\`\`markdown\\n/, '').replace(/\\n\`\`\`\\s*$/, '');

        let slugMatch = text.match(/slug:\\s*"([^"]+)"/);
        let slug = slugMatch ? slugMatch[1] : 'color-blog-' + Date.now();
        
        const outPath = path.join(__dirname, \`../src/content/blog/\${slug}.md\`);
        fs.writeFileSync(outPath, text);
        
        console.log(\`✅ Successfully generated with \${model} and saved to \${outPath}\`);
        success = true;
        break;
      } catch (err) {
        console.error(\`    ❌ Failed \${model}: \${err.message}\`);
      }
    }
    if (success) break;
  }
  
  if (!success) {
    console.error('❌ All keys and models failed.');
    process.exit(1);
  }
}

main();`;
colorBlogScript = colorBlogScript.replace(/const keys = [^]+?main\(\);/m, colorInjection);
fs.writeFileSync('scripts/generate_color_blog.js', colorBlogScript);
console.log(`Patched script: scripts/generate_color_blog.js`);

// 4. TRANSLATE POST SCRIPT
let translateScript = fs.readFileSync('scripts/translate_post.js', 'utf8');
const translateInjection = `const fallbackModels = ${fallbackArray};
      let success = false;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[(keyIdx + i) % keys.length];
        
        for (const model of fallbackModels) {
          try {
            const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/\${model}:generateContent?key=\${key}\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: \`\${systemPrompt}\\n\\nORIGINAL POST:\\n\\n\${originalContent}\` }] }],
                generationConfig: { maxOutputTokens: 8192 }
              })
            });

            const json = await res.json();
            if (json.error) throw new Error(json.error.message);
            
            let translated = json.candidates[0].content.parts[0].text;
            translated = translated.replace(/^slug:\\s*"([^"]+)"/m, \`slug: "\${originalSlug}-\${lang.code}"\`);
            translated = translated.replace(/^\\s*\`\`\`markdown\\n/, '').replace(/\\n\`\`\`\\s*$/, '');

            fs.writeFileSync(path.join(dir, targetFileName), translated);
            console.log(\`  -> ✅ Done: \${lang.code} (using \${model})\`);
            success = true;
            keyIdx = (keyIdx + i + 1) % keys.length;
            await new Promise(r => setTimeout(r, 2000));
            break;
          } catch (err) {}
        }
        if (success) break;
      }
      if (!success) {
        console.log(\`  -> ❌ Failed: \${lang.code} (All models/keys exhausted)\`);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }
  console.log("\\n✅ All translation attempts finished!");
}

main();`;
translateScript = translateScript.replace(/let success = false;[\s\S]+?main\(\);/m, translateInjection);
fs.writeFileSync('scripts/translate_post.js', translateScript);
console.log(`Patched script: scripts/translate_post.js`);

