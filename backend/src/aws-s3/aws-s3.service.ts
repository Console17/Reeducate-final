import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

type UploadFileParams = {
  key: string;
  buffer: Buffer;
  contentType?: string;
};

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
  throw new Error("AWS S3 env vars are missing");
}

const s3Client = new S3Client({
  region,
  credentials: {
    secretAccessKey,
    accessKeyId,
  },
});

export async function uploadFile({
  key,
  buffer,
  contentType,
}: UploadFileParams) {
  if (!key || !buffer) {
    throw new Error("file key or buffer isnt provided");
  }

  const command = new PutObjectCommand({
    Body: buffer,
    Key: key,
    Bucket: bucketName,
    ContentType: contentType,
  });

  await s3Client.send(command);

  return key;
}

export async function deleteFile(key: string) {
  if (!key) {
    throw new Error("file key isnt provided");
  }

  const command = new DeleteObjectCommand({
    Key: key,
    Bucket: bucketName,
  });

  await s3Client.send(command);
}
