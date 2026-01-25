// app/components/FakeTerminal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Typewriter = ({ text, delay, onTypingEnd }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onTypingEnd) {
      onTypingEnd();
    }
  }, [currentIndex, delay, text, onTypingEnd]);

  return <span>{currentText}</span>;
};

const FakeTerminal = () => {
  const [showWhoamiResult, setShowWhoamiResult] = useState(false);
  const [showSkillsCommand, setShowSkillsCommand] = useState(false);
  const [showSkillsResult, setShowSkillsResult] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gray-900 text-green-400 font-mono p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 overflow-hidden"
    >
      <h3 className="text-xl font-bold mb-3 text-white">
        Terminal Simulator 💻
      </h3>
      <div className="flex items-center mb-2">
        <span className="text-red-500 mr-2">➜</span>
        <span className="text-cyan-400 mr-2">~</span>
        <span className="text-green-400">$</span>
        <span className="ml-2">
          <Typewriter
            text="whoami"
            delay={100}
            onTypingEnd={() => setShowWhoamiResult(true)}
          />
        </span>
      </div>
      {showWhoamiResult && (
        <p className="ml-8 text-white">
          <Typewriter text="Shiraj – Full Stack Dev 😎" delay={50} />
        </p>
      )}

      <div className="flex items-center mb-2 mt-4">
        <span className="text-red-500 mr-2">➜</span>
        <span className="text-cyan-400 mr-2">~</span>
        <span className="text-green-400">$</span>
        <span className="ml-2">
          {showWhoamiResult && (
            <Typewriter
              text="skills"
              delay={100}
              onTypingEnd={() => setShowSkillsResult(true)}
            />
          )}
        </span>
      </div>
      {showSkillsResult && (
        <p className="ml-8 text-white">
          <Typewriter text="React, Next, Node, AI" delay={50} />
        </p>
      )}
    </motion.div>
  );
};

export default FakeTerminal;
