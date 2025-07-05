import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
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

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const abortControllerRef = useRef(null);
  const isMounted = useRef(true);
  const isPlayingRef = useRef(isPlaying);

  // Memoize songs array to prevent unnecessary reloads
  const songs = useMemo(() => ["/music/music1.mp3"], []);

  // Sync ref with isPlaying state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio();
      audioRef.current = audio;
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
      audio.src = songs[currentSongIndex];

      await audio.load();
      setCurrentTime(0);

      // Use ref value instead of state to get current play status
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
  }, [currentSongIndex]); // Only reload when song index changes

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

  const playNext = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  }, [songs.length]);

  const playPrev = useCallback(() => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  }, [songs.length]);

  return (
    <div className="py-2 bg-[#18191d] text-white rounded-lg">
      <div className="px-4 mb-4">
        <div
          ref={progressBarRef}
          className="h-1 bg-gray-700 rounded-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="h-1 bg-[#a65fa8]/50 rounded-full transition-all duration-500"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1 text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex justify-center mb-4 items-center">
        <button onClick={playPrev} className="text-xl mx-4 hover:text-gray-300">
          <FaStepBackward />
        </button>

        <button
          onClick={togglePlayPause}
          className="text-xl mx-4 hover:text-gray-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <ImSpinner8 className="animate-spin" />
          ) : isPlaying ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
        </button>

        <button onClick={playNext} className="text-xl mx-4 hover:text-gray-300">
          <FaStepForward />
        </button>
      </div>

      <div className="text-center text-sm min-h-[20px]">
        {!isLoading && (
          <p>{`Track ${currentSongIndex + 1} of ${songs.length}`}</p>
        )}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default MusicPlayer;
