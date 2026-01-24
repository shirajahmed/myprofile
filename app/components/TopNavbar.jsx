import Link from 'next/link';
import { FaHome, FaTools } from 'react-icons/fa';

export default function TopNavbar({ setShowTools }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-white/80 dark:bg-[#18191d]/80 backdrop-blur-sm shadow-md">
      <Link href="/" className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-[#a65fa8] dark:hover:text-[#a65fa8]">
        <FaHome />
        <span className="hidden sm:inline">Home</span>
      </Link>
      <button
        onClick={() => setShowTools(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a65fa8] to-purple-600 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
      >
        <FaTools />
        <span className="hidden sm:inline">Explore Tools</span>
      </button>
    </nav>
  );
}
