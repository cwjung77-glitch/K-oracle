export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://k-oracle.com/sitemap.xml', // Change to actual production URL later
  };
}
