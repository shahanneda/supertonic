import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDto {
  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;

  randomString: string;
}
