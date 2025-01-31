"use client";
import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { GiTie } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import Image from "next/image";

const Sidebar = () => {
  return (
    <>
      <Image
        src="/shirajahmed.jpg"
        alt="avatar"
        className="mx-auto border rounded-full"
        height={128}
        width={128}
        quality={100}
      />
      <h3 className="my-4 text-3xl font-medium tracking-wider text-white">
        <span className="text-green-500">Sumit</span> Dey
      </h3>
      <p className="px-2 py-1 my-3 bg-gray-700 text-white rounded-full">
        Web Developer
      </p>
      {/* Resume */}
      <a
        href="/assets/Sumit Dey Resume.pdf"
        download="Sumit Dey Resume.pdf"
        className="flex items-center justify-center px-2 py-1 my-2 bg-gray-700 text-white rounded-full cursor-pointer"
      >
        <GiTie className="w-6 h-6" />
        <span>Download Resume</span>
      </a>

      {/* Socials */}
      <div className="flex justify-around w-9/12 mx-auto my-5 text-green-500 md:w-full">
        <a href="https://www.youtube.com/channel/UClW8d1f5m0QAE_Ig024EP6A">
          <AiFillYoutube className="w-8 h-8 cursor-pointer" />
        </a>
        <a href="https://www.linkedin.com/in/sumit-dey-4a04431a9/">
          <AiFillLinkedin className="w-8 h-8 cursor-pointer" />
        </a>
        <a href="https://www.instagram.com/_sumax__/">
          <AiFillGithub className="w-8 h-8 cursor-pointer" />
        </a>
      </div>

      {/* Contacts */}
      <div
        className="py-4 my-5 bg-gray-700 text-white"
        style={{ marginLeft: "-1rem", marginRight: "-1rem" }}
      >
        <div className="flex items-center justify-center">
          <GoLocation className="mr-2" /> <span>Kolkata, India</span>
        </div>
        <p className="my-2">code.sumax@gmail.com</p>
        <p className="my-2">8514961665 / 8640960375</p>
      </div>

      {/* Email Button */}
      <button
        className="w-8/12 px-5 py-2 text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-full cursor-pointer hover:scale-105 focus:outline-none"
        onClick={() => window.open("mailto:code.sumax@gmail.com")}
      >
        Email me
      </button>
      <button className="w-8/12 px-5 py-2 my-4 text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-full cursor-pointer hover:scale-105 focus:outline-none">
        Toggle Theme
      </button>
    </>
  );
};

export default Sidebar;
