export const metadata = {
  title: "Free Online Developer Tools - Calculators, Generators & Utilities",
  description: "Access 15+ free online developer tools including password generator, QR code generator, color picker, calculators, text utilities, and code formatters. No registration required.",
  keywords: "free online tools, developer tools, password generator, QR generator, calculator, color picker, text utilities, code formatter, web tools, productivity tools",
  openGraph: {
    title: "Free Online Developer Tools by Shiraj Ahmed",
    description: "15+ free tools for developers including generators, calculators, and utilities",
    images: ["/tools-preview.png"],
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
            "name": "Developer Tools Suite",
            "description": "Free online tools for developers and designers",
            "url": "https://shirajahmed.com/tools",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Person",
              "name": "Shiraj Ahmed"
            },
            "featureList": [
              "Password Generator",
              "QR Code Generator", 
              "Color Generator",
              "Calculator Suite",
              "Text Utilities",
              "Code Formatters",
              "Social Media Downloader"
            ]
          })
        }}
      />
    </>
  );
}
