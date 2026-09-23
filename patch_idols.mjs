import fs from 'fs';
let content = fs.readFileSync('src/app/idols/[slug]/page.js', 'utf8');

content = content.replace("export async function generateMetadata({ params }) {", "export async function generateMetadata({ params }) {\n  const resolvedParams = await params;\n  const slug = resolvedParams.slug;");
content = content.replace("idolsDB.find(i => parseIdolName(i.name).slug === params.slug)", "idolsDB.find(i => parseIdolName(i.name).slug === slug)");

content = content.replace("export default function IdolProfilePage({ params }) {", "export default async function IdolProfilePage({ params }) {\n  const resolvedParams = await params;\n  const slug = resolvedParams.slug;");
content = content.replace("idolsDB.find(i => parseIdolName(i.name).slug === params.slug)", "idolsDB.find(i => parseIdolName(i.name).slug === slug)");

content = content.replace("slug={params.slug}", "slug={slug}");

fs.writeFileSync('src/app/idols/[slug]/page.js', content);
