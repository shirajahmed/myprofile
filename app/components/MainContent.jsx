// app/components/MainContent.jsx
import { motion } from "framer-motion";
import { routeFade } from "../utils/animation";

export default function MainContent({ children }) {
  return (
    <motion.div
      className="flex flex-col h-full bg-white dark:bg-[#18191d] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      variants={routeFade}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}