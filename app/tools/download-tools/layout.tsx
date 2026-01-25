export const metadata = {
  title: "Social Media Downloader - Download Videos & Images Online",
  description: "Download videos and images from YouTube, Instagram, Facebook, TikTok, and Twitter. Get high-quality media content for personal use with this free online downloader tool.",
  keywords: "social media downloader, video downloader, YouTube downloader, Instagram downloader, TikTok downloader, Twitter downloader, Facebook video downloader, download video, download image, online tools",
  openGraph: {
    title: "Social Media Downloader - Download Videos & Images Online",
    description:
      "Download videos and images from popular platforms like YouTube, Instagram, and TikTok with our free online social media downloader.",
    url: "https://shirajahmed.com/tools/download-tools",
    images: [
      {
        url: "https://shirajahmed.com/tools/social-media-downloader-preview.jpg", // Create a specific OG image for this tool
        width: 1200,
        height: 630,
        alt: "Social Media Downloader Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Social Media Downloader - Download Videos & Images Online",
    description:
      "Get high-quality videos and images from YouTube, Instagram, TikTok, and more. Free online media downloader tool.",
    image: "https://shirajahmed.com/tools/social-media-downloader-preview.jpg", // Create a specific OG image for this tool
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/tools/download-tools",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Social Media Downloader",
  url: "https://shirajahmed.com/tools/download-tools",
  description:
    "Free online tool to download videos and images from various social media platforms like YouTube, Instagram, Facebook, TikTok, and Twitter.",
  applicationCategory: "Multimedia",
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
    "YouTube Video Downloader",
    "Instagram Video/Image Downloader",
    "Facebook Video Downloader",
    "TikTok Video Downloader",
    "Twitter Video Downloader",
  ],
};

export default function SocialMediaDownloaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      {children}
    </>
  );
}
