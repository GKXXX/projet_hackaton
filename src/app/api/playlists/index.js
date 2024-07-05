import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const playlists = await prisma.playlist.findMany({
        include: { Slot: true },
      });
      res.json(playlists);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the playlists', error });
    }
  } else if (req.method === 'POST') {
    const { Nom, Description, Repository, SlotID } = req.body;

    try {
      const newPlaylist = await prisma.playlist.create({
        data: { Nom, Description, Repository, SlotID },
      });

      res.status(201).json(newPlaylist);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating the playlist', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
