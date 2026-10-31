import { S3Client } from "@aws-sdk/client-s3";

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) throw new Error(`Missing env: ${name}`);
  return v.trim();
}

export function getStorage() {
  const client = new S3Client({
    region: requiredEnv("HETZNER_S3_REGION"),
    endpoint: requiredEnv("HETZNER_S3_ENDPOINT"),
    forcePathStyle: true,
    credentials: {
      accessKeyId: requiredEnv("HETZNER_S3_ACCESS_KEY_ID"),
      secretAccessKey: requiredEnv("HETZNER_S3_SECRET_ACCESS_KEY")
    }
  });
  return { client, bucket: requiredEnv("HETZNER_S3_BUCKET") };
}

export const ROOT_PREFIX = "wedding";
export const SINGLE_PUT_MAX = 50 * 1024 * 1024; // above this, use multipart
export const PART_SIZE = 32 * 1024 * 1024;

export function safeName(name: string): string {
  const cleaned = name.replace(/[^\w.\- ]+/g, "_").replace(/\s+/g, "_").slice(-120);
  return cleaned || "file";
}
