// One-off: allow browsers on the wedding site to upload/download directly.
// Run:  node --env-file=.env.local scripts/setup-bucket-cors.mjs
import { PutBucketCorsCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: process.env.HETZNER_S3_REGION,
  endpoint: process.env.HETZNER_S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.HETZNER_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.HETZNER_S3_SECRET_ACCESS_KEY
  }
});

await client.send(
  new PutBucketCorsCommand({
    Bucket: process.env.HETZNER_S3_BUCKET,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedOrigins: [
            "https://jacobandangelieincebu.com",
            "https://www.jacobandangelieincebu.com",
            "http://localhost:3000"
          ],
          AllowedMethods: ["GET", "PUT", "HEAD"],
          AllowedHeaders: ["*"],
          ExposeHeaders: ["ETag"],
          MaxAgeSeconds: 3600
        }
      ]
    }
  })
);
console.log("CORS set on", process.env.HETZNER_S3_BUCKET);
