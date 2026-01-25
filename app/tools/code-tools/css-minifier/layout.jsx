export const metadata = {
  title: "CSS Minifier & Beautifier - Online CSS Tool",
  description:
    "Minify or beautify your CSS code online instantly. Optimize CSS files for faster loading or format them for better readability. Free CSS compressor and formatter.",
  keywords:
    "CSS minifier, CSS beautifier, CSS formatter, optimize CSS, compress CSS, clean CSS, online CSS tool, web development tools",
  openGraph: {
    title: "CSS Minifier & Beautifier - Online CSS Tool",
    description:
      "Instantly minify or beautify your CSS code online. Optimize for performance or format for readability with our free CSS tool.",
    url: "https://shirajahmed.com/tools/code-tools/css-minifier",
    images: [
      {
        url: "https://shirajahmed.com/tools/css-minifier-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "CSS Minifier and Beautifier Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "CSS Minifier & Beautifier - Online CSS Tool",
    description:
      "Optimize your CSS with our free online minifier and beautifier. Improve page load times or enhance code readability.",
    image: "https://shirajahmed.com/tools/css-minifier-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/code-tools/css-minifier",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CSS Minifier and Beautifier",
  url: "https://shirajahmed.com/tools/code-tools/css-minifier",
  description:
    "Free online tool to minify, beautify, and format CSS code for optimization and readability.",
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
    "CSS Minification",
    "CSS Beautification",
    "CSS Formatting",
    "CSS Compressor",
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

