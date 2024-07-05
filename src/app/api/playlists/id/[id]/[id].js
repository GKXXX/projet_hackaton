import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const playlist = await PrismaClient.playlist.findUnique({
      where: { PlaylistID: Number(id) },
      include: { Slot: true },
    });

    if (!playlist) {
      res.status(404).json({ message: 'Playlist not found' });
    } else {
      res.json(playlist);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
