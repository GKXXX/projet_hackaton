-- CreateTable
CREATE TABLE "Playlist" (
    "PlaylistID" SERIAL NOT NULL,
    "Nom" TEXT NOT NULL,
    "Description" TEXT,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("PlaylistID")
);

-- CreateTable
CREATE TABLE "Slot" (
    "SlotID" SERIAL NOT NULL,
    "StartTime" TIMESTAMP(3) NOT NULL,
    "EndTime" TIMESTAMP(3) NOT NULL,
    "WeekDay" TEXT NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("SlotID")
);

-- CreateTable
CREATE TABLE "PlaylistSlot" (
    "PlaylistSlotID" SERIAL NOT NULL,
    "PlaylistID" INTEGER NOT NULL,
    "SlotID" INTEGER NOT NULL,

    CONSTRAINT "PlaylistSlot_pkey" PRIMARY KEY ("PlaylistSlotID")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistSlot_PlaylistID_SlotID_key" ON "PlaylistSlot"("PlaylistID", "SlotID");

-- AddForeignKey
ALTER TABLE "PlaylistSlot" ADD CONSTRAINT "PlaylistSlot_PlaylistID_fkey" FOREIGN KEY ("PlaylistID") REFERENCES "Playlist"("PlaylistID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistSlot" ADD CONSTRAINT "PlaylistSlot_SlotID_fkey" FOREIGN KEY ("SlotID") REFERENCES "Slot"("SlotID") ON DELETE RESTRICT ON UPDATE CASCADE;
