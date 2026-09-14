const fs = require('fs');

const bgReplacement = `{/* Lite Cosmic Aurora Background for Blog (Optimized for Reading) */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] bg-purple-600/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[80%] bg-yellow-600/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[10%] w-[70%] h-[60%] bg-pink-600/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      
      {/* Lite Stardust Effect */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '72px 72px', backgroundPosition: '36px 36px' }} />
      
      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />`;

['src/app/blog/page.js', 'src/app/blog/[slug]/page.js'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the old basic background divs
  content = content.replace(/\{\/\* Background Aurora \*\/\}\s*<div className="absolute top-\[-20%\][^>]+>\s*<div className="absolute top-\[10%\][^>]+>/, bgReplacement);
  
  // Try another pattern if the comment is missing (like in slug page)
  content = content.replace(/<div className="absolute top-\[-20%\] left-\[-10%\] w-\[60%\] h-\[70%\] bg-purple-600\/10 blur-\[150px\] rounded-full mix-blend-screen pointer-events-none" \/>\s*<div className="absolute top-\[10%\] right-\[-10%\] w-\[50%\] h-\[80%\] bg-yellow-600\/10 blur-\[150px\] rounded-full mix-blend-screen pointer-events-none" \/>/, bgReplacement);

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
