

'use client';
import { useState } from 'react';

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and this is *italic*.\n\n- List item 1\n- List item 2\n\n[Link](https://example.com)');
  const [html, setHtml] = useState('');

  const convertToHtml = (md) => {
    let result = md
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Code
      .replace(/`(.*)`/gim, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
      // Line breaks
      .replace(/\n$/gim, '<br />')
      // Lists
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      // Paragraphs
      .replace(/\n\n/gim, '</p><p>')
      .replace(/^(?!<[h|l|p])/gim, '<p>')
      .replace(/(?![h|l|p]>)$/gim, '</p>');

    // Wrap lists
    result = result.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
    
    setHtml(result);
  };

  const handleMarkdownChange = (value) => {
    setMarkdown(value);
    convertToHtml(value);
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(html);
  };

  // Initialize conversion
  useState(() => {
    convertToHtml(markdown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Markdown to HTML Converter</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Markdown Input</label>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => handleMarkdownChange(e.target.value)}
              className="w-full h-96 p-4 bg-gray-800 border border-gray-700 rounded-lg font-mono text-sm"
              placeholder="Enter your markdown here..."
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">HTML Output</label>
              <button
                onClick={copyHtml}
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
              >
                Copy HTML
              </button>
            </div>
            <textarea
              value={html}
              readOnly
              className="w-full h-96 p-4 bg-gray-800 border border-gray-700 rounded-lg font-mono text-sm"
              placeholder="HTML output will appear here..."
            />
          </div>
        </div>

        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Preview</h3>
          <div 
            className="bg-white text-black p-4 rounded-lg prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Supported Markdown</h3>
          <div className="text-sm text-gray-400 space-y-1">
            <div># Header 1, ## Header 2, ### Header 3</div>
            <div>**bold text**, *italic text*</div>
            <div>`inline code`</div>
            <div>[link text](url)</div>
            <div>- list item or * list item</div>
          </div>
        </div>
      </div>
    </div>
  );
}
