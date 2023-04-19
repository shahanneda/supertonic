/*
  Warnings:

  - You are about to drop the column `key` on the `SheetMusicDocument` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "SheetMusicDocument_key_key";

-- AlterTable
ALTER TABLE "SheetMusicDocument" DROP COLUMN "key",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "SheetMusicPage" (
    "id" SERIAL NOT NULL,
    "orderInDocument" INTEGER NOT NULL,
    "s3DocumentId" INTEGER NOT NULL,
    "sheetMusicDocumentId" INTEGER NOT NULL,

    CONSTRAINT "SheetMusicPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recording" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "uploaderId" INTEGER,
    "s3DocumentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recording_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "S3Document" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "S3Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SheetMusicPage_s3DocumentId_key" ON "SheetMusicPage"("s3DocumentId");

-- CreateIndex
CREATE UNIQUE INDEX "Recording_s3DocumentId_key" ON "Recording"("s3DocumentId");

-- CreateIndex
CREATE UNIQUE INDEX "S3Document_key_key" ON "S3Document"("key");

-- AddForeignKey
ALTER TABLE "SheetMusicPage" ADD CONSTRAINT "SheetMusicPage_s3DocumentId_fkey" FOREIGN KEY ("s3DocumentId") REFERENCES "S3Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SheetMusicPage" ADD CONSTRAINT "SheetMusicPage_sheetMusicDocumentId_fkey" FOREIGN KEY ("sheetMusicDocumentId") REFERENCES "SheetMusicDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_s3DocumentId_fkey" FOREIGN KEY ("s3DocumentId") REFERENCES "S3Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
