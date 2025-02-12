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
import { FaExternalLinkAlt } from "react-icons/fa";
import Tools from "./components/Tools";

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
      {/* // do this div style later (after putting the content) */}
      <div className="h-full col-span-12 p-4 text-base text-center bg-dark-500 lg:col-span-3 rounded-2xl shadow-custom-dark ">
        {/* //!sidebar */}
        <>
          <Image
            src="/shirajahmed.png"
            alt="web developer in silchar"
            className="mx-auto border rounded-xl"
            height={90}
            width={118}
            quality={90}
          />
          <h3 className="my-4 text-3xl font-medium tracking-wider text-white">
            <span className="text-[#a65fa8]">Shiraj</span> Ahmed
          </h3>
          <p className="px-2 py-1 my-3 bg-[#18191d] rounded-xl text-white">
            Web Developer
          </p>

          <a
            href="/shirajahmed.pdf"
            download="Shiraj Ahmed Laskar.pdf"
            className="flex items-center justify-center px-2 py-1 my-2 bg-[#18191d] rounded-xl text-white cursor-pointer"
          >
            <GiTie className="w-6 h-6" />
            <span>Download Resume</span>
          </a>

          <div className="flex justify-around w-9/12 mx-auto my-5 md:w-full">
            <a
              target="_blank"
              href="https://wa.me/8254038057?text=Hello%20there!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            >
              <AiOutlineWhatsApp className="w-8 text-green-500 h-8 cursor-pointer" />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/shirajahmed/">
              <AiFillLinkedin className="w-8 text-[#4376b0]  h-8 cursor-pointer" />
            </a>
            <a target="_blank" href="https://github.com/shirajahmed">
              <AiFillGithub className="w-8 h-8 cursor-pointer" />
            </a>
          </div>

          {/* Contacts */}
          <div className="py-4 my-5 bg-[#18191d] rounded-xl text-white">
            <div className="flex items-center mb-2 justify-center">
              <GoLocation className="mr-2 " /> <span>Assam, India</span>
            </div>
            <div className="flex items-center text-[fff] justify-center gap-6">
              <a
                href="mailto:shirajahmedlaskar@gmail.com"
                className="flex items-center gap-2 text-[fff] hover:underline"
              >
                <MdEmail size={20} />
              </a>
              <a
                href="tel:8254038057"
                className="flex items-center gap-2 text-[fff] hover:underline"
              >
                <MdPhone size={20} />
              </a>
            </div>
          </div>

          <MusicPlayer />

          <div
            onClick={() => setShowTools(true)}
            className="px-2 py-1 my-3 bg-[#18191d] rounded-xl text-white flex justify-center"
          >
            Tool <FaExternalLinkAlt size={14} className="ml-1" />
          </div>
        </>
      </div>
      <div className="flex flex-col col-span-12 overflow-hidden  shadow-custom-dark rounded-2xl lg:col-span-9 bg-dark-500">
        {/* //!navbar */}
        <div className="flex items-center justify-between px-5 py-3 my-3 bg-[#18191d] rounded-xl">
          <span className="text-xl font-bold border-b-4 md:text-2xl border-[#a65fa8] text-white">
            {navactive}
          </span>

          <div className="text-base font-normal md:text-xl flex gap-4 cursor-pointer ">
            {navactive !== "About" && (
              <span
                className="hover:text-gray-400"
                onClick={() => {
                  setNavactive("About");
                }}
              >
                About
              </span>
            )}
            {navactive !== "Resume" && (
              <span
                className="hover:text-gray-400"
                onClick={() => {
                  setNavactive("Resume");
                }}
              >
                Resume
              </span>
            )}
            {navactive !== "Projects" && (
              <span
                className="hover:text-gray-400"
                onClick={() => {
                  setNavactive("Projects");
                }}
              >
                Projects
              </span>
            )}
          </div>
        </div>
        {/* about */}
        {navactive === "About" && (
          <motion.div
            className="flex flex-col flex-grow px-6 pt-1 "
            variants={routeFade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h6 className="my-3 text-base font-medium">
              Highly motivated Web Developer Developer with 3+ years of
              experience seeking to leverage strong technical skills in Frontend
              as well as in Backend to contribute to a challenging and
              growth-oriented software engineering role #keep learning keep
              growing
            </h6>
            <div
              className="flex-grow p-4 mt-5 bg-dark-100 "
              style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem" }}
            >
              <h4 className="my-3 text-xl font-semibold tracking-wide">
                What I am doing
              </h4>

              <motion.div
                className="grid gap-6 my-3 md:grid-cols-2"
                variants={stagger}
                animate="animate"
                initial="initial"
              >
                {/* children's initial and animate property should be same as the parent during a stagger effect  */}
                {services.map((service) => (
                  <motion.div
                    className="col-span-2 p-2 rounded-lg bg-[#18191d] md:col-span-1 "
                    key={service.title}
                    variants={fadeInUp}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
        {/* project */}
        {navactive === "Projects" && (
          <motion.div
            className="trigerstop px-5 py-2 overflow-y-scroll "
            style={{ height: "65vh" }}
            variants={routeFade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ProjectsNavbar
              handlerFilterCategory={handlerFilterCategory}
              active={active}
            />

            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className=" grid grid-cols-12 gap-4 my-3"
            >
              {projects.map((project) => (
                <motion.div
                  variants={fadeInUp}
                  key={project.id}
                  initial="initial"
                  animate="animate"
                  className="col-span-12 p-2  rounded-lg sm:col-span-6 lg:col-span-4 bg-[#18191d]"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* resume */}
        {navactive === "Resume" && (
          <motion.div
            className="px-6 py-2"
            variants={routeFade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* //! Education & Experience */}
            <div className="flex">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <h5 className="my-3 text-2xl font-bold">Experience</h5>
                <div className="">
                  <h4 className="my-2 text-xl font-bold">
                    - Jr. Software Developer - April 2023 - Present
                  </h4>
                  <h4 className="my-2 text-xl font-bold">
                    - Full Stack Developer - Jan 2022 - March 2023
                  </h4>
                  <h4 className="my-2 text-md font-bold">
                    - BCA - 2018 - 2021
                  </h4>
                </div>
              </motion.div>
            </div>

            {/*Languages & Tools */}
            <div className="grid gap-9 md:grid-cols-2">
              <div>
                <h5 className="my-3 text-2xl font-bold">
                  Language & Framework
                </h5>
                <div className="my-2">
                  {languages.map((language, i) => (
                    <Bar value={language} key={i} />
                  ))}
                </div>
              </div>

              <div>
                <h5 className="my-3 text-2xl font-bold">Tools & Softwares</h5>
                <div className="my-2">
                  {tools.map((tool, i) => (
                    <Bar value={tool} key={i} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      {showTools && <Tools setShowTools={setShowTools} />}
    </div>
  );
}
