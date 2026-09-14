const fs = require('fs');
const path = require('path');

const routes = [
  'src/app/api/generate-saju/route.js',
  'src/app/api/saju-compatibility/route.js',
  'src/app/api/beauty-deep-dive/route.js'
];

routes.forEach(route => {
  const filePath = path.join(__dirname, route);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // We are replacing the standard fetch block with a rotation block.
  // The original fetch block looks somewhat like:
  /*
    const apiKey = process.env.GEMINI_API_KEY;
    ...
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, { ... })
    const data = await response.json();
    ...
  */
  
  // A simple regex might be risky. Let's do a smart string replacement.
  
  if (!content.includes('const apiKeys = process.env.GEMINI_API_KEY.split')) {
    // 1. Replace the single apiKey extraction with the array
    content = content.replace(
      'const apiKey = process.env.GEMINI_API_KEY;',
      `const apiKeys = process.env.GEMINI_API_KEY.split(',').map(k => k.trim());
    if (apiKeys.length === 0 || !apiKeys[0]) {
      return NextResponse.json({ error: 'AI API Key is not configured' }, { status: 500 });
    }`
    );

    // 2. Wrap the fetch in a for loop
    // I will find the fetch and data parsing part.
    // The existing code has:
    // const response = await fetch(...)
    // const data = await response.json();
    // if (data.error) ...
    // let resultText = data.candidates[0].content.parts[0].text;
    
    // Let's use a Regex to capture the fetch options.
    const fetchRegex = /const response = await fetch\(`[^`]+\$\{\w+\}`,\s*(\{[\s\S]*?})\s*\);[\s\S]*?const data = await response\.json\(\);/m;
    const match = content.match(fetchRegex);
    
    if (match) {
      const fetchOptions = match[1];
      const newFetchBlock = `let data = null;
    let success = false;
    
    for (const key of apiKeys) {
      try {
        const response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=\${key}\`, ${fetchOptions});
        data = await response.json();
        
        if (!data.error) {
          success = true;
          break; // Stop checking other keys if this one succeeded
        }
      } catch (err) {
        console.error("API Rotation Error:", err);
      }
    }
    
    if (!success || !data || data.error) {
      return NextResponse.json({ error: 'All AI servers are currently overloaded due to high demand. Please try again in a few minutes!' }, { status: 503 });
    }`;

      content = content.replace(match[0], newFetchBlock);
      
      // Also remove any existing `if (data.error) { ... }` that might be right after since we handle it now.
      content = content.replace(/if\s*\(\s*data\.error\s*\)\s*\{\s*return NextResponse\.json\([\s\S]*?\}\s*\}/, '');
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Applied API Rotation to ${route}`);
    }
  }
});
