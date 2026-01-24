"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHome, FaTools } from "react-icons/fa";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { usePathname } from "next/navigation"; // To highlight active link

export default function TopNavbar({ setShowTools }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#18191d]/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-5 py-3 flex items-center justify-between">
        {/* Logo/Home Link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-[#a65fa8] dark:hover:text-[#a65fa8] text-lg font-bold"
        >
          <FaHome />
          <span>Shiraj Ahmed</span> {/* Changed from "Home" to name/brand */}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-gray-600 dark:text-gray-300 hover:text-[#a65fa8] dark:hover:text-[#a65fa8] transition-colors duration-300 ease-in-out font-medium
                ${pathname === item.href ? "text-[#a65fa8] dark:text-[#a65fa8] font-semibold" : ""}`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => setShowTools(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a65fa8] to-purple-600 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
          >
            <FaTools />
            <span>Tools</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 dark:text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <RxCross1 size={24} />
            ) : (
              <RxHamburgerMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#18191d] shadow-lg py-4">
          <div className="flex flex-col items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                className={`text-gray-800 dark:text-white hover:text-[#a65fa8] dark:hover:text-[#a65fa8] transition-colors duration-300 ease-in-out font-medium text-lg
                  ${pathname === item.href ? "text-[#a65fa8] dark:text-[#a65fa8] font-semibold" : ""}`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setShowTools(true);
                setIsMobileMenuOpen(false); // Close menu on click
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a65fa8] to-purple-600 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 w-fit"
            >
              <FaTools />
              <span>Tools</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
