import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

import BlogFilter from '@/components/features/BlogFilter';

// SEO Metadata for the main blog page
export const metadata = {
  title: 'K-Oracle Blog - Saju, Destiny, & K-Culture Insights',
  description: 'Explore the mysteries of Korean Saju, K-Pop idol compatibility, and deep fortune telling insights on the K-Oracle blog.',
};

export default function BlogIndex() {
  const contentDir = path.join(process.cwd(), 'src/content/blog');
  
  let posts = [];
  try {
    const files = fs.readdirSync(contentDir);
    posts = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        return {
          slug: file.replace('.md', ''),
          ...data,
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
  } catch (err) {
    console.error("Error reading blog posts:", err);
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-sans selection:bg-yellow-500 selection:text-black pb-24 overflow-hidden">
      
      {/* Lite Cosmic Aurora Background for Blog (Optimized for Reading) */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] bg-purple-600/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[80%] bg-yellow-600/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[10%] w-[70%] h-[60%] bg-pink-600/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      
      {/* Lite Stardust Effect */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '72px 72px', backgroundPosition: '36px 36px' }} />
      
      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl md:text-2xl font-black tracking-widest cursor-pointer whitespace-nowrap">
            <span className="text-yellow-500">K</span>-ORACLE
          </Link>
          <div className="flex items-center gap-6 text-sm font-bold">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">App</Link>
            <Link href="/blog" className="text-yellow-500">Blog</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">
            Cosmic <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">Insights</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Deep dive into the ancient secrets of Korean Saju, astrology, and K-Pop destinies.
          </p>
        </div>

        <BlogFilter posts={posts} />
      </main>
    </div>
  );
}
