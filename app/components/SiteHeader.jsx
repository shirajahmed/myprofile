"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaHome, FaTools } from "react-icons/fa";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Ideas", href: "/blog" },
  { name: "Tools", href: "/tools" },
  { name: "Chat", href: "/chat" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#18191d]/80 backdrop-blur-sm shadow-md">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-[#a65fa8] dark:hover:text-[#a65fa8] text-lg font-bold"
        >
          <FaHome />
          <span>Stay tuned!</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`font-medium transition-colors duration-200 hover:text-[#a65fa8] dark:hover:text-[#a65fa8]
                ${pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-[#a65fa8] font-semibold"
                  : "text-gray-600 dark:text-gray-300"}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-800 dark:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-[#18191d] shadow-lg py-4">
          <div className="flex flex-col items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-lg font-medium transition-colors hover:text-[#a65fa8] dark:hover:text-[#a65fa8]
                  ${pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-[#a65fa8] font-semibold"
                    : "text-gray-800 dark:text-white"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
