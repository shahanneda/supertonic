import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Protected } from 'src/auth/protected.decorator';
import { ApiName } from 'src/utils/api-name.decorator';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('sheet-music')
@ApiTags('SheetMusic')
export class SheetMusicController {
  @Post('/sheet-music/upload')
  @UseInterceptors(FileInterceptor('file'))
  @Protected()
  @ApiName('upload')
  @ApiHeader({ name: 'Content-Type' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1_000_000 }),
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
  ) {
    console.log('Inside uploading');
    console.log(file);
    console.log(uploadFileDto);
  }
}
