import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "@prisma/client";
import { url } from "inspector";
import { Protected } from "src/auth/protected.decorator";
import { S3ManagerService } from "src/s3-manager/s3-manager.service";
import { InjectUser } from "src/users/user.decorator";
import { ApiName } from "src/utils/api-name.decorator";
import { UploadFileDto } from "./dto/upload-file.dto";
import { SheetMusicDocumentEntity } from "./entities/SheetMusicDocument.entity";
import { SheetMusicService } from "./sheet-music.service";

@Controller("sheet-music")
@ApiTags("SheetMusic")
export class SheetMusicController {
  constructor(private sheetMusicService: SheetMusicService) {}

  @Post("/sheet-music/upload")
  @UseInterceptors(FileInterceptor("file"))
  @Protected()
  @ApiName("upload")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: UploadFileDto,
  })
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1_000_000 }),
          new FileTypeValidator({ fileType: "application/pdf" }),
        ],
      })
    )
    file: Express.Multer.File,
    @InjectUser() user: User
  ) {
    console.log("got controller");
    await this.sheetMusicService.uploadNewSheetMusic(file, user);
    console.log("Received file: ", file.originalname);
  }

  @Get()
  @Protected()
  @ApiName("getAllSheetMusic")
  @ApiResponse({
    type: [SheetMusicDocumentEntity],
    description: "List of all sheet music urls",
  })
  async getAllSheetMusic(
    @InjectUser() user: User
  ): Promise<SheetMusicDocumentEntity[]> {
    return await this.sheetMusicService.getAllUserSheetMusic(user);
  }
}
