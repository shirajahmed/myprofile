'use client';
import { useState } from 'react';
import ToolPageWrapper from '../../components/ToolPageWrapper';

export default function TextDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState([]);

  const compare = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    setDiff(Array.from({ length: maxLines }, (_, i) => ({
      equal: (lines1[i] || '') === (lines2[i] || ''),
      line1: lines1[i] || '',
      line2: lines2[i] || '',
      index: i,
    })));
  };

  return (
    <ToolPageWrapper title="🔍 Text Diff Checker" description="Compare two texts and highlight differences">
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {[{ label: 'Text 1', value: text1, set: setText1 }, { label: 'Text 2', value: text2, set: setText2 }].map(({ label, value, set }) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
              <textarea
                value={value}
                onChange={(e) => set(e.target.value)}
                className="w-full h-48 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-[#a65fa8] focus:outline-none font-mono text-sm"
                placeholder={`Enter ${label.toLowerCase()}...`}
              />
            </div>
          ))}
        </div>

        <button
          onClick={compare}
          className="w-full py-3 bg-[#a65fa8] hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
        >
          Compare Texts
        </button>

        {diff.length > 0 && (
          <div className="space-y-1">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
              Differences: {diff.filter(d => !d.equal).length} line(s) changed
            </h3>
            {diff.map((item) => (
              <div key={item.index} className={`p-2 rounded text-sm ${item.equal ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <div className="text-xs text-gray-400 mb-1">Line {item.index + 1}</div>
                <div className="grid md:grid-cols-2 gap-2 font-mono">
                  <div className="text-gray-700 dark:text-gray-200">{item.line1 || <span className="text-gray-400 italic">(empty)</span>}</div>
                  <div className="text-gray-700 dark:text-gray-200">{item.line2 || <span className="text-gray-400 italic">(empty)</span>}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
