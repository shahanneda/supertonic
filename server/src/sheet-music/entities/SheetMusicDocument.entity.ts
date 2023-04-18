import { ApiProperty } from "@nestjs/swagger";
import { SheetMusicDocument } from "@prisma/client";

export class SheetMusicDocumentEntity implements SheetMusicDocument {
  constructor(id: number, uploaderId: number, name: string, key: string) {
    this.id = id;
    this.uploaderId = uploaderId;
    this.name = name;
    this.key = key;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  uploaderId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  url: string;
}

export class PatchSheetMusicEntity {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  name?: string;
}
