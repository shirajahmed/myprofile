export const metadata = {
  title: "Anonymous Chat - Connect Instantly",
  description:
    "Join or create anonymous chat rooms instantly. Connect with others without revealing your identity.",
  keywords:
    "anonymous chat, chat room, instant messaging, private chat, secure chat",
  openGraph: {
    title: "Anonymous Chat - Connect Instantly",
    description:
      "Connect with others anonymously in instant chat rooms. Private and secure messaging for everyone.",
    url: "https://shirajahmed.com/chat",
    images: [
      {
        url: "https://shirajahmed.com/og-image-chat.jpg", // Create a specific OG image for chat
        width: 1200,
        height: 630,
        alt: "Anonymous Chat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Anonymous Chat - Connect Instantly",
    description:
      "Join anonymous chat rooms and connect with people instantly. Your privacy is our priority.",
    image: "https://shirajahmed.com/og-image-chat.jpg", // Create a specific OG image for chat
    creator: "@shirajahmed",
  },
  alternates: {
    canonical: "https://shirajahmed.com/chat",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Anonymous Chat",
  url: "https://shirajahmed.com/chat",
  description:
    "Free online platform for anonymous instant messaging and creating private chat rooms.",
  applicationCategory: "SocialNetworking",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Shiraj Ahmed", // Or a generic app name if preferred
  },
  featureList: [
    "Anonymous Messaging",
    "Instant Chat Rooms",
    "Private Conversations",
    "Secure Communication",
  ],
};

export default function ChatLayout({ children }) {
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