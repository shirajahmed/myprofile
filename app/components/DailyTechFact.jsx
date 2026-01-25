// app/components/DailyTechFact.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const techFacts = [
  "Did you know? The first website is still online.",
  "The 'C' in CPU stands for Central.",
  "The first computer programmer was Ada Lovelace.",
  "Google was originally called 'Backrub'.",
  "The average person blinks 15-20 times per minute, but on a computer, it's closer to 5-7.",
];

const devMemes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "Debugging: Removing the needles from the haystack, one by one.",
  "My code doesn't have bugs, it has random features.",
  "Talk is cheap. Show me the code. - Linus Torvalds",
];

const DailyTechFact = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();

    // Alternate between facts and memes based on the day
    if (day % 2 === 0) {
      // Even day, show a tech fact
      setContent(techFacts[day % techFacts.length]);
    } else {
      // Odd day, show a dev meme
      setContent(devMemes[day % devMemes.length]);
    }
  }, []);

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
