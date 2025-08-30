'use client';
import { useState } from 'react';

export default function TextDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState([]);

  const calculateDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result = [];
    const maxLines = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 === line2) {
        result.push({ type: 'equal', line1, line2, index: i });
      } else {
        result.push({ type: 'different', line1, line2, index: i });
      }
    }
    setDiff(result);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Text Diff Checker</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Text 1</label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="w-full h-64 p-3 bg-gray-800 border border-gray-700 rounded-lg"
              placeholder="Enter first text..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Text 2</label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="w-full h-64 p-3 bg-gray-800 border border-gray-700 rounded-lg"
              placeholder="Enter second text..."
            />
          </div>
        </div>

        <button
          onClick={calculateDiff}
          className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium mb-6"
        >
          Compare Texts
        </button>

        {diff.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Differences</h3>
            <div className="space-y-2">
              {diff.map((item, index) => (
                <div key={index} className={`p-2 rounded ${
                  item.type === 'equal' ? 'bg-green-900/30' : 'bg-red-900/30'
                }`}>
                  <div className="text-sm text-gray-400">Line {item.index + 1}</div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="font-mono text-sm">{item.line1 || '(empty)'}</div>
                    <div className="font-mono text-sm">{item.line2 || '(empty)'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
