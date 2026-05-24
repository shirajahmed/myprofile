import SiteHeader from "../components/SiteHeader";

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
    images: [{ url: "https://shirajahmed.com/og-image-chat.jpg", width: 1200, height: 630, alt: "Anonymous Chat" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shirajahmed",
    title: "Anonymous Chat - Connect Instantly",
    description: "Join anonymous chat rooms and connect with people instantly. Your privacy is our priority.",
    image: "https://shirajahmed.com/og-image-chat.jpg",
    creator: "@shirajahmed",
  },
  alternates: { canonical: "https://shirajahmed.com/chat" },
};

export default function ChatLayout({ children }) {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 min-h-screen">{children}</main>
    </>
  );
}
