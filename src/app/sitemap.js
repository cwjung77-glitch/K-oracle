import fs from 'fs';
import path from 'path';
import { idolsDB } from '@/data/idols';
import { parseIdolName } from '@/utils/slugify';

export default function sitemap() {
  const baseUrl = 'https://thekoracle.com';
  
  const contentDir = path.join(process.cwd(), 'src/content/blog');
  let blogUrls = [];
  
  try {
    const files = fs.readdirSync(contentDir);
    blogUrls = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => ({
        url: `${baseUrl}/blog/${file.replace('.md', '')}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
  } catch(e) {
    // ignore
  }

  const idolUrls = idolsDB.map((idol) => {
    const { slug } = parseIdolName(idol.name);
    return {
      url: `${baseUrl}/idols/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/idols`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...idolUrls,
    ...blogUrls,
  ];
}
