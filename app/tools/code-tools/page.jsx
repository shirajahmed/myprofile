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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Code Tools</h1>
      <p className="text-gray-600 mb-8">
        Professional code formatting, minification, and syntax highlighting tools for developers.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {codeTools.map((tool, index) => (
          <Link
            key={index}
            href={tool.href}
            className="block p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{tool.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
