"use client";
import { motion } from "framer-motion";
import { routeFade } from "../utils/animation";

export default function ContentCard({ children }) {
  return (
    <motion.div
      className="flex flex-col h-full bg-white dark:bg-[#18191d] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      variants={routeFade}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="p-6 flex-1 overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
}
