export const metadata = {
  title: "Get Your Info - Browser & System Information Tool",
  description:
    "Quickly find out your device, screen, browser, network, and location information. This tool collects local system data to provide you with detailed insights about your setup.",
  keywords:
    "system info, browser info, device info, IP address, geolocation, user agent, screen resolution, online tools, utility",

  openGraph: {
    title: "Get Your Info - Browser & System Information Tool",
    description:
      "Instantly retrieve detailed information about your browser, device, screen, network, and location with our free online tool.",
    url: "https://shirajahmed.com/tools/get-your-info",
    images: [
      {
        url: "https://shirajahmed.com/tools/get-your-info-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "Get Your Info Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Get Your Info - Browser & System Information Tool",
    description:
      "Find out your device, browser, screen, network, and location info with our free online tool. Detailed system insights at your fingertips.",
    image: "https://shirajahmed.com/tools/get-your-info-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/get-your-info",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Get Your Info",
  url: "https://shirajahmed.com/tools/get-your-info",
  description:
    "Free online tool to quickly retrieve and display detailed browser, system, device, network, and location information.",
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
    "Browser Information",
    "Device Information",
    "Screen Resolution",
    "IP Address Lookup",
    "Geolocation Data",
    "User Agent String",
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
