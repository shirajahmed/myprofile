"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../utils/animation";
import ContentCard from "../components/ContentCard";
import Link from "next/link";
import {
  FaPlay,
  FaClock,
  FaCheckCircle,
  FaCode,
  FaQuestionCircle,
  FaShareAlt,
  FaLayerGroup,
} from "react-icons/fa";

export default function TrestPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    // Scan for Cliprame embeds on mount and whenever the component renders
    if (typeof window !== "undefined" && window.Cliprame?.scan) {
      window.Cliprame.scan();
    }
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const dummyChapters = [
    { time: "00:00", title: "Introduction & Overview", desc: "Setting up the stage and key concepts." },
    { time: "02:15", title: "Architecture & Framework", desc: "Breakdown of the component hierarchy and state flow." },
    { time: "05:40", title: "Live Implementation", desc: "Hands-on walkthrough with reactive streaming." },
    { time: "08:20", title: "Optimization & Edge Cases", desc: "Performance tuning and responsive adaptation." },
    { time: "11:05", title: "Wrap-up & Key Takeaways", desc: "Summary and next exploration steps." },
  ];

  const dummyFeatures = [
    {
      icon: "⚡",
      title: "Ultra-Fast Streaming",
      desc: "Optimized frame buffer with adaptive resolution for smooth playback.",
    },
    {
      icon: "🎨",
      title: "Adaptive Theme",
      desc: "Seamless integration conforming automatically to dark and light mode palette.",
    },
    {
      icon: "📱",
      title: "Cross-Device Responsive",
      desc: "Calculated aspect ratio adapting dynamically across mobiles, tablets, and wide monitors.",
    },
    {
      icon: "🔒",
      title: "Private & Safe",
      desc: "Secure sandbox isolation with explicit client controls and restricted indexation.",
    },
  ];

  const dummyFaqs = [
    {
      q: "What is this video showcase demonstrating?",
      a: "This demonstration highlights the integration of interactive, high-fidelity media widgets directly within modern Next.js server and client boundaries.",
    },
    {
      q: "How does the responsive embed resize automatically?",
      a: "The player listens to origin message events and recalculates container aspect ratios on the fly to support 16:9, vertical 9:16, or square formats.",
    },
    {
      q: "Can custom playback hooks and callbacks be attached?",
      a: "Yes, event listeners can be configured to bind into analytics triggers, chapter bookmarks, or completion milestones.",
    },
    {
      q: "Is this page publicly indexed on search engines?",
      a: "No, strict noindex and nofollow directives are enforced across metadata and robots.txt.",
    },
  ];

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
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto py-4 sm:py-6 space-y-10"
        >
          {/* Header Section */}
          <motion.div variants={fadeInUp} className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a65fa8]/10 border border-[#a65fa8]/30 text-[#a65fa8] text-sm font-medium mb-3">
              <span>🎬</span>
              <span>Featured Stream</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Trest <span className="text-[#a65fa8]">Video Showcase</span>
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-base sm:text-lg">
              Interactive video stream and multimedia experience powered by Cliprame.
            </p>
          </motion.div>

          {/* Embed Container */}
          <motion.div
            variants={fadeInUp}
            className="relative rounded-2xl p-2 sm:p-4 bg-gray-100/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 shadow-xl backdrop-blur-md"
          >
            <div className="w-full overflow-hidden rounded-xl">
              <div
                className="cliprame-embed w-full"
                data-video="9q4wRmqY7ZFdti3P"
                data-heatmap="on"
              ></div>
            </div>
          </motion.div>

          {/* Dummy Section 1: Overview & Quick Metrics */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { label: "Duration", val: "12m 45s", icon: <FaClock className="text-[#a65fa8]" /> },
              { label: "Quality", val: "4K UHD 60fps", icon: <FaPlay className="text-[#a65fa8]" /> },
              { label: "Type", val: "Interactive Demo", icon: <FaLayerGroup className="text-[#a65fa8]" /> },
              { label: "Status", val: "Verified Stream", icon: <FaCheckCircle className="text-emerald-500" /> },
            ].map((metric, i) => (
              <div
                key={i}
                className="bg-gray-100/60 dark:bg-[#18191d] border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                    {metric.label}
                  </span>
                  {metric.icon}
                </div>
                <div className="text-lg font-bold text-gray-800 dark:text-white">
                  {metric.val}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Dummy Section 2: Core Highlights & Capabilities */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Key Features & Capabilities
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dummyFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-gray-100/50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60 hover:border-[#a65fa8]/40 transition-all duration-300"
                >
                  <div className="text-2xl mb-2">{feat.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dummy Section 3: Interactive Chapter Breakdown */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📌</span>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Chapter Breakdown
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100/30 dark:bg-[#18191d]/60 overflow-hidden">
              {dummyChapters.map((chapter, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2 hover:bg-gray-200/40 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-[#a65fa8]/15 text-[#a65fa8] border border-[#a65fa8]/30">
                      {chapter.time}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {chapter.title}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 sm:text-right">
                    {chapter.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dummy Section 4: Architecture & Integration Notes */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-3">
              <FaCode className="text-[#a65fa8] text-xl" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Integration Architecture
              </h2>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100/60 dark:bg-[#18191d] p-5 space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The embedded player dynamically mounts using Next.js client-side script orchestration,
                invoking the global scan dispatcher to instantiate responsive aspect ratios:
              </p>
              <div className="bg-gray-900 text-purple-300 font-mono text-xs sm:text-sm p-4 rounded-lg overflow-x-auto border border-purple-500/20">
                <code>{`<div class="cliprame-embed" data-video="9q4wRmqY7ZFdti3P" data-heatmap="on"></div>\n<script src="https://www.cliprame.com/embed.js" async></script>`}</code>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Next.js 16", "Client Hydration", "Cliprame SDK", "Framer Motion", "Tailwind CSS"].map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Dummy Section 5: Frequently Asked Questions */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-3">
              <FaQuestionCircle className="text-[#a65fa8] text-xl" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {dummyFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleFaq(idx)}
                  className="cursor-pointer rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-[#18191d]/60 p-4 transition-colors hover:border-[#a65fa8]/40"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-base">
                      {faq.q}
                    </h3>
                    <span className="text-[#a65fa8] font-bold text-lg">
                      {activeFaq === idx ? "−" : "+"}
                    </span>
                  </div>
                  {activeFaq === idx && (
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 pt-3 border-t border-gray-200 dark:border-gray-800 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dummy Section 6: Action & Navigation Hub */}
          <motion.div
            variants={fadeInUp}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#a65fa8]/15 via-purple-500/10 to-transparent border border-[#a65fa8]/30 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Explore More Projects & Developer Tools
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Check out other interactive applications, open source showcases, and utility tools.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/projects"
                className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#a65fa8] to-purple-600 text-white font-medium shadow-md hover:scale-105 transition-all text-sm"
              >
                View Projects
              </Link>
              <Link
                href="/tools"
                className="flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium transition-all text-sm border border-gray-300 dark:border-gray-700"
              >
                Open Tools
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </ContentCard>
    </>
  );
}
