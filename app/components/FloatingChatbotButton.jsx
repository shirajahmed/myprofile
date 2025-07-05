"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaTimes } from "react-icons/fa";
import Chatbot from "./Chatbot";

export default function FloatingChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={toggleChatbot}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Open AI Chatbot"
            >
              <FaComments size={24} />
              <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                AI
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              // onClick={toggleChatbot}
            />

            {/* Chatbot Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              className="fixed z-50 inset-4 md:inset-8 lg:inset-16 xl:left-1/4 xl:right-1/4 xl:top-16 xl:bottom-16"
              style={{ height: "90vh", maxHeight: "100vh", overflowY: "auto" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-2xl shadow-2xl overflow-hidden relative">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-sm py-2 px-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaComments className="text-white text-2xl" />
                    <h2 className="text-white text-xl font-bold">
                      🤖 Voice Chatbot
                    </h2>
                  </div>
                  <button
                    onClick={toggleChatbot}
                    className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
                    title="Close Chatbot"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Chatbot Content */}
                <div className="pt-[40px]  h-full">
                  <div className="h-full">
                    <Chatbot />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
