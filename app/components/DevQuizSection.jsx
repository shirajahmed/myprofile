// app/components/DevQuizSection.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const DevQuizSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6"
    >
      <h3 className="text-xl font-bold mb-3">Which Dev Are You? 🤔</h3>
      <p className="text-lg">
        Ever wondered what kind of developer you truly are? Click here to find
        out with our fun quiz!
      </p>
      <button className="mt-4 px-6 py-3 bg-white text-green-700 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-200">
        Take the Quiz!
      </button>
    </motion.div>
  );
};

export default DevQuizSection;
