export default function sitemap() {
  const baseUrl = 'https://shirajahmed.com';
  const currentDate = new Date();
  
  return [
    // Main pages
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    
    // Blog posts for content SEO
    {
      url: `${baseUrl}/blog/nextjs-14-modern-web-apps`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/react-performance-optimization`,
      lastModified: new Date('2024-01-10'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/essential-frontend-developer-tools`,
      lastModified: new Date('2024-01-05'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/javascript-es2024-features`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    
    // Individual Tools - High Priority
    {
      url: `${baseUrl}/tools/calculator`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/password-generator`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/qr-generator`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/color-generator`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/download-tools`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    
    // Code Tools Category
    {
      url: `${baseUrl}/tools/code-tools`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/code-tools/css-minifier`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/code-tools/html-formatter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/code-tools/js-formatter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/code-tools/syntax-highlighter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    
    // Text & Content Tools
    {
      url: `${baseUrl}/tools/text-diff`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/word-counter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/lorem-generator`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/markdown-converter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/case-converter`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    
    // Utility Tools
    {
      url: `${baseUrl}/tools/can-i-use-this-username`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/get-your-info`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
