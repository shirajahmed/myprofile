import Head from "next/head";

export const metadata = {
  title: "Color Generator & Palette - Create & Explore Colors Online",
  description:
    "Generate random colors, explore color palettes, and convert between HEX, RGB, RGBA, HSL, and HSLA formats. Discover perfect colors for your designs with this free online tool.",
  keywords:
    "color generator, color palette, HEX to RGB, RGB to HEX, HSL color, online color tool, design tools, web design, front-end development",

  openGraph: {
    title: "Free Color Picker – Find Your Perfect Color",
    description:
      "Discover the perfect color palette for your project using our free interactive color picker.",
    url: "https://shirajahmed.com/tools/color-generator",
    images: [
      {
        url: "/tools/colorgenerator.jpg", // Replace with your tool-specific OG image
        width: 1200,
        height: 630,
        alt: "Free Color Picker Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Free Color Picker – Find Your Perfect Color",
    description:
      "Select and explore colors effortlessly with our free interactive color picker tool.",
    image: "/tools/colorgenerator.jpg",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/color-generator",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Color Generator",
  url: "https://shirajahmed.com/tools/color-generator",
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
