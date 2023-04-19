import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { S3ManagerService } from "./s3-manager.service";

@Module({
  providers: [S3ManagerService, PrismaService],
  exports: [S3ManagerService],
})
export class S3ManagerModule {}
