import re

with open("src/app/api/generate-daily/route.js", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the single key usage with a rotation loop over apiKeys
old_loop = """
    for (const currentModel of fallbackModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${GEMINI_API_KEY}`;
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
        data = await response.json();
        
        if (response.ok) {
          lastError = null;
          break; // success
        } else {
          lastError = data;
        }
      } catch (err) {
        lastError = err;
      }
    }
"""

new_loop = """
    // API Key rotation + model fallback
    for (const currentKey of apiKeys) {
      if (response && response.ok) break;
      for (const currentModel of fallbackModels) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${currentKey}`;
          response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
          });
          data = await response.json();
          
          if (response.ok) {
            lastError = null;
            break; // success
          } else {
            lastError = data;
          }
        } catch (err) {
          lastError = err;
        }
      }
    }
"""
content = content.replace(old_loop.strip(), new_loop.strip())

# Remove `const GEMINI_API_KEY = apiKeys[0];`
content = content.replace("const GEMINI_API_KEY = apiKeys[0]; // just use the first one", "// Keys will be rotated below")

with open("src/app/api/generate-daily/route.js", "w", encoding="utf-8") as f:
    f.write(content)
