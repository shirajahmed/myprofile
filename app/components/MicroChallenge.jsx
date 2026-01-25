// app/components/MicroChallenge.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const MicroChallenge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6"
    >
      <h3 className="text-xl font-bold mb-3">Micro Challenge 💡</h3>
      <p className="text-lg mb-2">Daily: Solve this JS in 30 sec</p>
      <div className="bg-gray-800 text-yellow-300 p-4 rounded-md font-mono text-base break-words">
        <span className="text-gray-400">console.log(</span>
        <span className="text-white">[] + []</span>
        <span className="text-gray-400">);</span>
      </div>
      <p className="mt-3 text-sm italic">
        Think you know the answer? Test your JavaScript knowledge! (Hint: It's
        not what you might expect!)
      </p>
    </motion.div>
  );
};

export default MicroChallenge;
