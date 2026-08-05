import PageShell from "@/components/PageShell";

export default function GalleryPage() {
  return (
    <PageShell>
      <p className="display mb-2 text-[0.68rem] tracking-[0.2em] text-sage-dark">A few favorites</p>
      <h2 className="script text-4xl text-ink">Gallery</h2>
      <div className="divider" />
      <p className="mb-4 text-[1.02rem] leading-8 text-sage-dark">
        Swap these placeholders out for real photos of Jacob &amp; Angelie — drop image files into{" "}
        <code>/public/gallery</code> and reference them here with Next&apos;s <code>Image</code>{" "}
        component.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="gallery-ph">
            Photo
          </div>
        ))}
      </div>
    </PageShell>
  );
}
