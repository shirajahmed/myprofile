"use client";

import { useState } from "react";

export default function UsernameChecker() {
  const [username, setUsername] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    instagram: false,
    linkedin: false,
    facebook: false,
    youtube: false,
    github: false,
    x: false,
    google: false,
  });
  const [results, setResults] = useState(null);

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const checkUsername = async () => {
    const platformsToCheck = Object.keys(selectedPlatforms).filter(
      (platform) => selectedPlatforms[platform]
    );

    if (platformsToCheck.length === 0) {
      alert("Please select at least one platform.");
      return;
    }

    try {
      const response = await fetch(
        `/api/check?username=${username}&platforms=${platformsToCheck.join(
          ","
        )}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 px-5 my-14 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 ">
      <div className="h-full col-span-12 p-4 text-base text-center bg-dark-500 lg:col-span-3 rounded-2xl shadow-custom-dark ">
        {/* Sidebar */}
        <>sidebar</>
      </div>
      <div className="flex flex-col col-span-12 overflow-hidden shadow-custom-dark rounded-2xl lg:col-span-9 bg-dark-500">
        <div className="flex items-center justify-between px-5 py-3 my-3 bg-[#18191d] rounded-xl">
          <span className="text-xl font-bold border-b-4 md:text-2xl border-[#a65fa8] text-white">
            Can I Use This Username
          </span>
        </div>

        <div className="h-auto bg-[#0a0a0a] rounded-xl text-white p-8 flex items-center justify-center">
          <div className="max-w-md w-full bg-[#18191d] p-6 rounded-lg shadow-xl space-y-6">
            <h1 className="text-2xl font-bold text-center">Username Checker</h1>

            {/* Username Input */}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full p-2 rounded bg-gray-700 text-white"
            />

            {/* Platform Selection */}
            <div className="space-y-2">
              {Object.keys(selectedPlatforms).map((platform) => (
                <div key={platform} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedPlatforms[platform]}
                    onChange={() => handlePlatformChange(platform)}
                    className="mr-2"
                  />
                  <label className="text-white">{platform}</label>
                </div>
              ))}
            </div>

            {/* Check Button */}
            <button
              onClick={checkUsername}
              className="w-full py-2 bg-[#a65fa8] hover:bg-[#a65fa8]/70 rounded transition-colors"
            >
              Check Username
            </button>

            {/* Results */}
            {results && (
              <div className="mt-4 space-y-2">
                {Object.entries(results).map(([platform, status]) => (
                  <div key={platform} className="text-white">
                    {platform}: {status}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
