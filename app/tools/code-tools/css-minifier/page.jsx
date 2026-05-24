

'use client';
import { useState } from 'react';
import ToolPageWrapper from '../../../components/ToolPageWrapper';

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
    <ToolPageWrapper title="🎨 CSS Minifier & Beautifier" description="Minify or beautify your CSS code">
      <div className="space-y-4">
        <div className="flex gap-2">
          {['minify', 'beautify'].map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${mode === m ? 'bg-[#a65fa8] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
              {m}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input CSS:</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              className="w-full h-64 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm text-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-[#a65fa8] focus:outline-none"
              placeholder="Paste your CSS code here..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Output:</label>
            <textarea value={output} readOnly
              className="w-full h-64 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm text-gray-800 dark:text-white resize-none"
              placeholder="Processed CSS will appear here..." />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleProcess} className="px-5 py-2 bg-[#a65fa8] hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
            {mode === 'minify' ? 'Minify CSS' : 'Beautify CSS'}
          </button>
          <button onClick={copyToClipboard} disabled={!output}
            className="px-5 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
            Copy Output
          </button>
        </div>
      </div>
    </ToolPageWrapper>
  );
}
