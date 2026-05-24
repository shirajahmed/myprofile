"use client";
import Link from "next/link";

const tools = [
  { href: "/tools/calculator", icon: "🧮", title: "Calculator", desc: "Advanced calculator with multiple functions" },
  { href: "/tools/password-generator", icon: "🔐", title: "Password Generator", desc: "Generate strong, secure passwords" },
  { href: "/tools/qr-generator", icon: "📱", title: "QR Generator", desc: "Create QR codes for text and URLs" },
  { href: "/tools/color-generator", icon: "🎨", title: "Color Generator", desc: "Generate and explore color palettes" },
  { href: "/tools/can-i-use-this-username", icon: "🔍", title: "Username Checker", desc: "Check username availability across platforms" },
  { href: "/tools/get-your-info", icon: "💻", title: "Get Your Info", desc: "View your device and browser information" },
  { href: "/tools/download-tools", icon: "⬇️", title: "Download Tools", desc: "Download media from popular platforms" },
  { href: "/tools/text-diff", icon: "🔍", title: "Text Diff Checker", desc: "Compare two text blocks side by side" },
  { href: "/tools/word-counter", icon: "📝", title: "Word Counter", desc: "Count words, characters and reading time" },
  { href: "/tools/lorem-generator", icon: "📄", title: "Lorem Generator", desc: "Generate placeholder text" },
  { href: "/tools/markdown-converter", icon: "✍️", title: "Markdown Converter", desc: "Convert Markdown to HTML with preview" },
  { href: "/tools/case-converter", icon: "🔤", title: "Case Converter", desc: "Convert text between different cases" },
  { href: "/tools/code-tools", icon: "🔧", title: "Code Tools", desc: "CSS/HTML/JS formatters & syntax highlighter", featured: true },
];

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">All Tools</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{tools.length} free tools for developers and designers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(({ href, icon, title, desc, featured }) => (
          <Link
            key={href}
            href={href}
            className={`bg-white/80 dark:bg-[#18191d]/80 backdrop-blur-sm p-5 rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group
              ${featured
                ? "border-[#a65fa8] dark:border-[#a65fa8]"
                : "border-gray-200 dark:border-gray-700"}`}
          >
            <div className="text-2xl mb-3">{icon}</div>
            <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-[#a65fa8] transition-colors">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
