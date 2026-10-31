import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { getStorage } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// One small JSON object per message under messages/ in the wedding bucket (no database).
const PREFIX = "messages/";
const MAX_NAME = 60;
const MAX_MESSAGE = 1500;
const MAX_LIST = 500;

type Message = { id: string; name: string; message: string; createdAt: string };

function storageOr500() {
  try {
    return { storage: getStorage() };
  } catch (e) {
    console.error(e);
    return { error: NextResponse.json({ error: "Messages are not configured yet" }, { status: 500 }) };
  }
}

export async function GET() {
  const { storage, error } = storageOr500();
  if (!storage) return error;
  const { client, bucket } = storage;

  const keys: { Key: string; LastModified?: Date }[] = [];
  let token: string | undefined;
  do {
    const res = await client.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: PREFIX, ContinuationToken: token }));
    for (const o of res.Contents ?? []) if (o.Key && o.Key.endsWith(".json")) keys.push({ Key: o.Key, LastModified: o.LastModified });
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token && keys.length < MAX_LIST);

  keys.sort((a, b) => (b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0));

  const messages = (
    await Promise.all(
      keys.slice(0, MAX_LIST).map(async (k): Promise<Message | null> => {
        try {
          const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: k.Key }));
          const body = JSON.parse((await res.Body?.transformToString()) ?? "");
          return { id: k.Key, name: String(body.name ?? ""), message: String(body.message ?? ""), createdAt: String(body.createdAt ?? "") };
        } catch {
          return null;
        }
      })
    )
  ).filter((m): m is Message => m !== null);

  return NextResponse.json({ messages });
}

// The page is public (no passcode), so add light spam protection:
// a hidden honeypot field plus a small per-IP rate limit (in memory, per server instance).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip))
    return NextResponse.json({ error: "Too many postcards from one place — please try again in a few minutes" }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  if (body.website) return NextResponse.json({ ok: true }); // honeypot: bots fill this in, humans never see it
  const name = String(body.name ?? "").trim().slice(0, MAX_NAME);
  const message = String(body.message ?? "").trim();

  if (!name) return NextResponse.json({ error: "Please add your name" }, { status: 400 });
  if (!message) return NextResponse.json({ error: "Please write a message" }, { status: 400 });
  if (message.length > MAX_MESSAGE)
    return NextResponse.json({ error: `Messages can be up to ${MAX_MESSAGE} characters` }, { status: 400 });

  const { storage, error } = storageOr500();
  if (!storage) return error;
  const { client, bucket } = storage;

  const createdAt = new Date().toISOString();
  const key = `${PREFIX}${Date.now()}-${crypto.randomUUID().slice(0, 8)}.json`;
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: JSON.stringify({ name, message, createdAt }),
        ContentType: "application/json"
      })
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not save your message — please try again" }, { status: 500 });
  }
  return NextResponse.json({ message: { id: key, name, message, createdAt } });
}
