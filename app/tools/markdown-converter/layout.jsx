export const metadata = {
  title: "Markdown to HTML Converter - Online Markdown Tool",
  description:
    "Convert Markdown text to HTML instantly. Preview your Markdown in real-time and get clean HTML output for blogs, documentation, or websites. Free online Markdown converter.",
  keywords:
    "Markdown to HTML, Markdown converter, online Markdown tool, Markdown editor, HTML converter, web development tools, documentation tools",
  openGraph: {
    title: "Markdown to HTML Converter - Online Markdown Tool",
    description:
      "Convert Markdown to HTML instantly with real-time preview. Get clean HTML output for your website or documentation.",
    url: "https://shirajahmed.com/tools/markdown-converter",
    images: [
      {
        url: "https://shirajahmed.com/tools/markdown-converter-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "Markdown to HTML Converter Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Markdown to HTML Converter - Online Markdown Tool",
    description:
      "Easily convert Markdown to HTML with real-time preview. Free online tool for web developers and content creators.",
    image: "https://shirajahmed.com/tools/markdown-converter-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/markdown-converter",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Markdown to HTML Converter",
  url: "https://shirajahmed.com/tools/markdown-converter",
  description:
    "Free online tool to convert Markdown text to HTML with real-time preview, generating clean and usable HTML code.",
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
    "Markdown to HTML Conversion",
    "Real-time Markdown Preview",
    "Clean HTML Output",
    "Supports common Markdown syntax",
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
