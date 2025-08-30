import { motion } from "framer-motion";
import { fadeInUp, routeFade, stagger } from "../utils/animation";
import ServiceCard from "./ServiceCard";
import ProjectsNavbar from "./ProjectsNavbar";
import ProjectCard from "./ProjectCard";
import Bar from "./Bar";
import { services, languages, tools } from "../utils/data";

const tabs = [
  { id: "About", label: "About", icon: "👨‍💻" },
  { id: "Resume", label: "Resume", icon: "📄" },
  { id: "Projects", label: "Projects", icon: "🚀" }
];

export default function MainContent({ 
  navactive, 
  setNavactive, 
  projects, 
  handlerFilterCategory, 
  active 
}) {
  return (
    <div className="flex flex-col h-full bg-[#18191d] rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
      {/* Enhanced Tab Navigation */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        {/* Mobile Layout */}
        <div className="block sm:hidden px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {tabs.find(tab => tab.id === navactive)?.icon}
              </span>
              <h1 className="text-lg font-bold text-white">
                {navactive}
              </h1>
            </div>
          </div>
          
          <div className="flex gap-1 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setNavactive(tab.id)}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 flex-shrink-0 text-sm ${
                  navactive === tab.id
                    ? "bg-[#a65fa8] text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {tabs.find(tab => tab.id === navactive)?.icon}
            </span>
            <h1 className="text-2xl font-bold text-white">
              {navactive}
            </h1>
          </div>

          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setNavactive(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  navactive === tab.id
                    ? "bg-[#a65fa8] text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* About Section */}
        {navactive === "About" && (
          <motion.div
            className="p-6"
            variants={routeFade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Introduction */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-[#a65fa8]/10 to-purple-600/10 border border-[#a65fa8]/20 rounded-xl p-6">
                <p className="text-gray-300 leading-relaxed text-lg">
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
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
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
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-1 hover:border-[#a65fa8]/30 transition-all duration-300"
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Projects Section */}
        {navactive === "Projects" && (
          <motion.div
            className="p-6"
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
                  className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-[#a65fa8]/30 transition-all duration-300 hover:shadow-lg"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>

            {projects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                <p className="text-gray-400">Try selecting a different category</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Resume Section */}
        {navactive === "Resume" && (
          <motion.div
            className="p-6"
            variants={routeFade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Experience Section */}
            <div className="mb-8">
              <motion.div variants={fadeInUp} initial="initial" animate="animate">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
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
                          : 'bg-gray-800/50 border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <span className={`text-sm px-3 py-1 rounded-full ${
                          item.type === 'current' 
                            ? 'bg-[#a65fa8] text-white' 
                            : 'bg-gray-700 text-gray-300'
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
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span>🛠️</span>
                  Languages & Frameworks
                </h2>
                <div className="space-y-4">
                  {languages.map((language, i) => (
                    <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <Bar value={language} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span>⚙️</span>
                  Tools & Software
                </h2>
                <div className="space-y-4">
                  {tools.map((tool, i) => (
                    <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <Bar value={tool} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
