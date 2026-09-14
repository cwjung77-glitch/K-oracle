const fs = require('fs');

let c = fs.readFileSync('src/app/page.js', 'utf8').replace(/\r\n/g, '\n');

const oldBg = `      {/* Ambient Cosmic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />`;

const newBg = `      {/* Premium Cosmic Aurora Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[80%] bg-yellow-600/15 blur-[150px] rounded-full mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      <div className="absolute bottom-[-20%] left-[10%] w-[70%] h-[60%] bg-pink-600/15 blur-[150px] rounded-full mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      
      {/* Stardust Effect */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '72px 72px', backgroundPosition: '36px 36px' }} />
      
      {/* Grid Texture Overlay (Kept for depth) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />`;

c = c.replace(oldBg, newBg);
fs.writeFileSync('src/app/page.js', c);
