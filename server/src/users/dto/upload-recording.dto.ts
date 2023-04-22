import { ApiProperty } from "@nestjs/swagger";

export class UploadRecording {
  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;
}
