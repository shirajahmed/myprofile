import MainPageLayout from "../components/MainPageLayout";

export const metadata = {
  title: "Ideas - Web Development Insights by Shiraj Ahmed",
  description: "Explore the latest ideas and articles on React, Next.js, JavaScript, web development best practices, AI, and frontend engineering insights by Shiraj Ahmed.",
  keywords: "web development ideas, React insights, Next.js concepts, JavaScript tips, frontend development, AI in web, programming articles",
  openGraph: {
    title: "Ideas - Web Development Insights by Shiraj Ahmed",
    description:
      "Dive into articles and insights on React, Next.js, JavaScript, web development best practices, and frontend engineering from Shiraj Ahmed.",
    url: "https://shirajahmed.com/blog",
    images: [
      {
        url: "https://shirajahmed.com/og-image-blog.jpg", // Create a specific OG image for blog
        width: 1200,
        height: 630,
        alt: "Shiraj Ahmed's Blog",
      },
    ],
    locale: "en_US",
    type: "blog", // or "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Ideas - Web Development Insights by Shiraj Ahmed",
    description:
      "Latest articles and insights on React, Next.js, JavaScript, and web development. Stay updated with Shiraj Ahmed's blog.",
    image: "https://shirajahmed.com/og-image-blog.jpg", // Create a specific OG image for blog
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/blog",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Blog", // Or WebPage if less emphasis on blog structure
  name: "Ideas - Web Development Insights by Shiraj Ahmed",
  description: "A collection of articles and insights on React, Next.js, JavaScript, web development best practices, and frontend engineering.",
  url: "https://shirajahmed.com/blog",
  author: {
    "@type": "Person",
    name: "Shiraj Ahmed",
  },
  image: "https://shirajahmed.com/og-image-blog.jpg",
  // If blog posts are listed on this page, you might add an itemListElement
  // "blogPosts": [
  //   {
  //     "@type": "BlogPosting",
  //     "url": "https://shirajahmed.com/blog/nextjs-14-modern-web-apps",
  //     "name": "Next.js 14 Modern Web Apps"
  //   }
  // ]
};

export default function BlogLayout({ children }) {
  return (
    <MainPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      {children}
    </MainPageLayout>
  );
}
