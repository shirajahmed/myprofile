import MainPageLayout from "../components/MainPageLayout";

export const metadata = {
  title: "Trest - Video Showcase | Shiraj Ahmed",
  description:
    "Interactive video showcase featuring Cliprame video player on Shiraj Ahmed's portfolio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
  keywords: "Cliprame, Video Player, Trest, Shiraj Ahmed, Portfolio",
  openGraph: {
    title: "Trest - Video Showcase | Shiraj Ahmed",
    description: "Interactive video showcase featuring Cliprame video player.",
    url: "https://shirajahmed.com/trest",
    type: "website",
  },
  alternates: {
    canonical: "https://shirajahmed.com/trest",
  },
};

export default function TrestLayout({ children }) {
  return <MainPageLayout>{children}</MainPageLayout>;
}
