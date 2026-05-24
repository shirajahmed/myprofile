'use client';
import { useState } from 'react';
import ToolPageWrapper from '../../components/ToolPageWrapper';

const WORDS = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur'];

const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
const sentence = () => { const w = Array.from({ length: Math.floor(Math.random()*10)+5 }, () => rnd(WORDS)); w[0] = w[0][0].toUpperCase() + w[0].slice(1); return w.join(' ') + '.'; };
const paragraph = () => Array.from({ length: Math.floor(Math.random()*4)+3 }, sentence).join(' ');

export default function LoremGenerator() {
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const result = type === 'words'
      ? Array.from({ length: count }, () => rnd(WORDS)).join(' ')
      : type === 'sentences'
      ? Array.from({ length: count }, sentence).join(' ')
      : Array.from({ length: count }, paragraph).join('\n\n');
    setGenerated(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageWrapper title="📄 Lorem Ipsum Generator" description="Generate placeholder text for your designs">
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-[#a65fa8] focus:outline-none"
            >
              <option value="words">Words</option>
              <option value="sentences">Sentences</option>
              <option value="paragraphs">Paragraphs</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Count</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              min="1" max="100"
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-[#a65fa8] focus:outline-none"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={generate}
              className="w-full py-3 bg-[#a65fa8] hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              Generate
            </button>
          </div>
        </div>

        {generated && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated Text</span>
              <button
                onClick={copy}
                className="px-4 py-1.5 bg-[#a65fa8] hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200">{generated}</p>
            </div>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
