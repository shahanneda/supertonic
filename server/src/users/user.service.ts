import { Inject, Injectable, Scope } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { S3ManagerService } from "src/s3-manager/s3-manager.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RecordingEntity } from "./entities/Recording.entity";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private s3Manager: S3ManagerService
  ) {}

  // Rest of the code...

  async renameRecording(recordingId: number, newName: string): Promise<RecordingEntity> {
    const updatedRecording = await this.prisma.recording.update({
      where: { id: recordingId },
      data: { name: newName },
    });

    const out = updatedRecording as RecordingEntity;
    out.url = await this.s3Manager.getSignedUrlForS3Document(updatedRecording.s3DocumentId);
    return out;
  }
}