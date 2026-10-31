import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  PutObjectCommand,
  UploadPartCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isMediaEvent } from "@/lib/events";
import { PART_SIZE, ROOT_PREFIX, SINGLE_PUT_MAX, getStorage, safeName } from "@/lib/storage";

export const runtime = "nodejs";

const bad = (msg: string, status = 400) => NextResponse.json({ error: msg }, { status });

// Guests are already passcode-gated by middleware. This route only hands out
// short-lived presigned URLs so files go straight from the browser to storage
// (no size limit from the app server).
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.action !== "string") return bad("Bad request");

  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    console.error(e);
    return bad("Uploads are not configured yet", 500);
  }
  const { client, bucket } = storage;

  if (body.action === "start") {
    const { event, filename, contentType, size } = body;
    if (typeof event !== "string" || !isMediaEvent(event)) return bad("Unknown event");
    if (typeof filename !== "string" || typeof size !== "number" || size <= 0) return bad("Bad file");
    const type = typeof contentType === "string" && contentType ? contentType : "application/octet-stream";
    if (!/^(image|video)\//.test(type)) return bad("Only photos and videos are allowed");

    const key = `${ROOT_PREFIX}/${event}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName(filename)}`;

    // Optional description, stored as a tiny sidecar object next to the file.
    const caption = typeof body.caption === "string" ? body.caption.trim().slice(0, 300) : "";
    if (caption) {
      await client
        .send(new PutObjectCommand({ Bucket: bucket, Key: `${key}.caption`, Body: caption, ContentType: "text/plain; charset=utf-8" }))
        .catch((e) => console.error("caption save failed", e));
    }

    if (size <= SINGLE_PUT_MAX) {
      const url = await getSignedUrl(client, new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: type }), {
        expiresIn: 3600
      });
      return NextResponse.json({ mode: "single", key, url });
    }
    const mp = await client.send(new CreateMultipartUploadCommand({ Bucket: bucket, Key: key, ContentType: type }));
    return NextResponse.json({ mode: "multipart", key, uploadId: mp.UploadId, partSize: PART_SIZE });
  }

  const { key, uploadId } = body;
  if (typeof key !== "string" || !key.startsWith(`${ROOT_PREFIX}/`) || typeof uploadId !== "string") {
    return bad("Bad request");
  }

  if (body.action === "part") {
    const partNumber = Number(body.partNumber);
    if (!Number.isInteger(partNumber) || partNumber < 1 || partNumber > 10000) return bad("Bad part");
    const url = await getSignedUrl(
      client,
      new UploadPartCommand({ Bucket: bucket, Key: key, UploadId: uploadId, PartNumber: partNumber }),
      { expiresIn: 3600 }
    );
    return NextResponse.json({ url });
  }

  if (body.action === "complete") {
    const parts = Array.isArray(body.parts) ? body.parts : [];
    await client.send(
      new CompleteMultipartUploadCommand({
        Bucket: bucket,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: parts
            .map((p: { PartNumber: number; ETag: string }) => ({ PartNumber: p.PartNumber, ETag: p.ETag }))
            .sort((a: { PartNumber: number }, b: { PartNumber: number }) => a.PartNumber - b.PartNumber)
        }
      })
    );
    return NextResponse.json({ ok: true });
  }

  if (body.action === "abort") {
    await client.send(new AbortMultipartUploadCommand({ Bucket: bucket, Key: key, UploadId: uploadId })).catch(() => {});
    return NextResponse.json({ ok: true });
  }

  return bad("Unknown action");
}
