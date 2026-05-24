

'use client';
import { useState } from 'react';
import ToolPageWrapper from '../../../components/ToolPageWrapper';

export default function SyntaxHighlighter() {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const highlightSyntax = (code, lang) => {
    const keywords = {
      javascript: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export'],
      html: ['html', 'head', 'body', 'div', 'span', 'p', 'a', 'img', 'script', 'style'],
      css: ['color', 'background', 'margin', 'padding', 'border', 'width', 'height', 'display', 'position']
    };

    let highlighted = code;
    
    // Highlight keywords
    if (keywords[lang]) {
      keywords[lang].forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        highlighted = highlighted.replace(regex, `<span style="color: #0066cc; font-weight: bold;">${keyword}</span>`);
      });
    }

    // Highlight strings
    highlighted = highlighted.replace(/(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span style="color: #008000;">$1$2$3</span>');
    
    // Highlight comments
    highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span style="color: #808080; font-style: italic;">$1</span>');
    highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #808080; font-style: italic;">$1</span>');
    
    // Highlight numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span style="color: #ff6600;">$1</span>');

    return highlighted;
  };

  const handleHighlight = () => {
    if (!input.trim()) return;
    const highlighted = highlightSyntax(input, language);
    setOutput(highlighted);
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolPageWrapper title="🌈 Code Syntax Highlighter" description="Highlight code syntax and generate HTML output">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-[#a65fa8] focus:outline-none">
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input Code:</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              className="w-full h-64 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm text-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-[#a65fa8] focus:outline-none"
              placeholder="Paste your code here..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Highlighted Preview:</label>
            <div className="w-full h-64 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm overflow-auto"
              dangerouslySetInnerHTML={{ __html: output || '<span class="text-gray-400">Highlighted code will appear here...</span>' }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HTML Output:</label>
          <textarea value={output} readOnly
            className="w-full h-24 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm text-gray-800 dark:text-white resize-none" />
        </div>
        <div className="flex gap-3">
          <button onClick={handleHighlight} className="px-5 py-2 bg-[#a65fa8] hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
            Highlight Syntax
          </button>
          <button onClick={copyHTML} disabled={!output}
            className="px-5 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
            Copy HTML
          </button>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
