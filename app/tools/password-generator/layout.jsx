export const metadata = {
  title: "Password Generator - Create Strong, Secure Passwords Online",
  description:
    "Generate strong, random, and secure passwords with customizable length and character options (uppercase, lowercase, numbers, symbols). Protect your accounts with unique passwords.",
  keywords:
    "password generator, secure password, random password, strong password, password tool, online security, utility, free tool",

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
    site: "@shirajahmed",
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
    "Strong Password Generation",
    "Random Password Generation",
    "Customizable Password Length",
    "Include/Exclude Uppercase, Lowercase, Numbers, Symbols",
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
