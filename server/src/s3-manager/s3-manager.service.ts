import { Injectable } from "@nestjs/common";
import { Prisma, S3Document } from "@prisma/client";
import { S3 } from "aws-sdk";
import { InjectAwsService } from "nest-aws-sdk";
import { PrismaService } from "src/prisma/prisma.service";

const BUCKET_NAME = "shahanneda-supertonic";
@Injectable()
export class S3ManagerService {
  constructor(
    @InjectAwsService(S3) private readonly s3: S3,
    private prisma: PrismaService
  ) {}

  async getSignedUrlForS3Document(s3DocumentId: number): Promise<string> {
    const document = await this.prisma.s3Document.findUnique({
      where: { id: s3DocumentId },
    });

    return await this.getSignedUrlForKey(document.key);
  }

  async putFile(file: Express.Multer.File, prefix = ""): Promise<S3Document> {
    const key = prefix + "/" + Date.now().toString() + "--" + file.originalname;
    await this.s3
      .upload({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    const doc = await this.prisma.s3Document.create({
      data: {
        key: key,
      },
    });

    return doc;
  }

  private async listBucketContents(bucket: string = BUCKET_NAME) {
    const response = await this.s3.listObjectsV2({ Bucket: bucket }).promise();
    return response.Contents.map((c) => c.Key);
  }

  async getSignedUrlForKey(key: string) {
    return await this.s3.getSignedUrlPromise("getObject", {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: 1000,
    });
  }
}
