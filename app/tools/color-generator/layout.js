export const metadata = {
  title: "Free Color Picker – Find Your Perfect Color | Shiraj Ahmed Tools",
  description:
    "Explore our free, dynamic color picker tool to find and select the perfect colors for your projects with ease.",
  openGraph: {
    title: "Free Color Picker – Find Your Perfect Color",
    description:
      "Discover the perfect color palette for your project using our free interactive color picker.",
    url: "https://shirajahmed.com/tools/color-picker",
    images: [
      {
        url: "/tools/colorgenerator.jpg", // Replace with your tool-specific OG image
        width: 1200,
        height: 630,
        alt: "Free Color Picker Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Free Color Picker – Find Your Perfect Color",
    description:
      "Select and explore colors effortlessly with our free interactive color picker tool.",
    image: "/tools/colorgenerator.jpg",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/color-picker",
  },
};

export default function Layout({ children }) {
  return <div>{children}</div>;
}
