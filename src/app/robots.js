export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://k-oracle.vercel.app/sitemap.xml', // Change to actual production URL later
  };
}
