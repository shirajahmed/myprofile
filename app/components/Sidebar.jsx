import Image from "next/image";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaTools, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import MusicPlayer from "./MusicPlayer";

export default function Sidebar({ setShowTools }) {
  const socialLinks = [
    {
      href: "https://wa.me/8254038057?text=Hello%20there!%20I%20would%20like%20to%20know%20more%20about%20your%20services.",
      icon: AiOutlineWhatsApp,
      color: "text-green-500 hover:text-green-400",
      label: "WhatsApp",
    },
    {
      href: "https://www.linkedin.com/in/shirajahmed/",
      icon: AiFillLinkedin,
      color: "text-blue-500 hover:text-blue-400",
      label: "LinkedIn",
    },
    {
      href: "https://github.com/shirajahmed",
      icon: AiFillGithub,
      color: "text-gray-300 hover:text-white",
      label: "GitHub",
    },
  ];

  const contactInfo = [
    {
      icon: GoLocation,
      text: "Assam, India",
      type: "location",
    },
    {
      icon: MdEmail,
      text: "shirajahmedlaskar@gmail.com",
      href: "mailto:shirajahmedlaskar@gmail.com",
      type: "email",
    },
    {
      icon: MdPhone,
      text: "+91 8254038057",
      href: "tel:8254038057",
      type: "phone",
    },
  ];

  return (
    <div className="h-full bg-[#18191d] rounded-2xl p-6 shadow-lg border border-gray-700 flex flex-col">
      {/* Profile Section */}
      <div className="text-center mb-6">
        <div className="relative mb-4">
          <Image
            src="/shirajahmed.png"
            alt="Shiraj Ahmed - Web Developer"
            className="mx-auto rounded-2xl border-2 border-[#a65fa8]/30 shadow-lg"
            height={120}
            width={120}
            quality={90}
          />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-[#18191d] animate-pulse"></div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">
          <span className="text-[#a65fa8]">Shiraj</span> Ahmed
        </h3>

        <div className="inline-flex items-center px-3 py-1 bg-[#a65fa8]/20 border border-[#a65fa8]/30 rounded-full">
          <div className="w-2 h-2 bg-[#a65fa8] rounded-full mr-2 animate-pulse"></div>
          <span className="text-[#a65fa8] text-sm font-medium">
            Web Developer
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => setShowTools(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#a65fa8] to-purple-600 hover:from-[#a65fa8]/80 hover:to-purple-600/80 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <FaTools size={16} />
          <span>Explore Tools</span>
          <FaExternalLinkAlt size={14} />
        </button>

        {/* <a
          href="/shirajahmed.pdf"
          download="Shiraj Ahmed Resume.pdf"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium transition-all duration-300 border border-gray-600 hover:border-gray-500"
        >
          <FaDownload size={16} />
          <span>Download Resume</span>
        </a> */}
      </div>

      {/* Social Links */}
      <div className="mb-6">
        <h4 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
          Connect
        </h4>
        <div className="flex justify-center gap-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-110 ${social.color}`}
              title={social.label}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        <h4 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
          Contact
        </h4>
        <div className="space-y-3">
          {contactInfo.map((contact, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <contact.icon
                className="text-[#a65fa8] flex-shrink-0"
                size={18}
              />
              {contact.href ? (
                <a
                  href={contact.href}
                  className="text-gray-300 hover:text-white text-sm transition-colors truncate"
                  title={contact.text}
                >
                  {contact.type === "email"
                    ? "shirajahmed@gmail.com"
                    : contact.text}
                </a>
              ) : (
                <span className="text-gray-300 text-sm">{contact.text}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Music Player */}
      <div className="mb-6">
        <MusicPlayer />
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Made with <span className="text-red-400">❤️</span> by Shiraj Ahmed
          <br />
          <span className="text-gray-600">
            © {new Date().getFullYear()} All rights reserved
          </span>
          <br />
          <a 
            href="/privacy-policy" 
            className="text-[#a65fa8] hover:text-purple-400 transition-colors underline"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
