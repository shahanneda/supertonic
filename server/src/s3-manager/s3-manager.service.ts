import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';

const BUCKET_NAME = 'shahanneda-supertonic';
@Injectable()
export class S3ManagerService {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async putItem(file: Express.Multer.File): Promise<string> {
    const response = await this.s3
      .upload({
        Bucket: BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
      })
      .promise();
    return response.Location;
  }

  async listBucketContents(bucket: string = BUCKET_NAME) {
    const response = await this.s3.listObjectsV2({ Bucket: bucket }).promise();
    return response.Contents.map((c) => c.Key);
  }

  async getSignedUrlForFile(key: string) {
    return await this.s3.getSignedUrlPromise('getObject', {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: 1000,
    });
  }
}
