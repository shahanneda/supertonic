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
import { url } from "inspector";
import { Protected } from "src/auth/protected.decorator";
import { S3ManagerService } from "src/s3-manager/s3-manager.service";
import { ApiName } from "src/utils/api-name.decorator";
import { UploadFileDto } from "./dto/upload-file.dto";

@Controller("sheet-music")
@ApiTags("SheetMusic")
export class SheetMusicController {
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
    file: Express.Multer.File
  ) {
    console.log("Received file: ", file.originalname);
  }

  @Get()
  @Protected()
  @ApiName("getAllSheetMusic")
  @ApiResponse({ type: [String], description: "List of all sheet music urls" })
  async getAllSheetMusic(): Promise<string[]> {
    const files = await this.s3Manager.listBucketContents();
    const urls = await Promise.all(
      files.map(async (f) => {
        console.log(f);
        const url = await this.s3Manager.getSignedUrlForFile(f);
        return url;
        console.log(url);
      })
    );
    console.log(urls);
    return urls;
  }
}
