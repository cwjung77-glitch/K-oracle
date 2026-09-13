const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8').replace(/\r\n/g, '\n');

if (!c.includes('const { birthData, gender, lang, plan, userName, idolName: bodyIdolName }')) {
  c = c.replace(
    /const \{ birthData, gender, lang, plan \} = await req\.json\(\);/,
    `const { birthData, gender, lang, plan, userName, idolName: bodyIdolName } = await req.json();`
  );
  
  c = c.replace(
    /const idolName = body\.idolName \|\| "Your Partner";/,
    `const idolName = bodyIdolName || body.idolName || "Your Partner";`
  );
  
  c = c.replace(
    /- User Birth Data: \$\{birthData\}\n- User Gender: \$\{gender\}/,
    `- User Name: \${userName || 'The Client'}\n- User Birth Data: \${birthData}\n- User Gender: \${gender}`
  );
  
  c = c.replace(
    /- Birth Data: \$\{birthData\}\n\s*- Gender: \$\{gender\}/,
    `- User Name: \${userName || 'The Client'}\n- Birth Data: \${birthData}\n- Gender: \${gender}`
  );
  
  fs.writeFileSync('src/app/api/generate-saju/route.js', c);
}
