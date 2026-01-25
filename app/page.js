"use client";
import { useState } from "react";
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
  const [showContactForm, setShowContactForm] = useState(false); // New state for contact form

  const handleContactFormSubmit = async (formData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message.');
      }

      // Success, modal will handle success message
    } catch (error) {
      console.error('Frontend form submission error:', error);
      throw error; // Re-throw to be caught by the modal's catch block
    }
  };

  return (
    <>
      <TopNavbar setShowTools={setShowTools} />
      <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 mt-20">
        {/* Enhanced Sidebar */}
        <div className="h-full col-span-12 lg:col-span-3">
          <Sidebar setShowTools={setShowTools} setShowContactForm={setShowContactForm} />
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
              <DailyTechFact />
              <AIPromptOfTheDay />
              <DevQuizSection />
              <FakeTerminal />
              <ComplimentGenerator />
              <MicroChallenge />
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