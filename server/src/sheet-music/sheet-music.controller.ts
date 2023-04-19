import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UnauthorizedException,
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
import {
  PatchSheetMusicEntity,
  SheetMusicDocumentEntity,
} from "./entities/SheetMusicDocument.entity";
import { SheetMusicPageEntity } from "./entities/SheetMusicPage.entity";
import { SheetMusicService } from "./sheet-music.service";

@Controller("sheet-music")
@ApiTags("SheetMusic")
export class SheetMusicController {
  constructor(private sheetMusicService: SheetMusicService) {}

  @Post("/upload")
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
          new MaxFileSizeValidator({ maxSize: 10_000_000 }),
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
    return { message: "File uploaded successfully" };
  }

  @Get("/:sheetMusicId/pages")
  @Protected()
  @ApiName("getPagesForSheetMusic")
  @ApiResponse({
    type: [SheetMusicPageEntity],
    description: "List of all sheet music urls",
  })
  @ApiParam({ name: "sheetMusicId", type: Number })
  async getAllPagesForSheetMusic(
    @Param("sheetMusicId")
    sheetMusicId: string
  ): Promise<SheetMusicPageEntity[]> {
    console.log("god id", sheetMusicId);
    return await this.sheetMusicService.getPagesForSheetMusic(
      parseInt(sheetMusicId)
    );
  }

  @Get("/")
  @Protected()
  @ApiName("getAllSheetMusic")
  @ApiResponse({
    type: [SheetMusicDocumentEntity],
    description: "List of all sheet music urls",
  })
  async getAllSheetMusic(
    @InjectUser() user: User
  ): Promise<SheetMusicDocumentEntity[]> {
    console.log("in this api endpoint");
    return await this.sheetMusicService.getAllUserSheetMusic(user);
  }

  @Patch("/:id")
  @Protected()
  @ApiName("updateSheetMusic")
  @ApiBody({
    type: PatchSheetMusicEntity,
  })
  @ApiResponse({ type: SheetMusicDocumentEntity })
  async updateSheetMusic(
    @Body() patch: PatchSheetMusicEntity,
    @InjectUser() user: User
  ) {
    if (!patch.name) {
      throw new BadRequestException("Name is required - for now");
    }

    return await this.sheetMusicService.renameSheet(patch.id, patch.name);
  }
}
