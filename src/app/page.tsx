"use client";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const src = "/api/stream?filename=music1.mp3"; // Remplacez "music1.mp3" par le nom de votre fichier MP3
  const [playing, setPlaying] = useState(false);

  const audio = useMemo(() => {
    const audioElement = new Audio(src);
    audioElement.loop = true; // Lecture en boucle
    return audioElement;
  }, [src]);

  useEffect(() => {
    if (playing) {
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [audio, playing]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>MIDI</p>
      <button onClick={() => setPlaying(!playing)}>
        {playing ? "Pause" : "Play"}
      </button>
    </main>
  );
}
