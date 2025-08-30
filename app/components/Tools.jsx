"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { fadeInUp, stagger } from "../utils/animation";

const Tools = ({ setShowTools }) => {
  const allTools = [
    // Utility Tools
    { name: "Calculator", icon: "🧮", url: "/tools/calculator", category: "Utility", description: "Advanced calculator with multiple functions" },
    { name: "Password Generator", icon: "🔐", url: "/tools/password-generator", category: "Utility", description: "Generate secure passwords" },
    { name: "QR Generator", icon: "📱", url: "/tools/qr-generator", category: "Utility", description: "Create QR codes for text and URLs" },
    { name: "Color Generator", icon: "🎨", url: "/tools/color-generator", category: "Utility", description: "Generate and explore color palettes" },
    { name: "Username Checker", icon: "👤", url: "/tools/can-i-use-this-username", category: "Utility", description: "Check username availability" },
    { name: "Get Your Info", icon: "ℹ️", url: "/tools/get-your-info", category: "Utility", description: "View your system information" },
    { name: "Download Tools", icon: "⬇️", url: "/tools/download-tools", category: "Utility", description: "Download utilities and tools" },
    
    // Text & Content Tools
    { name: "Text Diff Checker", icon: "🔍", url: "/tools/text-diff", category: "Text", description: "Compare two text blocks" },
    { name: "Word Counter", icon: "📊", url: "/tools/word-counter", category: "Text", description: "Count words, characters & more" },
    { name: "Lorem Generator", icon: "📝", url: "/tools/lorem-generator", category: "Text", description: "Generate placeholder text" },
    { name: "Markdown Converter", icon: "📄", url: "/tools/markdown-converter", category: "Text", description: "Convert Markdown to HTML" },
    { name: "Case Converter", icon: "🔤", url: "/tools/case-converter", category: "Text", description: "Convert text between cases" },
    
    // Code Tools
    { name: "CSS Minifier", icon: "🎨", url: "/tools/code-tools/css-minifier", category: "Code", description: "Minify & beautify CSS" },
    { name: "HTML Formatter", icon: "📄", url: "/tools/code-tools/html-formatter", category: "Code", description: "Format & minify HTML" },
    { name: "JS Formatter", icon: "⚡", url: "/tools/code-tools/js-formatter", category: "Code", description: "Format & minify JavaScript" },
    { name: "Syntax Highlighter", icon: "🌈", url: "/tools/code-tools/syntax-highlighter", category: "Code", description: "Highlight code syntax" },
  ];

  const categories = ["All", "Utility", "Text", "Code"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = selectedCategory === "All" 
    ? allTools 
    : allTools.filter(tool => tool.category === selectedCategory);

  return (
    <div>
      {/* Background Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 backdrop-blur-sm z-40"></div>

      {/* Modal Content */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-6xl h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">🛠️ All Tools</h2>
            <p className="text-gray-400">Discover powerful utilities and developer tools</p>
          </div>
          <button
            onClick={() => setShowTools(false)}
            className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
          >
            <MdClose size={20} className="text-white" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="p-6 h-[calc(90vh-180px)] overflow-y-auto">
          <motion.div 
            variants={stagger} 
            initial="initial" 
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredTools.map((tool, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Link href={tool.url}>
                  <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer h-full">
                    
                    {/* Icon & Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </div>
                      <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                        {tool.category}
                      </span>
                    </div>

                    {/* Tool Info */}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Hover Effect */}
                    <div className="mt-4 flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Open Tool</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
              <p className="text-gray-400">Try selecting a different category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;
