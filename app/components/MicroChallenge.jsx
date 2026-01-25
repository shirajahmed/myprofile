// app/components/MicroChallenge.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const MicroChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChallenge = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/micro-challenges");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCurrentChallenge(data);
    } catch (err) {
      setError("Failed to load challenge. Please try again.");
      console.error("Error fetching micro challenge:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChallenge();
  }, [fetchChallenge]);

  const handleRefresh = () => {
    setShowAnswerModal(false); // Hide answer if open
    fetchChallenge(); // Fetch a new challenge
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 relative flex items-center justify-center"
        style={{ minHeight: "180px" }} // Ensure consistent height during loading
      >
        <p className="text-lg font-semibold">Loading challenge...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 relative flex flex-col items-center justify-center"
        style={{ minHeight: "180px" }}
      >
        <p className="text-lg font-semibold mb-2">{error}</p>
        <button
          onClick={fetchChallenge}
          className="px-4 py-2 bg-white text-orange-700 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-200 text-sm"
        >
          Retry
        </button>
      </motion.div>
    );
  }

  if (!currentChallenge) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 relative flex items-center justify-center"
        style={{ minHeight: "180px" }}
      >
        <p className="text-lg font-semibold">No challenge available.</p>
      </motion.div>
    );
  }

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
