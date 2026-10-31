"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mediaEvents } from "@/lib/events";

type Item = { key: string; name: string; size: number; isVideo: boolean; url: string; downloadUrl: string };
type Upload = { id: number; name: string; progress: number; status: "uploading" | "done" | "error"; error?: string };

const SMALL_RETRIES = 3;

function putWithProgress(url: string, body: Blob, headers: Record<string, string>, onProgress: (loaded: number) => void) {
  return new Promise<string | null>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    for (const [k, v] of Object.entries(headers)) xhr.setRequestHeader(k, v);
    xhr.upload.onprogress = (e) => onProgress(e.loaded);
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300 ? resolve(xhr.getResponseHeader("ETag")) : reject(new Error(`Upload failed (${xhr.status})`));
    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(body);
  });
}

async function retry<T>(fn: () => Promise<T>): Promise<T> {
  let last: unknown;
  for (let i = 0; i < SMALL_RETRIES; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
  throw last;
}

async function api(body: unknown) {
  const res = await fetch("/api/media/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload error");
  return data;
}

async function uploadFile(event: string, file: File, onProgress: (pct: number) => void) {
  const type = file.type || (/\.(mp4|mov|m4v)$/i.test(file.name) ? "video/mp4" : "image/jpeg");
  const start = await api({ action: "start", event, filename: file.name, contentType: type, size: file.size });

  if (start.mode === "single") {
    await retry(() => putWithProgress(start.url, file, { "Content-Type": type }, (l) => onProgress((l / file.size) * 100)));
    return;
  }

  const { key, uploadId, partSize } = start;
  const total = Math.ceil(file.size / partSize);
  const loaded: number[] = new Array(total).fill(0);
  const parts: { PartNumber: number; ETag: string }[] = [];
  let next = 0;
  const report = () => onProgress((loaded.reduce((a, b) => a + b, 0) / file.size) * 100);

  async function worker() {
    while (next < total) {
      const idx = next++;
      const blob = file.slice(idx * partSize, Math.min(file.size, (idx + 1) * partSize));
      const etag = await retry(async () => {
        const { url } = await api({ action: "part", key, uploadId, partNumber: idx + 1 });
        return putWithProgress(url, blob, {}, (l) => {
          loaded[idx] = l;
          report();
        });
      });
      if (!etag) throw new Error("Storage CORS must expose ETag");
      loaded[idx] = blob.size;
      parts.push({ PartNumber: idx + 1, ETag: etag });
    }
  }

  try {
    await Promise.all([worker(), worker(), worker()]);
    await api({ action: "complete", key, uploadId, parts });
  } catch (e) {
    await api({ action: "abort", key, uploadId }).catch(() => {});
    throw e;
  }
}

export default function PhotosClient() {
  const [event, setEvent] = useState<string>(mediaEvents[0].slug);
  const [items, setItems] = useState<Item[] | null>(null);
  const [listError, setListError] = useState("");
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [viewing, setViewing] = useState<number | null>(null);
  const [moving, setMoving] = useState(false);
  const touchX =useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  const load = useCallback(async (slug: string) => {
    setItems(null);
    setListError("");
    try {
      const res = await fetch(`/api/media/list?event=${slug}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load");
      setItems(data.items);
    } catch (e) {
      setListError(e instanceof Error ? e.message : "Could not load");
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load(event);
  }, [event, load]);

  async function onFiles(files: FileList | null) {
    if (!files || !files.length) return;
    const queue = Array.from(files).map((file) => ({ file, id: ++idRef.current }));
    setUploads((u) => [...queue.map(({ file, id }) => ({ id, name: file.name, progress: 0, status: "uploading" as const })), ...u]);
    const slug = event;
    let i = 0;
    async function run() {
      while (i < queue.length) {
        const { file, id } = queue[i++];
        const set = (patch: Partial<Upload>) => setUploads((u) => u.map((x) => (x.id === id ? { ...x, ...patch } : x)));
        try {
          await uploadFile(slug, file, (p) => set({ progress: Math.min(99, p) }));
          set({ progress: 100, status: "done" });
        } catch (e) {
          set({ status: "error", error: e instanceof Error ? e.message : "Failed" });
        }
      }
    }
    await Promise.all([run(), run(), run()]);
    if (inputRef.current) inputRef.current.value = "";
    load(slug);
  }

  async function downloadAll() {
    if (!items) return;
    for (const item of items) {
      const a = document.createElement("a");
      a.href = item.downloadUrl;
      a.download = item.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      await new Promise((r) => setTimeout(r, 600));
    }
  }

  async function moveItem(item: Item, toEvent: string) {
    setMoving(true);
    try {
      const res = await fetch("/api/media/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: item.key, toEvent })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not move");
      setItems((prev) => (prev ? prev.filter((x) => x.key !== item.key) : prev));
      setViewing(null);
    } catch (e) {
      setListError(e instanceof Error ? e.message : "Could not move");
      setViewing(null);
    } finally {
      setMoving(false);
    }
  }

  const step = useCallback(
    (d: number) =>
      setViewing((v) => (v === null || !items ? v : Math.min(items.length - 1, Math.max(0, v + d)))),
    [items]
  );

  useEffect(() => {
    if (viewing === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewing(null);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [viewing, step]);

  useEffect(() => setViewing(null), [event]);

  const label = mediaEvents.find((e) => e.slug === event)?.label;

  return (
    <div className="text-left">
      <div className="mb-6 flex flex-wrap gap-2">
        {mediaEvents.map((e) => (
          <button
            key={e.slug}
            onClick={() => setEvent(e.slug)}
            className={`display rounded-full border px-4 py-2 text-[0.68rem] tracking-[0.1em] transition-colors ${
              event === e.slug ? "border-red bg-red text-white" : "border-black/15 text-ink hover:border-red"
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div className="brand-card mb-6 px-6 py-6 text-center">
        <p className="mb-3 text-[0.95rem] text-sage-dark">
          Adding to <strong className="text-ink">{label}</strong>
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          id="media-input"
          onChange={(e) => onFiles(e.target.files)}
        />
        <label
          htmlFor="media-input"
          className="display inline-block cursor-pointer rounded-[var(--radius-lg)] bg-red px-8 py-3 text-[0.72rem] tracking-[0.14em] text-white transition-colors hover:bg-red-dark"
        >
          Upload photos &amp; videos
        </label>
        <p className="mt-3 text-[0.8rem] text-sage-dark">Any size. Keep this page open until uploads finish.</p>

        {uploads.length > 0 && (
          <ul className="mt-5 space-y-2 text-left">
            {uploads.slice(0, 8).map((u) => (
              <li key={u.id} className="text-[0.85rem]">
                <div className="flex justify-between gap-3">
                  <span className="truncate text-ink">{u.name}</span>
                  <span className={u.status === "error" ? "text-red" : "text-sage-dark"}>
                    {u.status === "done" ? "Done" : u.status === "error" ? u.error : `${Math.round(u.progress)}%`}
                  </span>
                </div>
                {u.status === "uploading" && (
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/10">
                    <div className="h-full bg-red transition-all" style={{ width: `${u.progress}%` }} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="display text-[0.72rem] tracking-[0.14em] text-sage-dark">
          {items ? `${items.length} file${items.length === 1 ? "" : "s"}` : "Loading…"}
        </p>
        {items && items.length > 0 && (
          <button onClick={downloadAll} className="display text-[0.68rem] tracking-[0.12em] text-red">
            Download all
          </button>
        )}
      </div>

      {listError && <p className="mb-4 text-[0.9rem] text-red">{listError}</p>}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {items?.map((item, idx) => (
          <div key={item.key} className="brand-card overflow-hidden">
            <button type="button" onClick={() => setViewing(idx)} className="relative block aspect-square w-full bg-black/5">
              {item.isVideo ? (
                <>
                  <video src={item.url} preload="metadata" muted playsInline className="h-full w-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-xl text-white">▶</span>
                  </span>
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt={item.name} loading="lazy" className="h-full w-full object-cover" />
              )}
            </button>
            <a
              href={item.downloadUrl}
              download={item.name}
              className="display block px-3 py-2 text-center text-[0.65rem] tracking-[0.12em] text-red"
            >
              Download
            </a>
          </div>
        ))}
      </div>

      {items && viewing !== null && items[viewing] && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (dx > 60) step(-1);
            else if (dx < -60) step(1);
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="display text-[0.7rem] tracking-[0.12em]">
              {viewing + 1} / {items.length}
            </span>
            <div className="flex items-center gap-4 sm:gap-5">
              <select
                aria-label="Move to another event"
                value=""
                disabled={moving}
                onChange={(e) => e.target.value && moveItem(items[viewing], e.target.value)}
                className="max-w-[9rem] rounded border border-white/30 bg-transparent px-2 py-1 text-[0.7rem] text-white"
              >
                <option value="" className="text-black">
                  {moving ? "Moving…" : "Move to…"}
                </option>
                {mediaEvents
                  .filter((e) => e.slug !== event)
                  .map((e) => (
                    <option key={e.slug} value={e.slug} className="text-black">
                      {e.label}
                    </option>
                  ))}
              </select>
              <a
                href={items[viewing].downloadUrl}
                download={items[viewing].name}
                className="display text-[0.7rem] tracking-[0.12em] text-white underline-offset-4 hover:underline"
              >
                Download
              </a>
              <button type="button" onClick={() => setViewing(null)} aria-label="Close" className="text-2xl leading-none">
                ×
              </button>
            </div>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4" onClick={() => setViewing(null)}>
            {items[viewing].isVideo ? (
              <video
                key={items[viewing].key}
                src={items[viewing].url}
                controls
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={items[viewing].key}
                src={items[viewing].url}
                alt={items[viewing].name}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full object-contain"
              />
            )}
            {viewing > 0 && (
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white hover:bg-white/25 sm:block"
              >
                ‹
              </button>
            )}
            {viewing < items.length - 1 && (
              <button
                type="button"
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white hover:bg-white/25 sm:block"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
