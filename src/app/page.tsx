"use client";
import { useEffect, useRef, useState } from "react";

const audioFiles = ["music1.mp3", "music2.mp3", "music3.mp3"];

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    audio.src = `/api/stream?music=${audioFiles[currentFileIndex]}`;

    const handleTrackEnd = () => {
      setCurrentFileIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
    };

    audio.addEventListener("ended", handleTrackEnd);

    if (playing) {
      audio
        .play()
        .catch((error: string) =>
          console.error("Failed to play audio:", error)
        );
    }

    return () => {
      audio.removeEventListener("ended", handleTrackEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFileIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (playing) {
        audio
          .play()
          .catch((error: string) =>
            console.error("Failed to play audio:", error)
          );
      } else {
        audio.pause();
      }
    }
  }, [playing]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>MIDI</p>
      <button onClick={() => setPlaying(!playing)}>
        {playing ? "Pause" : "Play"}
      </button>
    </main>
  );
}
