export const metadata = {
  title: "Online Syntax Highlighter - Code Formatter",
  description: "Highlight syntax for JavaScript, HTML, CSS code online. Generate styled HTML output for your code snippets. Perfect for blogs, documentation, and presentations.",
  keywords: "syntax highlighter, code formatter, JavaScript highlighter, HTML highlighter, CSS highlighter, online code tool, web development tools",
  openGraph: {
    title: "Online Syntax Highlighter - Code Formatter",
    description:
      "Highlight code syntax for various languages (JavaScript, HTML, CSS) online. Perfect for blogs, documentation, and presentations.",
    url: "https://shirajahmed.com/tools/code-tools/syntax-highlighter",
    images: [
      {
        url: "https://shirajahmed.com/tools/syntax-highlighter-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "Syntax Highlighter Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Online Syntax Highlighter - Code Formatter",
    description:
      "Generate beautifully styled code snippets for your blog or documentation with our free online syntax highlighter.",
    image: "https://shirajahmed.com/tools/syntax-highlighter-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/code-tools/syntax-highlighter",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Online Syntax Highlighter",
  url: "https://shirajahmed.com/tools/code-tools/syntax-highlighter",
  description:
    "Free online tool to highlight and format code syntax for JavaScript, HTML, and CSS, generating styled output for easy sharing and presentation.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Shiraj Ahmed",
  },
  featureList: [
    "JavaScript Syntax Highlighting",
    "HTML Syntax Highlighting",
    "CSS Syntax Highlighting",
    "Code Formatting",
    "Styled Code Snippets",
  ],
};

export default function SyntaxHighlighterLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      {children}
    </>
  );
}
