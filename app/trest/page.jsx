"use client";

import { useEffect } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animation";
import ContentCard from "../components/ContentCard";

export default function TrestPage() {
  useEffect(() => {
    // Scan for Cliprame embeds on mount and whenever the component renders
    if (typeof window !== "undefined" && window.Cliprame?.scan) {
      window.Cliprame.scan();
    }
  }, []);

  return (
    <>
      <Script
        src="https://www.cliprame.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.Cliprame?.scan) {
            window.Cliprame.scan();
          }
        }}
      />

      <ContentCard>
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto py-4 sm:py-6"
        >
          {/* Header Section */}
          <div className="mb-6 sm:mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a65fa8]/10 border border-[#a65fa8]/30 text-[#a65fa8] text-sm font-medium mb-3">
              <span>🎬</span>
              <span>Featured Stream</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Trest <span className="text-[#a65fa8]">Video</span>
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-base sm:text-lg">
              Interactive video experience powered by Cliprame.
            </p>
          </div>

          {/* Embed Container */}
          <div className="relative rounded-2xl p-2 sm:p-4 bg-gray-100/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 shadow-xl backdrop-blur-md">
            <div className="w-full overflow-hidden rounded-xl">
              <div
                className="cliprame-embed w-full"
                data-video="v9PeFYPMif6hs3tS"
              ></div>
            </div>
          </div>
        </motion.div>
      </ContentCard>
    </>
  );
}
