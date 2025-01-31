import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
