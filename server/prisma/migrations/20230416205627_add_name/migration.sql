/*
  Warnings:

  - Added the required column `name` to the `SheetMusicDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SheetMusicDocument" ADD COLUMN     "name" TEXT NOT NULL;
