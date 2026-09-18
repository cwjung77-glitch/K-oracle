import Link from 'next/link';
import { idolsDB } from '@/data/idols';
import { parseIdolName } from '@/utils/slugify';

export const metadata = {
  title: 'K-Pop Idol Saju & Astrology Directory - K-Oracle',
  description: 'Explore the cosmic destiny and Saju (Four Pillars) of over 500 K-Pop idols. Check your compatibility with BTS, BLACKPINK, SEVENTEEN, NewJeans, and more.',
};

export default function IdolsDirectory() {
  // Group idols by their group name
  const groupedIdols = {};
  
  idolsDB.forEach(idol => {
    const { member, group, slug } = parseIdolName(idol.name);
    if (!groupedIdols[group]) {
      groupedIdols[group] = [];
    }
    groupedIdols[group].push({ ...idol, member, slug });
  });

  // Sort groups alphabetically
  const sortedGroups = Object.keys(groupedIdols).sort();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
        {/* Simple Global Nav */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center max-w-5xl mx-auto right-0 z-50">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:text-yellow-500 transition-colors">
            K-<span className="text-yellow-500">Oracle</span>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Home</Link>
            <Link href="/blog" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Blog</Link>
          </div>
        </div>

      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-8">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            Idol <span className="text-yellow-500">Pokedex</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Explore the Saju (Four Pillars of Destiny) of over {idolsDB.length} K-Pop stars. Select an idol to view their cosmic blueprint.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedGroups.map(group => (
            <div key={group} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
              <h2 className="text-2xl font-black text-yellow-500 mb-4 pb-2 border-b border-zinc-800">
                {group}
              </h2>
              <ul className="space-y-2">
                {groupedIdols[group].map(idol => (
                  <li key={idol.slug}>
                    <Link 
                      href={`/idols/${idol.slug}`}
                      className="text-zinc-300 hover:text-white hover:underline decoration-yellow-500 underline-offset-4 transition-all"
                    >
                      {idol.member}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
