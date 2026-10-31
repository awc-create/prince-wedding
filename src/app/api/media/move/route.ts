import { NextRequest, NextResponse } from "next/server";
import { CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { isMediaEvent } from "@/lib/events";
import { ROOT_PREFIX, getStorage } from "@/lib/storage";

export const runtime = "nodejs";

// Move a file to a different event folder (fixes "uploaded under the wrong tab").
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const key = String(body.key ?? "");
  const toEvent = String(body.toEvent ?? "");

  const parts = key.split("/");
  const valid =
    parts.length === 3 &&
    parts[0] === ROOT_PREFIX &&
    isMediaEvent(parts[1]) &&
    parts[2].length > 0 &&
    !key.includes("..") &&
    isMediaEvent(toEvent);
  if (!valid) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (parts[1] === toEvent) return NextResponse.json({ ok: true, key });

  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Uploads are not configured yet" }, { status: 500 });
  }
  const { client, bucket } = storage;
  const newKey = `${ROOT_PREFIX}/${toEvent}/${parts[2]}`;

  try {
    await client.send(
      new CopyObjectCommand({
        Bucket: bucket,
        CopySource: `${bucket}/${key.split("/").map(encodeURIComponent).join("/")}`,
        Key: newKey
      })
    );
    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    // carry the optional description along (ignore if there isn't one)
    try {
      await client.send(
        new CopyObjectCommand({
          Bucket: bucket,
          CopySource: `${bucket}/${`${key}.caption`.split("/").map(encodeURIComponent).join("/")}`,
          Key: `${newKey}.caption`
        })
      );
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: `${key}.caption` }));
    } catch {
      /* no caption */
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not move this file" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, key: newKey });
}
