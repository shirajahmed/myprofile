// app/components/MicroChallenge.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const challenges = [
  {
    question: "What is [] + [] ?",
    answer: "'' (an empty string)",
    explanation:
      "When the `+` operator is used with arrays, JavaScript attempts to convert them to primitive values. For arrays, this typically involves calling `toString()`. `[].toString()` results in an empty string `''`. So, `'' + ''` evaluates to `''`.",
  },
  {
    question: "What is '5' - 3 ?",
    answer: "2",
    explanation:
      "The `-` operator implicitly converts operands to numbers. '5' becomes the number 5, and 3 is already a number. So, 5 - 3 evaluates to 2.",
  },
  {
    question: "What is '5' + 3 ?",
    answer: "'53'",
    explanation:
      "When the `+` operator encounters a string and a number, it performs string concatenation. The number 3 is converted to the string '3', and then '5' and '3' are concatenated to form '53'.",
  },
  {
    question: "What is typeof NaN ?",
    answer: "'number'",
    explanation:
      "`NaN` stands for 'Not-a-Number', but paradoxically, its type is 'number'. It's a special kind of numeric value that represents an undefined or unrepresentable numerical value.",
  },
];

const MicroChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState({});
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  const selectRandomChallenge = () => {
    const today = new Date();
    const day = today.getDate();
    // Use date to ensure it changes daily, but also allow refresh for immediate change
    setCurrentChallenge(challenges[day % challenges.length]);
  };

  useEffect(() => {
    selectRandomChallenge();
  }, []);

  const handleRefresh = () => {
    let newChallenge;
    do {
      const randomIndex = Math.floor(Math.random() * challenges.length);
      newChallenge = challenges[randomIndex];
    } while (newChallenge.question === currentChallenge.question && challenges.length > 1); // Ensure different challenge if possible
    setCurrentChallenge(newChallenge);
    setShowAnswerModal(false); // Hide answer if open
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 relative"
    >
      <h3 className="text-xl font-bold mb-3">Micro Challenge 💡</h3>
      <p className="text-lg mb-2">Daily: Solve this JS in 30 sec</p>
      <div className="bg-gray-800 text-yellow-300 p-4 rounded-md font-mono text-base break-words">
        <span className="text-gray-400">console.log(</span>
        <span className="text-white">{currentChallenge.question}</span>
        <span className="text-gray-400">);</span>
      </div>
      <p className="mt-3 text-sm italic">
        Think you know the answer? Test your JavaScript knowledge!
      </p>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setShowAnswerModal(true)}
          className="px-4 py-2 bg-white text-orange-700 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-200 text-sm"
        >
          Show Answer
        </button>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-orange-700 text-white rounded-lg shadow-md hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200 text-sm"
        >
          Refresh
        </button>
      </div>

      {showAnswerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl relative max-w-lg w-full"
          >
            <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Answer & Explanation
            </h4>
            <p className="text-gray-700 dark:text-gray-200 text-lg mb-2">
              <span className="font-semibold">Question:</span>{" "}
              {currentChallenge.question}
            </p>
            <p className="text-gray-700 dark:text-gray-200 text-lg mb-4">
              <span className="font-semibold">Answer:</span>{" "}
              <span className="font-mono text-green-600 dark:text-green-400">
                {currentChallenge.answer}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-base mb-6">
              <span className="font-semibold">Explanation:</span>{" "}
              {currentChallenge.explanation}
            </p>
            <button
              onClick={() => setShowAnswerModal(false)}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default MicroChallenge;
