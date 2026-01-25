import { blogPosts } from "./utils/blogData";

export default function sitemap() {
  const baseUrl = "https://shirajahmed.com";
  const currentDate = new Date();

  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const blogPostEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const toolPages = [
    `${baseUrl}/tools/calculator`,
    `${baseUrl}/tools/password-generator`,
    `${baseUrl}/tools/qr-generator`,
    `${baseUrl}/tools/color-generator`,
    `${baseUrl}/tools/download-tools`,
    `${baseUrl}/tools/code-tools`,
    `${baseUrl}/tools/code-tools/css-minifier`,
    `${baseUrl}/tools/code-tools/html-formatter`,
    `${baseUrl}/tools/code-tools/js-formatter`,
    `${baseUrl}/tools/code-tools/syntax-highlighter`,
    `${baseUrl}/tools/text-diff`,
    `${baseUrl}/tools/word-counter`,
    `${baseUrl}/tools/lorem-generator`,
    `${baseUrl}/tools/markdown-converter`,
    `${baseUrl}/tools/case-converter`,
    `${baseUrl}/tools/can-i-use-this-username`,
    `${baseUrl}/tools/get-your-info`,
  ].map((url) => ({
    url,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...mainPages, ...blogPostEntries, ...toolPages];
}
