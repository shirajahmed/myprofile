export const metadata = {
  title: "Lorem Ipsum Generator - Generate Placeholder Text",
  description:
    "Generate Lorem Ipsum placeholder text in paragraphs, sentences, or words. Customize the amount of text needed for your designs and mockups. Free online dummy text generator.",
  keywords:
    "Lorem Ipsum, dummy text, placeholder text, text generator, design tools, web design, content generator, online tools",
  openGraph: {
    title: "Lorem Ipsum Generator - Generate Placeholder Text",
    description:
      "Generate customizable Lorem Ipsum placeholder text for your designs and mockups. Fast, free, and easy to use.",
    url: "https://shirajahmed.com/tools/lorem-generator",
    images: [
      {
        url: "https://shirajahmed.com/tools/lorem-generator-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "Lorem Ipsum Generator Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Lorem Ipsum Generator - Generate Placeholder Text",
    description:
      "Get customizable Lorem Ipsum dummy text for your projects. Generate paragraphs, sentences, or words instantly with our free tool.",
    image: "https://shirajahmed.com/tools/lorem-generator-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/lorem-generator",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lorem Ipsum Generator",
  url: "https://shirajahmed.com/tools/lorem-generator",
  description:
    "Free online tool to generate customizable Lorem Ipsum placeholder text for design, development, and content needs.",
  applicationCategory: "DesignApplication",
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
    "Generate Lorem Ipsum Paragraphs",
    "Generate Lorem Ipsum Sentences",
    "Generate Lorem Ipsum Words",
    "Customizable Text Length",
    "Dummy Text for Design",
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
