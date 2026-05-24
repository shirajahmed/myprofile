'use client';
import { useState, useEffect } from 'react';
import ToolPageWrapper from '../../components/ToolPageWrapper';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({ characters: 0, charactersNoSpaces: 0, words: 0, sentences: 0, paragraphs: 0, readingTime: 0 });

  useEffect(() => {
    setStats({
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, '').length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
      paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
      readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
    });
  }, [text]);

  const statItems = [
    { label: 'Characters', value: stats.characters, color: 'text-[#a65fa8]' },
    { label: 'No Spaces', value: stats.charactersNoSpaces, color: 'text-[#a65fa8]' },
    { label: 'Words', value: stats.words, color: 'text-[#a65fa8]' },
    { label: 'Sentences', value: stats.sentences, color: 'text-[#a65fa8]' },
    { label: 'Paragraphs', value: stats.paragraphs, color: 'text-[#a65fa8]' },
    { label: 'Min to Read', value: stats.readingTime, color: 'text-[#a65fa8]' },
  ];

  return (
    <ToolPageWrapper title="📝 Word Counter" description="Count words, characters, sentences and reading time">
      <div className="space-y-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-[#a65fa8] focus:outline-none"
          placeholder="Type or paste your text here..."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statItems.map(({ label, value, color }) => (
            <div key={label} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </ToolPageWrapper>
  );
}
