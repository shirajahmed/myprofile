"use client";

import { useState } from "react";

export default function SocialMediaDownloader() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("youtube");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadData, setDownloadData] = useState(null);

  const platforms = {
    youtube: { name: "YouTube", icon: "📺", placeholder: "https://youtube.com/watch?v=..." },
    instagram: { name: "Instagram", icon: "📷", placeholder: "https://instagram.com/p/..." },
    facebook: { name: "Facebook", icon: "👥", placeholder: "https://facebook.com/..." },
    tiktok: { name: "TikTok", icon: "🎵", placeholder: "https://tiktok.com/@user/video/..." },
    twitter: { name: "Twitter/X", icon: "🐦", placeholder: "https://twitter.com/user/status/..." },
  };

  const detectPlatform = (inputUrl) => {
    if (inputUrl.includes('youtube.com') || inputUrl.includes('youtu.be')) return 'youtube';
    if (inputUrl.includes('instagram.com')) return 'instagram';
    if (inputUrl.includes('facebook.com') || inputUrl.includes('fb.watch')) return 'facebook';
    if (inputUrl.includes('tiktok.com')) return 'tiktok';
    if (inputUrl.includes('twitter.com') || inputUrl.includes('x.com')) return 'twitter';
    return 'youtube';
  };

  const handleUrlChange = (inputUrl) => {
    setUrl(inputUrl);
    if (inputUrl) {
      const detectedPlatform = detectPlatform(inputUrl);
      setPlatform(detectedPlatform);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    setError("");
    setDownloadData(null);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, platform }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process URL');
      }

      const data = await response.json();
      setDownloadData(data);
    } catch (err) {
      setError(err.message || "Failed to process the URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (format) => {
    try {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = format.downloadUrl;
      link.download = format.filename || `download.${format.format.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          📥 Social Media Downloader
        </h1>

        {/* Platform Selection */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-3">Select Platform:</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(platforms).map(([key, platformData]) => (
              <button
                key={key}
                onClick={() => setPlatform(key)}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition-all ${
                  platform === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="text-xl">{platformData.icon}</span>
                <span className="text-sm">{platformData.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* URL Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-3">
              {platforms[platform].name} URL:
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder={platforms[platform].placeholder}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg transition-all duration-300 font-semibold text-white text-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              `Get Download Options`
            )}
          </button>
        </form>

        {/* Download Results */}
        {downloadData && (
          <div className="mt-8 space-y-6">
            {/* Media Info */}
            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="flex gap-4">
                <img
                  src={downloadData.thumbnail}
                  alt="Thumbnail"
                  className="w-32 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/128x96?text=No+Image';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {downloadData.title}
                  </h3>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>👤 {downloadData.author}</p>
                    <p>⏱️ {downloadData.duration}</p>
                    <p>👁️ {downloadData.views}</p>
                    <p>📱 {platforms[downloadData.platform].name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="bg-gray-700/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Download Options:</h4>
              <div className="space-y-3">
                {downloadData.formats.map((format, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {format.type === 'video' ? '🎥' : format.type === 'audio' ? '🎵' : '🖼️'}
                      </span>
                      <div>
                        <div className="text-white font-medium">
                          {format.quality} - {format.format}
                        </div>
                        <div className="text-gray-400 text-sm">
                          Size: {format.size}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(format)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition-colors"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Supported Features */}
        <div className="mt-8 p-6 bg-gray-700/30 rounded-xl">
          <h3 className="text-white font-semibold mb-4">✨ Supported Features:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium text-white mb-2">YouTube:</h4>
              <ul className="space-y-1">
                <li>• Videos (up to 4K)</li>
                <li>• Audio extraction (MP3)</li>
                <li>• Shorts support</li>
                <li>• Thumbnails</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Instagram:</h4>
              <ul className="space-y-1">
                <li>• Posts & Reels</li>
                <li>• Stories (24h)</li>
                <li>• IGTV videos</li>
                <li>• Photo carousels</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Facebook:</h4>
              <ul className="space-y-1">
                <li>• Public videos</li>
                <li>• Reels</li>
                <li>• Watch videos</li>
                <li>• Stories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">TikTok & Twitter:</h4>
              <ul className="space-y-1">
                <li>• No watermark option</li>
                <li>• Original quality</li>
                <li>• Audio extraction</li>
                <li>• Fast processing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Implementation Note */}
        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
          <h4 className="text-blue-300 font-semibold mb-2">🔧 Implementation Note:</h4>
          <p className="text-blue-200 text-sm">
            This is a demo version. For production use, you would need to integrate with actual download services like yt-dlp, 
            and handle platform-specific APIs with proper authentication and rate limiting.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg">
          <h4 className="text-yellow-300 font-semibold mb-2">⚠️ Important Notice:</h4>
          <p className="text-yellow-200 text-sm">
            This tool is for personal use only. Please respect copyright laws and platform terms of service. 
            Only download content you have permission to use or that is in the public domain.
          </p>
        </div>
      </div>
    </div>
  );
}
