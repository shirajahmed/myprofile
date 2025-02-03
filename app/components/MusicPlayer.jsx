import { useState, useRef, useEffect, useCallback } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);
  const abortControllerRef = useRef(null);
  const isMounted = useRef(true);

  const songs = [
    "/music/music1.mp3",
    "/music/music2.mp3",
    "/music/music3.mp3",
    "/music/music4.mp3",
    "/music/music5.mp3",
    "/music/music6.mp3",
    "/music/music7.mp3",
  ];

  useEffect(() => {
    // Initialize audio element only on client side
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      abortControllerRef.current = new AbortController();
    }

    return () => {
      isMounted.current = false;
      abortControllerRef.current?.abort();
      audioRef.current?.pause();
      audioRef.current?.removeAttribute("src");
    };
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

      if (isMounted.current && isPlaying) {
        await audio.play();
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error handling audio:", error);
        isMounted.current && setIsPlaying(false);
      }
    } finally {
      isMounted.current && setIsLoading(false);
    }
  }, [currentSongIndex, isPlaying, songs]);

  useEffect(() => {
    if (audioRef.current) {
      loadNewSong();
    }
  }, [loadNewSong]);

  useEffect(() => {
    const audio = audioRef.current;
    const controller = abortControllerRef.current;

    if (!audio || !controller) return;

    const handleEnded = () => playNext();
    audio.addEventListener("ended", handleEnded, { signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, []);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
      setIsPlaying(false);
    }
  };

  const playNext = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  }, [songs.length]);

  const playPrev = useCallback(() => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  }, [songs.length]);

  return (
    <div className="py-2 bg-[#18191d] text-white rounded-lg">
      <div className="flex justify-center mb-4 items-center">
        <button onClick={playPrev} className="text-xl mx-4 hover:text-gray-300">
          <FaStepBackward />
        </button>

        <button
          onClick={togglePlayPause}
          className="text-xl mx-4 hover:text-gray-300 relative"
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
        {isPlaying && !isLoading && (
          <p>{`Playing song ${currentSongIndex + 1}`}</p>
        )}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default MusicPlayer;
