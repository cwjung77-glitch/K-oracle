import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

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
      
      {/* Background Aurora */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[80%] bg-yellow-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      
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

        {posts.length === 0 ? (
          <div className="text-center text-zinc-500 py-12">No posts found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
                <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 h-full hover:bg-zinc-800/60 hover:border-yellow-500/50 transition-all duration-300">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {post.tags?.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-yellow-500 tracking-wider uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-black mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-zinc-400 mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm font-bold text-zinc-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
