'use client';
import { useState } from 'react';

export default function CSSMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('minify');

  const minifyCSS = (css) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/;\s*}/g, '}')
      .replace(/\s*{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .replace(/,\s*/g, ',')
      .replace(/:\s*/g, ':')
      .trim();
  };

  const beautifyCSS = (css) => {
    return css
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n')
      .replace(/,\s*/g, ',\n')
      .replace(/\n\s*\n/g, '\n');
  };

  const handleProcess = () => {
    if (!input.trim()) return;
    const result = mode === 'minify' ? minifyCSS(input) : beautifyCSS(input);
    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">CSS Minifier & Beautifier</h1>
      
      <div className="mb-4">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setMode('minify')}
            className={`px-4 py-2 rounded ${mode === 'minify' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Minify
          </button>
          <button
            onClick={() => setMode('beautify')}
            className={`px-4 py-2 rounded ${mode === 'beautify' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Beautify
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Input CSS:</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm"
            placeholder="Paste your CSS code here..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Output:</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 p-3 border rounded-lg font-mono text-sm bg-gray-50"
            placeholder="Processed CSS will appear here..."
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleProcess}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {mode === 'minify' ? 'Minify CSS' : 'Beautify CSS'}
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
