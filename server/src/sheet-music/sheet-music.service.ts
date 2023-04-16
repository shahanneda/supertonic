import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { S3ManagerService } from "src/s3-manager/s3-manager.service";

@Injectable()
export class SheetMusicService {
  constructor(private s3Manager: S3ManagerService) {}

  async uploadNewSheetMusic(file: File, user: User) {
    const fileUrl = await this.s3Manager.putItem(file);
    console.log(fileUrl);
    console.log(await this.s3Manager.listBucketContents());
  }
}
