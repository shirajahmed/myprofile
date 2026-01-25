import Head from "next/head";

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
    site: "@yourtwitterhandle",
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
  applicationCategory: "Utility",
  operatingSystem: "ALL",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </Head>
      <div>{children}</div>
    </>
  );
}
