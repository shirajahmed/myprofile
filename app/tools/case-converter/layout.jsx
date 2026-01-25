export const metadata = {
  title: "Case Converter - Convert Text Cases Online",
  description:
    "Easily convert text to various cases like lowercase, uppercase, title case, camel case, snake case, and more. Free online case conversion tool.",
  keywords:
    "case converter, text converter, lowercase, uppercase, title case, camel case, snake case, kebab case, PascalCase, online tool, text utility",
  openGraph: {
    title: "Case Converter - Convert Text Cases Online",
    description:
      "Easily convert text to various cases like lowercase, uppercase, title case, camel case, snake case, and more. Free online case conversion tool.",
    url: "https://shirajahmed.com/tools/case-converter",
    images: [
      {
        url: "https://shirajahmed.com/tools/case-converter-preview.jpg", // Replace with your tool-specific OG image
        width: 1200,
        height: 630,
        alt: "Case Converter Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Case Converter - Convert Text Cases Online",
    description:
      "Convert text to lowercase, uppercase, title case, camel case, snake case, and more with our free online case converter tool.",
    image: "https://shirajahmed.com/tools/case-converter-preview.jpg", // Replace with your tool-specific OG image
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/case-converter",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Case Converter",
  url: "https://shirajahmed.com/tools/case-converter",
  description:
    "Free online tool to convert text to various cases including lowercase, uppercase, title case, camel case, snake case, kebab case, and PascalCase.",
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
    "Lowercase converter",
    "Uppercase converter",
    "Title case converter",
    "Camel case converter",
    "Snake case converter",
    "Kebab case converter",
    "PascalCase converter",
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

