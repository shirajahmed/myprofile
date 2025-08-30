'use client';
import { useState } from 'react';

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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Code Syntax Highlighter</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Input Code:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm"
            placeholder="Paste your code here..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Highlighted Output:</label>
          <div 
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-50 overflow-auto"
            dangerouslySetInnerHTML={{ __html: output || 'Highlighted code will appear here...' }}
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">HTML Output:</label>
        <textarea
          value={output}
          readOnly
          className="w-full h-32 p-3 border rounded-lg font-mono text-sm bg-gray-50"
          placeholder="HTML with syntax highlighting will appear here..."
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleHighlight}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Highlight Syntax
        </button>
        <button
          onClick={copyHTML}
          disabled={!output}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          Copy HTML
        </button>
      </div>
    </div>
  );
}
