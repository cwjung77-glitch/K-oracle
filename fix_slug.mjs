import fs from 'fs';
let content = fs.readFileSync('src/app/blog/[slug]/page.js', 'utf8');

// Replace slug={params.slug} with slug={slug}
content = content.replace("slug={params.slug}", "slug={slug}");

fs.writeFileSync('src/app/blog/[slug]/page.js', content);
