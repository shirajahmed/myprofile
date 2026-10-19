export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/', '/trest', '/test'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/trest', '/test'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/trest', '/test'],
      },
    ],
    sitemap: 'https://shirajahmed.com/sitemap.xml',
    host: 'https://shirajahmed.com',
  };
}
