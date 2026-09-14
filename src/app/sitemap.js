import fs from 'fs';
import path from 'path';

export default function sitemap() {
  const baseUrl = 'https://k-oracle.com'; // Change to actual production URL later
  
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
    ...blogUrls,
  ];
}
