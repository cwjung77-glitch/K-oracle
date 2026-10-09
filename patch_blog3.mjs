import fs from 'fs';
import path from 'path';

const scriptPath = './scripts/generate_blog.js';
let code = fs.readFileSync(scriptPath, 'utf8');

const oldBody = `body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: \`\${systemPrompt}\\n\\nTopic: \${promptTopic}\` }] }
            ]
          })`;

const newBody = `body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: \`\${systemPrompt}\\n\\nTopic: \${promptTopic}\` }] }
            ],
            generationConfig: {
              maxOutputTokens: 8192
            }
          })`;

code = code.replace(oldBody, newBody);

const structureRule = `
CRITICAL FORMATTING & STRUCTURE RULE: 
1. Use standard Markdown bullet points for lists. 
2. ONLY use ## for main section headers. DO NOT use ### or # for main headers.
3. Your headers MUST roughly follow this exact sequence:
## TL;DR (Quick Answer)
[Insert New to Korean Astrology block here]
## Cosmic Blueprint: [Idol Name]'s Four Pillars Chart
## Deep Dive: The Core Energy
## The Path to Destiny
## Frequently Asked Questions
`;

code = code.replace('CRITICAL FORMATTING RULE:', structureRule + '\n\nCRITICAL FORMATTING RULE:');

fs.writeFileSync(scriptPath, code, 'utf8');
console.log('Patched generate_blog.js');
