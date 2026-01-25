import { blogPosts } from "../utils/blogData";
import ContentCard from "../components/ContentCard";

export default function BlogPage() {
  return (
    <ContentCard>
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Web Development Ideas and Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Exploring the latest trends, technologies, and creative solutions in
            web development, AI, and developer tools.
          </p>
        </header>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <header className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h2>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.category && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    </>
                  )}
                </div>
              </header>

              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {post.description}
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
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
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
              name: "Shiraj Ahmed's Web Development Ideas",
              description:
                "Web development insights, AI explorations, and developer tool showcases",
              url: "https://shirajahmed.com/blog",
              author: {
                "@type": "Person",
                name: "Shiraj Ahmed",
              },
              blogPost: blogPosts.map((post) => ({
                "@type": "BlogPosting",
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                author: {
                  "@type": "Person",
                  name: "Shiraj Ahmed",
                },
                url: `https://shirajahmed.com/blog/${post.slug}`,
              })),
            }),
          }}
        />
      </div>
    </ContentCard>
  );
}
