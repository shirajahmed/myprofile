"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../utils/animation";
import ProjectsNavbar from "../components/ProjectsNavbar";
import ProjectCard from "../components/ProjectCard";
import { projects as projectsData } from "../utils/data";
import ContentCard from "../components/ContentCard"; // New import


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
    <ContentCard> {/* Wrap content in ContentCard */}
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
    </ContentCard>
  );
}
