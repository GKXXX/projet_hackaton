import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPlaylists = async () => {
  return prisma.playlist.findMany();
}

export const getPlaylistBySlot = async (SlotID:number) =>  {
  return prisma.playlist.findMany({
    where:{SlotID}
  })
}

export const getPlayListByDateTime = async (actualDateTime:Date) => {
    const weekday = actualDateTime.getDay();
    const time = actualDateTime
}