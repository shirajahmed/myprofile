"use client";

import { useEffect } from "react";

export default function ToolsPage() {
  useEffect(() => {
    // Initialize Google Ads
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 ">
      {/* Sidebar */}
      <div className="h-full col-span-12 p-4 text-base text-center bg-dark-500 lg:col-span-3 rounded-2xl shadow-custom-dark ">
        {/* Ad container placeholder */}
      </div>

      <div className="flex flex-col col-span-12 overflow-hidden shadow-custom-dark rounded-2xl lg:col-span-9 bg-dark-500">
        {/* Navbar */}
        <div className="flex items-center justify-between px-5 py-3 my-3 bg-[#18191d] rounded-xl">
          <span className="text-xl font-bold border-b-4 md:text-2xl border-[#a65fa8] text-white">
            All Tools
          </span>
        </div>

        {/* Tools Grid */}
        <div className="h-auto bg-[#0a0a0a] rounded-xl text-white p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Existing Tools */}
            <a
              href="/tools/calculator"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Calculator</h3>
              <p className="text-gray-400">
                Advanced calculator with multiple functions
              </p>
            </a>

            <a
              href="/tools/password-generator"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Password Generator</h3>
              <p className="text-gray-400">Generate secure passwords</p>
            </a>

            <a
              href="/tools/qr-generator"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">QR Generator</h3>
              <p className="text-gray-400">Create QR codes for text and URLs</p>
            </a>

            <a
              href="/tools/color-generator"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Color Generator</h3>
              <p className="text-gray-400">
                Generate and explore color palettes
              </p>
            </a>

            <a
              href="/tools/can-i-use-this-username"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Username Checker</h3>
              <p className="text-gray-400">Check username availability</p>
            </a>

            <a
              href="/tools/get-your-info"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Get Your Info</h3>
              <p className="text-gray-400">View your system information</p>
            </a>

            <a
              href="/tools/download-tools"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Download Tools</h3>
              <p className="text-gray-400">Download utilities and tools</p>
            </a>

            {/* New Text & Content Tools */}
            <a
              href="/tools/text-diff"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Text Diff Checker</h3>
              <p className="text-gray-400">Compare two text blocks</p>
            </a>

            <a
              href="/tools/word-counter"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Word Counter</h3>
              <p className="text-gray-400">Count words, characters & more</p>
            </a>

            <a
              href="/tools/lorem-generator"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Lorem Generator</h3>
              <p className="text-gray-400">Generate placeholder text</p>
            </a>

            <a
              href="/tools/markdown-converter"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Markdown Converter</h3>
              <p className="text-gray-400">Convert Markdown to HTML</p>
            </a>

            <a
              href="/tools/case-converter"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Case Converter</h3>
              <p className="text-gray-400">
                Convert text between different cases
              </p>
            </a>

            {/* Code Tools Category */}
            <a
              href="/tools/code-tools"
              className="bg-[#18191d] p-6 rounded-lg shadow-xl hover:bg-[#252529] transition-colors border-2 border-blue-500"
            >
              <h3 className="text-xl font-bold mb-2">🔧 Code Tools</h3>
              <p className="text-gray-400">
                CSS/HTML/JS formatters & syntax highlighter
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
