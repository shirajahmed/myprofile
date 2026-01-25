// app/components/DailyTechFact.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DailyTechFact = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyFact = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/daily-fact");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContent(data.fact);
      } catch (err) {
        setError("Failed to load daily fact. Please try again.");
        console.error("Error fetching daily fact:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyFact();
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 flex items-center justify-center"
        style={{ minHeight: "180px" }}
      >
        <p className="text-lg font-semibold">Loading daily fact...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 flex flex-col items-center justify-center"
        style={{ minHeight: "180px" }}
      >
        <p className="text-lg font-semibold mb-2">{error}</p>
        {/* Optionally add a retry button if you want */}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6"
    >
      <h3 className="text-xl font-bold mb-3">Daily Tech Fact / Meme 😂</h3>
      <p className="text-lg italic font-medium">{content}</p>
    </motion.div>
  );
};

export default DailyTechFact;
