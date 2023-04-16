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
    console.log("KEY is", file);
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
    // TODO: add user
    const sheetMusic = await this.prisma.sheetMusicDocument.findMany();
    console.log("Got sheetmus");
    console.log(sheetMusic);
    const entities = await Promise.all(
      sheetMusic.map(async (s) => {
        const entity = new SheetMusicDocumentEntity(
          s.id,
          s.uploaderId,
          s.name,
          s.key
        );
        entity.url = await this.s3Manager.getSignedUrlForKey(s.key);
        return entity;
      })
    );
    console.log("en: ", entities);

    return entities;
  }
}
