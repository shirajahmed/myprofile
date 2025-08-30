"use client";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { GiTie } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import Image from "next/image";
import { useState } from "react";
import {
  languages,
  projects as projectsData,
  services,
  tools,
} from "./utils/data";
import { motion } from "framer-motion";
import { fadeInUp, routeFade, stagger } from "./utils/animation";
import MusicPlayer from "./components/MusicPlayer";
import ServiceCard from "./components/ServiceCard";
import ProjectsNavbar from "./components/ProjectsNavbar";
import Bar from "./components/Bar";
import ProjectCard from "./components/ProjectCard";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaExternalLinkAlt, FaTools } from "react-icons/fa";
import Tools from "./components/Tools";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

export default function Home() {
  const [projects, setProjects] = useState(projectsData);
  const [active, setActive] = useState("all");
  const [navactive, setNavactive] = useState("About");
  const [showTools, setShowTools] = useState(false);

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
    <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 ">
      {/* Enhanced Sidebar */}
      <div className="h-full col-span-12 lg:col-span-3">
        <Sidebar setShowTools={setShowTools} />
      </div>

      {/* Enhanced Main Content */}
      <div className="col-span-12 lg:col-span-9">
        <MainContent
          navactive={navactive}
          setNavactive={setNavactive}
          projects={projects}
          handlerFilterCategory={handlerFilterCategory}
          active={active}
        />
      </div>

      {showTools && <Tools setShowTools={setShowTools} />}
    </div>
  );
}
