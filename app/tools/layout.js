export const metadata = {
  title: "Utility Tools | Shiraj Ahmed",
  description:
    "Discover a suite of utility tools by Shiraj Ahmed. Explore free tools like a password generator, color picker, QR code generator, and more to enhance your workflow.",
  openGraph: {
    title: "Utility Tools by Shiraj Ahmed",
    description:
      "Explore free, easy-to-use utility tools including a password generator, color picker, and QR code generator.",
    url: "https://shirajahmed.com/tools",
    images: [
      {
        url: "https://shirajahmed.com/og-image-tools.jpg", // Replace with your actual OG image URL for tools page
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
    canonical: "https://shirajahmed.com/tools",
  },
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}
