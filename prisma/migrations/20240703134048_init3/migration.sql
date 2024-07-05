/*
  Warnings:

  - You are about to drop the `PlaylistSlot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `slot_id` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlaylistSlot" DROP CONSTRAINT "PlaylistSlot_PlaylistID_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistSlot" DROP CONSTRAINT "PlaylistSlot_SlotID_fkey";

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "slot_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PlaylistSlot";

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "Slot"("SlotID") ON DELETE NO ACTION ON UPDATE CASCADE;
