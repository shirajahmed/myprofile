export const metadata = {
  title: "Username Availability Checker - See if your username is taken",
  description:
    "Check if your desired username is available across multiple social media platforms and online services. Fast and easy username verification tool.",
  keywords:
    "username checker, username availability, social media username, gamertag checker, online username, tools, utility",

  openGraph: {
    title: "Username Availability Checker - Check if your username is taken",
    description:
      "Quickly check the availability of your desired username across various social media platforms and online services.",
    url: "https://shirajahmed.com/tools/can-i-use-this-username",
    images: [
      {
        url: "https://shirajahmed.com/tools/username-checker-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "Username Availability Checker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Username Availability Checker - Is Your Username Available?",
    description:
      "Use our free tool to instantly check if your chosen username is available on social media and other online platforms.",
    image: "https://shirajahmed.com/tools/username-checker-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/can-i-use-this-username",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Username Availability Checker",
  url: "https://shirajahmed.com/tools/can-i-use-this-username",
  description:
    "Tool to check the availability of desired usernames across multiple social media platforms and online services.",
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
    "Check username availability",
    "Social media platforms",
    "Online services",
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
