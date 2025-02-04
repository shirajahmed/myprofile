import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Web Developer | Shiraj Ahmed",
  description: "Best web Developer in silchar",
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
      </body>
    </html>
  );
}
