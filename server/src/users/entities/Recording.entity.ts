import { ApiProperty } from "@nestjs/swagger";
import { Recording, User } from "@prisma/client";

export class RecordingEntity implements Recording {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  uploaderId: number;

  s3DocumentId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  url: string;
}
