import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const playlists = await prisma.playlist.findMany({
        include: { Slot: true },
      });
      return NextResponse.json(playlists);
    } catch (error) {
      return NextResponse.json({ message: 'An error occurred while fetching the playlists', error },{status:500});
    }
  } else if (req.method === 'POST') {
    const { Nom, Description, Repository, SlotID } = req.body;

    try {
      const newPlaylist = await prisma.playlist.create({
        data: { Nom, Description, Repository, SlotID },
      });

      return NextResponse.json(newPlaylist);
    } catch (error) {
      return NextResponse.json({ message: 'An error occurred while creating the playlist', error },{status:500});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' },{status:405});
  }
}
