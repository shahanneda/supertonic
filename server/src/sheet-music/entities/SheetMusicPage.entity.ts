import { ApiProperty } from "@nestjs/swagger";
import { SheetMusicPage } from "@prisma/client";

export class SheetMusicPageEntity implements SheetMusicPage {
  @ApiProperty()
  id: number;

  @ApiProperty()
  orderInDocument: number;

  @ApiProperty()
  s3DocumentId: number;

  @ApiProperty()
  url: string;

  sheetMusicDocumentId: number;
}
