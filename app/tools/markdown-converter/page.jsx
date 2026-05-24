'use client';
import { useState } from 'react';
import ToolPageWrapper from '../../components/ToolPageWrapper';

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and *italic*.\n\n- Item 1\n- Item 2\n\n[Link](https://example.com)');
  const [copied, setCopied] = useState(false);

  const toHtml = (md) => md
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-3 mb-1">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/`(.*?)`/gim, '<code class="bg-gray-100 px-1 rounded text-sm font-mono">$1</code>')
    .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2" class="text-[#a65fa8] underline">$1</a>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    .replace(/\n\n/gim, '</p><p class="mb-2">')
    .replace(/^(?!<[hlp])/gim, '<p class="mb-2">')
    .replace(/(?<![>])$/gim, '</p>');

  const html = toHtml(markdown);

  const copy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageWrapper title="📝 Markdown Converter" description="Convert Markdown to HTML with live preview">
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Markdown Input</label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-[#a65fa8] focus:outline-none"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">HTML Output</label>
              <button onClick={copy} className="px-3 py-1 bg-[#a65fa8] hover:bg-purple-700 text-white text-xs rounded transition-colors">
                {copied ? '✓ Copied!' : 'Copy HTML'}
              </button>
            </div>
            <textarea
              value={html}
              readOnly
              className="w-full h-64 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white font-mono text-sm resize-none"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</h3>
          <div
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 p-4 rounded-lg text-gray-800 dark:text-gray-200 prose dark:prose-invert max-w-none text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </ToolPageWrapper>
  );
}
