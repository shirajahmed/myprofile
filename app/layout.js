import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import FloatingChatbotButton from "./components/FloatingChatbotButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Web Developer | Shiraj Ahmed - Crafting Digital Experiences",
  description:
    "Professional web developer from Silchar, India specializing in building, deploying, and managing responsive websites and web applications.",
  authors: [{ name: "Shiraj Ahmed", url: "https://shirajahmed.com" }],
  keywords: [
    "Web Developer",
    "Silchar",
    "Web Design",
    "Web Application",
    "Responsive Websites",
    "Free Tools",
  ],
  openGraph: {
    title: "Web Developer | Shiraj Ahmed",
    description:
      "Crafting digital experiences with design, development, and deployment services in Silchar, India.",
    url: "https://shirajahmed.com",
    siteName: "Shiraj Ahmed",
    images: [
      {
        url: "/home.png",
        width: 1200,
        height: 630,
        alt: "Shiraj Ahmed Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Web Developer | Shiraj Ahmed",
    description:
      "Expert web developer from Silchar, India offering comprehensive web design, development, and deployment services.",
    images: ["/home.png"],
  },
  alternates: {
    canonical: "https://shirajahmed.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-fixed bg-gradient-to-r from-dark-500 to-dark-700 text-white ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <Link
            href={"/"}
            className="mt-2 absolute top-8 left-10 text-sm font-medium text-center"
          >
            <FaHome size={20} />
          </Link>
        </div>
        <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
        <FloatingChatbotButton />
      </body>
    </html>
  );
}
