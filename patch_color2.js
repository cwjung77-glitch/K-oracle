const fs = require('fs');

const fallbackLoop = `
      const fallbackModels = ['gemini-flash-lite-latest', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];
      for (const model of fallbackModels) {
        try {
          const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + key, {
`;

let content = fs.readFileSync('scripts/generate_color_blog.js', 'utf8');

// Replace fetch line
content = content.replace(/try\s*\{\s*const res = await fetch\(`https:\/\/generativelanguage.googleapis.com\/v1beta\/models\/gemini-1.5-flash:generateContent\?key=\$\{key\}`,\s*\{/, fallbackLoop);

// Replace break and catch
const oldBreak = `success = true;
        currentKeyIndex = (currentKeyIndex + i + 1) % keys.length; // rotate key
        break; 
        
      } catch (err) {
        console.error(\`Fetch error for \${lang.code}:\`, err.message);
      }`;

const newBreak = `success = true;
          currentKeyIndex = (currentKeyIndex + i + 1) % keys.length; // rotate key
          break; 
        } catch (modelErr) {
          console.error("Fetch error for " + lang.code + " with " + model + ": " + modelErr.message);
        }
      } // end model loop
      if (success) break;
      // removed outer catch block since try is inside model loop`;

content = content.replace(oldBreak, newBreak);

fs.writeFileSync('scripts/generate_color_blog.js', content);
console.log("Patched!");
