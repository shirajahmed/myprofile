import Head from "next/head";

export const metadata = {
  title: "Utility Tools | Free tools",
  description:
    "Discover a suite of utility tools by Shiraj Ahmed. Explore free tools like a password generator, color picker, QR code generator, and more to enhance your workflow.",
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
    url: "https://shirajahmed.com/tools",
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
    canonical: "https://shirajahmed.com/tools",
  },
};

export default function Layout({ children }) {
  // <Head>
  //   <script
  //     async
  //     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  //   ></script>
  // </Head>;
  return <div>{children}</div>;
}
