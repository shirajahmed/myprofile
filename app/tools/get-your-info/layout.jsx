export const metadata = {
  title: "Get Your Info - Browser & System Information Tool",
  description:
    "Quickly find out your device, screen, browser, network, and location information. This tool collects local system data to provide you with detailed insights about your setup.",
  keywords:
    "system info, browser info, device info, IP address, geolocation, user agent, screen resolution, online tools, utility",

  openGraph: {
    title: "Utility Tools by Shiraj Ahmed",
    description:
      "Explore free, easy-to-use utility tools including a password generator, color picker, and QR code generator.",
    url: "https://shirajahmed.com/tools/get-your-info",
    images: [
      {
        url: "https://shirajahmed.com/og-image-tools.jpg",
        width: 1200,
        height: 630,
        alt: "Utility Tools by Shiraj Ahmed",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Utility Tools by Shiraj Ahmed",
    description:
      "Explore free and interactive utility tools, including a password generator, color picker, and QR code generator.",
    image: "https://shirajahmed.com/og-image-tools.jpg",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/get-your-info",
  },
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}
