"use client";


import { useState } from "react";
import { motion } from "framer-motion";
import { routeFade } from "./utils/animation";

import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import TopNavbar from "./components/TopNavbar";
import Tools from "./components/Tools";

export default function Home() {
  const [showTools, setShowTools] = useState(false);

  return (
    <>
      <TopNavbar setShowTools={setShowTools} />
      <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 mt-20">
        {/* Enhanced Sidebar */}
        <div className="h-full col-span-12 lg:col-span-3">
          <Sidebar setShowTools={setShowTools} />
        </div>

        {/* Placeholder for Home Page Content */}
        <div className="col-span-12 lg:col-span-9">
          <MainContent>
            <motion.div
              className="p-6"
              variants={routeFade}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Welcome to my Homepage!
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                This section is reserved for future engaging content. Stay
                tuned!
              </p>
            </motion.div>
          </MainContent>
        </div>

        {showTools && <Tools setShowTools={setShowTools} />}
      </div>
    </>
  );
}
