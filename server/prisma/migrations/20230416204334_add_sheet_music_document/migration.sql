-- CreateTable
CREATE TABLE "SheetMusicDocument" (
    "id" SERIAL NOT NULL,
    "uploaderId" INTEGER,
    "key" TEXT NOT NULL,

    CONSTRAINT "SheetMusicDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SheetMusicDocument" ADD CONSTRAINT "SheetMusicDocument_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
