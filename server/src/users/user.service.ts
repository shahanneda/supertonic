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

  async renameRecording(recordingId: number, newName: string): Promise<void> {
    await this.prisma.recording.update({
      where: { id: recordingId },
      data: { name: newName },
    });
  }

  async getUserOrCreateByEmail(email: string, name: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { email: email } });

    if (user) {
      console.log("Found user", user);
      return user;
    }

    console.log("making user");
    const newUser = await this.create({ email, name });
    return newUser;
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({ where: { id: id } });
  }

  findByEmail(email: string) {
    console.log("getting for ", email);
    return this.prisma.user.findFirst({ where: { email: email } });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }
  async uploadRecording(
    file: Express.Multer.File,
    user: User,
    description = ""
  ) {
    const prefix = user.id + "/recordings";
    const s3Document = await this.s3Manager.putFile(file, prefix);
    const recording = await this.prisma.recording.create({
      data: {
        name: file.originalname,
        s3DocumentId: s3Document.id,
        uploaderId: user.id,
        description,
      },
    });

    return recording;
  }

  async getAllUserRecordings(userId: number): Promise<RecordingEntity[]> {
    const allRecordings = await this.prisma.recording.findMany({
      where: { uploaderId: userId },
      orderBy: { createdAt: "desc" },
    });

    return await Promise.all(
      allRecordings.map(async (recording) => {
        const out = recording as RecordingEntity;
        out.url = await this.s3Manager.getSignedUrlForS3Document(
          recording.s3DocumentId
        );
        return out;
      })
    );
  }
}