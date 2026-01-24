"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, routeFade, stagger } from "../utils/animation";
import ProjectsNavbar from "../components/ProjectsNavbar";
import ProjectCard from "../components/ProjectCard";
import { projects as projectsData } from "../utils/data";

export const metadata = {
  title: "Shiraj Ahmed's Projects - Web Development Portfolio",
  description:
    "Explore a collection of web development projects by Shiraj Ahmed. Featuring modern web applications built with React, Next.js, and other cutting-edge technologies.",
  keywords: "Shiraj Ahmed, Projects, Portfolio, Web Development, React Projects, Next.js Projects, JavaScript Projects, Frontend Projects, Full Stack Projects",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState(projectsData);
  const [active, setActive] = useState("all");

  const handlerFilterCategory = (category) => {
    if (category === "all") {
      setProjects(projectsData);
      setActive(category);
      return;
    }

    const newArray = projectsData.filter((project) =>
      project.category.includes(category)
    );
    setProjects(newArray);
    setActive(category);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#18191d] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <motion.div
        className="p-6 flex-1 overflow-y-auto"
        variants={routeFade}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Project Filter */}
        <div className="mb-6">
          <ProjectsNavbar
            handlerFilterCategory={handlerFilterCategory}
            active={active}
          />
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-[#a65fa8]/30 transition-all duration-300 hover:shadow-lg"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try selecting a different category</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}