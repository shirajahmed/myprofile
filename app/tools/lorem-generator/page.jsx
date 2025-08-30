'use client';
import { useState } from 'react';

export default function LoremGenerator() {
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [generated, setGenerated] = useState('');

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateWord = () => loremWords[Math.floor(Math.random() * loremWords.length)];
  
  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 5;
    const words = Array.from({ length }, generateWord);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = () => {
    const sentences = Math.floor(Math.random() * 5) + 3;
    return Array.from({ length: sentences }, generateSentence).join(' ');
  };

  const generate = () => {
    let result = '';
    
    switch (type) {
      case 'words':
        result = Array.from({ length: count }, generateWord).join(' ');
        break;
      case 'sentences':
        result = Array.from({ length: count }, generateSentence).join(' ');
        break;
      case 'paragraphs':
        result = Array.from({ length: count }, generateParagraph).join('\n\n');
        break;
    }
    
    setGenerated(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Lorem Ipsum Generator</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg"
              >
                <option value="words">Words</option>
                <option value="sentences">Sentences</option>
                <option value="paragraphs">Paragraphs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Count</label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="100"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={generate}
                className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
              >
                Generate
              </button>
            </div>
          </div>
        </div>

        {generated && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Generated Text</h3>
              <button
                onClick={copyToClipboard}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm"
              >
                Copy to Clipboard
              </button>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="whitespace-pre-wrap font-mono text-sm">{generated}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
