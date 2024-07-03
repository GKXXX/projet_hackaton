"use client";

import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@nextui-org/react";
import { Pause, Play } from "lucide-react";

const audioFiles = ["music1.mp3", "music2.mp3", "music3.mp3"];

const Player = () => {
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
		<Switch
			size="lg"
			color="default"
			classNames={{
				wrapper: "w-96 h-24",
				thumbIcon: "text-primary",
				thumb: "group-data-[selected=true]:ml-[18.5rem] w-20 h-20",
			}}
			isSelected={playing}
			onValueChange={setPlaying}
			thumbIcon={({ isSelected, className }) =>
				isSelected ? (
					<Pause className={className} />
				) : (
					<Play className={className} />
				)
			}
		/>
	);
};

export default Player;
