

"use client";
import { useState } from "react";
import ToolPageWrapper from "../../components/ToolPageWrapper";

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
    <ToolPageWrapper title="👤 Username Availability Checker" description="Check if your username is available across platforms">
      <div className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Enter Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
              placeholder="Enter username (e.g., johndoe123)"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#a65fa8] focus:outline-none"
              maxLength={30}
            />
            <p className="text-gray-400 text-xs mt-1">Only lowercase letters, numbers, dots, underscores, and hyphens</p>
          </div>

          {/* Platform Selection */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-gray-700 dark:text-gray-300 font-medium">Platforms:</label>
              <div className="flex gap-2">
                <button onClick={selectAll} className="px-3 py-1 bg-[#a65fa8] hover:bg-purple-700 rounded text-white text-xs transition-colors">All</button>
                <button onClick={selectNone} className="px-3 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded text-gray-700 dark:text-white text-xs transition-colors">None</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(platforms).map(([key, platform]) => (
                <label key={key} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all border ${
                  selectedPlatforms[key]
                    ? 'border-[#a65fa8] bg-purple-50 dark:bg-purple-900/20 text-[#a65fa8]'
                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  <input type="checkbox" checked={selectedPlatforms[key]} onChange={() => handlePlatformChange(key)} className="sr-only" />
                  <span className="text-lg mr-2">{platform.icon}</span>
                  <span className="font-medium text-sm">{platform.name}</span>
                </label>
              ))}
            </div>
          </div>

          {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-500 rounded-lg text-red-600 dark:text-red-300 text-sm">{error}</div>}

          <button
            onClick={checkUsername}
            disabled={loading || !username.trim()}
            className="w-full py-3 bg-[#a65fa8] hover:bg-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Checking...
              </span>
            ) : "Check Username Availability"}
          </button>

          {results && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Results for &quot;{username}&quot;:</h3>
              {Object.entries(results).map(([platform, result]) => (
                <div key={platform} className={`flex items-center justify-between p-3 rounded-lg border ${
                  result.available ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600' : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{platforms[platform].icon}</span>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white text-sm">{platforms[platform].name}</div>
                      <div className={`text-xs ${result.available ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{result.status}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${result.available ? 'bg-green-500' : 'bg-red-500'}`}>
                      {result.available ? '✓ Available' : '✗ Taken'}
                    </span>
                    {!result.available && (
                      <a href={result.url} target="_blank" rel="noopener noreferrer"
                        className="px-2 py-0.5 bg-[#a65fa8] hover:bg-purple-700 rounded text-white text-xs transition-colors">
                        View
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-400">📝 Results may not be 100% accurate. Always verify directly on the platform.</p>
        </div>
    </ToolPageWrapper>
  );
}
