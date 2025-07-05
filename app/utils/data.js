import { RiComputerLine } from "react-icons/ri";
import { FaServer, FaTools } from "react-icons/fa";
import { AiOutlineAntDesign, AiOutlineApi } from "react-icons/ai";
import { MdDeveloperMode } from "react-icons/md";

import { BsCircleFill } from "react-icons/bs";

export const services = [
  {
    Icon: RiComputerLine,
    title: "Frontend Development",
    about:
      "Building modern, responsive, and user-friendly web interfaces focused on performance and scalability.",
  },
  {
    Icon: FaServer,
    title: "Backend Development",
    about:
      "Managing server-side logic, databases, and integrations to ensure reliable and secure applications.",
  },
  {
    Icon: AiOutlineApi,
    title: "API Development",
    about:
      "Creating well-structured and efficient APIs for seamless communication between systems.",
  },
  {
    Icon: MdDeveloperMode,
    title: "Problem Solving",
    about:
      "Regularly solving real-world challenges to enhance logic, coding skills, and development efficiency.",
  },
  {
    Icon: FaTools,
    title: "Support & Maintenance",
    about:
      "Providing ongoing technical support, issue resolution, and maintaining code and server environments.",
  },
  {
    Icon: RiComputerLine,
    title: "Other Expertise",
    about:
      "Basic experience in SEO, performance optimization, and social media setup for web applications.",
  },
];

export const languages = [
  {
    Icon: BsCircleFill,
    name: "Java Script",
    level: "70",
  },
  {
    Icon: BsCircleFill,
    name: "React",
    level: "75",
  },
  {
    Icon: BsCircleFill,
    name: "Next JS",
    level: "80",
  },
  {
    Icon: BsCircleFill,
    name: "HTML/CSS",
    level: "85",
  },
  {
    Icon: BsCircleFill,
    name: "Tailwind",
    level: "80",
  },
  {
    Icon: BsCircleFill,
    name: "Material UI",
    level: "80",
  },
  {
    Icon: BsCircleFill,
    name: "MERN",
    level: "50",
  },
  {
    Icon: BsCircleFill,
    name: "Database(SQL,PostgreSQL,MongoDB)",
    level: "50",
  },
  {
    Icon: BsCircleFill,
    name: "Wordpress, PHP",
    level: "70",
  },
];

export const tools = [
  {
    Icon: BsCircleFill,
    name: "Figma",
    level: "85",
  },
  {
    Icon: BsCircleFill,
    name: "GIT",
    level: "65",
  },
  {
    Icon: BsCircleFill,
    name: "Graphics",
    level: "70",
  },
];

export const projects = [
  {
    name: "Tijarah360",
    description: "Retail Software",
    image_path: "/images/tijarah.png",
    deployed_url: "https://tijarah360.com/",
    github_url: "",
    category: ["nextjs"],
    key_techs: ["Nextjs", "React", "Chart.js", "Material UI"],
  },
  {
    name: "Monthly Calender Event",
    image_path: "/images/mc.png",
    deployed_url: "https://monthly-calendar-ten.vercel.app/",
    github_url: "https://github.com/shirajahmed/monthly-calendar/",
    category: ["react"],
    description: "way to manage task",
    key_techs: ["React", "Vite", "tailwindcss", "Framer Motion"],
  },
];
export const toolsItem = [
  {
    name: "Password Generator",
    description: "pass gen tools",
    image_path: "/tools/passwordgenerator.png",
    deployed_url: "/tools/password-genertor",
    category: ["utility"],
  },
  {
    name: "Color Generator",
    description: "color gen tools",
    image_path: "/tools/colorgenerator.png",
    deployed_url: "/tools/color-generator",
    category: ["utility"],
  },
  {
    name: "QR Generator",
    description: "color gen tools",
    image_path: "/tools/qrgenerator.png",
    deployed_url: "/tools/qr-generator",
    category: ["utility"],
  },
];
