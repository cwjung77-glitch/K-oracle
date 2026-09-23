import fs from 'fs';
let content = fs.readFileSync('src/app/blog/[slug]/page.js', 'utf8');

// Insert import if not exists
if (!content.includes('BlogEngagement')) {
  content = content.replace("import Link from 'next/link';", "import Link from 'next/link';\nimport BlogEngagement from '@/components/features/BlogEngagement';");
}

// Insert component after article
if (!content.includes('<BlogEngagement')) {
  content = content.replace("</article>", "</article>\n\n        <BlogEngagement title={data.title} slug={params.slug} />");
}

fs.writeFileSync('src/app/blog/[slug]/page.js', content);
