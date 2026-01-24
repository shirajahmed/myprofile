"use client";
import TopNavbar from "./TopNavbar";
import Tools from "./Tools";
import { useState } from "react";

export default function MainPageLayout({ children }) {
  const [showTools, setShowTools] = useState(false);

  return (
    <>
      <TopNavbar setShowTools={setShowTools} />
      <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 mt-20">
        {/* This div takes the full width, emulating the main content area without a sidebar */}
        <div className="col-span-12">
          {children}
        </div>
      </div>
      {showTools && <Tools setShowTools={setShowTools} />}
    </>
  );
}
