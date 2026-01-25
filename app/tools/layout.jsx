export const metadata = {
  title: "Online Developer Tools - Free Web Utilities",
  description:
    "A comprehensive collection of free online developer tools and web utilities, including calculators, generators, formatters, and more. Enhance your productivity and streamline your workflow.",
  keywords:
    "online tools, developer tools, web utilities, free tools, calculators, generators, formatters, web development, programming tools",
  openGraph: {
    title: "Free Online Developer Tools by Shiraj Ahmed",
    description:
      "15+ free tools for developers including generators, calculators, and utilities",
    images: ["/tools-preview.png"],
  },
  alternates: {
    canonical: `https://shirajahmed.com/tools`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Developer Tools by Shiraj Ahmed",
    description:
      "Explore Shiraj Ahmed's collection of 15+ free developer tools: generators, calculators, formatters, and more to boost your productivity.",
    images: ["https://shirajahmed.com/tools-preview.png"],
    creator: "@shirajahmed",
  },
};

export default function ToolsLayout({ children }) {
  return (
    <>
      {children}

      {/* Structured Data for Tools */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Developer Tools Suite",
            description: "Free online tools for developers and designers",
            url: "https://shirajahmed.com/tools",
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
              "Password Generator",
              "QR Code Generator",
              "Color Generator",
              "Calculator Suite",
              "Text Utilities",
              "Code Formatters",
              "Social Media Downloader",
            ],
          }),
        }}
      />
    </>
  );
}
