// app/components/AIPromptOfTheDay.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const aiPrompts = [
  "Generate a short story about a sentient AI who discovers art.",
  "Describe a future where AI handles all mundane tasks, and humans pursue creative endeavors.",
  "What are the ethical implications of using AI for personalized education?",
  "Write a poem from the perspective of an AI learning about human emotions.",
  "Design a new AI-powered gadget that solves an everyday problem.",
];

const AIPromptOfTheDay = () => {
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    setPrompt(aiPrompts[day % aiPrompts.length]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gradient-to-r from-pink-600 to-red-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6"
    >
      <h3 className="text-xl font-bold mb-3">AI Prompt of the Day 🤖</h3>
      <p className="text-lg italic font-medium">{prompt}</p>
    </motion.div>
  );
};

export default AIPromptOfTheDay;
