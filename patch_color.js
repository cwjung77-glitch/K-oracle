const fs = require('fs');

let c = fs.readFileSync('scripts/generate_color_blog.js', 'utf8');

const targetFetch = `        const res = await fetch(\\\`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\\$\{key}\\\`, {`;

const replacementFetch = `        const fallbackModels = ['gemini-flash-lite-latest', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];
        for (const model of fallbackModels) {
          try {
            const res = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/\${model}:generateContent?key=\${key}\`, {`;

c = c.replace(targetFetch, replacementFetch);

const targetBreak = `        success = true;
        currentKeyIndex = (currentKeyIndex + i + 1) % keys.length; // rotate key
        break; 
        
      } catch (err) {`;

const replacementBreak = `        success = true;
        currentKeyIndex = (currentKeyIndex + i + 1) % keys.length; // rotate key
        break; 
          } catch (modelErr) {
            console.error(\`      ❌ Failed \${model}: \${modelErr.message}\`);
          }
        } // end of model loop
        if (success) break;
      } catch (err) {`;

c = c.replace(targetBreak, replacementBreak);

fs.writeFileSync('scripts/generate_color_blog.js', c);
console.log("Patched generate_color_blog.js successfully!");
