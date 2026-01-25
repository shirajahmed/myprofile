import MainPageLayout from "../components/MainPageLayout";

export const metadata = {
  title: "Shiraj Ahmed's Projects - Web Development Portfolio",
  description:
    "Explore a collection of web development projects by Shiraj Ahmed. Featuring modern web applications built with React, Next.js, and other cutting-edge technologies.",
  keywords: "Shiraj Ahmed, Projects, Portfolio, Web Development, React Projects, Next.js Projects, JavaScript Projects, Frontend Projects, Full Stack Projects",
  openGraph: {
    title: "Shiraj Ahmed's Projects - Web Development Portfolio",
    description:
      "Showcasing a diverse portfolio of web development projects built with React, Next.js, and modern web technologies.",
    url: "https://shirajahmed.com/projects",
    images: [
      {
        url: "https://shirajahmed.com/og-image-projects.jpg", // Create a specific OG image for projects
        width: 1200,
        height: 630,
        alt: "Shiraj Ahmed's Projects Portfolio",
      },
    ],
    locale: "en_US",
    type: "collection", // or "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Shiraj Ahmed's Projects - Web Development Portfolio",
    description:
      "Explore innovative web development projects by Shiraj Ahmed. View my work in React, Next.js, and other cutting-edge tech.",
    image: "https://shirajahmed.com/og-image-projects.jpg", // Create a specific OG image for projects
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/projects",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage", // Or WebPage if less emphasis on collection
  name: "Shiraj Ahmed's Projects",
  description: "A portfolio showcasing web development projects built by Shiraj Ahmed using modern technologies like React and Next.js.",
  url: "https://shirajahmed.com/projects",
  author: {
    "@type": "Person",
    name: "Shiraj Ahmed",
  },
  image: "https://shirajahmed.com/og-image-projects.jpg",
  // If individual projects are listed on this page, you might add an itemListElement
  // "mainEntity": {
  //   "@type": "ItemList",
  //   "itemListElement": [
  //     {
  //       "@type": "ListItem",
  //       "position": 1,
  //       "item": {
  //         "@type": "CreativeWork",
  //         "url": "https://shirajahmed.com/projects/project-slug-1",
  //         "name": "Project Name 1"
  //       }
  //     }
  //   ]
  // }
};

export default function ProjectsLayout({ children }) {
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
