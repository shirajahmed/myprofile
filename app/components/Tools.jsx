"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { AiFillGithub, AiFillProject } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import { fadeInUp, stagger } from "../utils/animation";
import { motion } from "framer-motion";
import Image from "next/image";
import { toolsItem } from "../utils/data";
import Link from "next/link";

const Tools = ({ setShowTools }) => {
  return (
    <div>
      <div>
        {/* Background Overlay with Blur */}
        <div className="fixed top-0 left-0 w-full h-full bg-[#0a0b0e] bg-opacity-70 backdrop-blur-sm z-0"></div>

        {/* Modal content */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 grid w-full max-w-[800px] h-[80vh] max-h-[80vh] overflow-y-auto p-2 bg-[#0a0b0e] rounded-sm md:grid-cols-1 gap-x-12 text-white">
          <motion.div variants={stagger} initial="initial" animate="animate">
            <motion.div
              className="flex flex-wrap justify-center gap-4 py-6"
              variants={fadeInUp}
            >
              {toolsItem.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-auto bg-[#18191d] p-2 rounded-md"
                >
                  <Image
                    src={item.image_path}
                    alt={item.name}
                    className="overflow-hidden rounded-md"
                    height="100"
                    width="100"
                  />
                  <Link
                    href={item.deployed_url}
                    className="mt-2 text-sm font-medium text-center"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <button
            onClick={() => setShowTools(false)}
            className="absolute p-1 bg-[#18191d] rounded-md top-3 right-3 focus:outline-none"
          >
            <MdClose size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tools;
