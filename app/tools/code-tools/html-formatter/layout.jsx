export const metadata = {
  title: "HTML Formatter & Minifier - Online HTML Tool",
  description:
    "Format or minify your HTML code online instantly. Beautify messy HTML for readability or compress it for faster loading times. Free HTML formatter and minifier.",
  keywords:
    "HTML formatter, HTML minifier, HTML beautifier, optimize HTML, compress HTML, clean HTML, online HTML tool, web development tools",
  openGraph: {
    title: "HTML Formatter & Minifier - Online HTML Tool",
    description:
      "Instantly format or minify your HTML code online. Beautify for readability or compress for faster loading with our free HTML tool.",
    url: "https://shirajahmed.com/tools/code-tools/html-formatter",
    images: [
      {
        url: "https://shirajahmed.com/tools/html-formatter-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "HTML Formatter and Minifier Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "HTML Formatter & Minifier - Online HTML Tool",
    description:
      "Optimize your HTML with our free online formatter and minifier. Improve code readability or enhance page load times.",
    image: "https://shirajahmed.com/tools/html-formatter-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/code-tools/html-formatter",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HTML Formatter and Minifier",
  url: "https://shirajahmed.com/tools/code-tools/html-formatter",
  description:
    "Free online tool to format, beautify, and minify HTML code for better readability and faster web performance.",
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
    "HTML Formatting",
    "HTML Beautification",
    "HTML Minification",
    "HTML Compressor",
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

