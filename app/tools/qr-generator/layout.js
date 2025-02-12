import Head from "next/head";

export const metadata = {
  title: "Free QR Code Generator – Create Custom QR Codes | Shiraj Ahmed Tools",
  description:
    "Generate free custom QR codes instantly with our free QR code generator tool—perfect for websites, contact info, and more.",
  keywords: [
    "Free tools",
    "QR code",
    "Qr code generator",
    "Free qr code",
    "Custom qr code",
  ],
  openGraph: {
    title: "Free QR Code Generator – Create Custom QR Codes",
    description:
      "Quickly create free custom QR codes with our free online tool.",
    url: "https://shirajahmed.com/tools/qr-code-generator",
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
    canonical: "https://shirajahmed.com/tools/qr-code-generator",
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
