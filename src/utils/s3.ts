import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
});

export const uploadObject = async (
  key: string,
  contentType: string,
  data: Buffer,
) => {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
      Body: data,
    });

    await s3.send(command);
  } catch (error) {
    throw new Error('Failed to upload object', { cause: error });
  }
};
