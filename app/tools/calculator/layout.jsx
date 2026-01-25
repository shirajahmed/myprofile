export const metadata = {
  title: 'Advanced Calculator Suite - Health, Finance, Math & Utility Calculators',
  description: 'Comprehensive collection of calculators including BMI, loan, tip, percentage, GPA, and productivity calculators. Free online tools for daily calculations.',
  keywords: 'calculator, BMI calculator, loan calculator, tip calculator, percentage calculator, GPA calculator, age calculator, compound interest, productivity tools',
  openGraph: {
    title: "Advanced Calculator Suite - Health, Finance, Math & Utility Calculators",
    description:
      "Access a comprehensive collection of free online calculators for health, finance, math, and daily utilities.",
    url: "https://shirajahmed.com/tools/calculator",
    images: [
      {
        url: "https://shirajahmed.com/tools/calculator-suite-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "Advanced Calculator Suite",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Advanced Calculator Suite - Health, Finance, Math & Utility Calculators",
    description:
      "Free online calculators: BMI, loan, tip, percentage, GPA, and more. Boost your productivity with our comprehensive suite of tools.",
    image: "https://shirajahmed.com/tools/calculator-suite-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/calculator",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Advanced Calculator Suite",
  url: "https://shirajahmed.com/tools/calculator",
  description:
    "A comprehensive collection of free online calculators for various purposes, including health, finance, mathematics, and general utilities.",
  applicationCategory: "Calculator",
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
    "BMI Calculator",
    "Loan Calculator",
    "Tip Calculator",
    "Percentage Calculator",
    "GPA Calculator",
    "Age Calculator",
    "Compound Interest Calculator",
  ],
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {children}
      </div>
    </>
  );
}
