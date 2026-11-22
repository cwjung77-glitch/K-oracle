import Link from 'next/link';
import { idolsDB } from '@/data/idols';
import { parseIdolName } from '@/utils/slugify';
import IdolDirectoryClient from '@/components/features/IdolDirectoryClient';

export const metadata = {
  title: 'K-Pop Idol Saju & Astrology Directory - K-Oracle',
  description: 'Explore the cosmic destiny and Saju (Four Pillars) of over 500 K-Pop idols. Check your compatibility with BTS, BLACKPINK, SEVENTEEN, NewJeans, and more.',
  alternates: {
    canonical: '/idols',
  },
};

export default function IdolsDirectory() {
  const groupedIdols = {};

  idolsDB.forEach((idol) => {
    const { member, group, slug } = parseIdolName(idol.name);
    if (!groupedIdols[group]) {
      groupedIdols[group] = [];
    }
    groupedIdols[group].push({ ...idol, member, slug });
  });

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
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            Idol <span className="text-yellow-500">Pokedex</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Explore the Saju (Four Pillars of Destiny) of over {idolsDB.length} K-Pop stars. Search any group or idol below to view their cosmic blueprint.
          </p>
        </header>

        <IdolDirectoryClient
          groupedIdols={groupedIdols}
          sortedGroups={sortedGroups}
          totalCount={idolsDB.length}
        />
      </main>
    </div>
  );
}
