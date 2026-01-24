const blogPosts = [
  {
    id: 1,
    title: "Building Modern Web Applications with Next.js 14",
    excerpt: "Explore the latest features in Next.js 14 and how to build performant, SEO-friendly web applications with the App Router.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Web Development"],
    slug: "nextjs-14-modern-web-apps"
  },
  {
    id: 2,
    title: "React Performance Optimization Techniques",
    excerpt: "Learn advanced techniques to optimize React applications including memoization, code splitting, and bundle optimization.",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["React", "Performance", "Optimization"],
    slug: "react-performance-optimization"
  },
  {
    id: 3,
    title: "Essential Developer Tools for Frontend Development",
    excerpt: "A comprehensive guide to the must-have tools and utilities that every frontend developer should know about.",
    date: "2024-01-05",
    readTime: "6 min read",
    tags: ["Tools", "Productivity", "Frontend"],
    slug: "essential-frontend-developer-tools"
  },
  {
    id: 4,
    title: "JavaScript ES2024 Features You Should Know",
    excerpt: "Discover the latest JavaScript features and how they can improve your code quality and developer experience.",
    date: "2024-01-01",
    readTime: "10 min read",
    tags: ["JavaScript", "ES2024", "Modern JS"],
    slug: "javascript-es2024-features"
  }
];
import ContentCard from "../components/ContentCard"; // New import

export default function BlogPage() {
  return (
    <ContentCard> {/* Wrap content in ContentCard */}
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Web Development Blog
          </h1>
          <p className="text-xl text-gray-600">
            Insights, tutorials, and best practices in modern web development
          </p>
        </header>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <header className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h2>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
              </header>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              
              <footer className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Read more →
                </a>
              </footer>
            </article>
          ))}
        </div>

        {/* SEO-friendly structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Shiraj Ahmed's Web Development Blog",
              "description": "Web development insights, tutorials, and best practices",
              "url": "https://shirajahmed.com/blog",
              "author": {
                "@type": "Person",
                "name": "Shiraj Ahmed"
              },
              "blogPost": blogPosts.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "datePublished": post.date,
                "author": {
                  "@type": "Person",
                  "name": "Shiraj Ahmed"
                },
                "url": `https://shirajahmed.com/blog/${post.slug}`
              }))
            })
          }}
        />
      </div>
    </ContentCard>
  );
}
