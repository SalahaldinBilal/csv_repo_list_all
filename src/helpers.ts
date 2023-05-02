import { S3Client, GetObjectCommand, ListObjectsV2Command, ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv'
import type { CsvFileData } from "./types";
dotenv.config();

const client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
});

export async function listAllCsvFiles(): Promise<CsvFileData[]> {
  let response: ListObjectsV2CommandOutput = undefined as any;
  let files: CsvFileData[] = [];

  while (!response || response.StartAfter) {
    const command = new ListObjectsV2Command({
      Bucket: process.env.BUCKET_NAME,
      StartAfter: response?.StartAfter as string
    })

    response = await client.send(command);

    response.Contents?.forEach(file => {
      files.push({
        name: file.Key!,
        size: file.Size!,
        lastUpdate: file.LastModified?.toISOString()!
      })
    })
  }

  return files;
}

export function response(statusCode: number, body: any, extraHeaders: { [key: string]: string } = {}) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      ...extraHeaders
    },
    body
  }
}