

'use client';
import { useState } from 'react';

export default function CaseConverter() {
  const [input, setInput] = useState('Hello World Example Text');
  const [results, setResults] = useState({});

  const convertCases = (text) => {
    const conversions = {
      lowercase: text.toLowerCase(),
      uppercase: text.toUpperCase(),
      titlecase: text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ),
      camelcase: text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      ).replace(/\s+/g, ''),
      pascalcase: text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => 
        word.toUpperCase()
      ).replace(/\s+/g, ''),
      snakecase: text.toLowerCase().replace(/\s+/g, '_'),
      kebabcase: text.toLowerCase().replace(/\s+/g, '-'),
      constantcase: text.toUpperCase().replace(/\s+/g, '_'),
      dotcase: text.toLowerCase().replace(/\s+/g, '.'),
      pathcase: text.toLowerCase().replace(/\s+/g, '/'),
      sentencecase: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
      alternatingcase: text.split('').map((char, index) => 
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      ).join(''),
      inversecase: text.split('').map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('')
    };
    setResults(conversions);
  };

  const handleInputChange = (value) => {
    setInput(value);
    convertCases(value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Initialize conversions
  useState(() => {
    convertCases(input);
  }, []);

  const caseTypes = [
    { key: 'lowercase', label: 'lowercase', example: 'hello world' },
    { key: 'uppercase', label: 'UPPERCASE', example: 'HELLO WORLD' },
    { key: 'titlecase', label: 'Title Case', example: 'Hello World' },
    { key: 'camelcase', label: 'camelCase', example: 'helloWorld' },
    { key: 'pascalcase', label: 'PascalCase', example: 'HelloWorld' },
    { key: 'snakecase', label: 'snake_case', example: 'hello_world' },
    { key: 'kebabcase', label: 'kebab-case', example: 'hello-world' },
    { key: 'constantcase', label: 'CONSTANT_CASE', example: 'HELLO_WORLD' },
    { key: 'dotcase', label: 'dot.case', example: 'hello.world' },
    { key: 'pathcase', label: 'path/case', example: 'hello/world' },
    { key: 'sentencecase', label: 'Sentence case', example: 'Hello world' },
    { key: 'alternatingcase', label: 'aLtErNaTiNg CaSe', example: 'hElLo WoRlD' },
    { key: 'inversecase', label: 'iNVERSE cASE', example: 'hELLO wORLD' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Case Converter</h1>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full h-24 p-4 bg-gray-800 border border-gray-700 rounded-lg"
            placeholder="Enter your text here..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {caseTypes.map(({ key, label, example }) => (
            <div key={key} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-xs text-gray-400">e.g., {example}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(results[key] || '')}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                >
                  Copy
                </button>
              </div>
              <div className="bg-gray-900 p-3 rounded font-mono text-sm break-all">
                {results[key] || ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
