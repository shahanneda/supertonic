import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { SheetMusicModule } from "./sheet-music/sheet-music.module";
import { UtilsModule } from "./utils/utils.module";
import { AwsSdkModule } from "nest-aws-sdk";
import {
  SharedIniFileCredentials,
  S3,
  FileSystemCredentials,
  EnvironmentCredentials,
} from "aws-sdk";
import { S3ManagerModule } from "./s3-manager/s3-manager.module";
import { S3ManagerService } from "./s3-manager/s3-manager.service";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    UserModule,
    AuthModule,
    SheetMusicModule,
    UtilsModule,
    S3ManagerModule,
    ConfigModule.forRoot(),
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: "us-east-2",
        credentials: new EnvironmentCredentials("AWS"),
      },
      services: [S3],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, S3ManagerService],
})
export class AppModule {}
