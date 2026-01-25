// app/components/ComplimentGenerator.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const compliments = [
  "You're officially cooler than your code.",
  "Your thought process is as elegant as clean code.",
  "You make complex problems look easy.",
  "You're a debugging wizard!",
  "Your creativity brightens the digital world.",
  "Keep shining, you tech star!",
  "Your skills are truly impressive.",
  "You're a coding rockstar!",
  "You inspire others with your dedication.",
  "The internet is a better place because of you.",
];

const ComplimentGenerator = () => {
  const [currentCompliment, setCurrentCompliment] = useState(
    "Click the button for a boost!"
  );

  const generateCompliment = () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    setCurrentCompliment(compliments[randomIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 text-center"
    >
      <h3 className="text-xl font-bold mb-3">One-Click Compliment Generator ✨</h3>
      <p className="text-lg italic mb-4">{currentCompliment}</p>
      <button
        onClick={generateCompliment}
        className="px-6 py-3 bg-white text-blue-700 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-200"
      >
        Make me smile 😊
      </button>
    </motion.div>
  );
};

export default ComplimentGenerator;
