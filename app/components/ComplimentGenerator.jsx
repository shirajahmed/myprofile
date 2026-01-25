// app/components/ComplimentGenerator.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const ComplimentGenerator = () => {
  const [currentCompliment, setCurrentCompliment] = useState(
    "Click the button for a boost!"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateCompliment = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/compliment-generator");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCurrentCompliment(data.compliment);
    } catch (err) {
      setError("Failed to generate compliment. Please try again.");
      console.error("Error fetching compliment:", err);
      setCurrentCompliment("Oops! Couldn't get a compliment right now. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 text-center"
    >
      <h3 className="text-xl font-bold mb-3">One-Click Compliment Generator ✨</h3>
      <p className="text-lg italic mb-4">
        {isLoading ? "Generating compliment..." : error || currentCompliment}
      </p>
      <button
        onClick={generateCompliment}
        disabled={isLoading}
        className="px-6 py-3 bg-white text-blue-700 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Make me smile 😊
      </button>
    </motion.div>
  );
};

export default ComplimentGenerator;
