export const metadata = {
  title: "JavaScript Formatter & Minifier - Online JS Tool",
  description:
    "Format or minify your JavaScript code online instantly. Beautify unreadable JS for better development or compress it for faster website performance. Free JS formatter and minifier.",
  keywords:
    "JavaScript formatter, JavaScript minifier, JavaScript beautifier, optimize JS, compress JS, clean JS, online JS tool, web development tools",
  openGraph: {
    title: "JavaScript Formatter & Minifier - Online JS Tool",
    description:
      "Instantly format or minify your JavaScript code online. Beautify for better development or compress for faster website performance with our free JS tool.",
    url: "https://shirajahmed.com/tools/code-tools/js-formatter",
    images: [
      {
        url: "https://shirajahmed.com/tools/js-formatter-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "JavaScript Formatter and Minifier Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "JavaScript Formatter & Minifier - Online JS Tool",
    description:
      "Optimize your JavaScript with our free online formatter and minifier. Improve code readability or enhance website performance.",
    image: "https://shirajahmed.com/tools/js-formatter-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/code-tools/js-formatter",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JavaScript Formatter and Minifier",
  url: "https://shirajahmed.com/tools/code-tools/js-formatter",
  description:
    "Free online tool to format, beautify, and minify JavaScript code for better readability and faster web performance.",
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
    "JavaScript Formatting",
    "JavaScript Beautification",
    "JavaScript Minification",
    "JavaScript Compressor",
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

