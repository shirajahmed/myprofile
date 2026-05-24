'use client';
import { useState } from 'react';
import ToolPageWrapper from '../../components/ToolPageWrapper';

export default function CaseConverter() {
  const [input, setInput] = useState('Hello World Example Text');

  const convert = (text) => ({
    lowercase: text.toLowerCase(),
    uppercase: text.toUpperCase(),
    titlecase: text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()),
    camelcase: text.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, ''),
    pascalcase: text.replace(/(?:^\w|[A-Z]|\b\w)/g, w => w.toUpperCase()).replace(/\s+/g, ''),
    snakecase: text.toLowerCase().replace(/\s+/g, '_'),
    kebabcase: text.toLowerCase().replace(/\s+/g, '-'),
    constantcase: text.toUpperCase().replace(/\s+/g, '_'),
    sentencecase: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
    alternatingcase: text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''),
  });

  const results = convert(input);

  const copy = (text) => navigator.clipboard.writeText(text);

  const caseTypes = [
    { key: 'lowercase', label: 'lowercase' },
    { key: 'uppercase', label: 'UPPERCASE' },
    { key: 'titlecase', label: 'Title Case' },
    { key: 'camelcase', label: 'camelCase' },
    { key: 'pascalcase', label: 'PascalCase' },
    { key: 'snakecase', label: 'snake_case' },
    { key: 'kebabcase', label: 'kebab-case' },
    { key: 'constantcase', label: 'CONSTANT_CASE' },
    { key: 'sentencecase', label: 'Sentence case' },
    { key: 'alternatingcase', label: 'aLtErNaTiNg' },
  ];

  return (
    <ToolPageWrapper title="🔤 Case Converter" description="Convert text between different cases instantly">
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-20 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-[#a65fa8] focus:outline-none"
          placeholder="Enter your text here..."
        />
        <div className="grid md:grid-cols-2 gap-3">
          {caseTypes.map(({ key, label }) => (
            <div key={key} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
                <button
                  onClick={() => copy(results[key])}
                  className="px-3 py-1 bg-[#a65fa8] hover:bg-purple-700 text-white text-xs rounded transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                {results[key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolPageWrapper>
  );
}
