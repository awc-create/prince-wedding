import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isMediaEvent } from "@/lib/events";
import { ROOT_PREFIX, getStorage } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CAPTION_EXT = ".caption";
const VIDEO_RE = /\.(mp4|mov|m4v|webm|avi|mkv|3gp)$/i;

export async function GET(req: NextRequest) {
  const event = req.nextUrl.searchParams.get("event") ?? "";
  if (!isMediaEvent(event)) return NextResponse.json({ error: "Unknown event" }, { status: 400 });

  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Uploads are not configured yet" }, { status: 500 });
  }
  const { client, bucket } = storage;

  const captionKeys = new Set<string>();
  const objects: { Key: string; Size: number; LastModified?: Date }[] = [];
  let token: string | undefined;
  do {
    const res = await client.send(
      new ListObjectsV2Command({ Bucket: bucket, Prefix: `${ROOT_PREFIX}/${event}/`, ContinuationToken: token })
    );
    for (const o of res.Contents ?? []) {
      if (!o.Key || o.Key.endsWith("/")) continue;
      if (o.Key.endsWith(CAPTION_EXT)) captionKeys.add(o.Key);
      else objects.push({ Key: o.Key, Size: o.Size ?? 0, LastModified: o.LastModified });
    }
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token && objects.length < 5000);

  objects.sort((a, b) => (b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0));

  const items = await Promise.all(
    objects.map(async (o) => {
      const name = o.Key.split("/").pop()!.replace(/^\d+-[a-f0-9]{8}-/, "");
      let caption = "";
      if (captionKeys.has(o.Key + CAPTION_EXT)) {
        try {
          const c = await client.send(new GetObjectCommand({ Bucket: bucket, Key: o.Key + CAPTION_EXT }));
          caption = ((await c.Body?.transformToString()) ?? "").trim();
        } catch {
          caption = "";
        }
      }
      const [url, downloadUrl] = await Promise.all([
        getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: o.Key }), { expiresIn: 3600 }),
        getSignedUrl(
          client,
          new GetObjectCommand({
            Bucket: bucket,
            Key: o.Key,
            ResponseContentDisposition: `attachment; filename="${name.replace(/"/g, "")}"`
          }),
          { expiresIn: 3600 }
        )
      ]);
      return { key: o.Key, name, size: o.Size, isVideo: VIDEO_RE.test(name), caption, url, downloadUrl };
    })
  );

  return NextResponse.json({ items });
}
