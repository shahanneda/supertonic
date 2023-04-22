import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "src/auth/auth.service";
import { S3ManagerService } from "src/s3-manager/s3-manager.service";
import { S3ManagerModule } from "src/s3-manager/s3-manager.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService],
  imports: [
    S3ManagerModule,
    MulterModule.register({
      fileFilter(req, file, callback) {
        console.log(req);
        console.log(file);
        callback(null, true);
      },
      limits: {
        fieldSize: 1_000_000_000,
        fileSize: 1_000_000_000,
        fieldNameSize: 1_000_000_000,
      },
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
