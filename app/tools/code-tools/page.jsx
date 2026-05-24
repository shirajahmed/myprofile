export const metadata = {
  title: "Code Tools - Online Code Formatters, Minifiers & Highlighters",
  description: "A collection of online code tools for developers, including CSS minifier, HTML formatter, JavaScript beautifier, and syntax highlighter. Streamline your coding workflow.",
  keywords: "code tools, online code formatter, CSS minifier, HTML formatter, JavaScript beautifier, syntax highlighter, web development utilities",
};

import Link from 'next/link';

const codeTools = [
  {
    title: 'CSS Minifier & Beautifier',
    description: 'Minify CSS to reduce file size or beautify CSS for better readability',
    href: '/tools/code-tools/css-minifier',
    icon: '🎨'
  },
  {
    title: 'HTML Formatter & Minifier',
    description: 'Format HTML for better readability or minify HTML to reduce file size',
    href: '/tools/code-tools/html-formatter',
    icon: '📄'
  },
  {
    title: 'JavaScript Formatter & Minifier',
    description: 'Format JavaScript for better readability or minify JS to reduce file size',
    href: '/tools/code-tools/js-formatter',
    icon: '⚡'
  },
  {
    title: 'Code Syntax Highlighter',
    description: 'Highlight code syntax for JavaScript, HTML, CSS and generate HTML output',
    href: '/tools/code-tools/syntax-highlighter',
    icon: '🌈'
  }
];

export default function CodeToolsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">🔧 Code Tools</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
        Professional code formatting, minification, and syntax highlighting tools.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {codeTools.map((tool, index) => (
          <Link
            key={index}
            href={tool.href}
            className="flex items-start gap-4 p-5 bg-white/80 dark:bg-[#18191d]/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className="text-3xl">{tool.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-[#a65fa8] transition-colors">{tool.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
