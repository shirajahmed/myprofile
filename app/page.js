"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { routeFade } from "./utils/animation";
import Link from "next/link";

import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import TopNavbar from "./components/TopNavbar";
import Tools from "./components/Tools";
import ContactFormModal from "./components/ContactFormModal";
import DailyTechFact from "./components/DailyTechFact";
import AIPromptOfTheDay from "./components/AIPromptOfTheDay";
import DevQuizSection from "./components/DevQuizSection";
import FakeTerminal from "./components/FakeTerminal";
import ComplimentGenerator from "./components/ComplimentGenerator";
import MicroChallenge from "./components/MicroChallenge";

export default function Home() {
  const [showTools, setShowTools] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setCurrentDateTime(now.toLocaleDateString(undefined, options));
    };

    updateDateTime(); // Set initial time
    const intervalId = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleContactFormSubmit = async (formData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message.");
      }

      // Success, modal will handle success message
    } catch (error) {
      console.error("Frontend form submission error:", error);
      throw error; // Re-throw to be caught by the modal's catch block
    }
  };

  return (
    <>
      <TopNavbar setShowTools={setShowTools} />
      <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 mt-20">
        {/* Enhanced Sidebar */}
        <div className="h-fit col-span-12 lg:col-span-3">
          <Sidebar
            setShowTools={setShowTools}
            setShowContactForm={setShowContactForm}
          />
        </div>

        {/* Home Page Interactive Content */}
        <div className="col-span-12 lg:col-span-9">
          <MainContent>
            <motion.div
              className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={routeFade}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mb-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Welcome to my Homepage!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                    Current Date & Time: <br />
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {currentDateTime}
                    </span>
                  </p>
                </div>
                <Link href="/chat">
                  <button className="w-full mt-auto px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Start Anonymous Chat
                  </button>
                </Link>
              </div>
              <MicroChallenge />
              <DailyTechFact />
              <AIPromptOfTheDay />
              <DevQuizSection />
              <ComplimentGenerator />

              <FakeTerminal />
            </motion.div>
          </MainContent>
        </div>

        {showTools && <Tools setShowTools={setShowTools} />}
      </div>

      <ContactFormModal
        show={showContactForm}
        onClose={() => setShowContactForm(false)}
        onSubmit={handleContactFormSubmit}
      />
    </>
  );
}
