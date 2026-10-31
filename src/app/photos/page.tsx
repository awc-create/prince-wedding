import PageShell from "@/components/PageShell";
import PhotosClient from "./PhotosClient";

export default function PhotosPage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">Shared memories</p>
      <h2 className="script text-4xl text-ink">Photos &amp; Videos</h2>
      <div className="divider" />
      <p className="mb-8 text-[1rem] leading-7 text-sage-dark">
        Pick an event, add your photos and videos (any size), and download anyone else&apos;s.
      </p>
      <PhotosClient />
    </PageShell>
  );
}
