import { HttpException, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { S3ManagerService } from "src/s3-manager/s3-manager.service";
import { SheetMusicDocumentEntity } from "./entities/SheetMusicDocument.entity";

@Injectable()
export class SheetMusicService {
  constructor(
    private s3Manager: S3ManagerService,
    private prisma: PrismaService
  ) {}

  async uploadNewSheetMusic(
    file: Express.Multer.File,
    user: User
  ): Promise<string> {
    // TODO: change key to user
    const key = Date.now().toString() + "--" + file.originalname;
    try {
      await this.prisma.sheetMusicDocument.create({
        data: {
          key: key,
          uploaderId: user.id,
          name: file.originalname,
        },
      });
    } catch (e) {
      throw new HttpException("message", 400, {
        cause: new Error("Duplicate key"),
      });
    }

    const fileUrl = await this.s3Manager.putItem(file, key);

    return fileUrl;
  }
  async getAllUserSheetMusic(user: User): Promise<SheetMusicDocumentEntity[]> {
    const sheetMusic = await this.prisma.sheetMusicDocument.findMany({
      where: { uploaderId: user.id },
    });

    const entities = await Promise.all(
      sheetMusic.map(async (sheet) => {
        return this.addSignedUrlToSheetMusic(sheet as SheetMusicDocumentEntity);
      })
    );
    return entities;
  }

  async renameSheet(
    id: number,
    newName: string
  ): Promise<SheetMusicDocumentEntity> {
    console.log(`renaming sheet ${id} to ${newName}`);
    // TODO: add user
    //     @InjectUser() user: User
    const doc = await this.prisma.sheetMusicDocument.update({
      where: { id: id },
      data: { name: newName },
    });
    return this.addSignedUrlToSheetMusic(doc as SheetMusicDocumentEntity);
  }

  private async addSignedUrlToSheetMusic(
    sheet: SheetMusicDocumentEntity
  ): Promise<SheetMusicDocumentEntity> {
    sheet.url = await this.s3Manager.getSignedUrlForKey(sheet.key);
    return sheet;
  }
}
