import { ParseIntPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { SheetMusicDocument } from "@prisma/client";
import { Type } from "class-transformer";

export class SheetMusicDocumentEntity implements SheetMusicDocument {
  constructor(id: number, uploaderId: number, name: string) {
    this.id = id;
    this.uploaderId = uploaderId;
    this.name = name;
  }

  createdAt: Date;

  @ApiProperty()
  id: number;

  @ApiProperty()
  uploaderId: number;

  @ApiProperty()
  name: string;
}

import { IsInt, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class PatchSheetMusicEntity {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({ required: false })
  name?: string;
}
