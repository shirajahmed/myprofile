import { notFound } from "next/navigation";
import Image from "next/image";
import { blogPosts } from "../../utils/blogData";

// Function to generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Function to generate dynamic metadata for each blog post
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = blogPosts.find((p) => p?.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you are looking for does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags
      ? post.tags.join(", ")
      : "blog, web development, AI, tools",
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  console.log("slug:", slug);
  const post = blogPosts.find((p) => p?.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-none overflow-hidden">
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={900}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
        )}
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {post.title}
          </h1>
          <div className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex items-center space-x-4">
            <span>
              By <span className="font-semibold">{post.author}</span>
            </span>
            <span>|</span>
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {post.category && (
              <>
                <span>|</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
              </>
            )}
          </div>
          <div
            className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-4 border-t border-gray-200">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Tags: </span>
              {post.tags.map((tag, index) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mt-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
      <div className="mt-8 text-center">
        <a
          href="/blog"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          ← Back to all Ideas
        </a>
      </div>
    </div>
  );
}
