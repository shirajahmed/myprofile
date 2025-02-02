"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { AiFillGithub, AiFillProject } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import { fadeInUp, stagger } from "../utils/animation";
import { motion } from "framer-motion";
import Image from "next/image";

const ProjectCard = ({
  project: {
    name,
    image_path,
    category,
    deployed_url,
    description,
    github_url,
    key_techs,
  },
}) => {
  const [showDetail, setShowDetail] = useState(false);
  // useEffect(() => {
  //   const element = document.querySelector(".trigerstop");
  //   // Disable background scrolling when modal is open
  //   if (showDetail) {
  //     document.body.style.overflow = "hidden";
  //     element.classList.add("stopscroll");
  //   } else {
  //     document.body.style.overflow = "auto"; // Allow scrolling when modal is closed
  //     element.classList.remove("stopscroll");
  //   }

  //   // Cleanup to reset scroll behavior when component unmounts or modal is closed
  //   return () => {
  //     document.body.style.overflow = "auto";
  //     element.classList.remove("stopscroll");
  //   };
  // }, [showDetail]);
  return (
    <div>
      <Image
        src={image_path}
        alt={name}
        className="cursor-pointer"
        onClick={() => setShowDetail(true)}
        layout="responsive"
        height="150"
        width="300"
        quality={10}
      />

      <p className="my-2 text-center">{name}</p>

      {showDetail && (
        <div>
          {/* Background Overlay with Blur */}
          <div className="fixed top-0 left-0 w-full h-full bg-[#0a0b0e] bg-opacity-70 backdrop-blur-sm z-0"></div>

          {/* Modal content */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 grid w-full max-w-[800px] h-auto p-2 bg-[#0a0b0e] rounded-sm md:grid-cols-2 gap-x-12 text-white">
            <motion.div variants={stagger} initial="initial" animate="animate">
              <motion.div
                className="border-4 border-gray-100 "
                variants={fadeInUp}
              >
                <Image
                  src={image_path}
                  alt={name}
                  className="overflow-hidden"
                  layout="responsive"
                  height="150"
                  width="300"
                />{" "}
              </motion.div>
              <motion.div
                className="flex justify-center my-4 space-x-3"
                variants={fadeInUp}
              >
                <a
                  href={github_url}
                  className="flex items-center rounded-xl px-4 py-2 space-x-3 text-lg bg-[#18191d]"
                >
                  <AiFillGithub /> <span>Github</span>
                </a>
                <a
                  href={deployed_url}
                  className="flex items-center rounded-xl px-4 py-2 space-x-3 text-lg bg-[#18191d]"
                >
                  <AiFillProject /> <span>Project</span>
                </a>
              </motion.div>
            </motion.div>

            <motion.div variants={stagger} initial="initial" animate="animate">
              <motion.h2
                variants={fadeInUp}
                className="mb-3 text-xl font-medium md:text-2xl "
              >
                {name}
              </motion.h2>
              <motion.h3
                variants={fadeInUp}
                className="my-3 text-base font-medium"
              >
                {description}
              </motion.h3>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap mt-5 space-x-2 text-sm tracking-wider"
              >
                {key_techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 my-1 bg-[#18191d] rounded-xl"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            <button
              onClick={() => setShowDetail(false)}
              className="absolute p-1 bg-[#18191d] rounded-md top-3 right-3 focus:outline-none"
            >
              <MdClose size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
