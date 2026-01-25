export const metadata = {
  title: "Text Diff Checker - Compare Two Texts Online",
  description:
    "Compare two blocks of text to find differences and similarities quickly. Highlight changes between documents, code, or any text content. Free online text comparison tool.",
  keywords:
    "text diff, text comparison, compare text, diff checker, online text tool, document comparison, code comparison, utility",
  openGraph: {
    title: "Text Diff Checker - Compare Two Texts Online",
    description:
      "Quickly compare two texts to highlight differences and similarities. Ideal for documents, code, and content reviews.",
    url: "https://shirajahmed.com/tools/text-diff",
    images: [
      {
        url: "https://shirajahmed.com/tools/text-diff-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "Text Diff Checker Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Text Diff Checker - Compare Two Texts Online",
    description:
      "Find differences between two texts instantly with our free online text comparison tool. Perfect for code, documents, and content.",
    image: "https://shirajahmed.com/tools/text-diff-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/text-diff",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Text Diff Checker",
  url: "https://shirajahmed.com/tools/text-diff",
  description:
    "Free online tool to compare two text blocks and find differences, useful for code, documents, and content changes.",
  applicationCategory: "Utility",
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
    "Text Comparison",
    "Find Differences in Text",
    "Document Comparison",
    "Code Comparison",
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
