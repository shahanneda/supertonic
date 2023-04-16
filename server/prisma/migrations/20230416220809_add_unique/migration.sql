/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `SheetMusicDocument` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SheetMusicDocument_key_key" ON "SheetMusicDocument"("key");
