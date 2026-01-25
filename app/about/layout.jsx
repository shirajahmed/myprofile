import MainPageLayout from "../components/MainPageLayout";

export const metadata = {
  title: "About Shiraj Ahmed - Frontend Developer & Full Stack Engineer",
  description:
    "Learn more about Shiraj Ahmed, a passionate Frontend Developer and Full Stack Engineer with expertise in React, Next.js, and modern web technologies. Explore his experience, skills, and professional journey.",
  keywords: "Shiraj Ahmed, About Me, Frontend Developer, Full Stack Engineer, React Developer, Next.js Developer, Web Developer, Experience, Skills, Resume",
  openGraph: {
    title: "About Shiraj Ahmed - Frontend Developer & Full Stack Engineer",
    description:
      "Discover the professional background, skills, and projects of Shiraj Ahmed, a dedicated Frontend and Full Stack Engineer.",
    url: "https://shirajahmed.com/about",
    images: [
      {
        url: "https://shirajahmed.com/shirajahmed.png", // Reusing the main OG image
        width: 1200,
        height: 630,
        alt: "Shiraj Ahmed - About Me",
      },
    ],
    locale: "en_US",
    type: "profile", // or "website" if preferred
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "About Shiraj Ahmed - Frontend Developer & Full Stack Engineer",
    description:
      "Frontend Developer specializing in React, Next.js & modern web technologies. Learn about my journey, skills, and projects.",
    image: "https://shirajahmed.com/shirajahmed.png", // Reusing the main OG image
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/about",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shiraj Ahmed",
  url: "https://shirajahmed.com/about",
  sameAs: [
    "https://github.com/shirajahmed",
    "https://linkedin.com/in/shirajahmed",
    "https://twitter.com/shirajahmed",
  ],
  jobTitle: "Frontend Developer",
  worksFor: {
    "@type": "Organization",
    name: "Self-Employed",
  },
  description: "Passionate Frontend Developer and Full Stack Engineer with expertise in React, Next.js, JavaScript, and modern web technologies.",
  image: "https://shirajahmed.com/shirajahmed.png",
  alumniOf: [
    // Add relevant educational institutions if desired
    // {
    //   "@type": "EducationalOrganization",
    //   "name": "Your University"
    // }
  ],
  // Add other relevant Person properties if available
};

export default function AboutLayout({ children }) {
  return (
    <MainPageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      {children}
    </MainPageLayout>
  );
}
