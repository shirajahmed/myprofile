import { RiComputerLine } from "react-icons/ri";
import { FaServer } from "react-icons/fa";
import { AiOutlineAntDesign, AiOutlineApi } from "react-icons/ai";
import { MdDeveloperMode } from "react-icons/md";

import { BsCircleFill } from "react-icons/bs";

export const services = [
  {
    Icon: RiComputerLine,
    title: "Frontend Development",
    about:
      "I can build a beautiful and scalable SPA using <b> HTML</b>,<b>CSS</b>   and <b>React.js</b> ",
  },
  {
    Icon: FaServer,
    title: "Backend  Development",
    about:
      "Handle database, server, api using <b>Express </b> & other popular frameworks",
  },
  {
    Icon: AiOutlineApi,
    title: "API Development",
    about: "I can develop robust  REST API using <b>Node API</b> ",
  },
  {
    Icon: MdDeveloperMode,
    title: "Competitive Coder",
    about:
      "A daily problem solver in <b>HackerRank</b>  and <b>Freecode Camp</b> ",
  },
  {
    Icon: AiOutlineAntDesign,
    title: "UI/UX designer",
    about: "Stunning user interface designer",
  },
  {
    Icon: RiComputerLine,
    title: "Other",
    about: "Can work on SEO, Social media marketing",
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
