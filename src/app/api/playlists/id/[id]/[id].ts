import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const playlist = await prisma.playlist.findUnique({
        where: { PlaylistID: Number(id) },
        include: { Slot: true },
      });

      if (!playlist) {
        return NextResponse.json({ message: 'Playlist not found' },{status:404});
      } else {
        return NextResponse.json(playlist);
      }
    } catch (error) {
      return NextResponse.json({ message: 'An error occurred while fetching the playlist', error },{status:500});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' },{status:405});
  }
}
