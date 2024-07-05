import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentWeekDay = now.toLocaleString("en-US", { weekday: "long" });

  // Convert the current time to a comparable format
  const currentTime = new Date(now.setHours(currentHour, currentMinutes, 0, 0));

  try {
    const currentSlot = await prisma.slot.findFirst({
      where: {
        WeekDay: currentWeekDay,
        StartTime: {
          lte: currentTime,
        },
        EndTime: {
          gte: currentTime,
        },
      },
      include: {
        Playlists: true,
      },
    });

    if (!currentSlot || currentSlot.Playlists.length === 0) {
      return NextResponse.json(
        { error: "No playlist found for the current time and day" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(currentSlot.Playlists[0]);
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};
