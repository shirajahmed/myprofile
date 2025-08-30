import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaInfoCircle,
} from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const abortControllerRef = useRef(null);
  const isMounted = useRef(true);
  const isPlayingRef = useRef(isPlaying);

  const songs = useMemo(
    () => [
      {
        // Kevin MacLeod - Royalty Free (CC BY 3.0)
        src: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Meditation%20Impromptu%2002.mp3",
        title: "Meditation Impromptu",
        artist: "Kevin MacLeod",
      },
      {
        // Alternative: Use local files you download from free sources
        src: "/music/music1.mp3", // Download from Pixabay/FMA and place here
        title: "Ambient Focus",
        artist: "Free Music",
      },
      {
        // Backup: Simple tone generator for demo
        src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        title: "Ambient Tone",
        artist: "Generated",
      },
    ],
    []
  );

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio();
      audioRef.current = audio;
      audio.volume = volume;
      abortControllerRef.current = new AbortController();

      const updateTime = () => {
        if (isMounted.current) setCurrentTime(audio.currentTime);
      };

      const updateDuration = () => {
        if (isMounted.current) setDuration(audio.duration);
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("durationchange", updateDuration);
      audio.addEventListener("ended", playNext);

      return () => {
        isMounted.current = false;
        abortControllerRef.current?.abort();
        audio.pause();
        audio.removeAttribute("src");
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("durationchange", updateDuration);
        audio.removeEventListener("ended", playNext);
      };
    }
  }, []);

  const loadNewSong = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      setIsLoading(true);
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      const audio = audioRef.current;
      await audio.pause();
      audio.src = songs[currentSongIndex].src;

      await audio.load();
      setCurrentTime(0);

      if (isMounted.current && isPlayingRef.current) {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error handling audio:", error);
        setIsPlaying(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentSongIndex, songs]);

  useEffect(() => {
    loadNewSong();
  }, [currentSongIndex]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error toggling playback:", error);
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const seekTime = ((e.clientX - rect.left) / rect.width) * duration;
    audioRef.current.currentTime = seekTime;
  };

  const handleVolumeChange = (e) => {
    if (!audioRef.current) return;
    const rect = volumeBarRef.current.getBoundingClientRect();
    const newVolume = (e.clientX - rect.left) / rect.width;
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    audioRef.current.volume = clampedVolume;
    setIsMuted(clampedVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const playNext = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  }, [songs.length]);

  const playPrev = useCallback(() => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  }, [songs.length]);

  const currentSong = songs[currentSongIndex];

  return (
    <div className="bg-[#18191d] border border-gray-700 rounded-lg p-3 shadow-lg">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#a65fa8] rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">
            {currentSong.title}
          </span>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-gray-400 hover:text-[#a65fa8] transition-colors text-xs"
          title="Why music?"
        >
          <FaInfoCircle />
        </button>
      </div>

      {/* Collapsible Info */}
      {showInfo && (
        <div className="mb-3 p-2 bg-gray-800 border border-gray-600 rounded text-xs text-gray-300">
          <p>
            <strong className="text-[#a65fa8]">Why music?</strong> Creates a
            relaxing atmosphere, keeps you engaged, and shows attention to UX
            design. Optional and controllable.
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-3">
        <div
          ref={progressBarRef}
          className="h-1 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600 transition-colors"
          onClick={handleProgressClick}
        >
          <div
            className="h-1 bg-[#a65fa8] rounded-full transition-all duration-300"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1 text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Compact Controls */}
      <div className="flex items-center justify-between">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={playPrev}
            className="text-gray-400 hover:text-white transition-colors p-1"
            title="Previous"
          >
            <FaStepBackward size={12} />
          </button>

          <button
            onClick={togglePlayPause}
            className="bg-[#a65fa8] text-white p-2 rounded-full hover:bg-[#a65fa8]/80 transition-all transform hover:scale-105"
            disabled={isLoading}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isLoading ? (
              <ImSpinner8 className="animate-spin" size={12} />
            ) : isPlaying ? (
              <FaPause size={12} />
            ) : (
              <FaPlay size={12} />
            )}
          </button>

          <button
            onClick={playNext}
            className="text-gray-400 hover:text-white transition-colors p-1"
            title="Next"
          >
            <FaStepForward size={12} />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-1 max-w-[100px] ml-4">
          <button
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />}
          </button>

          <div
            ref={volumeBarRef}
            className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600 transition-colors"
            onClick={handleVolumeChange}
          >
            <div
              className="h-1 bg-[#a65fa8] rounded-full transition-all duration-200"
              style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
