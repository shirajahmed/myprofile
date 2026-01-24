import { Inter } from "next/font/google";
import "./globals.css";

import { GoogleTagManager } from "@next/third-parties/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default:
      "Shiraj Ahmed - Frontend Developer & Full Stack Engineer Portfolio",
    template: "%s | Shiraj Ahmed - Frontend Developer",
  },
  description:
    "Shiraj Ahmed is a skilled Frontend Developer and Full Stack Engineer specializing in React, Next.js, JavaScript, and modern web technologies. Explore his portfolio, projects, and free online developer tools including calculators, generators, and utilities.",
  keywords: [
    "Shiraj Ahmed",
    "Frontend Developer",
    "Full Stack Engineer",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer",
    "Web Developer",
    "Portfolio",
    "Online Tools",
    "Calculator",
    "Password Generator",
    "QR Generator",
    "Color Generator",
    "Developer Tools",
    "Web Development",
    "UI/UX Design",
    "Responsive Design",
    "Modern Web Technologies",
  ].join(", "),
  authors: [{ name: "Shiraj Ahmed", url: "https://shirajahmed.com" }],
  creator: "Shiraj Ahmed",
  publisher: "Shiraj Ahmed",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://shirajahmed.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shirajahmed.com",
    title: "Shiraj Ahmed - Frontend Developer & Full Stack Engineer Portfolio",
    description:
      "Explore Shiraj Ahmed's portfolio featuring modern web applications, developer tools, and innovative projects built with React, Next.js, and cutting-edge technologies.",
    siteName: "Shiraj Ahmed Portfolio",
    images: [
      {
        url: "/shirajahmed.png",
        width: 1200,
        height: 630,
        alt: "Shiraj Ahmed - Frontend Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiraj Ahmed - Frontend Developer & Full Stack Engineer",
    description:
      "Frontend Developer specializing in React, Next.js & modern web technologies. Check out my portfolio and free developer tools.",
    images: ["/shirajahmed.png"],
    creator: "@shirajahmed",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
  classification: "Portfolio Website",
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <GoogleTagManager gtmId="GTM-5PGCR2LN" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/globe.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />

        {/* Additional SEO meta tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shiraj Ahmed",
              jobTitle: "Frontend Developer",
              description:
                "Frontend Developer and Full Stack Engineer specializing in React, Next.js, and modern web technologies",
              url: "https://shirajahmed.com",
              image: "https://shirajahmed.com/shirajahmed.png",
              sameAs: [
                "https://github.com/shirajahmed",
                "https://linkedin.com/in/shirajahmed",
                "https://twitter.com/shirajahmed",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "JavaScript",
                "TypeScript",
                "Node.js",
                "Web Development",
                "Frontend Development",
                "Full Stack Development",
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Frontend Developer",
                occupationLocation: {
                  "@type": "Country",
                  name: "Global",
                },
              },
            }),
          }}
        />

        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Shiraj Ahmed Portfolio",
              url: "https://shirajahmed.com",
              description:
                "Portfolio website of Shiraj Ahmed featuring web development projects and online tools",
              author: {
                "@type": "Person",
                name: "Shiraj Ahmed",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://shirajahmed.com/tools?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
