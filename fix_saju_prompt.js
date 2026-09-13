const fs = require('fs');
let c = fs.readFileSync('src/app/api/generate-saju/route.js', 'utf8');

c = c.replace(
  /const \{ birthData, gender, lang \} = body;/,
  `const { birthData, gender, lang, plan } = body;`
);

c = c.replace(
  /const prompt = \`You are a 40-year veteran Korean Shaman\. Your tone is mystical, luxurious, and slightly direct \(\"Tough Love Grandmaster\"\)\./,
  `let targetYears = "2027";
    if (plan === 'fullyear') targetYears = "2028";
    else if (plan === 'bundle') targetYears = "2027 and 2028";
    
    const prompt = \`You are a 40-year veteran Korean Shaman. Your tone is mystical, luxurious, and slightly direct ("Tough Love Grandmaster").`
);

c = c.replace(
  /Generate a highly personalized \"2027 K-Astrology \(Saju\) Masterplan\" \(800 words\)\./,
  `Generate a highly personalized "\${targetYears} K-Astrology (Saju) Masterplan" (800 words). Focus specifically on the year(s): \${targetYears}.`
);

c = c.replace(
  /provide a spiritual method \(Bi-bang\) to sever it in 2027\./,
  `provide a spiritual method (Bi-bang) to sever it in \${targetYears}.`
);

fs.writeFileSync('src/app/api/generate-saju/route.js', c);
