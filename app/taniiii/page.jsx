"use client";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Taniiii() {
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <svg viewBox="0 0 200 200" className="absolute w-40 h-40">
        <path d="M50,30 C20,-10 -20,50 50,90 C120,50 80,-10 50,30" fill="red" />
      </svg>
      <div className="text-5xl font-bold absolute">I LOVE YOU</div>
      {showHeart && <div className="absolute text-red-500 text-9xl">❤️</div>}
    </div>
  );
}
