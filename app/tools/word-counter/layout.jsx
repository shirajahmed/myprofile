export const metadata = {
  title: "Word Counter - Online Character, Word, Sentence & Paragraph Counter",
  description:
    "Count words, characters, sentences, and paragraphs in your text instantly. Get a reading time estimate and analyze your writing with this free online word counter tool.",
  keywords:
    "word counter, character counter, sentence counter, paragraph counter, text analyzer, reading time, online tool, writing tool, utility",
  openGraph: {
    title: "Word Counter - Online Character, Word, Sentence & Paragraph Counter",
    description:
      "Instantly count words, characters, sentences, and paragraphs in your text. Analyze your writing with our free online tool.",
    url: "https://shirajahmed.com/tools/word-counter",
    images: [
      {
        url: "https://shirajahmed.com/tools/word-counter-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "Word Counter Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Word Counter - Online Character, Word, Sentence & Paragraph Counter",
    description:
      "Count words, characters, sentences, and paragraphs quickly with our free online word counter tool. Perfect for writers and content creators.",
    image: "https://shirajahmed.com/tools/word-counter-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/word-counter",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Counter",
  url: "https://shirajahmed.com/tools/word-counter",
  description:
    "Free online tool to count words, characters, sentences, and paragraphs, providing reading time estimates and text analysis.",
  applicationCategory: "TextContent",
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
    "Word Count",
    "Character Count",
    "Sentence Count",
    "Paragraph Count",
    "Reading Time Estimation",
    "Text Analysis",
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
