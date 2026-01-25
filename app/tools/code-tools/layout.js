export const metadata = {
  title: 'Code Tools - Free Online Developer Tools',
  description: 'Collection of free online code tools including CSS minifier, HTML formatter, JavaScript formatter, and syntax highlighter.',
  keywords: 'code tools, developer tools, CSS minifier, HTML formatter, JavaScript formatter, syntax highlighter',
  openGraph: {
    title: "Code Tools - Free Online Developer Tools",
    description:
      "A collection of free online code tools including CSS minifier, HTML formatter, JavaScript formatter, and syntax highlighter.",
    url: "https://shirajahmed.com/tools/code-tools",
    images: [
      {
        url: "https://shirajahmed.com/tools/code-tools-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "Code Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Code Tools - Free Online Developer Tools",
    description:
      "Boost your coding efficiency with our free online code tools: CSS minifier, HTML formatter, JavaScript formatter, and syntax highlighter.",
    image: "https://shirajahmed.com/tools/code-tools-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/code-tools",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Code Tools Suite",
  url: "https://shirajahmed.com/tools/code-tools",
  description:
    "A suite of free online tools for developers, including code formatters, minifiers, and syntax highlighting utilities.",
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
    "CSS Minifier",
    "HTML Formatter",
    "JavaScript Formatter",
    "Syntax Highlighter",
  ],
};

export default function Layout({ children }) {
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
