export const metadata = {
  title: "QR Code Generator - Create QR Codes Online",
  description:
    "Generate QR codes for URLs, text, Wi-Fi, emails, and more. Customize colors, size, and error correction level. Download or copy your QR code instantly with this free online tool.",
  keywords:
    "QR code generator, create QR code, QR code maker, online QR tool, QR code for URL, QR code for text, QR code for Wi-Fi, free QR code, utility",

  openGraph: {
    title: "Free QR Code Generator – Create Custom QR Codes",
    description:
      "Quickly create free custom QR codes with our free online tool.",
    url: "https://shirajahmed.com/tools/qr-generator",
    images: [
      {
        url: "/tools/qrgenerator.png",
        width: 1200,
        height: 630,
        alt: "Free QR Code Generator Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Free QR Code Generator – Create Custom QR Codes",
    description:
      "Easily generate free custom QR codes with our free tool, ideal for websites and digital content.",
    image: "/tools/qrgenerator.png",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/qr-generator",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "QR Code Generator",
  url: "https://shirajahmed.com/tools/qr-generator",
  description:
    "Free online tool to generate QR codes for various data types including URLs, text, Wi-Fi, and emails.",
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
    "QR Code Generation for URL",
    "QR Code Generation for Text",
    "QR Code Generation for Wi-Fi",
    "QR Code Generation for Email",
    "Customizable QR Code Colors and Size",
  ],
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div>{children}</div>
    </>
  );
}
