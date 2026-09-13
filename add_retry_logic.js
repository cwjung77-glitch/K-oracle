const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');

c = c.replace(
  /if \(\!isCompatibility\) \{ prompt \+\= \"\\n\"; \}\n\s*const response = await fetch\(`https:\/\/generativelanguage\.googleapis\.com\/v1beta\/models\/gemini-3\.8-flash:generateContent\?key=\$\{apiKey\}`,\s*\{\n\s*method: 'POST',\n\s*headers: \{ 'Content-Type': 'application\/json' \},\n\s*body: JSON\.stringify\(\{ contents: \[\{ parts: \[\{ text: prompt \}\] \}\], generationConfig: \{ temperature: 0\.1, topK: 1 \} \}\)\n\s*\}\);\n\n\s*if \(\!response\.ok\) \{\n\s*if \(response\.status === 429\) \{\n\s*throw new Error\(\"API_RATE_LIMIT\"\);\n\s*\}\n\s*throw new Error\(`Gemini API Error: \$\{await response\.text\(\)\}`\);\n\s*\}/,
  `if (!isCompatibility) { prompt += "\\n"; }
      
      let response;
      let retries = 3;
      while (retries > 0) {
        response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=\${apiKey}\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.1, topK: 1 } })
        });
        
        if (response.ok) {
          break; // Success!
        }
        
        if (response.status === 429 || response.status >= 500) {
          retries--;
          console.warn(\`[AI Engine] API Error \${response.status}. Retries left: \${retries}\`);
          if (retries === 0) {
            if (response.status === 429) throw new Error("API_RATE_LIMIT");
            throw new Error(\`Gemini API Error: \${await response.text()}\`);
          }
          // Exponential backoff
          await new Promise(r => setTimeout(r, (3 - retries) * 1500));
        } else {
          // Unrecoverable error (e.g. 400 Bad Request)
          throw new Error(\`Gemini API Error: \${await response.text()}\`);
        }
      }`
);

fs.writeFileSync('src/app/api/generate-saju/route.js', c);
