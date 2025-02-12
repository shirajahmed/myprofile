import Head from "next/head";

export const metadata = {
  title:
    "Free Password Generator – Secure & Random Passwords | Shiraj Ahmed Tools",
  description:
    "Generate free, secure, and random passwords instantly with our free password generator tool. Enhance your online security today.",
  keywords: [
    "Free tools",
    "Password",
    "Password Generator",
    "Free Password Maker",
    "Generate Password",
  ],
  openGraph: {
    title: "Free Password Generator – Secure & Random Passwords",
    description:
      "Create strong, free passwords quickly with our free online tool.",
    url: "https://shirajahmed.com/tools/password-generator",
    images: [
      {
        url: "/tools/passwordgenerator.jpg",
        width: 1200,
        height: 630,
        alt: "Free Password Generator Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Free Password Generator – Secure & Random Passwords",
    description:
      "Use our free password generator to create strong, random passwords for enhanced security.",
    image: "/tools/passwordgenerator.jpg",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/password-generator",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Password Generator",
  url: "https://shirajahmed.com/tools/password-generator",
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
