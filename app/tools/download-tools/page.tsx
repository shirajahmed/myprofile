"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadOptions, setDownloadOptions] = useState({
    audio: null,
    thumbnails: [],
    videos: [],
    title: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/download", { url: youtubeUrl });
      setDownloadOptions(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to process YouTube URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          YouTube Downloader
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="youtubeUrl"
              className="block text-sm font-medium text-gray-700"
            >
              YouTube URL
            </label>
            <input
              type="text"
              id="youtubeUrl"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Paste YouTube link here"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Processing..." : "Get Download Options"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {downloadOptions.title && (
          <div className="mt-6 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              {downloadOptions.title}
            </h2>

            {/* Thumbnails Section */}
            {downloadOptions.thumbnails.length > 0 && (
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-2">
                  Thumbnails
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {downloadOptions.thumbnails.map((thumb, index) => (
                    <div key={index} className="border rounded overflow-hidden">
                      <img
                        src={thumb.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <a
                        href={thumb.url}
                        download={`thumbnail-${thumb.quality}.jpg`}
                        className="block text-center py-1 bg-blue-600 text-white text-sm hover:bg-blue-700"
                      >
                        Download ({thumb.quality})
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audio Section */}
            {downloadOptions.audio && (
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-2">
                  Audio
                </h3>
                <a
                  href={downloadOptions.audio.url}
                  download={downloadOptions.audio.filename}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Download MP3 ({downloadOptions.audio.quality})
                </a>
              </div>
            )}

            {/* Videos Section */}
            {downloadOptions.videos.length > 0 && (
              <div>
                <h3 className="text-md font-medium text-gray-800 mb-2">
                  Videos
                </h3>
                <div className="space-y-2">
                  {downloadOptions.videos.map((video, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <span>
                        {video.quality} ({video.format})
                      </span>
                      <a
                        href={video.url}
                        download={video.filename}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
