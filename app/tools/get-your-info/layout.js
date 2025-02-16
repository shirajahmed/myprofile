export const metadata = {
  title: "Get Your Info | Free tools",
  description: "Discover a suite of utility tools by Shiraj Ahmed. ",
  keywords: [
    "Free tools",
    "Utility tools",
    "Handy Tools",
    "Qr code",
    "color generator",
    "password generator",
  ],
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
