

'use client';
import { useState } from 'react';

export default function HTMLFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('format');

  const formatHTML = (html) => {
    let formatted = html;
    let indent = 0;
    const tab = '  ';
    
    formatted = formatted.replace(/></g, '>\n<');
    
    const lines = formatted.split('\n');
    const result = [];
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;
      
      if (trimmed.startsWith('</')) {
        indent = Math.max(0, indent - 1);
      }
      
      result.push(tab.repeat(indent) + trimmed);
      
      if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
        const tagName = trimmed.match(/<(\w+)/);
        if (tagName && !['br', 'hr', 'img', 'input', 'meta', 'link'].includes(tagName[1])) {
          indent++;
        }
      }
    });
    
    return result.join('\n');
  };

  const minifyHTML = (html) => {
    return html
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  };

  const handleProcess = () => {
    if (!input.trim()) return;
    const result = mode === 'format' ? formatHTML(input) : minifyHTML(input);
    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">HTML Formatter & Minifier</h1>
      
      <div className="mb-4">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setMode('format')}
            className={`px-4 py-2 rounded ${mode === 'format' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Format
          </button>
          <button
            onClick={() => setMode('minify')}
            className={`px-4 py-2 rounded ${mode === 'minify' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Minify
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Input HTML:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm"
            placeholder="Paste your HTML code here..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Output:</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-50"
            placeholder="Processed HTML will appear here..."
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleProcess}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {mode === 'format' ? 'Format HTML' : 'Minify HTML'}
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          Copy Output
        </button>
      </div>
    </div>
  );
}
