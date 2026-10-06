const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const languages = [
  { code: 'es', name: 'Spanish' },
  { code: 'th', name: 'Thai' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'pl', name: 'Polish' },
  { code: 'ru', name: 'Russian' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'fr', name: 'French' }
];

async function main() {
  const dir = path.join(__dirname, '../src/content/blog');
  const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  
  const targetFile = process.argv[2];
  const sourceFiles = targetFile ? [targetFile] : allFiles.filter(f => {
    return !f.match(/-(es|th|id|ja|de|it|pt|pl|ru|vi|fr)\.md$/);
  });

  let apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    try {
      const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
      const match = envFile.match(/GEMINI_API_KEY=(.+)/);
      if (match) apiKey = match[1].trim();
    } catch(e) {}
  }

  const keys = apiKey.split(',').map(k => k.trim());
  let keyIdx = 0;

  console.log(`Found ${sourceFiles.length} original English posts to process.`);

  for (const fileName of sourceFiles) {
    console.log(`\n===========================================`);
    console.log(`Translating Post: ${fileName}`);
    console.log(`===========================================`);
    
    const filePath = path.join(dir, fileName);
    const originalContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(originalContent);
    
    // Fix slug extraction to avoid duplicating -en
    let originalSlug = data.slug || fileName.replace(/\.md$/, '');
    originalSlug = originalSlug.replace(/-en$/, ''); // Strip -en to get the pure base slug

    const enSlug = `${originalSlug}-en`;
    if (!fileName.includes('-en.md')) {
      const enContent = originalContent.replace(/^slug:\s*"?([^"\n]+)"?/m, `slug: "${enSlug}"`);
      fs.writeFileSync(path.join(dir, `${enSlug}.md`), enContent);
      console.log(`✅ Saved base file as ${enSlug}.md`);
    }

    for (const lang of languages) {
      const targetFileName = `${originalSlug}-${lang.code}.md`;
      if (fs.existsSync(path.join(dir, targetFileName))) {
        console.log(`  -> ⏭️ Skipped: ${lang.code} (Already exists)`);
        continue;
      }

      console.log(`  -> Translating to ${lang.name} (${lang.code})...`);
      
      const systemPrompt = `You are a professional translator for the K-Oracle beauty and astrology blog.
Translate the following Markdown blog post entirely into ${lang.name}.

CRITICAL RULES:
1. Translate the YAML frontmatter values (title, excerpt) to ${lang.name}, EXCEPT keep the keys in English (title:, slug:, date:, excerpt:, author:, tags:).
2. DO NOT translate the 'tags' values or 'author' value. Keep them exactly as they are.
3. Keep the markdown formatting exactly the same (headers, bold, lists, tables).
4. The new slug MUST be: "${originalSlug}-${lang.code}"
5. Output ONLY the translated markdown file starting with --- and ending with the translated body. No conversational filler.`;

      const fallbackModels = ['gemini-flash-lite-latest', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];
      let success = false;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[(keyIdx + i) % keys.length];
        
        for (const model of fallbackModels) {
          try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nORIGINAL POST:\n\n${originalContent}` }] }],
                generationConfig: { maxOutputTokens: 8192 }
              })
            });

            const json = await res.json();
            if (json.error) throw new Error(json.error.message);
            
            let translated = json.candidates[0].content.parts[0].text;
            translated = translated.replace(/^slug:\s*"([^"]+)"/m, `slug: "${originalSlug}-${lang.code}"`);
            translated = translated.replace(/^\s*```markdown\n/, '').replace(/\n```\s*$/, '');

            fs.writeFileSync(path.join(dir, targetFileName), translated);
            console.log(`  -> ✅ Done: ${lang.code} (using ${model})`);
            success = true;
            keyIdx = (keyIdx + i + 1) % keys.length;
            await new Promise(r => setTimeout(r, 2000));
            break;
          } catch (err) {}
        }
        if (success) break;
      }
      if (!success) {
        console.log(`  -> ❌ Failed: ${lang.code} (All models/keys exhausted)`);
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }
  console.log("\n✅ All translation attempts finished!");
}

main();
