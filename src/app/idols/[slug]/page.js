import Link from 'next/link';
import { notFound } from 'next/navigation';
import { idolsDB } from '@/data/idols';
import { parseIdolName } from '@/utils/slugify';
import { getSajuFromDate } from '@/utils/zodiac';
import BlogEngagement from '@/components/features/BlogEngagement';

// 1. Generate Static Params (SSG) for 500+ idols
export async function generateStaticParams() {
  return idolsDB.map((idol) => {
    const { slug } = parseIdolName(idol.name);
    return { slug };
  });
}

// 2. Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const idolData = idolsDB.find(i => parseIdolName(i.name).slug === slug);
  if (!idolData) return { title: 'Not Found' };
  
  const { member, group } = parseIdolName(idolData.name);
  return {
    title: `${member} (${group}) Saju & Astrology Chart - K-Oracle`,
    description: `Explore the Korean Saju (Four Pillars of Destiny) of ${member} from ${group}. Discover their cosmic blueprint and check your romantic compatibility!`,
  };
}

export default async function IdolProfilePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  // Find idol
  const idolData = idolsDB.find(i => parseIdolName(i.name).slug === slug);
  
  if (!idolData) {
    notFound();
  }

  const { member, group } = parseIdolName(idolData.name);
  const saju = getSajuFromDate(idolData.dob);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
        {/* Simple Global Nav */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center max-w-3xl mx-auto right-0 z-50">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:text-yellow-500 transition-colors">
            K-<span className="text-yellow-500">Oracle</span>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Home</Link>
            <Link href="/blog" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Blog</Link>
          </div>
        </div>

      <main className="max-w-3xl mx-auto px-6 relative z-10 pt-8">
        
        {/* Breadcrumb */}
        <div className="mb-10 text-zinc-500 text-sm font-bold uppercase tracking-wider">
          <Link href="/idols" className="hover:text-yellow-500 transition-colors">Idol Pokedex</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-zinc-300">{group}</span>
          <span className="mx-2">&gt;</span>
          <span className="text-white">{member}</span>
        </div>

        {/* Hero ID Card */}
        <div className="bg-gradient-to-b from-zinc-900 to-black p-8 rounded-3xl border border-zinc-800 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.83L19.17 20H4.83L12 5.83z"/></svg>
          </div>
          
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-500 font-bold text-xs rounded-full mb-4 border border-yellow-500/20">
              K-Pop Cosmic Profile
            </span>
            <h1 className="text-5xl font-black mb-2 tracking-tighter">{member}</h1>
            <h2 className="text-2xl text-zinc-400 font-bold mb-8">{group}</h2>
            
            <div className="grid grid-cols-2 gap-6 p-4 bg-black/50 rounded-2xl border border-zinc-800/50">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Date of Birth</p>
                <p className="font-mono text-lg">{idolData.dob}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Status</p>
                <p className="text-green-400 font-bold text-lg">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Saju / Cosmic Blueprint Section */}
        {saju && (
          <div className="mb-16">
            <h3 className="text-3xl font-black mb-6">Cosmic Blueprint</h3>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Based on the Eastern astrological system of Saju (Four Pillars of Destiny), here is the base energetic chart for {member}. These pillars govern their innate talents, visual aura, and destiny.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Year Pillar */}
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center flex flex-col justify-between">
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-4">Year Pillar</span>
                <div className="text-4xl font-black text-white mb-2">{saju.year.hanja}</div>
                <div className="text-sm text-zinc-400 font-mono space-y-1">
                  <p>{saju.year.stem}</p>
                  <p>{saju.year.branch}</p>
                </div>
              </div>

              {/* Month Pillar */}
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-center flex flex-col justify-between">
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-4">Month Pillar</span>
                <div className="text-4xl font-black text-white mb-2">{saju.month.hanja}</div>
                <div className="text-sm text-zinc-400 font-mono space-y-1">
                  <p>{saju.month.stem}</p>
                  <p>{saju.month.branch}</p>
                </div>
              </div>

              {/* Day Pillar */}
              <div className="bg-zinc-900 border border-yellow-500/50 p-6 rounded-2xl text-center relative flex flex-col justify-between shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Day Master</div>
                <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-4 mt-2">Day Pillar</span>
                <div className="text-4xl font-black text-yellow-500 mb-2">{saju.day.hanja}</div>
                <div className="text-sm text-yellow-500/80 font-mono space-y-1 font-bold">
                  <p>{saju.day.stem}</p>
                  <p>{saju.day.branch}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Engagement */}
        <BlogEngagement title={`${member}'s Saju`} slug={slug} />

        {/* Massive Funnel CTA */}
        <div className="mt-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black p-10 rounded-3xl border border-yellow-500/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-500/5 opacity-50 blur-3xl"></div>
          
          <div className="relative z-10">
            <span className="text-4xl mb-4 block">💖</span>
            <h3 className="text-3xl font-black mb-4 leading-tight">
              Are you and {member} cosmically compatible?
            </h3>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto leading-relaxed">
              Find out if your stars align. Our AI Saju Master analyzes your birth data against {member}'s exact cosmic blueprint to reveal your romantic potential.
            </p>
            <Link 
              href={`/?partnerName=${encodeURIComponent(member)}&partnerDob=${idolData.dob}`} 
              className="inline-block px-10 py-5 bg-yellow-500 text-black font-black text-lg rounded-2xl hover:bg-yellow-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.4)]"
            >
              Check Compatibility with {member}
            </Link>
          </div>
        </div>

      
        {/* Legal Disclaimer */}
        <div className="mt-12 mb-8 pt-8 border-t border-zinc-900 text-center">
          <p className="text-xs text-zinc-600 max-w-2xl mx-auto">
            Disclaimer: This analysis is based on publicly available birth data and is for entertainment purposes only. 
            K-Oracle is not affiliated with, sponsored, or endorsed by {member} or their agency.
          </p>
        </div>
      </main>

    </div>
  );
}
