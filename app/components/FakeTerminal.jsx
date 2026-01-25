// app/components/FakeTerminal.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const FakeTerminal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gray-900 text-green-400 font-mono p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 overflow-hidden"
    >
      <h3 className="text-xl font-bold mb-3 text-white">Fake Terminal Simulator 💻</h3>
      <div className="flex items-center mb-2">
        <span className="text-red-500 mr-2">➜</span>
        <span className="text-cyan-400 mr-2">~</span>
        <span className="text-green-400">$</span>
        <span className="ml-2">whoami</span>
      </div>
      <p className="ml-8 text-white">Shiraj – Full Stack Dev 😎</p>

      <div className="flex items-center mb-2 mt-4">
        <span className="text-red-500 mr-2">➜</span>
        <span className="text-cyan-400 mr-2">~</span>
        <span className="text-green-400">$</span>
        <span className="ml-2">skills</span>
      </div>
      <p className="ml-8 text-white">React, Next, Node, AI</p>
    </motion.div>
  );
};

export default FakeTerminal;
