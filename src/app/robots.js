export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://thekoracle.com/sitemap.xml', // Change to actual production URL later
  };
}
