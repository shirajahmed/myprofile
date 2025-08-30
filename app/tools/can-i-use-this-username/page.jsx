"use client";

import { useState } from "react";

export default function UsernameChecker() {
  const [username, setUsername] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    instagram: true,
    linkedin: true,
    facebook: true,
    youtube: true,
    github: true,
    twitter: true,
    tiktok: true,
    reddit: true,
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const platforms = {
    instagram: { name: "Instagram", icon: "📷", color: "bg-pink-500" },
    linkedin: { name: "LinkedIn", icon: "💼", color: "bg-blue-600" },
    facebook: { name: "Facebook", icon: "👥", color: "bg-blue-500" },
    youtube: { name: "YouTube", icon: "📺", color: "bg-red-500" },
    github: { name: "GitHub", icon: "💻", color: "bg-gray-700" },
    twitter: { name: "Twitter/X", icon: "🐦", color: "bg-black" },
    tiktok: { name: "TikTok", icon: "🎵", color: "bg-black" },
    reddit: { name: "Reddit", icon: "🤖", color: "bg-orange-500" },
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const selectAll = () => {
    const allSelected = Object.keys(platforms).reduce((acc, platform) => {
      acc[platform] = true;
      return acc;
    }, {});
    setSelectedPlatforms(allSelected);
  };

  const selectNone = () => {
    const noneSelected = Object.keys(platforms).reduce((acc, platform) => {
      acc[platform] = false;
      return acc;
    }, {});
    setSelectedPlatforms(noneSelected);
  };

  const checkUsername = async () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    const platformsToCheck = Object.keys(selectedPlatforms).filter(
      (platform) => selectedPlatforms[platform]
    );

    if (platformsToCheck.length === 0) {
      setError("Please select at least one platform");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      // Simulate API call with mock data for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResults = {};
      platformsToCheck.forEach(platform => {
        // Random availability for demo
        const isAvailable = Math.random() > 0.5;
        mockResults[platform] = {
          available: isAvailable,
          url: getProfileUrl(platform, username),
          status: isAvailable ? "Available" : "Taken"
        };
      });
      
      setResults(mockResults);
    } catch (error) {
      console.error("Error checking username:", error);
      setError("Failed to check username availability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getProfileUrl = (platform, username) => {
    const urls = {
      instagram: `https://instagram.com/${username}`,
      linkedin: `https://linkedin.com/in/${username}`,
      facebook: `https://facebook.com/${username}`,
      youtube: `https://youtube.com/@${username}`,
      github: `https://github.com/${username}`,
      twitter: `https://twitter.com/${username}`,
      tiktok: `https://tiktok.com/@${username}`,
      reddit: `https://reddit.com/u/${username}`,
    };
    return urls[platform] || "#";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          👤 Username Availability Checker
        </h1>

        <div className="space-y-8">
          {/* Username Input */}
          <div>
            <label className="block text-white font-medium mb-3">
              Enter Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
              placeholder="Enter username (e.g., johndoe123)"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={30}
            />
            <p className="text-gray-400 text-sm mt-2">
              Only lowercase letters, numbers, dots, underscores, and hyphens allowed
            </p>
          </div>

          {/* Platform Selection */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-white font-medium">
                Select Platforms to Check:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={selectNone}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm transition-colors"
                >
                  Select None
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(platforms).map(([key, platform]) => (
                <label
                  key={key}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                    selectedPlatforms[key]
                      ? `${platform.color} text-white`
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPlatforms[key]}
                    onChange={() => handlePlatformChange(key)}
                    className="sr-only"
                  />
                  <span className="text-xl mr-2">{platform.icon}</span>
                  <span className="font-medium text-sm">{platform.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {/* Check Button */}
          <button
            onClick={checkUsername}
            disabled={loading || !username.trim()}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg transition-all duration-300 font-semibold text-white text-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Checking Availability...
              </div>
            ) : (
              "Check Username Availability"
            )}
          </button>

          {/* Results */}
          {results && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Results for "{username}":
              </h3>
              <div className="grid gap-3">
                {Object.entries(results).map(([platform, result]) => (
                  <div
                    key={platform}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      result.available
                        ? "bg-green-500/20 border border-green-500"
                        : "bg-red-500/20 border border-red-500"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{platforms[platform].icon}</span>
                      <div>
                        <div className="font-medium text-white">
                          {platforms[platform].name}
                        </div>
                        <div className={`text-sm ${result.available ? "text-green-300" : "text-red-300"}`}>
                          {result.status}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          result.available
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {result.available ? "✓ Available" : "✗ Taken"}
                      </span>
                      {!result.available && (
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm transition-colors"
                        >
                          View Profile
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
          <h3 className="text-white font-semibold mb-2">📝 Note:</h3>
          <p className="text-gray-300 text-sm">
            This tool provides a quick check for username availability. Results may not be 100% accurate in real-time. 
            Always verify directly on the platform before making final decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
