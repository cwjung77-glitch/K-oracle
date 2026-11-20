export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/success'],
    },
    sitemap: 'https://www.thekoracle.com/sitemap.xml',
  };
}
