import { HttpException, Injectable } from "@nestjs/common";
import {
  Prisma,
  SheetMusicDocument,
  SheetMusicPage,
  User,
} from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { S3ManagerService } from "src/s3-manager/s3-manager.service";
import { SheetMusicDocumentEntity } from "./entities/SheetMusicDocument.entity";
import { SheetMusicPageEntity } from "./entities/SheetMusicPage.entity";

@Injectable()
export class SheetMusicService {
  constructor(
    private s3Manager: S3ManagerService,
    private prisma: PrismaService
  ) {}

  private async createPagesForPdf(
    file: Express.Multer.File,
    sheetMusicDocument: SheetMusicDocument
  ): Promise<SheetMusicPage> {
    const s3Document = await this.s3Manager.putFile(file);
    const page = this.prisma.sheetMusicPage.create({
      data: {
        orderInDocument: 0,
        s3DocumentId: s3Document.id,
        sheetMusicDocumentId: sheetMusicDocument.id,
      },
    });
    return page;
  }

  async getPagesForSheetMusic(
    sheetMusicId: number
  ): Promise<SheetMusicPageEntity[]> {
    console.log("geting for ", sheetMusicId);
    const pages = await this.prisma.sheetMusicPage.findMany({
      where: {
        sheetMusicDocumentId: {
          equals: sheetMusicId,
        },
      },
    });

    return await Promise.all(
      pages.map(async (page) => await this.addSignedUrlToPage(page))
    );
  }

  async uploadNewSheetMusic(
    file: Express.Multer.File,
    user: User
  ): Promise<SheetMusicDocumentEntity> {
    console.log("original anme is ", file.originalname);
    const sheetMusicDocument = await this.prisma.sheetMusicDocument.create({
      data: {
        uploaderId: user.id,
        name: file.originalname,
      },
    });
    this.createPagesForPdf(file, sheetMusicDocument);

    return sheetMusicDocument as SheetMusicDocumentEntity;
  }

  async getAllUserSheetMusic(user: User): Promise<SheetMusicDocumentEntity[]> {
    const sheetMusic = await this.prisma.sheetMusicDocument.findMany({
      where: { uploaderId: user.id },
    });

    const entities = await Promise.all(
      sheetMusic.map(async (sheet) => {
        return sheet as SheetMusicDocumentEntity;
      })
    );
    return entities;
  }

  async renameSheet(
    id: number,
    newName: string
  ): Promise<SheetMusicDocumentEntity> {
    console.log(`renaming sheet ${id} to ${newName}`);

    const doc = await this.prisma.sheetMusicDocument.update({
      where: { id: id },
      data: { name: newName },
    });
    return doc as SheetMusicDocumentEntity;
  }

  private async addSignedUrlToPage(
    page: SheetMusicPage
  ): Promise<SheetMusicPageEntity> {
    const newPage = page as SheetMusicPageEntity;
    newPage.url = await this.s3Manager.getSignedUrlForS3Document(
      page.s3DocumentId
    );
    return newPage;
  }
}
