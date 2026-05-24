

'use client';
import { useState } from 'react';
import ToolPageWrapper from '../../../components/ToolPageWrapper';

export default function JSFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('format');

  const formatJS = (js) => {
    let formatted = js;
    let indent = 0;
    const tab = '  ';
    
    // Basic formatting
    formatted = formatted
      .replace(/;/g, ';\n')
      .replace(/{/g, ' {\n')
      .replace(/}/g, '\n}\n')
      .replace(/,/g, ',\n');
    
    const lines = formatted.split('\n');
    const result = [];
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;
      
      if (trimmed === '}' || trimmed.startsWith('}')) {
        indent = Math.max(0, indent - 1);
      }
      
      result.push(tab.repeat(indent) + trimmed);
      
      if (trimmed.endsWith('{')) {
        indent++;
      }
    });
    
    return result.join('\n');
  };

  const minifyJS = (js) => {
    return js
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      .replace(/\s+/g, ' ')
      .replace(/;\s*}/g, '}')
      .replace(/\s*{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .replace(/,\s*/g, ',')
      .trim();
  };

  const handleProcess = () => {
    if (!input.trim()) return;
    const result = mode === 'format' ? formatJS(input) : minifyJS(input);
    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolPageWrapper title="⚡ JavaScript Formatter & Minifier" description="Format or minify your JavaScript code">
      <div className="space-y-4">
        <div className="flex gap-2">
          {['format', 'minify'].map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${mode === m ? 'bg-[#a65fa8] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
              {m}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input JavaScript:</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              className="w-full h-64 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm text-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-[#a65fa8] focus:outline-none"
              placeholder="Paste your JavaScript code here..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Output:</label>
            <textarea value={output} readOnly
              className="w-full h-64 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm text-gray-800 dark:text-white resize-none"
              placeholder="Processed JavaScript will appear here..." />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleProcess} className="px-5 py-2 bg-[#a65fa8] hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
            {mode === 'format' ? 'Format JS' : 'Minify JS'}
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
