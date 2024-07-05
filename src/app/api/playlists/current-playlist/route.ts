import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  try {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentWeekDay = now.toLocaleString('en-US', { weekday: 'long' });

  // Convert the current time to a comparable format
  const currentTime = new Date(now.setHours(currentHour, currentMinutes, 0, 0));

  
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
      NextResponse.json({ error: 'No playlist found for the current time and day' },{status:404});
    } else {
      NextResponse.json(currentSlot.Playlists[0]); 
    }
  } catch (error) {
    NextResponse.json({ error: error });
  }
}