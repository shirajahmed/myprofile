"use client";
import { motion } from "framer-motion";
import { routeFade } from "../utils/animation";

export default function ToolPageWrapper({ children, title, description }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        className="bg-white/80 dark:bg-[#18191d]/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        variants={routeFade}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {(title || description) && (
          <div className="px-6 pt-6 pb-2">
            {title && <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h1>}
            {description && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{description}</p>}
          </div>
        )}
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}
