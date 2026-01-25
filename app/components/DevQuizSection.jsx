// app/components/DevQuizSection.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const DevQuizSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 relative"
    >
      <h3 className="text-xl font-bold mb-3">Which Dev Are You? 🤔</h3>
      <p className="text-lg">
        Ever wondered what kind of developer you truly are? Click here to find
        out with our fun quiz!
      </p>
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 px-6 py-3 bg-white text-green-700 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-200"
      >
        Take the Quiz!
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center relative max-w-sm w-full"
          >
            <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Quiz Coming Soon!
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our "Which Dev Are You?" quiz is under construction. Stay tuned
              for an exciting experience!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Got it!
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default DevQuizSection;
