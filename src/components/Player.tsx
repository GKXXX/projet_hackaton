"use client";

import React from "react";
import { Switch } from "@nextui-org/react";
import { Pause, Play } from "lucide-react";

const Player = () => (
	<Switch
		size="lg"
		color="default"
		classNames={{
			wrapper: "w-96 h-24",
			thumbIcon: "text-primary",
			thumb: "group-data-[selected=true]:ml-[18.5rem] w-20 h-20",
		}}
		thumbIcon={({ isSelected, className }) =>
			isSelected ? (
				<Pause className={className} />
			) : (
				<Play className={className} />
			)
		}
	/>
);

export default Player;
