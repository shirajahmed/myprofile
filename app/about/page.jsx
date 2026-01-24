"use client";
import { motion } from "framer-motion";
import { fadeInUp, routeFade, stagger } from "../utils/animation";
import ServiceCard from "../components/ServiceCard";
import Bar from "../components/Bar";
import { services, languages, tools } from "../utils/data";
import { Fragment } from "react";



export default function AboutPage() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#18191d] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <motion.div
        className="p-6 flex-1 overflow-y-auto"
        variants={routeFade}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Introduction */}
        <div className="mb-8">
          <div className="bg-gray-100 dark:bg-[#18191d] border border-gray-200 dark:border-[#a65fa8]/20 rounded-xl p-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              Highly motivated <span className="text-[#a65fa8] font-semibold">Web Developer</span> with over 3 years of experience,
              skilled in both frontend and backend development. Seeking to
              contribute to a challenging, growth-focused engineering role by
              leveraging strong problem-solving abilities and a passion for
              building efficient, scalable web applications.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[#a65fa8] font-medium">
              <span>🚀</span>
              <span>#KeepLearning #KeepGrowing</span>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
            <span>⚡</span>
            What I Do
          </h2>
          
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-1 hover:border-[#a65fa8]/30 transition-all duration-300"
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Resume Section */}
        <div className="p-6"> {/* Remove redundant p-6 if already in parent motion.div */}
          {/* Experience Section */}
          <div className="mb-8">
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <span>💼</span>
                Experience
              </h2>
              
              <div className="space-y-4">
                {[
                  { title: "Web Developer", period: "May 2025 - Present", type: "current" },
                  { title: "Jr. Software Developer", period: "2023 - 2025", type: "previous" },
                  { title: "Full Stack Developer", period: "2022 - 2023", type: "previous" },
                  { title: "BCA Graduate", period: "2018 - 2021", type: "education" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      item.type === 'current' 
                        ? 'bg-[#a65fa8]/10 border-[#a65fa8]/30' 
                        : 'bg-gray-100/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        item.type === 'current' 
                          ? 'bg-[#a65fa8] text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        {item.period}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Skills Section */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <span>🛠️</span>
                Languages & Frameworks
              </h2>
              <div className="space-y-4">
                {languages.map((language, i) => (
                  <div key={i} className="bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <Bar value={language} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <span>⚙️</span>
                Tools & Software
              </h2>
              <div className="space-y-4">
                {tools.map((tool, i) => (
                  <div key={i} className="bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <Bar value={tool} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
